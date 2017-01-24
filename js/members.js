(function ($) {

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



        $(function () {

            var bar = new ProgressBar.Circle(".circle1", {
                color: '#aaa',
                // This has to be the same size as the maximum width to
                // prevent clipping
                strokeWidth: 4,
                trailWidth: 4,
                easing: 'easeInOut',
                duration: 1400,
                text: {
                    autoStyleContainer: false
                },
                from: {color: '#44a5db', width: 4},
                to: {color: '#44a5db', width: 4},
                // Set default step function for all animate calls
                step: function (state, circle) {
                    circle.path.setAttribute('stroke', state.color);
                    circle.path.setAttribute('stroke-width', state.width);

                    var value = Math.round(circle.value() * 100);
                    if (value === 0) {
                        circle.setText('');
                    } else {
                        circle.setText(value + "%");
                    }

                }
            });

            $(window).scroll(function() {

                var $div = $('.projects');

                if ($div.length < 1) {
                    return;
                }

                bar.text.style.fontFamily = '"Lato", sans-serif';
                bar.text.style.fontSize = '2rem';

                bar.animate(1.0);  // Number from 0.0 to 1.0
            });

        });


    $(function() {

        var bar = new ProgressBar.Circle(".circle2", {
            color: '#aaa',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: { color: '#44a5db', width: 4 },
            to: { color: '#44a5db', width: 4 },
            // Set default step function for all animate calls
            step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 30000);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value);
                }

            }
        });

        $(window).scroll(function() {

            var $div = $('.projects');

            if ($div.length < 1) {
                return;
            }

            bar.text.style.fontFamily = '"Lato", sans-serif';
            bar.text.style.fontSize = '2rem';

            bar.animate(1.0);  // Number from 0.0 to 1.0
        });
    });


    $(function() {

        var bar = new ProgressBar.Circle(".circle3", {
            color: '#aaa',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 4,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: {color: '#44a5db', width: 4},
            to: {color: '#44a5db', width: 4},
            // Set default step function for all animate calls
            step: function (state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 700);
                if (value === 0) {
                    circle.setText('');
                } else {
                    circle.setText(value);
                }

            }
        });

        $(window).scroll(function() {

            var $div = $('.projects');

            if ($div.length < 1) {
                return;
            }

            bar.text.style.fontFamily = '"Lato", sans-serif';
            bar.text.style.fontSize = '2rem';

            bar.animate(1.0);  // Number from 0.0 to 1.0
        });

    });


})(jQuery);
