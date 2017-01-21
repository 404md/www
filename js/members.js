(function () {

    $('.our-members').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,


        responsive: [
            {
                breakpoint: 992,
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

// $(document).ready(function() {
//     $('.cercular1').ClassyLoader({
//         width: 200, // width of the loader in pixels
//         height: 200, // height of the loader in pixels
//         animate: true, // whether to animate the loader or not
//         displayOnLoad: true,
//         percentage: 100, // percent of the value, between 0 and 100
//         speed: 1, // miliseconds between animation cycles, lower value is faster
//         roundedLine: false, // whether the line is rounded, in pixels
//         showRemaining: true, // how the remaining percentage (100% - percentage)
//         fontFamily: 'Helvetica', // name of the font for the percentage
//         fontSize: '50px', // size of the percentage font, in pixels
//         showText: true, // whether to display the percentage text
//         diameter: 80, // diameter of the circle, in pixels
//         fontColor: '#cccccc', // color of the font in the center of the loader, any CSS color would work, hex, rgb, rgba, hsl, hsla
//         lineColor: '#44a5db', // line color of the main circle
//         remainingLineColor: 'rgba(55, 55, 55, 0.4)', // line color of the remaining percentage (if showRemaining is true)
//         lineWidth: 6 // the width of the circle line in pixels
//     });
//     $('.cercular2').ClassyLoader({
//         width: 200, // width of the loader in pixels
//         height: 200, // height of the loader in pixels
//         animate: true, // whether to animate the loader or not
//         displayOnLoad: true,
//         percentage: 100, // percent of the value, between 0 and 100
//         speed: 1, // miliseconds between animation cycles, lower value is faster
//         roundedLine: false, // whether the line is rounded, in pixels
//         showRemaining: true, // how the remaining percentage (100% - percentage)
//         fontFamily: 'Helvetica', // name of the font for the percentage
//         fontSize: '50px', // size of the percentage font, in pixels
//         showText: true, // whether to display the percentage text
//         diameter: 80, // diameter of the circle, in pixels
//         fontColor: '#cccccc', // color of the font in the center of the loader, any CSS color would work, hex, rgb, rgba, hsl, hsla
//         lineColor: '#44a5db', // line color of the main circle
//         remainingLineColor: 'rgba(55, 55, 55, 0.4)', // line color of the remaining percentage (if showRemaining is true)
//         lineWidth: 6 // the width of the circle line in pixels
//     });
//
//     $('.cercular3').ClassyLoader({
//         width: 200, // width of the loader in pixels
//         height: 200, // height of the loader in pixels
//         animate: true, // whether to animate the loader or not
//         displayOnLoad: true,
//         // percentage: 100, // percent of the value, between 0 and 100
//         speed: 1, // miliseconds between animation cycles, lower value is faster
//         roundedLine: false, // whether the line is rounded, in pixels
//         showRemaining: true, // how the remaining percentage (100% - percentage)
//         fontFamily: 'Helvetica', // name of the font for the percentage
//         fontSize: '50px', // size of the percentage font, in pixels
//         showText: true, // whether to display the percentage text
//         diameter: 80, // diameter of the circle, in pixels
//         fontColor: '#cccccc', // color of the font in the center of the loader, any CSS color would work, hex, rgb, rgba, hsl, hsla
//         lineColor: '#44a5db', // line color of the main circle
//         remainingLineColor: 'rgba(55, 55, 55, 0.4)', // line color of the remaining percentage (if showRemaining is true)
//         lineWidth:6 // the width of the circle line in pixels
//     });

// });