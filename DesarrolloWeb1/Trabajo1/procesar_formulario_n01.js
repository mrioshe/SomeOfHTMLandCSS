const formulario_1 = document.getElementById("formulario_n01");
const inputs = document.querySelectorAll('#formulario_n01 input');
const selects = document.querySelectorAll('#formulario_n01 select');
const textAreas = document.querySelectorAll('#formulario_n01 textarea');

const regexExpressions = {
    nombre: /^[A-ZÁÉÍÓÚÑ ]{3,}$/,
    identificacion: /^\d{10}$/,
    telefono: /^[0-9]{10}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contrasenha: /^.{8,12}$/,
    direccion: /^.{1,100}$/,
    tamanho: /^\d{1,3}cm[xX]\d{1,3}cm$/,
    peso: /^\d+(\.\d{1,2})?$/,
    observacion: /^[\s\S]{0,400}$/,
    fechaEntrega: /^\d{4}-\d{2}-\d{2}$/,
    procesado: /^(Sublimado|Estampado|Impresión 3D|Grabado\/Corte láser)$/
};

// Función genérica para marcar el estado visual del campo
const marcarEstado = (campo, esValido, mensajeError, mensajeOk = "✓") => {
    const span = document.getElementById('msg-' + campo.name);

    campo.classList.remove('campo-valido', 'campo-invalido');
    if (span) span.classList.remove('valido', 'invalido');

    if (esValido) {
        campo.classList.add('campo-valido');
        if (span) {
            span.textContent = mensajeOk;
            span.classList.add('valido');
        }
    } else {
        campo.classList.add('campo-invalido');
        if (span) {
            span.textContent = mensajeError;
            span.classList.add('invalido');
        }
    }
    return esValido;
};

// Valida un campo individual y devuelve true/false
const validarCampo = (campo) => {
    switch (campo.name) {

        case "nombreCliente":
            return marcarEstado(campo, regexExpressions.nombre.test(campo.value),
                "Solo mayúsculas y espacios, mínimo 3 letras");

        case "identificacion":
            return marcarEstado(campo, regexExpressions.identificacion.test(campo.value),
                "Debe tener 10 dígitos");

        case "telefono":
            return marcarEstado(campo, regexExpressions.telefono.test(campo.value),
                "Debe tener 10 dígitos");

        case "email":
            return marcarEstado(campo, regexExpressions.email.test(campo.value),
                "Correo no válido, ej: nombre@dominio.com");

        case "contrasenha":
            return marcarEstado(campo, regexExpressions.contrasenha.test(campo.value),
                "Debe tener entre 8 y 12 caracteres");

        case "direccion":
            return marcarEstado(campo, regexExpressions.direccion.test(campo.value) && campo.value.trim() !== "",
                "Máximo 100 caracteres y no puede estar vacío");

        case "tipoProducto":
            return marcarEstado(campo, campo.value !== "",
                "Seleccione un producto");

        case "color":
            // Siempre tiene un valor por defecto, así que solo validamos que exista
            return marcarEstado(campo, !!campo.value, "Seleccione un color");

        case "tamanho":
            return marcarEstado(campo, regexExpressions.tamanho.test(campo.value),
                "Formato requerido: 10cmX8cm");

        case "peso":
            return marcarEstado(campo, campo.value !== "" && parseFloat(campo.value) > 0,
                "Ingrese un peso válido mayor a 0");

        case "observacion":
            return marcarEstado(campo, regexExpressions.observacion.test(campo.value),
                "Máximo 400 caracteres");

        case "fechaEntrega":
            return marcarEstado(campo, esFechaFutura(campo.value),
                "La fecha debe ser posterior a hoy");

        case "procesado":
            return marcarEstado(campo, regexExpressions.procesado.test(campo.value),
                "Seleccione: Sublimado, Estampado, Impresión 3D o Grabado/Corte láser");

        case "imagen":
            return marcarEstado(campo, campo.files && campo.files.length > 0,
                "Debe subir una imagen");

        default:
            return true;
    }
};

const validarFormulario = (e) => {
    validarCampo(e.target);
};

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
    input.addEventListener('change', validarFormulario); // necesario para color y file
});

textAreas.forEach((textarea) => {
    textarea.addEventListener('keyup', validarFormulario);
    textarea.addEventListener('blur', validarFormulario);
});

selects.forEach((select) => {
    select.addEventListener('change', validarFormulario);
    select.addEventListener('blur', validarFormulario);
});

const esFechaFutura = (valorFecha) => {
    if (!valorFecha) return false;

    const fechaSeleccionada = new Date(valorFecha + "T00:00:00");
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // elimina horas/minutos para comparar solo el día

    return fechaSeleccionada > hoy;
};

formulario_1.addEventListener('submit', (e) => {
    e.preventDefault();

    let formularioValido = true;
    const todosLosCampos = [...inputs, ...selects, ...textAreas];

    todosLosCampos.forEach((campo) => {
        const esValido = validarCampo(campo);
        if (!esValido) formularioValido = false;
    });

    if (formularioValido) {
        window.location.href = "page2.html";   // ← este es el cambio
    } else {
        console.log("Formulario con errores, revise los campos en rojo");
    }
});