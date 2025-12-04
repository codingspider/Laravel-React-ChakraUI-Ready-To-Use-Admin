<?php

namespace App\Http\Controllers\API\Admin;

use App\Models\Variation;
use Illuminate\Http\Request;
use App\Models\VariationItem;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController;

class VariationController extends BaseController
{
    public function index(Request $request)
    {
        try {
            $variation = Variation::with('variation_items', 'branch')->whereIn('branch_id', getBranchIds())->latest()->paginate(10);
            return $this->sendResponse($variation, 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }
    
    public function getAllVariations(Request $request)
    {
        try {
            $variation = Variation::with('variation_items')->whereIn('branch_id', getBranchIds())->get();
            return $this->sendResponse($variation, 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }

    /**
     * Show single product (ingredient)
     */
    public function show(Variation $variation)
    {
        return $this->sendResponse($variation, 'Variation retrieved successfully.');
    }

    /**
     * Store new product (ingredient)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'branch_id'     => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $variation = new Variation();
            $variation->name = $request->name;
            $variation->branch_id = $request->branch_id;
            $variation->created_by = createdBy();
            $variation->save();

            // Use a different variable name inside the loop
            foreach ($request->lines as $lineData) {
                $item = new VariationItem();
                $item->variation_id = $variation->id;
                $item->name = $lineData['name'] ?? null;
                $item->price = $lineData['price'] ?? null;
                $item->save();
            }

            activityLog('variation','create','User '.auth()->user()->name.' created variation '.$variation->name);

            DB::commit();

            return $this->sendResponse($variation, 'Data saved successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }

    }

    /**
     * Update product
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required',
            'branch_id'     => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $variation = Variation::find($id);
            $variation->name = $request->name;
            $variation->branch_id = $request->branch_id;
            $variation->save();

            $variation->variation_items()->delete();

            // Use a different variable name inside the loop
            foreach ($request->lines as $lineData) {
                $item = new VariationItem();
                $item->variation_id = $variation->id;
                $item->name = $lineData['name'] ?? null;
                $item->price = $lineData['price'] ?? null;
                $item->save();
            }

            activityLog('variation','update','User '.auth()->user()->name.' updated variation '.$variation->name);

            DB::commit();

            return $this->sendResponse($variation, 'Data saved successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }


    /**
     * Delete product
     */
    public function destroy($id)
    {
        try {
            $variation = Variation::find($id);
            $variation->delete();
            activityLog('variation','deleted','User '.auth()->user()->name.' deleted variation '.$variation->name);
            return $this->sendResponse([], 'Data deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage(), 500);
        }
    }
}
