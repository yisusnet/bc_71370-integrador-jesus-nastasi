import './sass/main.scss';

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
