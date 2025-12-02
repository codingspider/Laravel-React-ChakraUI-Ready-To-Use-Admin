<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBusinessRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true; 
    }

    public function rules()
    {
        return [
            'name'            => 'required|string|max:255',
            'phone'           => 'required|string|max:50',
            'landmark'        => 'required|string|max:255',
            'city'            => 'required|string|max:255',
            'zip'             => 'required|string|max:20',
            'map_api_key'     => 'required|string',
            'center_lat_lon'  => 'required|string',
            'timezone_id'     => 'required|integer|exists:timezones,id',
            'currency_id'     => 'required|integer|exists:currencies,id',

            // File validations
            'logo'        => 'nullable|file|mimes:jpg,jpeg,png,webp|max:2048',
            'favicon'        => 'nullable|file|mimes:jpg,jpeg,png,ico,webp|max:1024',
        ];
    }
}
