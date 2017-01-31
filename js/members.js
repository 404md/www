jQuery(function($) {
    "use strict";

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

    var bar1 = new ProgressBar.Circle(".circle1", {
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

    var bar2 = new ProgressBar.Circle(".circle2", {
        color: '#aaa',
        strokeWidth: 4,
        trailWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: { color: '#44a5db', width: 4 },
        to: { color: '#44a5db', width: 4 },

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

    var bar3 = new ProgressBar.Circle(".circle3", {
        color: '#aaa',
        strokeWidth: 4,
        trailWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            autoStyleContainer: false
        },
        from: {color: '#44a5db', width: 4},
        to: {color: '#44a5db', width: 4},

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

    var wasShown = false;

    if (!wasShown) {
        $(window).on('scroll', (function(e) {
            var $div = $('.project-block');

            if ($div.length > 0 && !wasShown) {
                bar1.animate(1.0);
                bar2.animate(1.0);
                bar3.animate(1.0);
                wasShown = true;
            }
        }));
    }

});
