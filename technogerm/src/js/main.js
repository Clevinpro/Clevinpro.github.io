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

    // document.querySelector('body').addEventListener("click", function(event) {
    //   navbar.classList.remove('openNav');
    // });
  }

  // Navbar toggle siblings

  if (window.matchMedia('(max-width: 1199px)').matches) {
    var parentGuest = document.querySelectorAll('.menu-item-has-children > a');

    [].forEach.call(parentGuest, function (item) {
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.classList.add('svgToggle');
      var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
      newPath.setAttribute("d", "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"); //Set path's data
      newPath.style.stroke = "#000"; //Set stroke colour
      svg.appendChild(newPath);
      item.parentNode.insertBefore(svg, parentGuest.nextSibling);
    })

    var svgToggle = document.querySelectorAll('.svgToggle');
    var childrenNav = document.querySelectorAll('.menu-item-has-children > ul');
    childrenNav.forEach(function (el) {
      el.style.display = "none";
    });
    svgToggle.forEach(function (el) {
      el.addEventListener('click', function (event) {
        this.classList.toggle("active");
        /* Toggle between hiding and showing the active panel */
        var childrenNav = this.previousElementSibling;

        if (childrenNav.style.display === "block") {
          childrenNav.style.display = "none";
        } else {
          childrenNav.style.display = "block";
        }
      });
    })

  }


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

  // $('.spritespin').spritespin({
  //   // generate an array of image urls.
  //   // this is a helper function that takes a {frame} placeholder
  //   source: SpriteSpin.sourceArray( document.location.origin + '/technogerm/src/image/roto/{frame}.jpg', {
  //     // this ramge of numbers is interpolated into the {frame} placeholder
  //     frame: [1, 193],
  //     // the frame placeholder will be padded with leading '0' up to the number of 'digits'
  //     digits: 1
  //   }),
  //   // Specify the display width and height of the frame.
  //   // Optionally the size of the container can be defined with CSS.
  //   width: 600,
  //   height: 600,
  //   // Sense controls the direction and speed of the animation for mouse/touch interactions.
  //   // Here a negative value is chosen to invert the rotation, so the animation 'follows' the drag direction.
  //   // Values towards 0 will slow the animation down.
  //   sense: 1,
  //   responsive: true
  // });



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




