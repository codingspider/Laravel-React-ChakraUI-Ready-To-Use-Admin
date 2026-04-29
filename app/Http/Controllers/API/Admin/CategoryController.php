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
            $categories = Category::select('id','name','image','description')
            ->where('business_id', user_business_id())
            ->orderBy('id', 'desc')
            ->paginate(dataShowingNumber())
            ->through(function ($cat) {
                return [
                    'id' => $cat->id,
                    'name' => $cat->name,
                    'description' => $cat->description,
                    'image' => $cat->image_url,
                ];
            });


            return $this->sendResponse($categories, 'Category retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }
    
    public function getAllCategory(Request $request)
    {
        try {
            $categories = Category::all();
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
            'description'  => 'nullable',
            'image' => 'sometimes|image|mimes:jpg,png,jpeg|max:2048'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $category = new Category();
            $category->name = $request->name;
            $category->description = $request->description;
            $category->business_id = user_business_id();
            $category->created_by = createdBy();

            if ($request->hasFile('image')) {
                $category->image = uploadImage(
                    $request->file('image'),
                    'uploads/category/image',
                    null
                );
            }
            $category->save();

            activityLog('category', 'create', 'User '.user_full_name().' created category '.$category->name);

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
            'description'  => 'nullable',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $category->name = $request->name;
            $category->description = $request->description;

            if ($request->hasFile('image')) {
                $category->image = uploadImage(
                    $request->file('image'),
                    'uploads/category/image',
                    $category->image
                );
            }
            $category->save();
            activityLog('category','update','User '.user_full_name().' updated category '.$category->name);

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
            activityLog('category','deleted','User '.user_full_name().' deleted category '.$category->name);
            return $this->sendResponse([], 'Category deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
