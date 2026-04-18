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
        // Clear cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Get all permissions
        $permissions = Permission::all();

        // Create/update role
        $superAdminRole = Role::updateOrCreate(
            ['name' => 'superadmin'],
            ['business_id' => 1]
        );

        // Assign permissions
        $superAdminRole->syncPermissions($permissions);

        // Create user
        $user = User::updateOrCreate(
            ['email' => 'superadmin@gmail.com'],
            [
                'first_name' => 'Super Admin',
                'username' => 'superadmin',
                'email' => 'superadmin@gmail.com',
                'last_login_at' => now(),
                'password' => Hash::make('123456789'),
                'allow_login' => 1,
                'business_id' => 1
            ]
        );

        // Assign role
        $user->syncRoles(['superadmin']);
    }
}
