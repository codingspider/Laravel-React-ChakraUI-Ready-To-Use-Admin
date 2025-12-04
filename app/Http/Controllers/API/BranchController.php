<?php

namespace App\Http\Controllers\API;

use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\BranchRequest;
use App\Http\Controllers\API\BaseController;

class BranchController extends BaseController
{
    // List branches
    public function index()
    {
        try {
            $branches = Branch::orderBy('id', 'desc')->paginate(20);
            return $this->sendResponse($branches, 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage());
        }
    }
    
    public function getBranch()
    {
        try {
            $user = auth()->user();
            $branches = Branch::where('is_active', 1)->where('business_id', $user->business_id)->get();
            return $this->sendResponse($branches, 'Data retrieved successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage());
        }
    }

    // Store new branch
    public function store(BranchRequest $request)
    {
        DB::beginTransaction();

        try {
            $data = $request->validated();
            $data['created_by'] = createdBy();
            $data['business_id'] = auth()->user()->business_id;
            $branch = Branch::create($data);

            activityLog('branch','create','User '.auth()->user()->name.' created branch '.$branch->name);

            DB::commit();
            return $this->sendResponse($branch, 'Branch saved successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }

    // Show single branch
    public function show($id)
    {
        $branch = Branch::find($id);
        if (!$branch) {
            return $this->sendError('Branch Not Found !', 404);
        }
        return $this->sendResponse($branch, 'Ingredient retrived successfully.');
    }

    // Update
    public function update(BranchRequest $request, $id)
    {
        DB::beginTransaction();
        try {
            $branch = Branch::find($id);
            if (!$branch) {
                return $this->sendError('Branch Not Found !', 404);
            }

            $branch->update($request->validated());

            activityLog('branch','update','User '.auth()->user()->name.' updated branch '.$branch->name);

            DB::commit();
            return $this->sendResponse($branch, 'Branch saved successfully.');

        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }

    // Delete
    public function destroy($id)
    {
        try {
            $branch = Branch::find($id);
            if (!$branch) {
                return $this->sendError('Branch not found.', 404);
            }
            activityLog('branch','delete','User '.auth()->user()->name.' deleted branch '.$branch->name);
            $branch->delete();
            return $this->sendResponse([], 'Branch deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
