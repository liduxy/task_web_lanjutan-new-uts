import { Link } from '@inertiajs/react';
// 1. Ganti icon FormDataEvent dengan icon yang valid, misalnya Database atau Table
import { BookOpen, FolderGit2, HouseIcon, LayoutGrid, Package, User2 } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';

// 2. Gabungkan import dari '@/routes' menjadi satu baris
import { dashboard } from '@/routes';

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Beranda',
        href: '/homes',
        icon: HouseIcon,
    },
    {
        title: 'User',
        href: '/users',
        icon: User2,
    },
    {
        title: 'Produk',
        href: '/products',
        icon: Package,
    },
    // {
    //     title: 'Tampilan Data',
    //     href: TampilanData(), 
    //     icon: Database, // 3. Gunakan icon Database (atau icon lucide lain) di sini
    // },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repositori',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Dokumentasi',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
