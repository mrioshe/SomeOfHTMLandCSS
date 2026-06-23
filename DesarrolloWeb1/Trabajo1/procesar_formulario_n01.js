const RegexExpressions={
    nombre:/[A-ZÁÉÍÓÚÑ ]{3,}/,
    cedula:/^\d+$/,
    telefono:/[0-9]{10}/,
    email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
    password: /^.{8,12}$/,                 // 8 a 12 caracteres
    direccion: /^.{1,100}$/,               // máximo 100 caracteres
    size: /^\d{1,3}cm[xX]\d{1,3}cm$/,      // ejemplo: 10cmX8cm
    observaciones: /^[\s\S]{1,400}$/,      // hasta 400 caracteres, incluye saltos de línea
    fechaEntrega: /^\d{4}-\d{2}-\d{2}$/    // formato YYYY-MM-DD
}



// Obtener el contenido del elemento asociado al identificador "formulario_n01" y guardar una copia de este en el IdN formulario_1
const formulario_1 = document.getElementById("formulario_n01");

formulario_1.addEventListener("submit", function (evento_enviar) {
// Evita que la página se recargue y los datos se envíen de forma tradicional
evento_enviar.preventDefault();
// Aquí puedes ejecutar la lógica, para enviar o validar datos
console.log(
"Formulario interceptado. Los datos NO se han enviado Procesando datos con JS...",
);
});
// <input type="submit" value="Enviar formulario">
