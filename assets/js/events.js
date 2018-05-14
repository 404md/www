jQuery(function($) {

  fetch('/json/_facebook-feed.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      generateFbFeedHTML(myJson);
    });

    $('.meeting-room').slick({
      dots:false,
      speed: 500,
      arrows: true,
      fade: true,
      cssEase: 'linear'
    });

  function generateFbFeedHTML(data) {
    let eventsHtml = '';
    data.forEach(function(item) {
      eventsHtml +=`
      <div class="flex-item-4 space">
      <a href="https://www.facebook.com/events/${item.id}/" target="_blank">
      <div class="block-style">
        <img src="${item.photo}" style="max-width: 100%;">
        <div class="content-block">
          <div class="date">
              <span class="day">
                ${getMonthName(item.date.month)}
              </span>
              <span class="month">
                ${item.date.day}
              </span>
          </div>
          <div class="context">
              <span class="title"">
                ${item.name}
              </span>
              <span class="interval">
                ${item.date.timeInterval}
              </span>
          </div>
        </div>
      </div>
        </a>
      </div>
      `;
    });
    $('.events-fb').append(eventsHtml);
  }

  let monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  function getMonthName(month_number) {
    return monthNames[month_number];
  }
});
