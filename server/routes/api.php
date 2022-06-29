<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\AuthenticatedUserController;
use App\Http\Controllers\BackOffice\Auth\UserAuthenticationController;
use App\Http\Controllers\BackOffice\User\UserRegisterController;
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
    Route::post('/auth/login', UserAuthenticationController::class)->name('login');

    Route::prefix('users')
        ->name('users.')
        ->group(function () {
            Route::post('/register', UserRegisterController::class)->name('register');
        });
    //user routes
    Route::middleware('auth:api')
        ->group(function () {
            Route::get('user', [AuthenticatedUserController::class, 'index'])->name('user.index');
        });
});
