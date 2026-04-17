<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // 🔹 1. Define permissions
        $permissions = Permission::all();

        // 🔹 3. Create role
        $superAdminRole = Role::firstOrCreate(['name' => 'superadmin', 'business_id' => 1]);

        // 🔹 4. Assign ALL permissions to superadmin
        $superAdminRole->syncPermissions($permissions);

        // 🔹 5. Users data
        $users = [
            [
                'first_name' => 'Super Admin',
                'username' => 'superadmin',
                'role' => 'superadmin',
                'email' => 'superadmin@gmail.com',
                'last_login_at' => now(),
                'password' => Hash::make('123456789'),
                'allow_login' => 1,
                'business_id' => 1
            ],
            [
                'first_name' => 'Admin User',
                'username' => 'admin',
                'role' => 'admin',
                'email' => 'admin@gmail.com',
                'last_login_at' => now(),
                'password' => Hash::make('123456789'),
                'allow_login' => 1,
                'business_id' => 1
            ],
        ];

        // 🔹 6. Create users + assign roles
        foreach ($users as $userData) {

            $user = User::updateOrCreate(
                ['email' => $userData['email']],
                $userData
            );

            // Assign role based on user_type or email
            if ($userData['email'] === 'superadmin@gmail.com') {
                $user->assignRole('superadmin');
            } else {
                $role = Role::firstOrCreate(['name' => 'admin']);
                $role->givePermissionTo(['view dashboard', 'view reports']);
                $user->assignRole('admin');
            }
        }
    }
}
