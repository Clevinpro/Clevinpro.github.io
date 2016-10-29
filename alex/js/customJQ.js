/**
 * Created by Clevin on 21.09.2016.
 */
$(document).on('ready', function() {
    if (window.matchMedia('(min-width: 1367px)').matches) {
        $('.lazy').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 4,
            slidesToScroll: 1
        });
    }else if (window.matchMedia('(max-width: 1366px)').matches) {
        $('.lazy').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 3,
            slidesToScroll: 1
        });
    }

    $('.reviews .slider').slick({
        dots: true,
        slidesToShow: 2,
        slidesToScroll: 1
    });
    $('.variable-width').slick({
        infinite: true,
        centerMode: true,
        slidesToShow: 2,
        variableWidth: true
    });
    jQuery(function($){
        $('input[type="tel"]').mask("+7 (999) 999-99-99");
    });


});