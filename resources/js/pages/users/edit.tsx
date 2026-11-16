import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
};

interface Props {
    user: User;
}

export default function EditUser({ user }: Props) {
    // Mengisi data awal form dengan data user yang diterima dari controller (Modul 7.6)
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Mengirim request PUT ke route update /users/{id} (Modul 7.10)
        put(`/users/${user.id}`);
    };

    return (
        <>
            <Head title="Ubah Pengguna" />

            <div className="w-full px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">

                    {/* Header Halaman */}
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Ubah Pengguna
                            </h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Ubah dan perbarui informasi pengguna yang terdaftar.
                            </p>
                        </div>

                        <Button variant="outline" asChild>
                            <Link href="/users">
                                Kembali
                            </Link>
                        </Button>
                    </div>

                    {/* Form Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Informasi User</CardTitle>
                            <CardDescription>
                                Perbarui informasi pengguna di bawah ini.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form
                                onSubmit={submit}
                                className="space-y-5"
                            >

                                {/* Nama */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">
                                        Nama Lengkap
                                    </Label>

                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        placeholder="Masukkan nama lengkap"
                                        autoComplete="name"
                                        aria-invalid={!!errors.name}
                                    />

                                    {errors.name && (
                                        <p className="text-sm text-destructive">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData('email', e.target.value)
                                        }
                                        placeholder="contoh@email.com"
                                        autoComplete="email"
                                        aria-invalid={!!errors.email}
                                    />

                                    {errors.email && (
                                        <p className="text-sm text-destructive">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password (Opsional saat update) */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">
                                        Password Baru (Opsional)
                                    </Label>

                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData('password', e.target.value)
                                        }
                                        placeholder="Biarkan kosong jika tidak diubah"
                                        autoComplete="new-password"
                                        aria-invalid={!!errors.password}
                                    />

                                    <p className="text-xs text-muted-foreground">
                                        Kosongkan jika Anda tidak ingin mengganti password user.
                                    </p>

                                    {errors.password && (
                                        <p className="text-sm text-destructive">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Role */}
                                <div className="space-y-2">
                                    <Label htmlFor="role">
                                        Role Pengguna
                                    </Label>

                                    <Select
                                        value={data.role}
                                        onValueChange={(value) =>
                                            setData('role', value)
                                        }
                                    >
                                        <SelectTrigger id="role">
                                            <SelectValue placeholder="Pilih role" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectItem value="admin">
                                                Admin
                                            </SelectItem>

                                            <SelectItem value="manager">
                                                Manager
                                            </SelectItem>

                                            <SelectItem value="user">
                                                User
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>

                                    {errors.role && (
                                        <p className="text-sm text-destructive">
                                            {errors.role}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol */}
                                <div className="flex justify-end gap-3 border-t pt-5">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href="/users">
                                            Batal
                                        </Link>
                                    </Button>

                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing
                                            ? 'Menyimpan...'
                                            : 'Perbarui User'}
                                    </Button>
                                </div>

                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </>
    );
}
