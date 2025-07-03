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
                fetchProductos(); // Refrescar la lista de productos
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
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-4'>Lista de Productos</h1>
            <button
                className='bg-blue-500 text-white px-4 py-2 rounded mb-4'
                onClick={() => router.push('/productos/new')}
            >
                Agregar Nuevo Producto
            </button>
            <table className='min-w-full bg-white border border-gray-200'>
                <thead>
                    <tr>
                        <th className='border px-4 py-2'>Código</th>
                        <th className='border px-4 py-2'>Nombre</th>
                        <th className='border px-4 py-2'>Precio</th>
                        <th className='border px-4 py-2'>Stock</th>
                        <th className='border px-4 py-2'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.codProducto}>
                            <td className='border px-4 py-2'>{producto.codProducto}</td>
                            <td className='border px-4 py-2'>{producto.nomPro}</td>
                            <td className='border px-4 py-2'>{producto.precioProducto}</td>
                            <td className='border px-4 py-2'>{producto.stockProducto}</td>
                            <td className='border px-4 py-2'>
                                <button
                                    className='bg-yellow-500 text-white px-3 py-1 rounded mr-2'
                                    onClick={() => router.push(`/productos/${producto.codProducto}/edit`)}
                                >
                                    Editar
                                </button>
                                <button
                                    className='bg-red-500 text-white px-3 py-1 rounded'
                                    onClick={() => eliminarProducto(producto.codProducto)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}

                    {productos.length === 0 && (
                        <tr>
                            <td colSpan="5" className='border px-4 py-2 text-center'>No hay productos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}