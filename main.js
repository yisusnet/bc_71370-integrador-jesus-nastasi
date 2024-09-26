import './sass/main.scss';
import Handlebars from "handlebars";

let lastScrollTop = 0;

window.addEventListener('scroll', function () {
  let st = window.pageYOffset || document.documentElement.scrollTop;
  let sectionCardsHeader = document.querySelector('.section-cards__header');
  let nosotrosHeader = document.querySelector('.nosotros__header');
  let contactHeader = document.querySelector('.contact__header');
  let searchBar = document.querySelector('.search-bar');

  if (st > lastScrollTop) {
    if (sectionCardsHeader) sectionCardsHeader.classList.add('hidden');
    if (nosotrosHeader) nosotrosHeader.classList.add('hidden');
    if (contactHeader) contactHeader.classList.add('hidden');
    if (searchBar) searchBar.classList.add('hidden');
  } else {
    if (sectionCardsHeader) sectionCardsHeader.classList.remove('hidden');
    if (nosotrosHeader) nosotrosHeader.classList.remove('hidden');
    if (contactHeader) contactHeader.classList.remove('hidden');
    if (searchBar) searchBar.classList.remove('hidden');
  }
  lastScrollTop = st <= 0 ? 0 : st;
});

//! peticion ASYNC MOCKAPI

const urlLocalHost8080 = 'http://localhost:8080/productos/'
//const urlMokApi = 'https://66b27b7e7fba54a5b7e9c087.mockapi.io/productos'

const getProductos = async () => {
    try {
        const respuesta = await fetch('templates/card.hbs');
        if (!respuesta.ok) {
            throw new Error('No se pudo traer la plantilla ' + respuesta.status);
        }
        const plantilla = await respuesta.text();
        const template = Handlebars.compile(plantilla);
        const respuestaBack = await fetch(urlMokApi);
        if (!respuestaBack.ok) {
            throw new Error('Algo pasó con los productos de pizza: ' + respuestaBack.status);
        }
        const dataProductos = await respuestaBack.json();
        const dataFinal = { productos: dataProductos };
        const html = template(dataFinal);
        const contenedorCards = document.querySelector('#contenedor-cards');
        if (contenedorCards) {
            contenedorCards.innerHTML = html;
        } else {
            console.warn('El contenedor de cards no existe en esta página.');
        }
    } catch (error) {
        console.error('Algo salió mal: ' + error);
    }
}

window.addEventListener('DOMContentLoaded', getProductos);

//! Validación de formulario

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formularioContacto');
    if (!form) { 
        console.error('No se encontró el formulario con el ID "formularioContacto".');
        return;
    }


    const nombreInput = document.getElementById('Nombres');
    const apellidosInput = document.getElementById('Apellidos');
    const correoInput = document.getElementById('Correo');
    const telefonoInput = document.getElementById('Telefono');
    const comentariosInput = document.getElementById('Comentarios');

    if (!nombreInput || !apellidosInput || !correoInput || !telefonoInput || !comentariosInput) { 
        console.error('No se encontraron uno o más campos de formulario necesarios.');
        return;
    }

    const nombresError = document.querySelector('[data-error="Nombres-error"]');
    const apellidosError = document.querySelector('[data-error="Apellidos-error"]');
    const correoError = document.querySelector('[data-error="Correo-error"]');
    const telefonoError = document.querySelector('[data-error="Telefono-error"]'); // Añadido aquí
    const comentariosError = document.querySelector('[data-error="Comentarios-error"]');

    function validarNombre() {
        if (nombreInput.value.trim() === '') { 
            nombresError.innerText = 'El nombre es obligatorio'; 
        } else {
            nombresError.innerText = '';
        }
        return nombresError.innerText;
    }

    function validarApellidos() {
        if (apellidosInput.value.trim() === '') {
            apellidosError.innerText = 'El apellido es obligatorio';
        } else {
            apellidosError.innerText = '';
        }
        return apellidosError.innerText;
    }

    const chequeoMailRegexp = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    function validarCorreo() {
        if (correoInput.value.trim() === '') {
            correoError.innerText = 'El correo es obligatorio';
        } else if (!chequeoMailRegexp.test(correoInput.value.trim())) {
            correoError.innerText = 'Lo ingresado debe ser un correo válido';  
        } else {
            correoError.innerText = '';
        }
        return correoError.innerText;
    }

    function validarTelefono() {
        const telefonoValue = telefonoInput.value.trim();
        const soloNumeros = /^\d+$/;

        if (telefonoValue === '') {
            telefonoError.innerText = 'El teléfono es obligatorio, debe ingresar solo números';
        } else if (!soloNumeros.test(telefonoValue)) {
            telefonoError.innerText = 'Debe ingresar solo números';
        } else {
            telefonoError.innerText = '';
        }
        return telefonoError.innerText;
    }

    telefonoInput.addEventListener('input', (evento) => {
        evento.target.value = evento.target.value.replace(/[^\d]/g, '');
        validarTelefono();
    });

    form.addEventListener('submit', function(objEvento) {
        objEvento.preventDefault();
        console.log('El usuario apretó el botón de enviar');

        const resultado = validarNombre() === '' &&
            validarApellidos() === '' &&
            validarCorreo() === '' &&
            validarTelefono() === '' &&
            validarComentario() === '';

        if (resultado) {
            console.log('Los inputs tienen información, puedo enviar la data');
            const data = {
                nombre: nombreInput.value.trim(),
                apellido: apellidosInput.value.trim(),
                correo: correoInput.value.trim(),
                telefono: telefonoInput.value.trim(),
                comentario: comentariosInput.value.trim() 
            };
            console.log(data);
            form.reset();
        } else {
            console.log('Los inputs no tienen información, no enviar el formulario');
        }
    });

    function validarComentario() {
        const comentarioValue = comentariosInput.value.trim();
        if (comentarioValue === '') {
            comentariosError.innerText = 'El comentario es obligatorio, mínimo 20 caracteres';
        } else if (comentarioValue.length < 20) {
            comentariosError.innerText = 'El comentario debe tener al menos 20 caracteres';
        } else {
            comentariosError.innerText = '';
        }
        return comentariosError.innerText;
    }

    nombreInput.addEventListener('input', validarNombre);
    apellidosInput.addEventListener('input', validarApellidos);
    correoInput.addEventListener('input', validarCorreo);
    telefonoInput.addEventListener('input', validarTelefono);
    comentariosInput.addEventListener('input', validarComentario);
});
