$(document).ready(function() {

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    focusOnSelect: true
  });

  // Navbar toggle
  var navButton = document.querySelector('.toggleBtn'),
      navbar = document.querySelector('.toggleMenu');
  if (navButton) {
    navButton.addEventListener("click", function (event) {
      event.stopPropagation();
      navbar.classList.toggle('openNav');
    });

    document.querySelector('body').addEventListener("click", function(event) {
      navbar.classList.remove('openNav');
    });
  }

  if (newsOpen) {
    // NewsMenu toggle
    var newsOpen = document.querySelector('.newsOpen'),
      newsBar = document.querySelector('.newsBar');

    newsOpen.addEventListener("click", function (event) {
      event.stopPropagation();
      newsBar.classList.toggle('newsBarOpen');
    });


    document.querySelector('body').addEventListener("click", function (event) {
      newsBar.classList.remove('newsBarOpen');
    });
  }

  $('.spritespin').spritespin({
    // generate an array of image urls.
    // this is a helper function that takes a {frame} placeholder
    source: SpriteSpin.sourceArray( '/src/image/roto/{frame}.jpg', {
      // this ramge of numbers is interpolated into the {frame} placeholder
      frame: [1, 193],
      // the frame placeholder will be padded with leading '0' up to the number of 'digits'
      digits: 1
    }),
    // Specify the display width and height of the frame.
    // Optionally the size of the container can be defined with CSS.

    // Sense controls the direction and speed of the animation for mouse/touch interactions.
    // Here a negative value is chosen to invert the rotation, so the animation 'follows' the drag direction.
    // Values towards 0 will slow the animation down.
    sense: 1
  });
});

