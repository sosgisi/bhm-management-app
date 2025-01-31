<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'user',
            'email' => 'user@example.com',
        ]);

        // Create admin user
        User::factory()->create([
            'name' => 'shougi',
            'email' => 'shougi@admin.com',
            'password' => Hash::make('4dminp4ssword'),
            'role' => 'Admin',
        ]);
    }
}
