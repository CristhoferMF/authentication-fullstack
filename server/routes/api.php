<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\AuthenticatedUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::name('api.')->group(function () {
    Route::post('/auth/register', RegisterController::class)->name('register');
    Route::post('/auth/login', LoginController::class)->name('login');
    //user routes
    Route::middleware('auth:api')
        ->group(function () {
            Route::get('user', [AuthenticatedUserController::class, 'index'])->name('user.index');
        });
});
