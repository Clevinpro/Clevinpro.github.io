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
  // if (navButton) {
  //   navButton.addEventListener("click", function (event) {
  //     event.stopPropagation();
  //     navbar.classList.toggle('openNav');
  //   });
  //
  //   document.querySelector('body').addEventListener("click", function(event) {
  //     navbar.classList.remove('openNav');
  //   });
  // }

  navButton.addEventListener("click", handleStart, false);
  function handleStart (event) {
    event.preventDefault();
    if (navbar.classList.contains('openNav') == true) {
      navbar.classList.remove('openNav');
      event.stopPropagation();

    }else if (navbar.classList.contains('openNav') !== true) {
      navbar.classList.add('openNav');
      event.stopPropagation();
    }
  }

  document.querySelector('body').addEventListener("click", function(event) {
    navbar.classList.remove('openNav');
  });


    //  window bar toggle
    var barOpen = document.querySelector('.barOpen'),
      bar = document.querySelector('.windowBar');
  if (barOpen) {
    barOpen.addEventListener("click", function (event) {
      event.stopPropagation();
      bar.classList.toggle('toggleBarOpen');
    });


    document.querySelector('body').addEventListener("click", function (event) {
      bar.classList.remove('toggleBarOpen');
    });
  }

  $('.spritespin').spritespin({
    // generate an array of image urls.
    // this is a helper function that takes a {frame} placeholder
    source: SpriteSpin.sourceArray( document.location.origin + '/technogerm/src/image/roto/{frame}.jpg', {
      // this ramge of numbers is interpolated into the {frame} placeholder
      frame: [1, 193],
      // the frame placeholder will be padded with leading '0' up to the number of 'digits'
      digits: 1
    }),
    // Specify the display width and height of the frame.
    // Optionally the size of the container can be defined with CSS.
    width: 600,
    height: 600,
    // Sense controls the direction and speed of the animation for mouse/touch interactions.
    // Here a negative value is chosen to invert the rotation, so the animation 'follows' the drag direction.
    // Values towards 0 will slow the animation down.
    sense: 1,
    responsive: true
  });



  jQuery(function($){
    $('input[type="tel"]').mask("+7 (999) 999-99-99");
  });


});

if (window.matchMedia('(max-width: 991px)').matches) {
  $('.product__slider').slick({
    initialSlide: 1,
    centerMode: true,
    infinite: false,
    // centerPadding: '200px',
    slidesToShow: 1,
    speed: 500
  });
}




