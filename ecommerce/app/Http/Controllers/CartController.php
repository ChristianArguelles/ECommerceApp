<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Add to Cart
    public function addToCart(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($validated['product_id']);
        
        if ($product->quantity < $validated['quantity']) {
            return response()->json(['message' => 'Insufficient stock'], 400);
        }

        $totalPrice = $product->price * $validated['quantity'];

        $cartItem = Cart::create([
            'user_id' => auth()->id(),
            'product_id' => $product->id,
            'quantity' => $validated['quantity'],
            'total_price' => $totalPrice,
        ]);

        return response()->json(['message' => 'Product added to cart', 'cart' => $cartItem], 201);
    }

    // View Cart
    public function viewCart()
    {
        $cartItems = Cart::where('user_id', auth()->id())->with('product')->get();

        $grandTotal = $cartItems->sum('total_price');

        return response()->json(['items' => $cartItems, 'grand_total' => $grandTotal]);
    }

    // Update Cart Item
    public function updateCart(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::findOrFail($id);
        $product = $cartItem->product;

        if ($product->quantity < $validated['quantity']) {
            return response()->json(['message' => 'Insufficient stock'], 400);
        }

        $cartItem->update([
            'quantity' => $validated['quantity'],
            'total_price' => $product->price * $validated['quantity'],
        ]);

        return response()->json(['message' => 'Cart updated successfully', 'cart' => $cartItem]);
    }

    // Remove from Cart
    public function removeFromCart($id)
    {
        $cartItem = Cart::findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Cart item removed']);
    }
}
