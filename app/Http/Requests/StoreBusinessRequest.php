<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBusinessRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'business_name'  => 'required',
            'start_date'     => 'required|date',
            'currency_id'    => 'required|integer',
            'timezone_id'    => 'required|integer',
            'contact_number' => 'required',
            'country'        => 'required',
            'state'          => 'required',
            'city'           => 'required',
            'landmark'       => 'required',
            'is_active'      => 'required|boolean',
            'name'           => 'required',
            'username'       => 'required',
            'email'          => 'required|email',
            'contact_no'     => 'required',
            'password'       => 'required|min:6',
            'plan_id'        => 'required|integer',
            'payment_method' => 'required',
            'zip'            => 'required',
        ];
    }

    public function messages()
    {
        return [
            'business_name.required'  => 'Business name is required.',
            'start_date.required'     => 'Start date is required.',
            'start_date.date'         => 'Start date must be a valid date.',
            'currency_id.required'    => 'Currency is required.',
            'currency_id.integer'     => 'Currency ID must be a number.',
            'timezone_id.required'    => 'Timezone is required.',
            'timezone_id.integer'     => 'Timezone ID must be a number.',
            'contact_number.required' => 'Business contact number is required.',
            'country.required'        => 'Country is required.',
            'state.required'          => 'State is required.',
            'city.required'           => 'City is required.',
            'zip.required'            => 'ZIP code is required.',
            'landmark.required'       => 'Landmark is required.',
            'is_active.required'      => 'Active status is required.',
            'is_active.boolean'       => 'Active status must be true or false.',

            'name.required'           => 'Admin name is required.',
            'username.required'       => 'Username is required.',
            'email.required'          => 'Email is required.',
            'email.email'             => 'Please enter a valid email address.',
            'contact_no.required'     => 'Admin contact number is required.',
            'password.required'       => 'Password is required.',
            'password.min'            => 'Password must be at least 6 characters.',

            'plan_id.required'        => 'Subscription plan is required.',
            'plan_id.integer'         => 'Plan ID must be a number.',
            'payment_method.required' => 'Payment method is required.',
        ];
    }
}
