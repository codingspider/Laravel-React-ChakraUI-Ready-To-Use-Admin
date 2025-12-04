<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        return true; // allow all authenticated users
    }

    public function rules()
    {
        return [
            'branch_id' => 'required|exists:branches,id',
            'name'      => 'required|string|max:255',
            'price'     => 'required|numeric|min:0',
            'is_active' => 'required|boolean',
        ];
    }

    public function messages()
    {
        return [
            'branch_id.required' => 'Branch is required.',
            'branch_id.exists'   => 'Invalid branch selected.',

            'name.required'      => 'Addon name is required.',
            'name.max'           => 'Addon name cannot exceed 255 characters.',

            'price.required'     => 'Price is required.',
            'price.numeric'      => 'Price must be a numeric value.',
            'price.min'          => 'Price cannot be negative.',

            'is_active.required' => 'Active status is required.',
            'is_active.boolean'  => 'Invalid value for active status.',
        ];
    }
}
