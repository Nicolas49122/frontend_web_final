'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductosPage() {
    const [productos, setProductos] = useState([]);
    const router = useRouter();

    const fetchProductos = async () => {
        try {
            const res = await fetch('https://prac4-web-final.onrender.com/api/productos');
            const data = await res.json();
            setProductos(data);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const eliminarProducto = async (codProducto) => {
        const confirmar = confirm('¿Estás seguro de que quieres eliminar este producto?');
        if (!confirmar) return;

        try {
            const res = await fetch(`https://prac4-web-final.onrender.com/api/productos/${codProducto}`, {
                method: 'DELETE'
            });

            if (res.status === 204) {
                alert('Producto eliminado correctamente');
                fetchProductos();
            } else {
                const data = await res.json();
                alert(`Error al eliminar el producto: ${data.error}`);
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col items-center py-10">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">Lista de Productos</h1>
                <div className="flex justify-end mb-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg font-semibold shadow"
                        onClick={() => router.push('/productos/new')}
                    >
                        + Agregar Nuevo Producto
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-blue-100">
                                <th className="border px-4 py-3 text-blue-800 font-semibold">Código</th>
                                <th className="border px-4 py-3 text-blue-800 font-semibold">Nombre</th>
                                <th className="border px-4 py-3 text-blue-800 font-semibold">Precio</th>
                                <th className="border px-4 py-3 text-blue-800 font-semibold">Stock</th>
                                <th className="border px-4 py-3 text-blue-800 font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto, idx) => (
                                <tr key={producto.codProducto} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                                    <td className="border px-4 py-2 text-center">{producto.codProducto}</td>
                                    <td className="border px-4 py-2">{producto.nomPro}</td>
                                    <td className="border px-4 py-2 text-right">S/ {producto.precioProducto}</td>
                                    <td className="border px-4 py-2 text-center">{producto.stockProducto}</td>
                                    <td className="border px-4 py-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                                        <button
                                            className="bg-yellow-400 hover:bg-yellow-500 transition text-white px-4 py-1 rounded font-semibold shadow"
                                            onClick={() => router.push(`/productos/${producto.codProducto}/edit`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-1 rounded font-semibold shadow"
                                            onClick={() => eliminarProducto(producto.codProducto)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {productos.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="border px-4 py-6 text-center text-gray-500">
                                        No hay productos disponibles
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}