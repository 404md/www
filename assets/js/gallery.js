jQuery(function($) {
  fetch('https://s3.eu-central-1.amazonaws.com/www.404.md/json/facebook-albums.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      generateFbFeedHTML(myJson);
    });
});

function generateFbFeedHTML(data) {
  let eventsHtml = '';
    data.forEach(function(item) {
      eventsHtml +=`
      <div class="fb-album flex-item-4 space">
        <div class="card-header">
          <div class="header-content">
            <div class="icon">
               <img src="img/main-photo.png" class="icon-404" alt="icon" />
            </div>
            <div class="album-text">
              <p class="page-title">404 Moldova</p>
              <p class="album-date"> ${getDate(item.created_time)} </p>
            </div>
          </div>
            <div>
                 <img src="img/fb-icon.svg" class="fb-icon" alt="icon" />
            </div>
        </div>
        <div class="description">
            <p>${descriptCheck(item.description)}</p>
        </div>
        <div class="photos">
            <div class="cover-photos">
              <div id ="${item.id}">
                  <img class="img-responsive first-photo" src="${item.images[0]}" >
              </div>
            </div>
            <div class="album-appendix">
                <div class="cover-photos">
                    <div id ="${item.id}">
                        <img class="img-responsive second-photo" src="${item.images[1]}" >
                    </div>
                </div>
                <div class="cover-photos">
                   <div id ="${item.id}">
                      <img class="img-responsive third-photo" src="${item.images[2]}" >
                   </div>
                </div>
                <div class="cover-photos">
                  <div id ="${item.id}">
                      <img class="img-responsive fourth-photo" src="${item.images[3]}" >
                  </div>
                </div> 
            </div>
        
         <div class="name-stripe">
           <div class="gradient"></div>
           <div class="album-name">
            <a href="${item.link}" target="_blank">
              <div class="block-style">
                    ${item.name}
              </div>
            </a>
            <p>${item.count}</p>
           </div>
         </div>
       </div>
        
      </div>
      `;
    });
    $('.gallery-block').append(eventsHtml);
}

function getDate(date) {
  return `${date.substring(0, date.indexOf('T'))} ${date.substring(date.indexOf('T') + 1,date.indexOf('+'))}`;
}
function descriptCheck(text) {
  return text ? text : '';
}
