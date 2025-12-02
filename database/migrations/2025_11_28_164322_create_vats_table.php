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
        Schema::create('vats', function (Blueprint $table) {
            $table->id();
            $table->decimal('vat_amount', 8, 2)->default(0); // VAT percentage
            $table->boolean('item_tax_include')->default(true); // Tax included or not
            $table->unsignedBigInteger('branch_id'); // Foreign key to branches table
            $table->json('use_for')->nullable(); // e.g. ["dine", "pickup"]
            $table->boolean('is_default')->default(false);
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vats');
    }
};
