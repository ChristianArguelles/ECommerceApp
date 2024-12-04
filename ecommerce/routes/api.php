<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;

// Public Routes (No authentication required)
Route::get('/products', [ProductController::class, 'index']); // View all products
Route::get('/products/{product}', [ProductController::class, 'show']); // View single product (use model binding)

// Auth Routes
Route::post('/register', [AuthController::class, 'register'])->name('register'); // User registration
Route::post('/login', [AuthController::class, 'login'])->name('login'); // User login

// Protected Routes (Require authentication)
Route::middleware('auth:sanctum')->group(function () {

    // User profile route (current authenticated user)
    Route::get('/user', function (Request $request) {
        return response()->json($request->user());
    });

    // Cart Routes
    Route::prefix('cart')->group(function () {
        Route::post('/add', [CartController::class, 'addToCart']); // Add to cart
        Route::get('/', [CartController::class, 'viewCart']); // View cart
        Route::put('/{id}', [CartController::class, 'updateCart']); // Update cart item
        Route::delete('/{id}', [CartController::class, 'removeFromCart']); // Remove from cart
        Route::delete('/', [CartController::class, 'clearCart']); // Clear cart
    });

    // Admin Routes (Only for Admins)
    Route::group([], function () {

        // Product Management (Admin Only)
        Route::post('/products', function (Request $request) {
            if ($request->user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized: Admin access only'], 403);
            }
            return app(ProductController::class)->store($request);
        });

        Route::put('/products/{product}', function (Request $request, $product) {
            if ($request->user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized: Admin access only'], 403);
            }
            return app(ProductController::class)->update($request, $product);
        });

        Route::delete('/products/{product}', function (Request $request, $product) {
            if ($request->user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized: Admin access only'], 403);
            }
            return app(ProductController::class)->destroy($product);
        });

        // Admin Dashboard (Only accessible by admin)
        Route::get('/admin', function (Request $request) {
            if ($request->user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized: Admin access only'], 403);
            }
            return response()->json(['message' => 'Admin Dashboard']);
        });
    });
});
