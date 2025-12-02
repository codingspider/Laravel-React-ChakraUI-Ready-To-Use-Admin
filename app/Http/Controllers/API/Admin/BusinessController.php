<?php

namespace App\Http\Controllers\API\Admin;

use App\Models\Business;
use Illuminate\Http\Request;
use App\Models\InvoiceSetting;
use App\Models\NotificationSetting;
use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController;
use App\Http\Requests\InvoiceSettingRequest;
use App\Http\Requests\UpdateBusinessRequest;
use App\Http\Requests\NotificationSettingRequest;

class BusinessController extends BaseController
{
    public function index(Request $request)
    {
        try {
            $user = auth()->user();
            $business = Business::find($user->business_id);
            return $this->sendResponse($business, 'Business retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }
    
    public function getNotificationSetting(Request $request)
    {
        try {
            $user = auth()->user();
            $settings = NotificationSetting::where('business_id', $user->business_id)
            ->where('is_active', 1)
            ->get()
            ->mapWithKeys(function ($item) {
                return [$item->type => $item->settings];
            })
            ->toArray();


            return $this->sendResponse($settings, 'Business retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }
    
    public function getInvoiceSetting(Request $request)
    {
        try {
            $user = auth()->user();
            $settings = InvoiceSetting::where('business_id', $user->business_id)->first();
            return $this->sendResponse($settings, 'Setting retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }

    public function update(UpdateBusinessRequest $request, $id)
    {
        $business = Business::find($id);
        
        $data = $request->validated();

        // Upload App Logo
        if ($request->hasFile('logo')) {
            $data['logo'] = uploadImage(
                $request->file('logo'),
                'uploads/business/logo',
                $business->logo
            );
        }

        // Upload Favicon
        if ($request->hasFile('favicon')) {
            $data['favicon'] = uploadImage(
                $request->file('favicon'),
                'uploads/business/favicon',
                $business->favicon
            );
        }

        $business->update($data);

        return $this->sendResponse($business, 'Business retrived successfully.');
    }

    public function updateNotification(NotificationSettingRequest $request)
    {
        try {
            $user = auth()->user();
            $business = Business::find($user->business_id);
            $setting = $request->settings;

            // Determine provider-specific data
            $data = [];
            if ($request->type === 'email') {
                $data = [
                    'provider' => 'smtp',
                    'settings' => [
                        'host' => $setting['host'],
                        'port' => $setting['port'],
                        'username' => $setting['username'],
                        'password' => $setting['password'],
                        'encryption' => $setting['encryption'],
                        'from_email' => $setting['from_email'],
                        'from_name' => $setting['from_name'],
                    ],
                    'is_active' => true,
                ];
            }

            if ($request->type === 'sms') {
                $data = [
                    'provider' => 'twilio',
                    'settings' => [
                        'sid' => $setting['sid'],
                        'token' => $setting['token'],
                        'from' => $setting['from'],
                    ],
                    'is_active' => true,
                ];
            }

            // Create or update based on type and business_id
            $notificationSetting = NotificationSetting::updateOrCreate(
                [
                    'business_id' => $business->id,
                    'type' => $request->type,
                ],
                $data
            );

            return $this->sendResponse($notificationSetting, 'Notification setting saved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }

    public function updateInvoiceSetting(InvoiceSettingRequest $request)
    {
        try {
            $user = auth()->user();
            $businessId = $user->business_id;

            $setting = InvoiceSetting::firstOrNew([
                'business_id' => $businessId
            ]);

            $setting->invoice_prefix = $request->invoice_prefix;
            $setting->invoice_start_number = $request->invoice_start_number;

            $setting->show_logo = $request->show_logo ?? false;
            $setting->show_address = $request->show_address ?? false;
            $setting->show_city = $request->show_city ?? false;
            $setting->show_state = $request->show_state ?? false;
            $setting->show_zip = $request->show_zip ?? false;

            $setting->header_text = $request->header_text;
            $setting->footer_text = $request->footer_text;

            $setting->tax_number = $request->tax_number;
            $setting->show_tax_info = $request->show_tax_info ?? false;
            $setting->show_tax_number = $request->show_tax_number ?? false;
            $setting->show_discount_info = $request->show_discount_info ?? false;
            $setting->show_payment_info = $request->show_payment_info ?? false;

            $setting->show_table_number = $request->show_table_number ?? false;
            $setting->show_waiter_name = $request->show_waiter_name ?? false;
            $setting->show_kitchen_notes = $request->show_kitchen_notes ?? false;
            $setting->invoice_direct_print = $request->invoice_direct_print ?? false;

            // Handle Logo Upload
            if ($request->hasFile('logo')) {
                $setting->logo = uploadImage(
                    $request->file('logo'),
                    'uploads/invoice/logo',
                    $setting->logo
                );
            }

            $setting->save();

            return $this->sendResponse($setting, 'Setting saved successfully.');

        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }


}
