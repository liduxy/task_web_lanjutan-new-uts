<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->string('search')->trim()->value();

        $products = Product::query()
            ->when($search, fn ($query) => $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('sku', 'like', "%{$search}%")
                    ->orWhere('category', 'like', "%{$search}%");
            }))
            ->latest()
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('products/index', [
            'products' => $products,
            'filters' => ['search' => $search],
            'summary' => [
                'totalProducts' => Product::count(),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('products/form', [
            'productOptions' => Product::get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $data = $this->validated($request);
        $data = $this->prepareData($data);
        if ($request->hasFile('feature_image')) {
            $data['feature_image'] = $request->file('feature_image')->store('products', 'public');
        }
        Product::create($data);

        return to_route('products.index')->with('success', 'Produk baru berhasil disimpan.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/form', [
            'product' => $product,
            'productOptions' => Product::whereKeyNot($product->id)->get(['id', 'name']),
        ]);
    }

    public function show(Product $product)
    {
        return Inertia::render('products/show', ['product' => $product]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $this->validated($request, $product);
        $data = $this->prepareData($data);
        if ($request->hasFile('feature_image')) {
            if ($product->feature_image) {
                Storage::disk('public')->delete($product->feature_image);
            }
            $data['feature_image'] = $request->file('feature_image')->store('products', 'public');
        } else {
            unset($data['feature_image']);
        }
        $product->update($data);

        return to_route('products.index')->with('success', 'Data produk berhasil diperbarui.');
    }

    public function destroy(Product $product)
    {
        if ($product->feature_image) {
            Storage::disk('public')->delete($product->feature_image);
        }
        $product->delete();

        return to_route('products.index')->with('success', 'Produk berhasil dihapus dari katalog.');
    }

    private function validated(Request $request, ?Product $product = null): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'sku' => ['required', 'string', 'max:30', 'unique:products,sku'.($product ? ','.$product->id : '')],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['required', 'string', 'max:50'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['sometimes', 'nullable', 'integer', 'min:0'],
            'description' => ['nullable', 'string', 'max:500'],
            'feature_image' => ['nullable', 'image', 'max:2048'],
            'featured' => ['boolean'],
            'up_sells' => ['nullable', 'array'],
            'up_sells.*' => ['integer', 'exists:products,id'],
            'cross_sells' => ['nullable', 'array'],
            'cross_sells.*' => ['integer', 'exists:products,id'],
            'weight' => ['required', 'numeric', 'min:0'],
            'height' => ['required', 'numeric', 'min:0'],
            'width' => ['required', 'numeric', 'min:0'],
            'length' => ['required', 'numeric', 'min:0'],
            'tax_status' => ['required', 'in:Taxable,Shipping Only,None'],
            'tax_class' => ['required', 'in:Standard,Reduced Rate,Zero Rate'],
            'brand' => ['nullable', 'string', 'max:50'],
            'color' => ['nullable', 'string', 'max:30'],
            'attributes' => ['nullable', 'array'],
            'attributes.*.name' => ['required', 'string', 'max:50'],
            'attributes.*.value' => ['required', 'string', 'max:100'],
            'variations' => ['nullable', 'array'],
        ]);
    }

    private function prepareData(array $data): array
    {
        $data['category'] = $data['categories'][0];
        $attributes = collect($data['attributes'] ?? []);
        $data['brand'] = data_get($attributes->firstWhere('name', 'Brand'), 'value')
            ?? data_get($attributes->firstWhere('name', 'Merek'), 'value');
        $data['color'] = data_get($attributes->firstWhere('name', 'Color'), 'value')
            ?? data_get($attributes->firstWhere('name', 'Warna'), 'value');

        return $data;
    }
}
