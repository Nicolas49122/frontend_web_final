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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 flex flex-col items-center py-10">
            <div className="w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
                <h1 className="text-3xl font-extrabold text-gray-100 mb-6 text-center">Lista de Productos</h1>
                <div className="flex justify-end mb-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded-lg font-semibold shadow"
                        onClick={() => router.push('/productos/new')}
                    >
                        + Agregar Nuevo Producto
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-700">
                                <th className="border border-gray-700 px-4 py-3 text-blue-300 font-semibold">Código</th>
                                <th className="border border-gray-700 px-4 py-3 text-blue-300 font-semibold">Nombre</th>
                                <th className="border border-gray-700 px-4 py-3 text-blue-300 font-semibold">Precio</th>
                                <th className="border border-gray-700 px-4 py-3 text-blue-300 font-semibold">Stock</th>
                                <th className="border border-gray-700 px-4 py-3 text-blue-300 font-semibold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map((producto, idx) => (
                                <tr key={producto.codProducto} className={idx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}>
                                    <td className="border border-gray-700 px-4 py-2 text-center text-gray-100">{producto.codProducto}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-gray-100">{producto.nomPro}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-right text-gray-100">S/ {producto.precioProducto}</td>
                                    <td className="border border-gray-700 px-4 py-2 text-center text-gray-100">{producto.stockProducto}</td>
                                    <td className="border border-gray-700 px-4 py-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                                        <button
                                            className="bg-yellow-500 hover:bg-yellow-600 transition text-gray-900 px-4 py-1 rounded font-semibold shadow"
                                            onClick={() => router.push(`/productos/${producto.codProducto}/edit`)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-1 rounded font-semibold shadow"
                                            onClick={() => eliminarProducto(producto.codProducto)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {productos.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="border border-gray-700 px-4 py-6 text-center text-gray-400 bg-gray-900">
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