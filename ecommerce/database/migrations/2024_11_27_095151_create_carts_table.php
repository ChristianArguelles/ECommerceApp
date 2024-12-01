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
        Schema::create('carts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Link to users table
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade'); // Link to products table
            $table->integer('quantity')->default(1); // Default quantity set to 1
            $table->decimal('total_price', 10, 2); // Total price for the quantity
            $table->string('status')->default('pending'); // Optional: status to track cart processing ('pending', 'checked out')
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carts');
    }
};
