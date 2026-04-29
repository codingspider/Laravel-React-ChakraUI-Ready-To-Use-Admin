<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\API\BaseController;
use App\Http\Controllers\Controller;
use App\Models\Unit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UnitController extends BaseController
{
    /**
     * List all products (or ingredients if product_type = raw/packaging)
     */
    public function index(Request $request)
    {
        try {
            $units = Unit::select('id','actual_name','short_name','allow_decimal')
            ->where('business_id', user_business_id())
            ->orderBy('id', 'desc')
            ->paginate(dataShowingNumber())
            ->through(function ($unit) {
                return [
                    'id' => $unit->id,
                    'actual_name' => $unit->actual_name,
                    'short_name' => $unit->short_name,
                    'allow_decimal' => $unit->allow_decimal
                ];
            });
            return $this->sendResponse($units, 'Unit retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }
    
    public function getAllUnit(Request $request)
    {
        try {
            $categories = Unit::all();
            return $this->sendResponse($categories, 'Unit retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: '.$e->getMessage());
        }
    }

    /**
     * Show single product (ingredient)
     */
    public function show(Unit $unit)
    {
        return $this->sendResponse($unit, 'Unit retrieved successfully.');
    }

    /**
     * Edit product (same as show)
     */
    public function edit($id)
    {
        $unit = Unit::find($id);
        return $this->sendResponse($unit, 'Unit retrieved successfully.');
    }

    /**
     * Store new product (ingredient)
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'actual_name'           => 'required|string|max:255',
            'short_name'  => 'required',
            'allow_decimal'  => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $unit = new Unit();
            $unit->actual_name = $request->actual_name;
            $unit->short_name = $request->short_name;
            $unit->allow_decimal = $request->allow_decimal;
            $unit->business_id = user_business_id();
            $unit->created_by = createdBy();
            $unit->save();

            activityLog('unit', 'create', 'User '.user_full_name().' created unit '.$unit->actual_name);

            DB::commit();
            return $this->sendResponse($unit, 'Unit saved successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: '.$e->getMessage(), 500);
        }
    }

    /**
     * Update product
     */
    public function update(Request $request, Unit $unit)
    {
        $validator = Validator::make($request->all(), [
            'actual_name'           => 'required|string|max:255',
            'short_name'  => 'required',
            'allow_decimal'  => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $unit->actual_name = $request->actual_name;
            $unit->short_name = $request->short_name;
            $unit->allow_decimal = $request->allow_decimal;
            $unit->save();
            activityLog('unit','update','User '.user_full_name().' updated unit '.$unit->actual_name);

            DB::commit();
            return $this->sendResponse($unit, 'Unit updated successfully.');
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
            $unit = Unit::find($id);
            $unit->delete();
            activityLog('unit','deleted','User '.user_full_name().' deleted unit '.$unit->actual_name);
            return $this->sendResponse([], 'Unit deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
