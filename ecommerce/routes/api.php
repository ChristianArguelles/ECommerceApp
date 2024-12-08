<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AdminController;



// Public Routes
Route::get('/products', [ProductController::class, 'index']); 
Route::get('/products/{product}', [ProductController::class, 'show']); 

// Auth Routes
Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/admin/login', [AuthController::class, 'adminLogin']); 

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    Route::prefix('cart')->group(function () {
        Route::post('/add', [CartController::class, 'addToCart']); 
        Route::get('/', [CartController::class, 'viewCart']); 
        Route::put('/{id}', [CartController::class, 'updateCart']);
        Route::delete('/{id}', [CartController::class, 'removeFromCart']); 
        Route::delete('/', [CartController::class, 'clearCart']); 
    });

    // Admin Routes
    Route::middleware('role:admin')->group(function () {
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{product}', [ProductController::class, 'update']);
        Route::delete('/products/{product}', [ProductController::class, 'destroy']);
        Route::get('/admin', [AdminController::class, 'index']);
        Route::get('/admin/products', [AdminController::class, 'listProducts']);
        Route::get('/admin/products/{product}', [AdminController::class, 'viewProduct']);
        Route::post('/admin/products', [AdminController::class, 'addProduct']);
        Route::put('/admin/products/{product}', [AdminController::class, 'editProduct']);
        Route::delete('/admin/products/{product}', [AdminController::class, 'deleteProduct']);
    });
});
