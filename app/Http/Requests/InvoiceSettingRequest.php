<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InvoiceSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules()
    {
        return [
            'invoice_prefix'        => 'required|string|max:10',
            'invoice_start_number'  => 'required|integer|min:1',
            
            'show_logo'             => 'boolean',

            'show_address'          => 'boolean',
            'show_city'             => 'boolean',
            'show_state'            => 'boolean',
            'show_zip'              => 'boolean',

            'header_text'           => 'nullable|string|max:500',
            'footer_text'           => 'nullable|string|max:500',

            'tax_number'            => 'nullable|string|max:100',
            'show_tax_info'         => 'boolean',
            'show_tax_number'       => 'boolean',
            'show_discount_info'    => 'boolean',
            'show_payment_info'     => 'boolean',

            'show_table_number'     => 'boolean',
            'show_waiter_name'      => 'boolean',
            'show_kitchen_notes'    => 'boolean',
            'invoice_direct_print'  => 'boolean',
        ];
    }

    public function messages()
    {
        return [
            'invoice_prefix.required' => 'Invoice prefix is required.',
            'invoice_start_number.required' => 'Invoice start number must be provided.',
        ];
    }
}
