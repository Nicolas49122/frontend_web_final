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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
                <h1 className="text-3xl font-extrabold text-gray-100 mb-6 text-center">Crear Nuevo Producto</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block mb-2 text-gray-300">Nombre del Producto</label>
                        <input
                            type="text"
                            value={form.nomPro}
                            onChange={(e) => setForm({ ...form, nomPro: e.target.value })}
                            className="border border-gray-600 bg-gray-900 text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Precio del Producto</label>
                        <input
                            type="number"
                            value={form.precioProducto}
                            onChange={(e) => setForm({ ...form, precioProducto: e.target.value })}
                            className="border border-gray-600 bg-gray-900 text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-gray-300">Stock del Producto</label>
                        <input
                            type="number"
                            value={form.stockProducto}
                            onChange={(e) => setForm({ ...form, stockProducto: e.target.value })}
                            className="border border-gray-600 bg-gray-900 text-gray-100 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg font-semibold shadow"
                    >
                        Crear Producto
                    </button>
                </form>
            </div>
        </div>
    )
}