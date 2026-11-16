<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(['email' => 'test@example.com'], [
            'name' => 'Test User',
            'password' => 'password',
            'role' => 'admin',
        ]);

        $products = [
            ['Urban Runner Sneakers', 'SNEAK-001', 'Shoes', 425000, 18, 'Apex', 'Black', true],
            ['Canvas Everyday Shoes', 'SNEAK-002', 'Shoes', 315000, 24, 'Lotto', 'White', false],
            ['Classic Leather Wallet', 'ACC-001', 'Accessories', 189000, 9, 'Apex', 'Brown', false],
            ['Minimalist Travel Bag', 'BAG-001', 'Fashion', 475000, 7, 'Northline', 'Black', true],
            ['Wireless Audio Mini', 'AUD-001', 'Electronics', 259000, 32, 'Sonic', 'White', false],
            ['Portable Speaker Go', 'AUD-002', 'Electronics', 349000, 5, 'Sonic', 'Blue', false],
            ['Stainless Bottle 600ml', 'HOME-001', 'Home', 99000, 41, 'Mori', 'Green', false],
            ['Desk Lamp Halo', 'HOME-002', 'Home', 225000, 11, 'Lumina', 'White', true],
            ['Daily Face Cleanser', 'BEA-001', 'Beauty', 79000, 28, 'Natura', 'Clear', false],
            ['Cotton Overshirt', 'FASH-001', 'Fashion', 279000, 16, 'Noma', 'Olive', false],
            ['Essential Cap', 'ACC-002', 'Accessories', 115000, 3, 'Apex', 'Navy', false],
            ['Smart Watch Active', 'ELEC-001', 'Electronics', 799000, 14, 'Pulse', 'Black', true],
            ['Yoga Mat Comfort', 'HOME-003', 'Home', 165000, 20, 'Mori', 'Purple', false],
            ['Crossbody Utility Bag', 'BAG-002', 'Fashion', 329000, 8, 'Northline', 'Grey', false],
            ['Tinted Lip Balm', 'BEA-002', 'Beauty', 65000, 36, 'Natura', 'Rose', false],
        ];

        foreach ($products as [$name, $sku, $category, $price, $stock, $brand, $color, $featured]) {
            Product::firstOrCreate(['sku' => $sku], [
                'name' => $name,
                'category' => $category,
                'categories' => [$category],
                'price' => $price,
                'stock' => $stock,
                'description' => "Produk {$name} untuk kebutuhan sehari-hari.",
                'featured' => $featured,
                'weight' => 0.5,
                'height' => 10,
                'width' => 15,
                'length' => 25,
                'tax_status' => 'Taxable',
                'tax_class' => 'Standard',
                'brand' => $brand,
                'color' => $color,
                'attributes' => [['name' => 'Brand', 'value' => $brand], ['name' => 'Color', 'value' => $color]],
                'variations' => [],
            ]);
        }

        // Contoh katalog berbahasa Indonesia untuk tampilan aplikasi.
        $produkIndonesia = [
            ['Kemeja Linen Santai', 'IDN-FAS-001', 'Fashion', 245000, 22, 'Nusantara', 'Krem', false],
            ['Tas Selempang Harian', 'IDN-FAS-002', 'Fashion', 185000, 14, 'RuangRupa', 'Cokelat', false],
            ['Sepatu Lari Ringan', 'IDN-SPT-001', 'Sepatu', 389000, 12, 'Langkah', 'Hitam', true],
            ['Dompet Kulit Saku', 'IDN-AKS-001', 'Aksesori', 159000, 19, 'KulitKita', 'Cokelat', false],
            ['Botol Minum Serbaguna', 'IDN-RMH-001', 'Rumah', 89000, 35, 'BumiBaik', 'Hijau', false],
            ['Lampu Meja Belajar', 'IDN-RMH-002', 'Rumah', 199000, 8, 'Terang', 'Putih', false],
            ['Headset Nirkabel Jernih', 'IDN-ELK-001', 'Elektronik', 299000, 17, 'SuaraKita', 'Biru', true],
            ['Pengisi Daya Cepat', 'IDN-ELK-002', 'Elektronik', 129000, 26, 'DayaPlus', 'Putih', false],
            ['Pembersih Wajah Lembut', 'IDN-KCN-001', 'Kecantikan', 72000, 31, 'Alami', 'Bening', false],
            ['Balsem Bibir Berwarna', 'IDN-KCN-002', 'Kecantikan', 58000, 27, 'Alami', 'Mawar', false],
        ];

        foreach ($produkIndonesia as [$name, $sku, $category, $price, $stock, $brand, $color, $featured]) {
            Product::firstOrCreate(['sku' => $sku], [
                'name' => $name,
                'category' => $category,
                'categories' => [$category],
                'price' => $price,
                'stock' => $stock,
                'description' => "{$name} berkualitas untuk kebutuhan sehari-hari.",
                'featured' => $featured,
                'weight' => 0.5,
                'height' => 10,
                'width' => 15,
                'length' => 25,
                'tax_status' => 'Taxable',
                'tax_class' => 'Standard',
                'brand' => $brand,
                'color' => $color,
                'attributes' => [['name' => 'Merek', 'value' => $brand], ['name' => 'Warna', 'value' => $color]],
                'variations' => [],
            ]);
        }

        // Produk bermerek nyata yang umum ditemukan di pasaran.
        $produkPasar = [
            ['Apple iPhone 15 128GB', 'REAL-APL-015', 'Elektronik', 11999000, 6, 'Apple', 'Hitam', true],
            ['Samsung Galaxy S24 256GB', 'REAL-SAM-S24', 'Elektronik', 12999000, 8, 'Samsung', 'Abu-abu', true],
            ['Xiaomi Redmi Buds 5', 'REAL-XIA-B05', 'Elektronik', 699000, 15, 'Xiaomi', 'Putih', false],
            ['Nike Air Force 1 07', 'REAL-NIK-AF1', 'Sepatu', 1549000, 10, 'Nike', 'Putih', true],
            ['Adidas Stan Smith', 'REAL-ADI-STM', 'Sepatu', 1400000, 7, 'Adidas', 'Putih', false],
            ['Uniqlo AIRism T-Shirt', 'REAL-UNQ-AIR', 'Fashion', 199000, 25, 'Uniqlo', 'Hitam', false],
            ['IKEA KALLAX Rak Susun', 'REAL-IKE-KLX', 'Rumah', 1299000, 4, 'IKEA', 'Putih', false],
            ['Philips LED Bulb 9W', 'REAL-PHI-LED9', 'Rumah', 49000, 30, 'Philips', 'Putih', false],
            ['The Ordinary Niacinamide 10%', 'REAL-ORD-NIA', 'Kecantikan', 145000, 18, 'The Ordinary', 'Bening', false],
            ['Nivea Sun Protect SPF 50', 'REAL-NIV-SPF50', 'Kecantikan', 119000, 21, 'Nivea', 'Putih', false],
        ];

        foreach ($produkPasar as [$name, $sku, $category, $price, $stock, $brand, $color, $featured]) {
            Product::firstOrCreate(['sku' => $sku], [
                'name' => $name,
                'category' => $category,
                'categories' => [$category],
                'price' => $price,
                'stock' => $stock,
                'description' => "{$name} resmi dari {$brand} untuk kebutuhan sehari-hari.",
                'featured' => $featured,
                'weight' => 0.75,
                'height' => 12,
                'width' => 20,
                'length' => 30,
                'tax_status' => 'Taxable',
                'tax_class' => 'Standard',
                'brand' => $brand,
                'color' => $color,
                'attributes' => [['name' => 'Merek', 'value' => $brand], ['name' => 'Warna', 'value' => $color]],
                'variations' => [],
            ]);
        }
    }
}
