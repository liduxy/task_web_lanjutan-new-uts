import React, { useState } from 'react';
import { Head, Link, router, usePage, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from "@/components/ui/label";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    'e-url': string;
    'd-url': string;
};

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
        total: number;
    };
    filters: {
        search: string;
    };
    c_url: string;
}

export default function UsersIndex({ users, filters, c_url }: Props) {
    const { flash } = usePage().props as any;
    const [search, setSearch] = useState(filters?.search || '');

    // Fungsi Pencarian (Modul 5.12)
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        router.get(
            '/users',
            { search: value },
            { preserveState: true, replace: true }
        );
    };

    // Fungsi Hapus User (Modul 8.6)
    const handleDelete = (deleteUrl: string, userName: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus user ${userName}?`)) {
            router.delete(deleteUrl);
        }
    };

    // Helper Badge Warna Role
    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'admin':
                return <Badge variant="destructive">Admin</Badge>;
            case 'manager':
                return <Badge className="bg-blue-600 hover:bg-blue-700">Manager</Badge>;
            default:
                return <Badge variant="secondary">User</Badge>;
        }
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
            <Head title="Pengguna" />

            {/* Flash Message Sukses */}
            {flash?.success && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
                    {flash.success}
                </div>
            )}

            {/* Flash Message Error */}
            {flash?.error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                    {flash.error}
                </div>
            )}

            {/* Header, Search Input, dan Tombol Tambah */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm text-muted-foreground">Manajemen akses</p>
                    <h1 className="text-2xl font-semibold tracking-tight">Daftar User</h1>
                    <p className="text-sm text-muted-foreground">
                        Total User: {users.total}
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Input Search (Modul 5.11) */}
                    <Input
                        type="text"
                        placeholder="Cari nama atau email..."
                        value={search}
                        onChange={handleSearch}
                        className="w-full sm:w-64"
                    />

                    {/* Tombol Tambah User (Modul 6.2) */}
                    <Link href={c_url}>
                        <Button>Tambah User</Button>
                    </Link>
                </div>
            </div>

            {/* Tabel User (Modul 5.9) */}
            <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">ID</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.data.length > 0 ? (
                            users.data.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        {/* Tombol Edit */}
                                        <Link href={user['e-url']}>
                                            <Button variant="outline" size="sm">
                                                Ubah
                                            </Button>
                                        </Link>

                                        {/* Tombol Hapus (Disembunyikan jika role admin) */}
                                        {user.role !== 'admin' && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(user['d-url'], user.name)}
                                            >
                                                Hapus
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                                    Data user tidak ditemukan.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination Controls (Modul 5.15 - 5.16) */}
            <div className="flex justify-between items-center pt-2">
                <p className="text-sm text-muted-foreground">
                    Halaman {users.current_page} dari {users.last_page}
                </p>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!users.prev_page_url}
                        onClick={() => users.prev_page_url && router.visit(users.prev_page_url)}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={!users.next_page_url}
                        onClick={() => users.next_page_url && router.visit(users.next_page_url)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}

UsersIndex.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/users',
        },
    ],
};
