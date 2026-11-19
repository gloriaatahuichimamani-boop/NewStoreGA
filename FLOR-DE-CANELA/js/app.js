
// Obtener los productos del carrito
function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carritoFlor")) || [];
}

// Actualizar el contador del carrito
function actualizarContador() {

    let carrito = obtenerCarrito();

    let contador = document.getElementById("contador-carrito");

    if (contador) {

        let cantidad = 0;

        carrito.forEach(producto => {
            cantidad += producto.cantidad;
        });

        contador.textContent = cantidad;
    }
}

// Agregar productos al carrito
function agregarAlCarrito(id) {

    let carrito = obtenerCarrito();

    let producto = carrito.find(p => p.id === id);

    if (producto) {

        producto.cantidad++;

    } else {

        carrito.push({
            id: id,
            cantidad: 1
        });
    }

    localStorage.setItem(
        "carritoFlor",
        JSON.stringify(carrito)
    );

    actualizarContador();

    alert("Producto agregado al carrito");
}

// Ejecutar el contador al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    actualizarContador();
});