jQuery(function ($) {
    "use strict";
    $('.instagram').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        responsive: [{
            breakpoint: 992,
            settings: {slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: false}
        }, {breakpoint: 480, settings: {slidesToShow: 1, slidesToScroll: 1}}]
    });
    $.ajax({url: '//s3.eu-central-1.amazonaws.com/www.404.md/json/instagram-feed.json', dataType: 'json'}).done(function (data) {
        data.forEach(function (item) {
            var hoverBlock = "<div class='hover-hash'><div class='hover-text'><div class='likes-instagram'>" + item.likes.count + "</div><div class='hashtags'>" + item.description + "</div></div></div>";
            var originalPost = "<a href='" + item.link + "' target='_blank'>" + hoverBlock + "</a>";
            var content = "<img src='" + item.images.url + "'>";
            if (item.type == 'video') {
                content = "<div class='video-block'>" + content + "</div><div class='button-video'><div class='play-button'></div></div>"
            }
            $('.instagram').slick('slickAdd', "<div>" + content + originalPost + "</div>");
        });
    });
});