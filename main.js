import "./sass/main.scss";


let lastScrollTop = 0;

window.addEventListener("scroll", function() {
  let st = window.pageYOffset || document.documentElement.scrollTop;

  if (st > lastScrollTop) {
   
    document.querySelector('.section-cards__header').classList.add('hidden');
  } else {

    document.querySelector('.section-cards__header').classList.remove('hidden');
  }
  lastScrollTop = st <= 0 ? 0 : st; 
});

