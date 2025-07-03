'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProducto } from '@/lib/api';

export default function CrearProducto() {
    const router = useRouter();
    const [form, setForm] = useState({ nomPro: '', precioProducto: '', stockProducto: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createProducto({ ...form, precioProducto: parseFloat(form.precioProducto), stockProducto: parseInt(form.stockProducto) });
        router.push('/productos');
    };
    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Crear Nuevo Producto</h1>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block mb-2'>Nombre del Producto</label>
                    <input
                        type='text'
                        value={form.nomPro}
                        onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
                        className='border p-2 w-full'
                        required
                    />
                </div>
                <div>
                    <label className='block mb-2'>Precio del Producto</label>
                    <input
                        type='number'
                        value={form.precioProducto}
                        onChange={(e) => setForm({ ...form, precioProducto: e.target.value })}
                        className='border p-2 w-full'
                        required
                    />
                </div>
                <div>
                    <label className='block mb-2'>Stock del Producto</label>
                    <input
                        type='number'
                        value={form.stockProducto}
                        onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
                        className='border p-2 w-full'
                        required
                    />
                </div>
                <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
                    Crear Producto
                </button>
            </form>
        </div>
    )
}