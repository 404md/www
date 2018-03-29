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

  fetch('http://www.404.md.s3-website.eu-central-1.amazonaws.com/json/instagram-feed.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      generateInstagramHTML(myJson);
    });

  function generateInstagramHTML(data) {
    let eventsHtml = '';
    data.forEach(function(item) {
      let hoverBlock = "<div class='hover-hash'><div class='hover-text'><div class='likes-instagram'>" + item.likes.count + "</div><div class='hashtags'>" + item.description + "</div></div></div>";
      let originalPost = "<a href='" + item.link + "' target='_blank'>" + hoverBlock + "</a>";
      let content = "<img src='" + item.images.url + "'>";
      if (item.type == 'video') {
        content = "<div class='video-block'>" + content + "</div><div class='button-video'><div class='play-button'></div></div>"
      }
      $('.instagram').slick('slickAdd', "<div>" + content + originalPost + "</div>");
    });
  }
});
