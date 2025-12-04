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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            // For multi-branch restaurant
            $table->unsignedBigInteger('branch_id')->nullable();
            $table->unsignedBigInteger('business_id')->nullable(); 

            $table->string('type'); 
            $table->string('sub_type')->nullable(); 
            $table->integer('is_kitchen_order')->nullable(); 

            // Reference IDs
            $table->unsignedBigInteger('contact_id')->nullable();
            $table->unsignedBigInteger('plan_id')->nullable();             // for subscription
            $table->unsignedBigInteger('table_id')->nullable();
            $table->unsignedBigInteger('waiter_id')->nullable();
            $table->string('order_status')->nullable();

            // Money fields
            $table->decimal('subtotal', 15, 2)->default(0);

             $table->string('discount_type')->nullable(); 
            $table->decimal('discount_amount', 15, 2)->default(0);

            $table->decimal('tax_amount', 15, 2)->default(0);
            $table->decimal('final_total', 15, 2)->default(0);

            // Extra fields
            $table->string('invoice_no')->nullable();
            $table->string('status')->nullable(); 
            $table->string('sub_status')->nullable(); 
            $table->string('payment_status')->nullable(); 
            $table->string('ref_no')->nullable(); 
            $table->string('source')->nullable(); 
            $table->string('transaction_date')->nullable(); 
            $table->string('coupon_code')->nullable(); 
            $table->string('adjustment_type')->nullable(); 

            $table->unsignedBigInteger('created_by')->nullable();
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');
            
            $table->foreign('business_id')->references('id')->on('businesses')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
