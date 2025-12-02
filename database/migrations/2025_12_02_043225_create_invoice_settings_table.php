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
        Schema::create('invoice_settings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('business_id');
            $table->string('invoice_prefix')->default('INV-');
            $table->integer('invoice_start_number')->default(1);
            $table->boolean('show_logo')->default(true);
            $table->string('logo')->nullable();
            $table->boolean('show_address')->default(true);
            $table->boolean('show_city')->default(true);
            $table->boolean('show_zip')->default(true);
            $table->boolean('show_state')->default(true);
            $table->string('tax_number')->nullable();
            $table->boolean('show_tax_number')->default(true);
            $table->string('header_text')->nullable();
            $table->string('footer_text')->nullable();
            $table->boolean('show_table_number')->default(true);
            $table->boolean('show_waiter_name')->default(true);
            $table->boolean('show_kitchen_notes')->default(true);
            $table->boolean('show_tax_info')->default(true);
            $table->boolean('show_discount_info')->default(true);
            $table->boolean('show_payment_info')->default(true);
            $table->boolean('invoice_direct_print')->default(true);
            $table->json('additional_fields')->nullable();
            $table->timestamps();

            $table->foreign('business_id')->references('id')->on('businesses')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_settings');
    }
};
