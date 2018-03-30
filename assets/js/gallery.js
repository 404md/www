jQuery(function($) {
console.log('Hello');
  fetch('https://graph.facebook.com/v2.10/404Moldova/albums?&fields=created_time,count,link,name,description,id&access_token=472105429820097%7CPVCfivD3me3oT02xN-Ygyd66nfA')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson.data);
      generateFbFeedHTML(myJson.data);
    });
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
    $('.gallery-block').append(eventsHtml);
}



//
// let monthNames = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec"
// ];
//
// function getMonthName(month_number) {
//   return monthNames[month_number];
// }
