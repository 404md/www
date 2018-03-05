/**
 * Google Map callback
 */
function myMap() {
  var myLatLng = {lat: 46.9869511, lng: 28.8579025};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    scrollwheel: false,
    title: 'Olimpiada'
  });
}

function myEvent() {
  var myLatLng = {lat: 46.9869149, lng: 28.8577533};

  var map2 = new google.maps.Map(document.getElementById('map2'), {
    zoom: 18,
    backgroundColor:"#eeeeee",
    scrollwheel: false,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map2,
    title: 'Olimpiada'
  });

}

jQuery(function($) {
  'use strict';

  var navBar = $('.main-nav');

  $('.open-popup').on('click', function () {
    $('.popup-open-1').addClass('md-show');
  });

  $('#menu-toggle').click(function () {
    $(this).toggleClass('open');

    navBar.toggleClass("responsive-nav");
    if ( $('#menu-toggle').hasClass('open')) {
      $('html').css('overflow','hidden');

    }
    else {
      $('html').css('overflow', 'scroll');
    }
    if (navBar.hasClass('responsive-nav')) {
      navBar.css('transition', 'none');
    } else {
      navBar.css('transition', '.4s');
    }
  });

  var isScrolling;
  var navigationBar = $('.navt a');

  navigationBar.on('touchstart', function () {
    isScrolling = false;
  });
  navigationBar.on('touchmove', function (e) {
    isScrolling = true;
  });
  navigationBar.on('touchend', function (e) {
    if (!isScrolling) {
      window.location = $(this).attr('href');
    }
  });

  var $totalCount = $('#total-sales');
  var destination = $('#destination');
  var $addButton = $('.add-circle');
  var count = 0;

  function hideAndShowTrash() {
    var $trashes = destination.find('.trash');
    var itemCount = $trashes.length;

    console.log(itemCount);

    $trashes.each(function () {
      if (itemCount > 1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }

  function refreshTotalPercentage() {
    var $filledItems = destination.find('.get-sales');
    var itemCount = $filledItems.length;

    if (itemCount) {
      $totalCount.text(itemCount * 10 + '%').addClass('filled-field');
    } else {
      $totalCount.text('0%').removeClass('filled-field');
    }
  }

  $addButton.on('click', function (e) {
    if (count > 4) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (count === 4) {
      $('.total').addClass('gray-circle');
    }

    let tmpl = $('#form-template')
      .html()
      .replace(/xxx/g, 'user_name_' + count)
      .replace(/yyy/g, 'user_mail_' + count)
      .replace('_required', 'required');

    destination.append(tmpl);
    count++;

    hideAndShowTrash();

    $('.mail-input').on('change', function () {
      var $parent = $(this).closest('.clone-div');

      $parent.find('.change-color').toggleClass('get-sales');

      refreshTotalPercentage();
    });
  });

  $addButton.trigger('click');

  destination.on('click', '.trash', function () {
    if (count > 0) {
      $(this).closest('.clone-div').remove();
      $('.total').removeClass('gray-circle');
      count--;
    }

    hideAndShowTrash();
    refreshTotalPercentage();
  });

  let $video = $('#video');
  let $image = $('.image');
  let $showVideo = $('.show-video');
  let $mediaImage = $('.media-image');

  $('.button-play').on('click', function () {
    $image.addClass('video');
    $mediaImage.hide();
    $showVideo.removeClass('hidden');
    $video.attr('src', 'https://www.youtube.com/embed/ZGbORDi_UPA?rel=0&controls=0&showinfo=0;autoplay=1');
  });

  $('.btn-close').on('click', function () {
    $image.removeClass('video');
    $mediaImage.fadeIn("slow");
    $showVideo.addClass('hidden');
    $video.removeAttr('src');
  });

  $(':required, .required').on('blur keydown', function () {
    $(this)[$(this).val() ? 'addClass' : 'removeClass']('touched');
  });

  $('.icons').hover(function () {
    $(this).addClass('text-color');
    $(this).parent().prev().addClass('text-color');
  }, function () {
    $(this).parent().prev().removeClass('text-color');
    $(this).removeClass('text-color');
  });

  $('.color-link').hover(function () {
    $(this).addClass('text-color');
    $(this).next().find('.icons').addClass('text-color');
  }, function () {
    $(this).next().find('.icons').removeClass('text-color');
    $(this).removeClass('text-color');
  });


  $(window).scroll(function () {
    if ($(window).scrollTop() > 10) {
      $('.main-nav').addClass('fixed-top');
    }
    else {
      $('.main-nav').removeClass("fixed-top");
    }
  });

  /**
   * @todo move to a lambda function
   */
  $(function () {
    var $content = $('#jsonContent');
    var data = {
      rss_url: 'https://blog.404.md/feed'
    };
    $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
      if (response.status === 'ok') {
        var output = '';
        var count = 0;
        $.each(response.items, function (k, item) {
          if (/.*vinde-utilaje-absolut-gratuit-575eed5d9185.*/.test(item.link)) {
            return;
          }

          count++;
          var visibleSm;

          if (count < 3){
            visibleSm = '';
          } else {
            visibleSm = ' visible-sm';
          }
          output += '<div class="flex-item-4' + visibleSm + '">';
          output += '<div class="blog-post"><header>';
          var tagIndex = item.description.indexOf('<img');
          var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex;
          var srcStart = srcIndex + 5;
          var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart;
          var src = item.description.substring(srcStart, srcEnd);
          output += '<a href="' + item.link + '" class="blog-element" target="_blank"><img class="img-responsive" src="' + src + '" height="208px"></a></header>';
          output += '<div class="blog-content"><h4><a href="' + item.link + '" target="_blank">' + item.title + '</a></h4>';
          var yourString = item.description.replace(/<img[^>]*>/g, "");
          var maxLength = 120;
          output += '</div></div></div>';
          return count < 3;
        });
        $content.html(output);
      }
    });
  });


  function scrollBanner() {
    $(document).scroll(function(){
      let scrollPos = $(this).scrollTop();
      $('.scroll-title').css({
        top : (scrollPos/2.8)+'px'
      });
    });
  }
  scrollBanner();

  let $nav = $('#navigation');
  let $slideLine = $('#slide-line');
  let $currentItem = $('.current-item');

  if ($currentItem[0]) {
    $slideLine.css({
      width: $currentItem.width(),
      left: $currentItem.position().left
    });
  }

  $($nav).find('li').hover(
    function(){
      $slideLine.css({
        width: $(this).width(),
        left: $(this).position().left
      });
      $slideLine.removeClass('hidden-line');
    },

    function(){
      if ($currentItem[0]) {
        $slideLine.css({
          width: $currentItem.width(),
          left: $currentItem.position().left
        });

      } else {
        $slideLine.width(0);
      }
      if($(window).width() < 1270) {
        $slideLine.width(0);
      } else {
        $slideLine.css({
          width: $currentItem.width(),
          left: $currentItem.position().left
        });
      }
    }
  );

  if ($currentItem.hasClass('hide-line')) {
    $slideLine.addClass("hidden-line");
  }
});
