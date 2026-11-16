import React from 'react';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            {/* Head digunakan untuk mengubah judul tab browser */}
            <Head title="Halaman Home" /> 
            
            <div style={{ padding: '20px' }}>
                <h2>Ini adalah Halaman Home (Bebas dari Dashboard)</h2>
                <p>Halaman ini bisa diakses langsung dari URL /homes.</p>
            </div>
        </>
    );
}