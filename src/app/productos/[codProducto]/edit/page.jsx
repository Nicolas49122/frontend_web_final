'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getProducto, updateProducto } from '@/lib/api';

export default function EditarProducto() {
    const router = useRouter();
    const { codProducto } = useParams();
    const [form, setForm] = useState({ nomPro: '', precioProducto: '', stockProducto: '' });

    useEffect(() => {
        getProducto(codProducto).then(data => {
            setForm({
                nomPro: data.nomPro || '',
                precioProducto: data.precioProducto?.toString() || '',
                stockProducto: data.stockProducto?.toString() || ''
            });
        });
    }, [codProducto]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProducto(codProducto, {
            ...form,
            precioProducto: parseFloat(form.precioProducto),
            stockProducto: parseInt(form.stockProducto)
        });
        router.push('/productos');
    };

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Editar Producto</h1>
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
                    Actualizar Producto
                </button>
            </form>
        </div>
    );
}