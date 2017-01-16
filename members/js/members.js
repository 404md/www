(function () {

    $('.our-members').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,


        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false

                }
            },
            
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]

    });


})(jQuery);