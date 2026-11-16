<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sku',
        'category',
        'categories',
        'price',
        'stock',
        'description',
        'feature_image',
        'featured',
        'up_sells',
        'cross_sells',
        'weight',
        'height',
        'width',
        'length',
        'tax_status',
        'tax_class',
        'brand',
        'color',
        'attributes',
        'variations',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'stock' => 'integer',
            'categories' => 'array',
            'featured' => 'boolean',
            'up_sells' => 'array',
            'cross_sells' => 'array',
            'attributes' => 'array',
            'variations' => 'array',
            'weight' => 'decimal:2',
            'height' => 'decimal:2',
            'width' => 'decimal:2',
            'length' => 'decimal:2',
        ];
    }
}
