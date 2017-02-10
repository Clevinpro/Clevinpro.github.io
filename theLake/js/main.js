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
});


