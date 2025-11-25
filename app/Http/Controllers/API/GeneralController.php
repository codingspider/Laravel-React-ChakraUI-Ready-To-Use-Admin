<?php

namespace App\Http\Controllers\API;

use App\Models\Plan;
use App\Models\Currency;
use App\Models\Timezone;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Controllers\API\BaseController;

class GeneralController extends BaseController
{
    public function getCurrency(Request $request)
    {
        try {
            $currency = Currency::all();
            return $this->sendResponse($currency, 'Currency retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }
    
    public function getTimezone(Request $request)
    {
        try {
            $currency = Timezone::all();
            return $this->sendResponse($currency, 'Timezone retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }
    
    public function getAllPlan(Request $request)
    {
        try {
            $plans = Plan::where('is_active',1)->get();
            return $this->sendResponse($plans, 'Plan retrived successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error.'.$e->getMessage());
        }
    }
}
