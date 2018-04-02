jQuery(function($) {
  url = 'https://s3.eu-central-1.amazonaws.com/www-dev.404.md/json/facebook-albums.json';
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      console.log(myJson);
      generateFbFeedHTML(myJson);
    });
});

function generateFbFeedHTML(data) {
  let eventsHtml = '';
    data.forEach(function(item) {
      eventsHtml +=`
      <div class="flex-item-6 space">
        <div class="card-header">
          <div class="icon">
             <img src="img/main-photo.png" alt="icon" />
          </div>
          <p>404 Moldova</p>
          <p> ${getDate(item.created_time)} </p>
          <div class="fb-icon">
             <img src="img/fb-icon.png" alt="icon" />
             <!--это картинки еще нет. Но так как и первая не видна то я пока не искала новую-->
          </div>
        </div>
        <div class="description">
            <p>${descriptCheck(item.description)}</p>
        </div>
        <div class="cover-photos">
            <div id ="${item.id}" class="first-photo">
                <img class="img-responsive" src="${item.images[0]}" height="208px">
            </div>
        </div>
        <div class="cover-photos">
            <div id ="${item.id}" class="second-photo">
                <img class="img-responsive" src="${item.images[1]}" height="208px">
            </div>
        </div>
        <div class="cover-photos">
            <div id ="${item.id}" class="third-photo">
                <img class="img-responsive" src="${item.images[2]}" height="208px">
            </div>
        </div>
        <div class="cover-photos">
            <div id ="${item.id}" class="fourth-photo">
                <img class="img-responsive" src="${item.images[3]}" height="208px">
            </div>
        </div> 
        <a href="${item.link}" target="_blank">
          <div class="block-style">
                ${item.name}
          </div>
        </a>
        ${item.count}
      </div>
      `;
    });
    $('.gallery-block').append(eventsHtml);
}

function getDate(date) {
  return `${date.substring(0, date.indexOf('T'))} ${date.substring(date.indexOf('T')+1,date.indexOf('+'))}`;
}
function descriptCheck(text) {

  if (text) {
    return text;
  } else {
    return '';
  }
}
