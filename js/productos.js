
// Variable para almacenar los productos
let todosProductos = [];

// Cargar productos desde JSON
async function cargarProductos() {

    try {

        const respuesta = await fetch("data/productos.json");

        todosProductos = await respuesta.json();

        // Mostrar productos destacados
        if (document.getElementById("destacados")) {
            mostrarDestacados();
        }

        // Preparar catálogo
        if (document.getElementById("lista-productos")) {
            prepararCatalogo();
        }

    } catch (error) {

        console.log("Error al cargar productos:", error);

    }
}

// Crear tarjeta de producto
function tarjeta(producto) {

    return `
        <div class="card">

            <img src="${producto.imagen}"
            alt="${producto.nombre}">

            <div class="card-body">

                <span class="etiqueta">
                    ${producto.categoria}
                </span>

                <h3>${producto.nombre}</h3>

                <p>${producto.descripcion}</p>

                <p class="precio">
                    Bs ${producto.precio}
                </p>

                <p>
                    ${producto.stock > 0
                    ? "Disponible: " + producto.stock
                    : "Agotado"}
                </p>

                <button class="btn"
                ${producto.stock === 0 ? "disabled" : ""}
                onclick="agregarAlCarrito(${producto.id})">

                    Agregar al carrito

                </button>

            </div>

        </div>
    `;
}

// Mostrar productos destacados
function mostrarDestacados() {

    let destacados = todosProductos.slice(0, 4);

    document.getElementById("destacados").innerHTML =
        destacados.map(tarjeta).join("");

}

// Preparar los filtros
function prepararCatalogo() {

    let categoria = document.getElementById("categoria");

    let categorias = [...new Set(
        todosProductos.map(p => p.categoria)
    )];

    categorias.forEach(c => {

        categoria.innerHTML += `
            <option value="${c}">${c}</option>
        `;

    });

    document.getElementById("buscar")
    .addEventListener("input", filtrarProductos);

    categoria.addEventListener("change", filtrarProductos);

    document.getElementById("orden")
    .addEventListener("change", filtrarProductos);

    filtrarProductos();
}

// Buscar, filtrar y ordenar
function filtrarProductos() {

    let lista = [...todosProductos];

    let texto = document.getElementById("buscar").value.toLowerCase();

    let categoria = document.getElementById("categoria").value;

    let orden = document.getElementById("orden").value;

    // Buscar por nombre
    lista = lista.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    // Filtrar por categoría
    if (categoria !== "") {

        lista = lista.filter(p =>
            p.categoria === categoria
        );

    }

    // Ordenar por precio
    if (orden === "menor") {

        lista.sort((a, b) => a.precio - b.precio);

    }

    if (orden === "mayor") {

        lista.sort((a, b) => b.precio - a.precio);

    }

    document.getElementById("resultado").textContent =
        lista.length + " productos encontrados";

    document.getElementById("lista-productos").innerHTML =
        lista.map(tarjeta).join("");

}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarProductos);