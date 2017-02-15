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
        arrows: false
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

    document.querySelector('body').addEventListener("click", function(event) {
        navbar.classList.remove('opennav');
    });

    // Get the modal
    var modal = document.getElementById('modalWindow');
    var modalSuccess = document.getElementById('modalSuccess');

// Get the button that opens the modal
    var btn1 = document.getElementById("myBtn1");
    var btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
    var close = document.getElementById("modalClose");
    var closeSuccess = document.getElementById("modalCloseSuccess");

// When the user clicks on the button, open the modal
    btn1.onclick = function() {
        modal.style.display = "block";
    };
    btn2.onclick = function() {
        modal.style.display = "block";
    };

// When the user clicks on <span> (x), close the modal
    close.onclick = function() {
        modal.style.display = "none";
    };
    close.onclick = function() {
        modal.style.display = "none";
    };
    closeSuccess.onclick = function() {
        modalSuccess.style.display = "none";
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }else if (event.target == modalSuccess) {
            modalSuccess.style.display = "none";
        }
    }
});



