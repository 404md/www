jQuery(function ($) {
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

  fetch('/json/instagram-feed.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      generateInstagramHTML(myJson);
    });

  function generateInstagramHTML(data) {
    let eventsHtml = '';
    data.forEach(function(item) {
      let hoverBlock = `
        <a href='${item.link}' target='_blank'>
          <div class='hover-hash'>
            <div class='hover-text'>
              <div class='likes-instagram'>
                   ${item.likes.count}
              </div>
              <div class='hashtags'>
                  ${item.description}
              </div>
            </div>
          </div>
        </a>
`;
      let content = `<img src='${item.images.url}'>`;
      if (item.type == 'video') {
        content =`
                  <div class='video-block'>
                    ${content}
                   </div>
                  <div class='button-video'>
                    <div class='play-button'>
                    </div>
                  </div>`;
      }
      $('.instagram').slick('slickAdd', `<div>
                                            ${content}
                                            ${hoverBlock}
                                          </div>`);
    });
  }
});
