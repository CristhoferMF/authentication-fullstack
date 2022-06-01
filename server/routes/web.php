<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Symfony\Component\Console\Output\BufferedOutput;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::view('/', 'welcome');
Route::get('phpinfo', fn () => phpinfo());
Route::get('/login', fn () => redirect()->to(config('client.url')))->name('login');
//  artisan comands
Route::prefix('$2a$12$gaHvKNcpc2sLaMEuj/migrate')->group(function () {
    Route::get('/', function () {
        $output = new BufferedOutput();
        Artisan::call('migrate', ['--force' => true], $output);
        return response($output->fetch())->header('Content-Type', 'text/plain');
    });
    Route::get('/rollback', function () {
        $output = new BufferedOutput();
        Artisan::call('migrate:rollback', ['--force' => true], $output);
        return response($output->fetch())->header('Content-Type', 'text/plain');
    });
});
