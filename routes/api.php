<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\VatController;
use App\Http\Controllers\API\PLanController;
use App\Http\Controllers\API\UserController;
use App\Http\Controllers\API\BranchController;
use App\Http\Controllers\API\GeneralController;
use App\Http\Controllers\API\BusinessController;
use App\Http\Controllers\API\Admin\BusinessController as AdminBusinessController;
use App\Http\Controllers\API\RegisterController;


Route::controller(RegisterController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('forgot-password', 'forgotPassword');
    Route::post('reset-password', 'resetPassword');
});

Route::middleware(['auth:sanctum'])->prefix('superadmin')->group(function () {
    // Add more super admin routes here
    Route::get('users', [UserController::class, 'index']);
    Route::post('user/store', [UserController::class, 'store']);
    Route::resource('plans', PLanController::class);
    Route::resource('business', BusinessController::class);

    Route::get('get/all/plans', [GeneralController::class, 'getAllPlan']);
});

Route::middleware(['auth:sanctum', 'check_active_business'])->prefix('admin')->group(function () {
    Route::apiResource('branches', BranchController::class);
    Route::apiResource('vats', VatController::class);
    Route::get('owner/business', [AdminBusinessController::class, 'index']);
    Route::put('business/setting/update/{id}', [AdminBusinessController::class, 'update']);
    Route::post('notification/update', [AdminBusinessController::class, 'updateNotification']);
    Route::post('update/invoice/setting', [AdminBusinessController::class, 'updateInvoiceSetting']);
    Route::get('get/notification/setting', [AdminBusinessController::class, 'getNotificationSetting']);
    Route::get('get/invoice/setting', [AdminBusinessController::class, 'getInvoiceSetting']);
});

Route::middleware(['auth:sanctum', 'check_active_business'])->group(function () {
    Route::get('get/branches', [BranchController::class, 'getBranch']);
    Route::get('get/currencies', [GeneralController::class, 'getCurrency']);
    Route::get('get/timezones', [GeneralController::class, 'getTimezone']);
});


Route::get('/translations', function (\Illuminate\Http\Request $request) {
    $locale = $request->query('lang', config('app.locale'));

    $supported = ['en', 'bn'];
    if (!in_array($locale, $supported)) {
        $locale = config('app.fallback_locale');
    }

    App::setLocale($locale);

    $translations = trans('message');

    return response()->json([
        'lang' => $locale,
        'messages' => $translations
    ]);
});