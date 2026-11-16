import { Head, Link, router, usePage } from "@inertiajs/react";
import {
    ChevronLeft,
    ChevronRight,
    Eye,
    Package,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Product = {
    id: number;
    name: string;
    sku: string;
    category: string;
    price: string;
    brand: string | null;
    featured: boolean;
    feature_image: string | null;
};
type Props = {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        total: number;
        prev_page_url: string | null;
        next_page_url: string | null;
    };
    filters: { search: string };
    summary: { totalProducts: number };
};
const money = (value: string) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(Number(value));

export default function ProductIndex({ products, filters, summary }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string } };
    const [search, setSearch] = useState(filters.search);
    const find = (event: FormEvent) => {
        event.preventDefault();
        router.get("/products", search ? { search } : {}, {
            preserveState: true,
            replace: true,
        });
    };
    const remove = (product: Product) => {
        if (confirm(`Hapus produk ${product.name}?`))
            router.delete(`/products/${product.id}`);
    };
    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
            <Head title="Produk" />
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 className="text-2xl font-bold">Daftar Produk</h1>
                    <p className="text-sm text-muted-foreground">
                        Total Produk: {summary.totalProducts}
                    </p>
                </div>
                <Button asChild>
                    <Link href="/products/create">
                        <Plus /> Tambah Produk
                    </Link>
                </Button>
            </div>
            {flash?.success && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                    {flash.success}
                </div>
            )}
            <section className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card">
                <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-semibold">Katalog Produk</h2>
                        <p className="mt-0.5 text-sm text-muted-foreground">
                            Kelola informasi produk 
                        </p>
                    </div>
                    <form onSubmit={find} className="flex gap-2">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                            <Input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Cari nama atau SKU"
                                className="w-full pl-9 sm:w-64"
                            />
                        </div>
                        <Button variant="outline" type="submit">
                            Cari
                        </Button>
                    </form>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[980px] text-sm">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="h-10 w-[70px] px-4 text-left align-middle text-xs font-medium text-muted-foreground">
                                    No
                                </th>
                                <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground">
                                    Produk
                                </th>
                                <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground">
                                    Brand
                                </th>
                                <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground">
                                    Kategori
                                </th>
                                <th className="h-10 px-4 text-left align-middle text-xs font-medium text-muted-foreground">
                                    Harga
                                </th>
                                <th className="h-10 px-20 text-left align-middle text-xs font-medium text-muted-foreground">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product, index) => (
                                <tr
                                    key={product.id}
                                    className="border-b border-border transition-colors hover:bg-muted/50"
                                >
                                    <td className="p-4 align-middle font-medium">
                                        {(products.current_page - 1) * 12 +
                                            index +
                                            1}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                                                {product.feature_image ? (
                                                    <img
                                                        src={`/storage/${product.feature_image}`}
                                                        alt=""
                                                        className="size-full object-cover"
                                                    />
                                                ) : (
                                                    <Package className="size-4 text-muted-foreground" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 font-medium">
                                                    {product.name}
                                                    {product.featured && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="text-[10px]"
                                                        >
                                                            Unggulan
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                                                    SKU: {product.sku}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 align-middle text-muted-foreground">
                                        {product.brand || "-"}
                                    </td>
                                    <td className="p-4 align-middle">
                                        <Badge variant="outline">
                                            {product.category}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle font-medium">
                                        {money(product.price)}
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/products/${product.id}`}
                                                    aria-label={`Detail ${product.name}`}
                                                >
                                                    <Eye className="mr-1 size-3.5" />
                                                    Detail
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`/products/${product.id}/edit`}
                                                    aria-label={`Edit ${product.name}`}
                                                >
                                                    <Pencil className="mr-1 size-3.5" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => remove(product)}
                                            >
                                                <Trash2 className="mr-1 size-3.5" />
                                                Hapus
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {!products.data.length && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-4 py-16 text-center text-muted-foreground"
                                    >
                                        Produk tidak ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between border-t border-border px-4 py-3 text-sm text-muted-foreground">
                    <span>
                        Halaman {products.current_page} dari{" "}
                        {products.last_page || 1}
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={!products.prev_page_url}
                            onClick={() =>
                                products.prev_page_url &&
                                router.visit(products.prev_page_url)
                            }
                        >
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={!products.next_page_url}
                            onClick={() =>
                                products.next_page_url &&
                                router.visit(products.next_page_url)
                            }
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
ProductIndex.layout = { breadcrumbs: [{ title: "Produk", href: "/products" }] };
