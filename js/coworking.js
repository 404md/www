jQuery(function($) {
    "use strict";

    $('.offers').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows:true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                    centerMode: true,
                    arrows:false,
                    dots: false
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    arrows:false,
                    centerMode: true,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    centerMode: true,
                    arrows:false
                }
            }
        ]
    });

});
