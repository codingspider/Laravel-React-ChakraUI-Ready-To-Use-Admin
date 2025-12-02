<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VatSettingRequest extends FormRequest
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
            'vat_amount' => 'required|numeric|min:0|max:100',
            'item_tax_include' => 'required|boolean',
            'branch_id' => 'required|exists:branches,id',
            'use_for' => 'required|array|min:1',
            'use_for.*' => 'in:dine,pickup,delivery', // allowed options
        ];
    }

    public function messages(): array
    {
        return [
            'vat_amount.required' => 'VAT percent is required.',
            'vat_amount.numeric' => 'VAT percent must be a number.',
            'vat_amount.min' => 'VAT cannot be less than 0%.',
            'vat_amount.max' => 'VAT cannot be more than 100%.',
            'branch_id.required' => 'Branch is required.',
            'branch_id.exists' => 'Selected branch does not exist.',
            'use_for.required' => 'At least one usage option is required.',
            'use_for.array' => 'Usage options must be an array.',
            'use_for.*.in' => 'Invalid usage option selected.',
        ];
    }
}
