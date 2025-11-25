<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Business;
use Illuminate\Http\Request;

class CheckBusinessIsActive
{
    public function handle(Request $request, Closure $next)
    {
        // Allow GET requests without checking
        if ($request->isMethod('get')) {
            return $next($request);
        }

        // Only check for POST, PUT, PATCH, DELETE
        $methodsToCheck = ['post', 'put', 'patch', 'delete'];

        if (in_array($request->method(), $methodsToCheck)) {

            $user = auth()->user();
            $business = Business::find($user->business_id);

            if (!$business) {
                return response()->json([
                    'success' => false,
                    'message' => 'Business not found.'
                ], 404);
            }

            if (!$business->is_active) {
                return response()->json([
                    'success' => false,
                    'message' => 'Your business is inactive. Please contact support.'
                ], 403);
            }
        }

        return $next($request);
    }
}
