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
            $branches = Branch::where('is_active', 1)->get();
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
            $branch = Branch::create($request->validated());
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
            $branch->delete();
            return $this->sendResponse([], 'Branch deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('Server Error: ' . $e->getMessage(), 500);
        }
    }
}
