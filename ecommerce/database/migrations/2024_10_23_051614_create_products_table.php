<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('barcode')->unique(); // Unique barcode for products
            $table->string('name'); // Product name
            $table->text('description')->nullable(); // Optional product description
            $table->decimal('price', 8, 2); // Product price
            $table->integer('stocks'); // Available quantity
            $table->string('category'); // Product category
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
