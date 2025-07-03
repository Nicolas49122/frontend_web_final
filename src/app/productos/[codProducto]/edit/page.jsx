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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
                <h1 className="text-3xl font-extrabold text-gray-100 mb-6 text-center">Editar Producto</h1>
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
                        Actualizar Producto
                    </button>
                </form>
            </div>
        </div>
    );
}