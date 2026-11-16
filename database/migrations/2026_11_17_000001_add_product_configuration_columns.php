<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (! Schema::hasColumn('products', 'feature_image')) {
                $table->string('feature_image')->nullable()->after('description');
            }
            if (! Schema::hasColumn('products', 'categories')) {
                $table->json('categories')->nullable()->after('category');
            }
            if (! Schema::hasColumn('products', 'featured')) {
                $table->boolean('featured')->default(false)->after('feature_image');
            }
            if (! Schema::hasColumn('products', 'up_sells')) {
                $table->json('up_sells')->nullable()->after('featured');
            }
            if (! Schema::hasColumn('products', 'cross_sells')) {
                $table->json('cross_sells')->nullable()->after('up_sells');
            }
            foreach (['weight', 'height', 'width', 'length'] as $column) {
                if (! Schema::hasColumn('products', $column)) {
                    $table->decimal($column, 8, 2)->default(0);
                }
            }
            if (! Schema::hasColumn('products', 'tax_status')) {
                $table->string('tax_status')->default('Taxable');
            }
            if (! Schema::hasColumn('products', 'tax_class')) {
                $table->string('tax_class')->default('Standard');
            }
            if (! Schema::hasColumn('products', 'brand')) {
                $table->string('brand')->nullable();
            }
            if (! Schema::hasColumn('products', 'color')) {
                $table->string('color')->nullable();
            }
            if (! Schema::hasColumn('products', 'attributes')) {
                $table->json('attributes')->nullable()->after('color');
            }
            if (! Schema::hasColumn('products', 'variations')) {
                $table->json('variations')->nullable()->after('attributes');
            }
        });
    }
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            foreach (['variations', 'attributes', 'color', 'brand', 'tax_class', 'tax_status', 'length', 'width', 'height', 'weight', 'cross_sells', 'up_sells', 'featured', 'categories', 'feature_image'] as $column) {
                if (Schema::hasColumn('products', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
