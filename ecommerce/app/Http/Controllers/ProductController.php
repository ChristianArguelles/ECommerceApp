<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
        return Product::all();
    }

    public function store(Request $request) {
        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'stocks' => $request->stocks,
        ]);
        return response()->json($product);
    }

    public function show($id) {
        return Product::find($id);
    }

    public function update(Request $request, $id) {
        $product = Product::find($id);
        $product->update($request->all());
        return response()->json($product);
    }

    public function destroy($id) {
        Product::destroy($id);
        return response()->json('Product deleted');
    }
}
