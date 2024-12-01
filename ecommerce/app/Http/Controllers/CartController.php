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

        // Check if enough stock is available
        if ($product->stocks < $validated['quantity']) {
            return response()->json(['message' => 'Insufficient stock'], 400);
        }

        // Check if the product is already in the user's cart
        $existingCartItem = Cart::where('user_id', auth()->id())
            ->where('product_id', $product->id)
            ->first();

        if ($existingCartItem) {
            $newQuantity = $existingCartItem->quantity + $validated['quantity'];
            if ($product->stocks < $newQuantity) {
                return response()->json(['message' => 'Insufficient stock for the updated quantity'], 400);
            }

            $existingCartItem->update([
                'quantity' => $newQuantity,
                'total_price' => $product->price * $newQuantity,
            ]);

            return response()->json(['message' => 'Cart updated with additional quantity', 'cart' => $existingCartItem], 200);
        }

        // Add a new item to the cart
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
    public function viewCart(Request $request)
    {
        // Optional filtering parameters (e.g., filter by product name or category)
        $query = $request->query('query'); // 'query' parameter for filtering products
        
        $cartItems = Cart::where('user_id', auth()->id())
            ->with('product')
            ->when($query, function ($queryBuilder) use ($query) {
                return $queryBuilder->whereHas('product', function ($productQuery) use ($query) {
                    $productQuery->where('name', 'LIKE', "%{$query}%")
                                 ->orWhere('category', 'LIKE', "%{$query}%");
                });
            })
            ->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 404);
        }

        $grandTotal = $cartItems->sum('total_price');

        return response()->json(['items' => $cartItems, 'grand_total' => $grandTotal], 200);
    }

    // Update Cart Item
    public function updateCart(Request $request, $id)
    {
        $validated = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('user_id', auth()->id())->findOrFail($id);
        $product = $cartItem->product;

        // Check stock availability
        if ($product->stocks < $validated['quantity']) {
            return response()->json(['message' => 'Insufficient stock'], 400);
        }

        // Update the cart item with new quantity and total price
        $cartItem->update([
            'quantity' => $validated['quantity'],
            'total_price' => $product->price * $validated['quantity'],
        ]);

        return response()->json(['message' => 'Cart updated successfully', 'cart' => $cartItem], 200);
    }

    // Remove from Cart
    public function removeFromCart($id)
    {
        $cartItem = Cart::where('user_id', auth()->id())->findOrFail($id);
        $cartItem->delete();

        return response()->json(['message' => 'Cart item removed'], 200);
    }

    // Clear Cart
    public function clearCart()
    {
        $cartItems = Cart::where('user_id', auth()->id());

        // If the cart is already empty, return a response
        if ($cartItems->count() === 0) {
            return response()->json(['message' => 'Cart is already empty'], 400);
        }

        // Delete all items in the cart
        $cartItems->delete();

        return response()->json(['message' => 'Cart cleared successfully'], 200);
    }
}
