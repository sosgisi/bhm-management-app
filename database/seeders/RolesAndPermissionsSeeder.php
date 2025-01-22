<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // permissions for Admin
        Permission::create(['name' => 'add new product']);
        Permission::create(['name' => 'edit product']);
        Permission::create(['name' => 'delete product']);

        // permissions for User
        Permission::create(['name' => 'edit user']);
        Permission::create(['name' => 'delete user']);
        Permission::create(['name' => 'add new item to cart']);

        // update cache to know about the newly created permissions (required if using WithoutModelEvents in seeders)
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create Admin roles and assign premissions
        $adminRole = Role::create(['name' => 'Admin']);
        $adminRole->givePermissionTo(['add new product', 'edit product', 'delete product']);

        // create User roles and assign premissions
        $userRole = Role::create(['name' => 'User']);
        $userRole->givePermissionTo(['edit user', 'delete user', 'add new item to cart']);
    }
}
