<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Check if the customer already exists
        $existingCustomer = User::where('email', 'customer@example.com')->first();

        if (!$existingCustomer) {
            // If no customer exists with this email, create one
            User::create([
                'name' => 'Test Customer',
                'email' => 'customer@example.com',
                'password' => bcrypt('password'), // Always hash the password
                'role' => 'customer', // Assuming you have a role field
            ]);
            echo "Test customer created successfully.\n";
        } else {
            echo "Customer with email 'customer@example.com' already exists.\n";
        }

        // You can also seed other tables or use factories here
        // User::factory(10)->create();
    }
}
