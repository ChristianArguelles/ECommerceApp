<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

// Grouping Product Routes for cleaner structure
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']); // Fetch all products
    Route::post('/', [ProductController::class, 'store']); // Add a new product
    Route::get('/{id}', [ProductController::class, 'show']); // Fetch a single product by ID
    Route::put('/{id}', [ProductController::class, 'update']); // Update a product
    Route::delete('/{id}', [ProductController::class, 'destroy']); // Delete a product
    Route::get('/search', [ProductController::class, 'search']); // Search products
});
