import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Boxes, Package, Users } from 'lucide-react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6"><Head title="Dashboard" />
        <div><p className="text-sm text-muted-foreground">Ringkasan</p><h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1><p className="mt-1 text-sm text-muted-foreground">Akses cepat untuk mengelola data aplikasi.</p></div>
        <div className="grid gap-4 md:grid-cols-3"><QuickCard title="Produk" text="Atur katalog, harga, stok, dan variasi produk." href="/products" icon={<Package className="size-5" />} action="Kelola produk" /><QuickCard title="Pengguna" text="Tambahkan atau perbarui hak akses pengguna." href="/users" icon={<Users className="size-5" />} action="Kelola user" /><QuickCard title="Inventaris" text="Gunakan halaman produk untuk memantau stok tersedia." href="/products" icon={<Boxes className="size-5" />} action="Lihat inventaris" /></div>
        <section className="rounded-xl border border-sidebar-border/70 bg-card p-6"><h2 className="font-semibold">Mulai bekerja</h2><p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">Pilih menu Produk untuk menambah barang, mengatur variasi, dan melihat stok. Tampilan halaman dirancang konsisten agar navigasi terasa sederhana.</p><Button asChild className="mt-5"><Link href="/products">Buka produk <ArrowRight /></Link></Button></section>
    </div>;
}
function QuickCard({ title, text, href, icon, action }: { title: string; text: string; href: string; icon: ReactNode; action: string }) { return <section className="rounded-xl border border-sidebar-border/70 bg-card p-5"><div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">{icon}</div><h2 className="mt-4 font-semibold">{title}</h2><p className="mt-1 min-h-10 text-sm leading-5 text-muted-foreground">{text}</p><Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">{action}<ArrowRight className="size-4" /></Link></section>; }
Dashboard.layout = { breadcrumbs: [{ title: 'Dashboard', href: dashboard() }] };
