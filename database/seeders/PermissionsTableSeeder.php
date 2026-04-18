<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            // User
            ['name' => 'view_user'],
            ['name' => 'create_user'],
            ['name' => 'update_user'],
            ['name' => 'delete_user'],

            // Supplier
            ['name' => 'view_supplier'],
            ['name' => 'create_supplier'],
            ['name' => 'update_supplier'],
            ['name' => 'delete_supplier'],

            // Customer
            ['name' => 'view_customer'],
            ['name' => 'create_customer'],
            ['name' => 'update_customer'],
            ['name' => 'delete_customer'],

            // Product
            ['name' => 'view_product'],
            ['name' => 'create_product'],
            ['name' => 'update_product'],
            ['name' => 'delete_product'],

            // Purchase
            ['name' => 'view_purchase'],
            ['name' => 'create_purchase'],
            ['name' => 'update_purchase'],
            ['name' => 'delete_purchase'],

            // Sell
            ['name' => 'view_sale'],
            ['name' => 'create_sale'],
            ['name' => 'update_sale'],
            ['name' => 'delete_sale'],

            // Reports
            ['name' => 'view_purchase_sale_report'],
            ['name' => 'view_contacts_report'],
            ['name' => 'view_stock_report'],
            ['name' => 'view_tax_report'],
            ['name' => 'view_trending_product_report'],
            ['name' => 'view_register_report'],
            ['name' => 'view_sales_representative'],
            ['name' => 'view_expense_report'],

            // Settings
            ['name' => 'access_business_settings'],
            ['name' => 'access_barcode_settings'],
            ['name' => 'access_invoice_settings'],

            // Brand
            ['name' => 'view_brand'],
            ['name' => 'create_brand'],
            ['name' => 'update_brand'],
            ['name' => 'delete_brand'],

            // Tax Rate
            ['name' => 'view_tax_rate'],
            ['name' => 'create_tax_rate'],
            ['name' => 'update_tax_rate'],
            ['name' => 'delete_tax_rate'],

            // Unit
            ['name' => 'view_unit'],
            ['name' => 'create_unit'],
            ['name' => 'update_unit'],
            ['name' => 'delete_unit'],

            // Category
            ['name' => 'view_category'],
            ['name' => 'create_category'],
            ['name' => 'update_category'],
            ['name' => 'delete_category'],

            // Expense
            ['name' => 'access_expense'],

            // Misc
            ['name' => 'access_all_locations'],
            ['name' => 'view_dashboard_data'],
        ];

        $insert_data = [];
        $time_stamp = \Carbon\Carbon::now()->toDateTimeString();
        foreach ($data as $d) {
            $d['guard_name'] = 'web';
            $d['created_at'] = $time_stamp;
            $insert_data[] = $d;
        }
        Permission::insert($insert_data);
    }
}
