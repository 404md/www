jQuery(function($) {
    "use strict";

    $('.instagram').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
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

    $.ajax({
        url: '//www.404.md/json/instagram-feed.json',
        dataType: 'json'
    }).done(function (data) {
        data.forEach(function(item) {
            var hoverBlock = "<div class='hover-hash'><div class='hover-text'><div class='likes-instagram'>"+
                item.likes.count +"</div><div class='hashtags'>"+ item.description +"</div></div></div>";
            var originalPost = "<a href='"+ item.link +"' target='_blank'>" + hoverBlock + "</a>";

            var content = "<img src='"+ item.images.url +"'>";
            if (item.type == 'video') {
                content = "<div>"+ content +"</div><div class='button-video'><div class='play-button'></div></div>"
            }

            $('.instagram').slick('slickAdd',"<div>"+ content + originalPost +"</div>");
        });
    });

    var bar1 = new ProgressBar.Circle(".circle1", {
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

    $(window).on('scroll', function () {
        var start_element = $(".text-anvio");
        var scroll_pos = $(window).scrollTop() + $(window).height();
        var element_pos = start_element.offset().top + start_element.height();
        if (scroll_pos > element_pos && !wasShown) {
            bar1.animate(1.0);
            bar2.animate(1.0);
            bar3.animate(1.0);
            wasShown = true;
        }
    })
});
