<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Super Admin',
                'username' => 'superadmin',
                'user_type' => 'superadmin',
                'role' => 'superadmin',
                'email' => 'superadmin@gmail.com',
                'email_verified_at' => now(),
                'last_login_at' => now(),
                'password' => Hash::make('123456789'),
                'allow_login' => 1
                
            ],
            [
                'name' => 'Admin User',
                'username' => 'admin',
                'user_type' => 'admin',
                'email' => 'admin@gmail.com',
                'email_verified_at' => now(),
                'last_login_at' => now(),
                'password' => Hash::make('123456789'),
                'role' => 'admin',
                'allow_login' => 1
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}
