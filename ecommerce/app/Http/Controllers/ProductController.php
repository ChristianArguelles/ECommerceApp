<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Retrieve All Products
    public function index() {
        return response()->json(Product::all(), 200);
    }

    // Add New Product
    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stocks' => 'required|integer|min:0',
        ]);

        $product = Product::create($validated);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

    // Show Single Product
    public function show($id) {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product, 200);
    }

    // Update Product
    public function update(Request $request, $id) {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'stocks' => 'sometimes|required|integer|min:0',
        ]);

        $product->update($validated);

        return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    }

    // Delete Product
    public function destroy($id) {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    // Search Products by Name or ID
    public function search(Request $request) {
        $query = $request->input('query');

        // Validate the query
        if (!$query) {
            return response()->json(['message' => 'Search query is required'], 400);
        }

        // Perform the search
        $products = Product::where('name', 'LIKE', "%{$query}%")
                           ->orWhere('id', 'LIKE', "%{$query}%")
                           ->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No matching products found'], 404);
        }

        return response()->json($products, 200);
    }
}
