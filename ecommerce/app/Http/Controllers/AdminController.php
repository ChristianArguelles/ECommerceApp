<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.dashboard');
    }

    /**
     * List all products.
     *
     * @return \Illuminate\Http\Response
     */
    public function listProducts()
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * View a specific product.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function viewProduct($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    /**
     * Add a new product.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function addProduct(Request $request)
    {
        $product = Product::create($request->all());
        return response()->json($product, 201);
    }

    /**
     * Edit a product.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function editProduct(Request $request, $id)
    {
        $product = Product::findOrFail($id);
        $product->update($request->all());
        return response()->json($product);
    }

    /**
     * Delete a product.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function deleteProduct($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(null, 204);
    }
}
