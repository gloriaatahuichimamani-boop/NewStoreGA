
// Validación del formulario de contacto

document.addEventListener("DOMContentLoaded", function() {

    let formulario = document.getElementById("form-contacto");

    formulario.addEventListener("submit", function(evento) {

        evento.preventDefault();

        let nombre = document.getElementById("nombre").value.trim();

        let correo = document.getElementById("correo").value.trim();

        let celular = document.getElementById("celular").value.trim();

        let asunto = document.getElementById("asunto").value.trim();

        let mensaje = document.getElementById("mensaje").value.trim();

        let respuesta = document.getElementById("respuesta");

        // Comprobar campos vacíos
        if (
            nombre === "" ||
            correo === "" ||
            celular === "" ||
            asunto === "" ||
            mensaje === ""
        ) {

            respuesta.textContent = "Completa todos los campos.";

            return;
        }

        // Comprobar correo
        let expresionCorreo =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!expresionCorreo.test(correo)) {

            respuesta.textContent = "Ingresa un correo válido.";

            return;
        }

        // Comprobar celular
        if (!/^\d{7,15}$/.test(celular)) {

            respuesta.textContent = "Ingresa un celular válido.";

            return;
        }

        // Mostrar confirmación
        respuesta.className = "mensaje";

        respuesta.textContent =
            "¡Gracias " + nombre +
            "! Tu mensaje fue enviado correctamente.";

        formulario.reset();

    });

});