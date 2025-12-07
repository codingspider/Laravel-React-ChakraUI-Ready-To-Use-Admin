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
        Schema::create('products', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->unsignedBigInteger('category_id');
            $table->unsignedBigInteger('branch_id');

            $table->string('sequence_index')->nullable();
            $table->string('sku')->nullable();
            $table->string('subtitle')->nullable();

            $table->text('description')->nullable();

            // Main image (string path)
            $table->string('main_image')->nullable();

            // Featured item (0/1)
            $table->boolean('featured_item')->default(0);

            // Arrays saved as JSON
            $table->json('additional_images')->nullable();  // []
            $table->json('variations')->nullable();         // []
            $table->json('addons')->nullable();             // []
            $table->json('item_available_for')->nullable(); // ["dine_in","pickup"]
            $table->json('use_for')->nullable();            // ["online

            $table->boolean('is_active')->default(0);

            $table->unsignedBigInteger('created_by');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('cascade');

            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
