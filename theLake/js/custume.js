$(document).ready(function() {

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        focusOnSelect: true
    });


    $('.gallery-for').slick({
        centerMode: true,
        infinite: true,
        slidesToShow: 1,
        speed: 500,
        variableWidth: false,
        asNavFor: '.gallery-nav',
        arrows: true
    });

    $('.gallery-nav').slick({
        slidesToShow: 12,
        slidesToScroll: 1,
        asNavFor: '.gallery-for',
        dots: true,
        centerMode: false,
        focusOnSelect: true
    });


    var navButton = document.getElementById('toggle');
    var navbar = document.querySelector('.navigation');

    var closeMenu = document.querySelector('.close-menu');



    navButton.addEventListener("click", handleStart, false);
    closeMenu.addEventListener("click", handleStart, false);

    function handleStart (event) {
        event.preventDefault();
        if (navbar.classList.contains('opennav') === true) {
            navbar.classList.remove('opennav');
            event.stopPropagation();

        }else if (navbar.classList.contains('opennav') !== true) {
            navbar.classList.add('opennav');
            event.stopPropagation();
        }
    }





    // Get the modal
    var modal = document.getElementById('modalWindow');
    var modalSuccess = document.getElementById('modalSuccess');

// Get the button that opens the modal
    var btn1 = document.getElementById("myBtn1");
    var btn2 = document.getElementById("myBtn2");
    var btn3 = document.getElementById("myBtn3");
    var btn4 = document.getElementById("myBtn4");

// Get the <span> element that closes the modal
    var close = document.getElementById("modalClose");
    var closeSuccess = document.getElementById("modalCloseSuccess");

// When the user clicks on the button, open the modal
    btn1.onclick = function() {
        modal.classList.add('show-modal');
    };
    btn2.onclick = function() {
        modal.classList.add('show-modal');
    };
    btn3.onclick = function() {
        modal.classList.add('show-modal');
    };
    btn4.onclick = function() {
        modal.classList.add('show-modal');
    };

// When the user clicks on <span> (x), close the modal
    close.onclick = function() {
        modal.classList.remove('show-modal');
    };
    closeSuccess.onclick = function() {
        modalSuccess.classList.remove('show-modal');
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.classList.remove('show-modal');
        }else if (event.target == modalSuccess) {
            modalSuccess.classList.remove('show-modal');
        }
    };

    $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top

                }, 1500);
                navbar.classList.remove('opennav');
                return false;
            }
        }
    });


});
/**
 * Created by Clevin on 20.02.2017.
 */
