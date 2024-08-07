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



//const urlLocalHost8080 = 'http://localhost:8080/productos/'
const urlMokApi = 'https://66b27b7e7fba54a5b7e9c087.mockapi.io/productos'

const getProductos = async () => {
 
    try {
        const respuesta = await fetch ('templates/card.hbs')

        if(!respuesta.ok) {
            throw new Error ('no se pudo traer la plantilla ' + respuesta.status)
        }
         const plantilla = await respuesta.text()
         const template = Handlebars.compile(plantilla)
         const respuestaBack = await fetch(urlMokApi)

         if ( !respuestaBack.ok ) {
            throw new Error('Algo paso con los productos de pizza', respuestaBack.status)
        }
        const dataProductos = await respuestaBack.json()
        const dataFinal = {productos : dataProductos}
        const html = template(dataFinal)
        const contenedorCards = document.querySelector('#contenedor-cards');
        
        if (contenedorCards) {
          contenedorCards.innerHTML = html;
        } /* else {
        console.warn('El contenedor de cards no existe en esta página.');
} */
        

        
        
    } catch (error) {console.error('algo salio mal' + error)
        
    }

}

window.addEventListener('DOMContentLoaded',  getProductos)

