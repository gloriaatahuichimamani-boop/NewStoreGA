
// Cargar información del JSON
async function cargarDashboard() {

    try {

        const respuesta = await fetch("data/productos.json");

        const productos = await respuesta.json();

        // Calcular estadísticas
        let total = productos.length;

        let categorias = [...new Set(
            productos.map(p => p.categoria)
        )];

        let valor = productos.reduce(
            (suma, p) => suma + p.precio * p.stock, 0
        );

        let disponibles = productos.filter(
            p => p.stock > 0
        );

        let agotados = productos.filter(
            p => p.stock === 0
        );

        let bajoStock = productos.filter(
            p => p.stock > 0 && p.stock <= 5
        );

        // Mostrar fecha y hora
        document.getElementById("actualizado").textContent =
            "Última actualización: " +
            new Date().toLocaleString("es-BO");

        // Mostrar indicadores
        document.getElementById("kpis").innerHTML = `

            <div class="kpi">
                Total de productos
                <strong>${total}</strong>
            </div>

            <div class="kpi">
                Categorías
                <strong>${categorias.length}</strong>
            </div>

            <div class="kpi">
                Valor del inventario
                <strong>Bs ${valor.toFixed(2)}</strong>
            </div>

            <div class="kpi">
                Productos disponibles
                <strong>${disponibles.length}</strong>
            </div>

            <div class="kpi">
                Productos agotados
                <strong>${agotados.length}</strong>
            </div>

            <div class="kpi">
                Stock bajo
                <strong>${bajoStock.length}</strong>
            </div>

        `;

        // Gráfico de productos por categoría
        let grafico = "";

        categorias.forEach(categoria => {

            let cantidad = productos.filter(
                p => p.categoria === categoria
            ).length;

            let porcentaje = cantidad / total * 100;

            grafico += `

                <p>${categoria}: ${cantidad}</p>

                <div class="barra-fondo">

                    <div class="barra"
                    style="width:${porcentaje}%">
                    </div>

                </div>

            `;

        });

        document.getElementById("grafico-categorias").innerHTML =
            grafico;

        // Gráfico de distribución del stock
        let porcentajeDisponible =
            disponibles.length / total * 100;

        let porcentajeAgotado =
            agotados.length / total * 100;

        document.getElementById("grafico-stock").innerHTML = `

            <p>Disponibles: ${disponibles.length}</p>

            <div class="barra-fondo">
                <div class="barra"
                style="width:${porcentajeDisponible}%">
                </div>
            </div>

            <p>Agotados: ${agotados.length}</p>

            <div class="barra-fondo">
                <div class="barra"
                style="width:${porcentajeAgotado}%">
                </div>
            </div>

        `;

        // Tabla de productos con bajo stock
        let tabla = `

            <table>

                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Stock</th>
                </tr>

        `;

        bajoStock.forEach(p => {

            tabla += `

                <tr>
                    <td>${p.nombre}</td>
                    <td>${p.categoria}</td>
                    <td>${p.stock}</td>
                </tr>

            `;

        });

        tabla += "</table>";

        document.getElementById("tabla-bajo-stock").innerHTML =
            tabla;

    } catch (error) {

        console.log("Error en el dashboard:", error);

    }

}

// Ejecutar dashboard
document.addEventListener("DOMContentLoaded", cargarDashboard);