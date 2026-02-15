<?php

namespace App\Http\Controllers\API\Admin;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Controllers\API\BaseController;

class ProductController extends BaseController
{
    public function store(StoreProductRequest $request)
    {
        DB::beginTransaction();
        try {

            $data = $request->validated();

            // MAIN IMAGE UPLOAD
            if ($request->hasFile('main_image')) {
                $data['main_image'] = uploadImage(
                    $request->file('main_image'),
                    'uploads/product/image',
                    null
                );
            }

            $item = Product::create([
                'name'              => $data['name'],
                'category_id'       => $data['category_id'],
                'branch_id'         => $data['branch_id'],
                'sequence_index'    => $data['sequence_index'] ?? null,
                'sku'               => $data['sku'] ?? null,
                'subtitle'          => $data['subtitle'] ?? null,
                'description'       => $data['description'] ?? null,
                'item_available_for'=> json_encode($data['item_available_for']),
                'featured_item'     => !empty($data['featured_item']) && $data['featured_item'] !== 'false' ? 1 : 0,
                'is_active'         => $data['is_active'],
                'main_image'         => $data['main_image'] ?? null,
                'variations'        => json_encode($data['variations'] ?? []),
                'addons'            => json_encode($data['addons'] ?? []),
                'created_by'        => auth()->user()->id,
            ]);


            DB::commit();
            return $this->sendResponse($item, 'Product created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }

    public function index(Request $request)
    {
        try {
            $items = Product::with('category:id,name')->select('id','name','main_image','is_active', 'category_id')
            ->orderBy('id', 'desc')
            ->paginate(10)
            ->through(function ($item) {
                return [
                    'id' => $item->id,
                    'name' => $item->name,
                    'order_number' => $item->is_active,
                    'main_image' => $item->image_url,
                    'category'     => $item->category ? [
                        'name' => $item->category->name,
                    ] : null,
                ];
            });

            return $this->sendResponse($items, 'Category retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }
    

    public function destroy($id)
    {
        try {
            $product = Product::find($id);
            $product->delete();
            activityLog('product','deleted','User '.auth()->user()->name.' deleted product '.$product->name);
            return $this->sendResponse([], 'Data deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
