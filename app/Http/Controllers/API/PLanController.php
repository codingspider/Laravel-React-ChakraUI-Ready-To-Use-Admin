<?php

namespace App\Http\Controllers\API;

use App\Models\Plan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\API\BaseController;


/**
 * @group Plan management
 *
 * APIs for managing Plans
 * 
 */
class PLanController extends BaseController
{
    /**
     * Display a listing of the plans.
     *
     * GET /plans
     */

    public function index(Request $request)
    {
        try {
            $plans = Plan::paginate(10);
            return $this->sendResponse($plans, 'Plan retrived successfully.');

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
     * POST /plans
     */
    public function store(Request $request)
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
            return $this->sendError('Validation Error.'. $validator->errors());
        }

        DB::beginTransaction();
        try {
            $data = $request->all();
            $plan = Plan::create($data);
            DB::commit();
            return $this->sendResponse(['plan' => $plan], 'Plan saved successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }

    /**
     * Display the specified plan.
     *
     * GET /plans/{id}
     */
    public function edit($id)
    {
        try {
            $plan = Plan::find($id);
            return $this->sendResponse($plan, 'Plan retrived successfully.');

        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }

     /**
     * Update the specified plan in storage.
     *
     * PUT /plans/{id}
     */
    public function update(Request $request, Plan $plan)
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
            $plan->name = $request->name;
            $plan->is_active = $request->is_active;
            $plan->price = $request->price;
            $plan->billing_cycle = $request->billing_cycle;
            $plan->branch_limit = $request->branch_limit;
            $plan->user_limit = $request->user_limit;
            $plan->invoice_limit = $request->invoice_limit;
            $plan->save();

            DB::commit();
            return $this->sendResponse($plan, 'Plan updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: '.$e->getMessage(), 500);
        }
    }


    /**
     * Remove the specified plan from storage.
     *
     * DELETE /plans/{id}
     */
    public function destroy($id)
    {
        try {
            $plan = Plan::find($id);
            if (!$plan) {
                return $this->sendError('Plan not found.', 404);
            }
            $plan->delete();
            return $this->sendResponse([], 'Plan deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
