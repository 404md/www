jQuery(function($) {
  ("use strict");
  
  ajaxCall('//www.404.md/json/facebook-feed.json', function () {
    ajaxCall(window.location.origin+'/json/facebook-feed.json' , function (err) {
      console.error('Could not load facebook feed: ', err);
    });
  });
});

function generateFbFeedHTML(data) {
    var eventsHtml = '<div class="clear"></div>';
    data.forEach(function(item) {
      eventsHtml +='\
      <div style=";width: 33%;height: auto;display: inline-block;">\
        <img src="'+item.photo+'" style="max-width: 100%;"\
        href="https://www.facebook.com/events/'+item.id+'/">\
        <div class="date" style="float: left;">\
            <span class="day" style="text-align: center;font-size: 25px;display: block;\
            color:red;">\
              '+getMonthName(item.date.month)+'\
            </span>\
            <span class="month" style="display: block;text-align: center;">\
              '+item.date.day+'\
            </span>\
        </div>\
        <div class="context" style="width: 70%;height: 50px;float: right;">\
            <span class="title" style="text-align: left;display: block;">\
              '+item.name+'\
            </span>\
            <span class="interval" style="display: block;text-align: left;">\
              '+item.date.timeInterval+'\
            </span>\
        </div>\
      </div>\
      ';
    });
    eventsHtml += '<div class="clear"></div>';
    $(".pages").append(eventsHtml);
}

function ajaxCall(url, reject) {
   $.ajax({
    url: url,
    dataType: "json"
  }).done(function (data) {
    generateFbFeedHTML(data);
  }).fail(function (error) {
    reject(error.statusText);
  });
}

var monthNames = [
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