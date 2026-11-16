<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sku')->unique();
            $table->string('category');
            $table->json('categories')->nullable();
            $table->decimal('price', 12, 2);
            $table->unsignedInteger('stock')->default(0);
            $table->text('description')->nullable();
            $table->string('feature_image')->nullable();
            $table->boolean('featured')->default(false);
            $table->json('up_sells')->nullable();
            $table->json('cross_sells')->nullable();
            $table->decimal('weight', 8, 2)->default(0);
            $table->decimal('height', 8, 2)->default(0);
            $table->decimal('width', 8, 2)->default(0);
            $table->decimal('length', 8, 2)->default(0);
            $table->string('tax_status')->default('Taxable');
            $table->string('tax_class')->default('Standard');
            $table->string('brand')->nullable();
            $table->string('color')->nullable();
            $table->json('attributes')->nullable();
            $table->json('variations')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
