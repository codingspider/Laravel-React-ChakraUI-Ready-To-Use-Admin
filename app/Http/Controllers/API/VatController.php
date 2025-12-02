<?php

namespace App\Http\Controllers\API;

use App\Models\Vat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\VatSettingRequest;
use App\Http\Controllers\API\BaseController;

class VatController extends BaseController
{
    // List branches
    public function index()
    {
        try {
            $vats = Vat::with('branch')->get();
            return $this->sendResponse($vats, 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage());
        }
    }
    
    public function getVat()
    {
        try {
            $vats = Vat::with('branch')->get();
            return $this->sendResponse($vats, 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage());
        }
    }

    // Store new branch
    public function store(VatSettingRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();
            $data['use_for'] = json_encode($data['use_for']);
            $branch = Vat::create($data);
            DB::commit();
            return $this->sendResponse($branch, 'Vat saved successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }

    // Show single branch
    public function show($id)
    {
        $vat = Vat::find($id);
        if (!$vat) {
            return $this->sendError('Vat Not Found !', 404);
        }
        return $this->sendResponse($vat, 'Vat retrived successfully.');
    }

    // Update
    public function update(VatSettingRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $vat = Vat::find($id);
            if (!$vat) {
                return $this->sendError('Vat Not Found !', 404);
            }

            $vat->update($request->validated());
            DB::commit();
            return $this->sendResponse($vat, 'Vat saved successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }

    // Delete
    public function destroy($id)
    {
        try {
            $vat = Vat::find($id);
            if (!$vat) {
                return $this->sendError('Vat not found.', 404);
            }
            $vat->delete();
            return $this->sendResponse([], 'Vat deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
