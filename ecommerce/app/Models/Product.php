<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'barcode',      // Unique identifier for the product
        'name',         // Product name
        'description',  // Detailed description of the product
        'price',        // Product price
        'stocks',       // Available quantity of the product
        'category',     // Category the product belongs to
    ];
}
