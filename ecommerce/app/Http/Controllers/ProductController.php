<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Retrieve All Products
    public function index()
    {
        return response()->json(Product::all(), 200);
    }

    // Add New Product
    public function store(Request $request)
    {
        $validated = $request->validate([
            'barcode' => 'required|string|unique:products|max:255',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stocks' => 'required|integer|min:0',
            'category' => 'required|string|max:255',
        ]);

        $product = Product::create($validated);

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

    // Show Single Product
    public function show($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        return response()->json($product, 200);
    }

    // Update Product
    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validated = $request->validate([
            'barcode' => 'sometimes|required|string|unique:products,barcode,' . $product->id . '|max:255',
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'stocks' => 'sometimes|required|integer|min:0',
            'category' => 'sometimes|required|string|max:255',
        ]);

        $product->update($validated);

        return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    }

    // Delete Product
    public function destroy($id)
    {
        $product = Product::find($id);

        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    // Search Products by Name, ID, or Category
    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json(['message' => 'Search query is required'], 400);
        }

        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->orWhere('id', 'LIKE', "%{$query}%")
            ->orWhere('category', 'LIKE', "%{$query}%")
            ->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No matching products found'], 404);
        }

        return response()->json($products, 200);
    }

    // Filter Products by Category, Price Range, and Stocks
    public function filter(Request $request)
    {
        // Validate the filter parameters
        $validated = $request->validate([
            'category' => 'nullable|string|max:255',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0|gte:min_price',
            'min_stocks' => 'nullable|integer|min:0',
        ]);

        // Query products based on the filters provided
        $query = Product::query();

        if ($request->has('category')) {
            $query->where('category', 'LIKE', '%' . $validated['category'] . '%');
        }

        if ($request->has('min_price')) {
            $query->where('price', '>=', $validated['min_price']);
        }

        if ($request->has('max_price')) {
            $query->where('price', '<=', $validated['max_price']);
        }

        if ($request->has('min_stocks')) {
            $query->where('stocks', '>=', $validated['min_stocks']);
        }

        $products = $query->get();

        if ($products->isEmpty()) {
            return response()->json(['message' => 'No products found based on the filter criteria'], 404);
        }

        return response()->json($products, 200);
    }
}
