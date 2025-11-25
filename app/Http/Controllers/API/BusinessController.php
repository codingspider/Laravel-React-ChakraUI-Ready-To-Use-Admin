<?php

namespace App\Http\Controllers\API;

use App\Models\Plan;
use App\Models\Payment;
use App\Models\Business;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Services\BusinessCreationService;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\StoreBusinessRequest;
use App\Http\Controllers\API\BaseController;

class BusinessController extends BaseController
{
    /**
     * Display a listing of the business.
     *
     * GET /business
     */

    public function index(Request $request)
    {
        try {
            $business = Business::paginate(10);
            return $this->sendResponse($business, 'Business retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }
    
    public function getAllPlans(Request $request)
    {
        try {
            $plans = Plan::whereIsActive(1)->get();
            return $this->sendResponse($plans, 'Plan retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }

     /**
     * Store a newly created plan in storage.
     *
     * POST /business
     */
    public function store(StoreBusinessRequest $request, BusinessCreationService $service)
    {
        DB::beginTransaction();
        try {
            $result = $service->create($request->all());
            DB::commit();
            return $this->sendResponse($result, 'Business created successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified business.
     *
     * GET /business/{id}
     */
    public function edit($id)
    {
        try {
            $plan = Business::find($id);
            return $this->sendResponse($plan, 'Business retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }

     /**
     * Update the specified business in storage.
     *
     * PUT /business/{id}
     */
    public function update(Request $request, Business $business)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required',
            'billing_cycle' => 'required',
            'branch_limit' => 'required',
            'user_limit' => 'required',
            'invoice_limit' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        DB::beginTransaction();
        try {
            $business->name = $request->name;
            $business->is_active = $request->is_active;
            $business->price = $request->price;
            $business->billing_cycle = $request->billing_cycle;
            $business->branch_limit = $request->branch_limit;
            $business->user_limit = $request->user_limit;
            $business->invoice_limit = $request->invoice_limit;
            $business->save();

            DB::commit();
            return $this->sendResponse($business, 'Business updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: '.$e->getMessage(), 500);
        }
    }


    /**
     * Remove the specified business from storage.
     *
     * DELETE /business/{id}
     */
    public function destroy($id)
    {
        try {
            $business = Business::find($id);
            if (!$business) {
                return $this->sendError('Business not found.', 404);
            }
            $business->delete();
            return $this->sendResponse([], 'Business deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
