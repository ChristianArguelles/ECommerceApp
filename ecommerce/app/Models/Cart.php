<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',      // ID of the user who owns the cart
        'product_id',   // ID of the product added to the cart
        'quantity',     // Quantity of the product in the cart
        'total_price',  // Total price for this cart item
        'status',       // Status of the cart item (e.g., 'pending', 'checked out')
    ];

    /**
     * Relationship with the Product model.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Relationship with the User model.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
