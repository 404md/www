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

    $('#menu-toggle').click(function () {
        $(this).toggleClass('open');
        $('.main-nav').toggleClass("responsive-nav");
        if ( $('#menu-toggle').hasClass('open')) {
            $('html').css('overflow','hidden');
        }
        else {
            $('html').css('overflow','scroll');
        }
    });

    var isScrolling;
    var navigationBar = $('.navt a');

    navigationBar.on('touchstart', function() {
        isScrolling = false;
    });
    navigationBar.on('touchmove', function(e) {
        isScrolling = true;
    });
    navigationBar.on('touchend', function(e) {
        if(!isScrolling) {
            window.location = $(this).attr('href');
        }
    });

    var $totalCount = $('#total-sales');
    var destination = $('#destination');
    var $addButton = $('.add-circle');
    var count = 0;

    function  hideAndShowTrash() {
        // destination.find('.clone-div').each(function(i, el) {
        //     if(count == 1) {
        //         $($(el).find('.trash')[0]).hide();
        //     } else {
        //         $($(el).find('.trash')[0]).show();
        //     }
        // });

        var $trashes = destination.find('.trash');
        var itemCount = $trashes.length;

        console.log(itemCount);

        $trashes.each(function() {
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

        if (count == 4) {
            $('.total').addClass('gray-circle');
        }

        var tmpl = $('#form-template')
            .html()
            .replace(/xxx/g, 'user_name_' + count)
            .replace(/yyy/g, 'user_mail_' + count)
            .replace('_required', 'required');

        destination.append(tmpl);

        // destination.find('.clone-div').last().attr('data-name', count);
        count++;

        hideAndShowTrash();

        $('.mail-input').on('change', function() {
            var $parent = $(this).closest('.clone-div');

            $parent.find('.change-color').toggleClass('get-sales');

            refreshTotalPercentage();
        });
    });

    $addButton.trigger('click');

    destination.on('click', '.trash', function() {
        if (count > 0) {
            $(this).closest('.clone-div').remove();
            $('.total').removeClass('gray-circle');
            count--;
        }

        hideAndShowTrash();
        refreshTotalPercentage();
    });
    
    $('.button-play').on('click', function(){
        $('.image').addClass('video');
        $('.media-image').hide();
        $('.show-video').removeClass('hidden');
        $('#video').attr('src', 'https://www.youtube.com/embed/ZGbORDi_UPA?rel=0&amp;controls=0&amp;showinfo=0');
    });

    $('.btn-close').on('click', function(){
        $('.show-video').addClass('hidden');
        $('.image').removeClass('video');
        $('.media-image').fadeIn("slow");
        $('#video').removeAttr('src');
    });

    var popupOverlay =  $('.overlay');
    var popupOverlay1 = $('.overlay1');
    var popUp = $(".popup");

    $('.getprice-button').on('click',function(){
        popupOverlay.addClass('pop-up-visible');
        $('html').css('overflow','hidden');
        popUp.show();
    });

    var BtnClose = $('.close');
    BtnClose.on('click',function(){
        popupOverlay.removeClass('pop-up-visible');
        $('html').css('overflow','scroll');
    });

    $('.getprice-button1').on('click',function(){
        popupOverlay1.addClass('pop-up-visible');
        $('html').css('overflow','hidden');
        popUp.show();
    });

    $(document).on('click', '.pop-up-visible', function(e){
        if (!($(e.target).hasClass( "popup" ))) {
            popUp.hide("fast");
            popupOverlay1.removeClass('pop-up-visible');
            popupOverlay.removeClass('pop-up-visible');
            $('html').css('overflow','scroll');
        }

    });

    BtnClose.on('click',function(){
        popupOverlay1.removeClass('pop-up-visible');
    });

    $(':required, .required').on('blur keydown', function() {
        $(this)[ $(this).val() ? 'addClass' : 'removeClass' ]('touched');
    });
    
        $(".icons").hover(function(){
            $(this).css('color', '#FF5533');
            $(this).parent().prev().css('color', '#FF5533');
        }, function(){
            $(this).parent().prev().css('color', '#A9AAAB');
            $(this).css('color', '#A9AAAB');
        });


        $(".color-link").hover(function(){
            $(this).css('color', '#FF5533');
            $(this).next().find('.icons').css('color', '#FF5533');
        }, function(){
            $(this).next().find('.icons').css('color', '#A9AAAB');
            $(this).css('color', '#A9AAAB');
        });


    $(window).scroll(function () {
            if ($(window).scrollTop() > 10) {
                $('.main-nav').addClass('fixed-top');
            }
            else {
                $('.main-nav').removeClass("fixed-top");
            }
        });


    $(function () {
        var $content = $('#jsonContent');
        var data = {
            rss_url: 'https://blog.404.md/feed'
        };
        $.get('https://api.rss2json.com/v1/api.json', data, function (response) {
            if (response.status == 'ok') {
                var output = '';
                $.each(response.items, function (k, item) {
                    var visibleSm;
                    if(k < 2){
                        visibleSm = '';
                    } else {
                        visibleSm = ' visible-sm';
                    }
                    output += '<div class="flex-item-4' + visibleSm + '">';
                    output += '<div class="blog-post"><header>';
                    var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
                    var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
                    var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
                    var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
                    var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
                    output += '<a href="'+ item.link + '" class="blog-element"><img class="img-responsive" src="' + src + '" height="240px" ></a></header>';
                    output += '<div class="blog-content"><h4><a href="'+ item.link + '">' + item.title + '</a></h4>';
                    var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
                    var maxLength = 120 // maximum number of characters to extract
                    //trim the string to the maximum length
                    var trimmedString = yourString.substr(0, maxLength);
                    //re-trim if we are in the middle of a word
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
                    // output += '<p>' + trimmedString + '...</p>';
                    output += '</div></div></div>';
                    return k < 2;
                });
                $content.html(output);
            }
        });
    });

});

