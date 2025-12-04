<?php

namespace App\Http\Controllers\API\Admin;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController;

class CategoryController extends BaseController
{
    /**
     * List all products (or ingredients if product_type = raw/packaging)
     */
    public function index(Request $request)
    {
        try {
            $categories = Category::select('id','name','image','order_number')
            ->orderBy('order_number')
            ->paginate(10)
            ->through(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'order_number' => $cat->order_number,
                    'image' => $cat->image_url,
                ];
            });


            return $this->sendResponse($categories, 'Category retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }

    /**
     * Show single product (ingredient)
     */
    public function show(Category $category)
    {
        return $this->sendResponse($category, 'Category retrieved successfully.');
    }

    /**
     * Edit product (same as show)
     */
    public function edit($id)
    {
        $category = Category::find($id);
        return $this->sendResponse($category, 'Category retrieved successfully.');
    }

    /**
     * Store new product (ingredient)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'           => 'required|string|max:255',
            'order_number'  => 'required',
            'image'  => 'nullable|image|mimes:jpg,png,jpeg,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $category = new Category();
            $category->name = $request->name;
            $category->order_number = $request->order_number;
            $category->created_by = createdBy();

            if ($request->hasFile('image')) {
                $category->image = uploadImage(
                    $request->file('image'),
                    'uploads/category/image',
                    null
                );
            }
            $category->save();
            activityLog('category','create','User '.auth()->user()->name.' created category '.$category->name);

            DB::commit();
            return $this->sendResponse($category, 'Category saved successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: '.$e->getMessage(), 500);
        }
    }

    /**
     * Update product
     */
    public function update(Request $request, Category $category)
    {
        $validator = Validator::make($request->all(), [
            'name'           => 'required|string|max:255',
            'order_number'  => 'required',
            'image'         => 'nullable|image|mimes:jpg,png,jpeg,webp|max:2048'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $category->name = $request->name;
            $category->order_number = $request->order_number;

            if ($request->hasFile('image')) {
                $category->image = uploadImage(
                    $request->file('image'),
                    'uploads/category/image',
                    $category->image
                );
            }
            $category->save();
            activityLog('category','update','User '.auth()->user()->name.' updated category '.$category->name);

            DB::commit();
            return $this->sendResponse($category, 'Category updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: '.$e->getMessage(), 500);
        }
    }

    /**
     * Delete product
     */
    public function destroy($id)
    {
        try {
            $category = Category::find($id);
            $category->delete();
            activityLog('category','deleted','User '.auth()->user()->name.' deleted category '.$category->name);
            return $this->sendResponse([], 'Data deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
