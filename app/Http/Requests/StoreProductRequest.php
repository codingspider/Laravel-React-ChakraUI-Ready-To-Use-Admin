<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
   public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'                  => 'required|string|max:255',
            'category_id'           => 'required|exists:categories,id',
            'branch_id'             => 'required|exists:branches,id',
            'sequence_index'        => 'nullable|string|max:50',
            'sku'                   => 'nullable|string|max:100',
            'subtitle'              => 'nullable|string|max:255',
            'description'           => 'nullable|string',

            // IMAGES
            'main_image'            => 'nullable',

            // RELATIONS
            'variations'   => 'nullable',
            'addons'     => 'nullable',

            // ENUM FIELDS
            'item_available_for'  => 'required',

            'featured_item'         => 'nullable',
            'is_active'             => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'         => 'Item name is required.',
            'category_id.required'  => 'Category is required.',
            'category_id.exists'    => 'Selected category is invalid.',
            'branch_id.required'    => 'Branch is required.',
            'branch_id.exists'      => 'Selected branch is invalid.',
            'is_active.required'      => 'Status is required',
            'item_available_for.*.in' => 'Invalid item availability type.',
        ];
    }
}
