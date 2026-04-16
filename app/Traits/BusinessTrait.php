<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;
use App\Models\Business;
use App\Models\InvoiceLayout;
use App\Models\InvoiceScheme;
use App\Models\BusinessLocation;

trait BusinessTrait
{
    public function createNewBusiness($business_details)
    {
        $business_details['sell_price_tax'] = 'includes';

        $business_details['default_profit_percent'] = 25;

        $business_details['keyboard_shortcuts'] = [
            "pos" => [
                "express_checkout" => "shift+e",
                "pay_n_ckeckout" => "shift+p",
                "draft" => "shift+d",
                "cancel" => "shift+c",
                "edit_discount" => "shift+i",
                "edit_order_tax" => "shift+t",
                "add_payment_row" => "shift+r",
                "finalize_payment" => "shift+f",
                "recent_product_quantity" => "f2",
                "add_new_product" => "f4"
            ]
        ];

        $business_details['ref_no_prefixes'] = [
            'purchase' => 'PO',
            'stock_transfer' => 'ST',
            'stock_adjustment' => 'SA',
            'sell_return' => 'CN',
            'expense' => 'EP',
            'contacts' => 'CO',
            'purchase_payment' => 'PP',
            'sell_payment' => 'SP',
            'business_location' => 'BL',
        ];

        //Disable inline tax editing
        $business_details['enable_inline_tax'] = 0;

        $business = Business::create($business_details);

        return $business;
    }

    public function addLocation($business_id, $location_details, $invoice_scheme_id = null, $invoice_layout_id = null)
    {
        if (empty($invoice_scheme_id)) {
            $layout = InvoiceLayout::where('is_default', 1)->where('business_id', $business_id)->first();
            $invoice_layout_id = $layout->id ?? null;
        }

        if (empty($invoice_scheme_id)) {
            $scheme = InvoiceScheme::where('is_default', 1)->where('business_id', $business_id)->first();
            $invoice_scheme_id = $scheme->id ?? null;
        }

        //Enable all payment methods by default
        $payment_types = payment_types();

        $location = BusinessLocation::create(['business_id' => $business_id,
            'name' => $location_details['name'],
            'landmark' => $location_details['landmark'],
            'city' => $location_details['city'],
            'state' => $location_details['state'],
            'zip_code' => $location_details['zip_code'],
            'country' => $location_details['country'],
            'invoice_scheme_id' => $invoice_scheme_id,
            'invoice_layout_id' => $invoice_layout_id,
            'sale_invoice_layout_id' => $invoice_layout_id,
            'mobile' => ! empty($location_details['mobile']) ? $location_details['mobile'] : '',
            'alternate_number' => ! empty($location_details['alternate_number']) ? $location_details['alternate_number'] : '',
            'website' => ! empty($location_details['website']) ? $location_details['website'] : '',
            'email' => '',
            'default_payment_accounts' => json_encode($payment_types),
        ]);

        return $location;
    }

    /**
     * Get current logged-in user's business
     */
    public function getBusiness()
    {
        try {
            if (!Auth::check()) {
                return null;
            }

            return Business::find(Auth::user()->business_id);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Get business ID
     */
    public function getBusinessId()
    {
        try {
            return Auth::user()->business_id ?? null;
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Format currency based on business settings
     */
    public function formatCurrency($amount)
    {
        try {
            $business = $this->getBusiness();

            $symbol = $business->currency_symbol ?? '$';
            $precision = $business->currency_precision ?? 2;

            return $symbol . ' ' . number_format($amount, $precision);
        } catch (\Exception $e) {
            return $amount;
        }
    }

    /**
     * Get business timezone
     */
    public function getTimezone()
    {
        try {
            return $this->getBusiness()->timezone ?? config('app.timezone');
        } catch (\Exception $e) {
            return config('app.timezone');
        }
    }

    /**
     * Get business date format
     */
    public function getDateFormat()
    {
        try {
            return $this->getBusiness()->date_format ?? 'Y-m-d';
        } catch (\Exception $e) {
            return 'Y-m-d';
        }
    }

    /**
     * Check if user belongs to business
     */
    public function belongsToBusiness($businessId)
    {
        try {
            return Auth::user()->business_id == $businessId;
        } catch (\Exception $e) {
            return false;
        }
    }
}