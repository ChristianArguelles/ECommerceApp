<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Product::create([
            'barcode' => '1234567890123',
            'name' => 'Sample Product 1',
            'description' => 'This is a sample product description for Product 1.',
            'price' => 99.99,
            'stocks' => 100,
            'category' => 'Electronics',
        ]);

        Product::create([
            'barcode' => '9876543210987',
            'name' => 'Sample Product 2',
            'description' => 'This is a sample product description for Product 2.',
            'price' => 49.99,
            'stocks' => 50,
            'category' => 'Books',
        ]);

        Product::create([
            'barcode' => '4567891234567',
            'name' => 'Sample Product 3',
            'description' => 'This is a sample product description for Product 3.',
            'price' => 29.99,
            'stocks' => 30,
            'category' => 'Clothing',
        ]);
    }
}
