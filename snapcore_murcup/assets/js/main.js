(function () {
  document.addEventListener( "DOMContentLoaded", function() {
    var toggleButton = document.querySelector('.nav__button');
    var navClose = document.querySelector('.nav__close');
    var toggleNavigation = document.querySelector('.toggle__navigation');
    console.log(toggleButton);
    toggleButton.addEventListener('click', function () {
        document.body.style.overflow = 'hidden';
        toggleNavigation.classList.add('opened');
    });
    navClose.addEventListener('click', function () {
        toggleNavigation.classList.remove('opened');
        document.body.style.overflow = 'auto';
    });
  });
})();