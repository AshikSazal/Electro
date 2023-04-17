<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('check.duplication')->post('/register/{role}',[AuthController::class, 'register']);
Route::middleware('check.login')->post('/login',[AuthController::class, 'login']);
Route::middleware('check.authentication')->post('/logout',[AuthController::class, 'logout']);

Route::middleware('check.authentication')->post('/product/store',[ProductController::class, 'store']);
Route::middleware('check.authentication')->get('/product/fetch',[ProductController::class, 'fetch']);
Route::middleware('check.authentication')->delete('/product/delete/{id}',[ProductController::class, 'delete']);
Route::get('/product/fetch/all',[ProductController::class, 'fetch']);

Route::middleware('check.authentication')->post('/user/cart/store',[CartController::class, 'storeCartPrduct']);
Route::middleware('check.authentication')->get('/user/cart/fetch',[CartController::class, 'fetchCartPrduct']);



// Without middleware
// Route::post('/register/{role}',[AuthController::class, 'register']);