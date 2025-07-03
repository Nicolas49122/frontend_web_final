const BASE_URL = 'https://prac4-web-final.onrender.com/api/productos';

export async function getProductos() {
    const response = await fetch(BASE_URL);
    return response.json();
}

export async function getProducto(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    return res.json();
}

export async function createProducto(producto) {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });
    return res.json();
}

export async function updateProducto(id, producto) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    });
    return res.json();
}

export async function deleteProducto(id) {
    await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    });
}