
// Mostrar productos del carrito
async function mostrarCarrito() {

    let contenedor = document.getElementById("contenido-carrito");

    try {

        const respuesta = await fetch("data/productos.json");

        const productos = await respuesta.json();

        let carrito = JSON.parse(
            localStorage.getItem("carritoFlor")
        ) || [];

        // Comprobar si está vacío
        if (carrito.length === 0) {

            contenedor.innerHTML = `
                <div class="seccion">
                    <h3>Tu carrito está vacío</h3>
                    <a href="productos.html" class="btn">
                        Ver productos
                    </a>
                </div>
            `;

            return;
        }

        let total = 0;

        let contenido = `

            <table>

                <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                </tr>

        `;

        carrito.forEach(item => {

            let producto = productos.find(
                p => p.id === item.id
            );

            if (!producto) return;

            let subtotal = producto.precio * item.cantidad;

            total += subtotal;

            contenido += `

                <tr>

                    <td>${producto.nombre}</td>

                    <td>Bs ${producto.precio}</td>

                    <td>${item.cantidad}</td>

                    <td>Bs ${subtotal}</td>

                    <td>
                        <button class="btn"
                        onclick="quitarProducto(${producto.id})">
                            Quitar
                        </button>
                    </td>

                </tr>

            `;

        });

        contenido += "</table>";

        contenido += `
            <h2>Total: Bs ${total.toFixed(2)}</h2>

            <button class="btn" onclick="vaciarCarrito()">
                Vaciar carrito
            </button>

            <p>Compra de demostración, sin pagos reales.</p>
        `;

        contenedor.innerHTML = contenido;

    } catch (error) {

        console.log("Error al cargar carrito:", error);

    }

}

// Quitar productos
function quitarProducto(id) {

    let carrito = JSON.parse(
        localStorage.getItem("carritoFlor")
    ) || [];

    carrito = carrito.filter(p => p.id !== id);

    localStorage.setItem(
        "carritoFlor",
        JSON.stringify(carrito)
    );

    mostrarCarrito();

    actualizarContador();

}

// Vaciar carrito
function vaciarCarrito() {

    localStorage.removeItem("carritoFlor");

    mostrarCarrito();

    actualizarContador();

}

// Ejecutar al cargar
document.addEventListener("DOMContentLoaded", mostrarCarrito);