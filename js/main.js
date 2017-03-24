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
        title: 'Olimpiada'
    });
}

jQuery(function($) {
    'use strict';

    $('#menu-toggle').click(function () {
        $(this).toggleClass('open');
        $('.main-nav').toggleClass("responsive-nav");
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

    var button = $('.add-circle');
    var count = 0;

    var destination = $('#destination');
    function  hideAndshowtrash( i,el) {
        destination.find('.clone-div').each(function(i,el) {
            if(count == 1){
                $($(el).find('.trash')[0]).hide();

            }
            else{
                $($(el).find('.trash')[0]).show();
            }
        });
    }


    button.on('click', function (e) {
        if (count > 4) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        var tmpl = $('#form-template')
            .html()
            .replace(/xxx/g, 'user_name_' + count)
            .replace(/yyy/g, 'user_mail_' + count)
            .replace('_required', 'required');

        destination.append(tmpl);

        destination.find('.clone-div').last().attr('data-name', count);
        count++;

        hideAndshowtrash();


        $('.mail-input').on("blur",  function() {

            var $parent = $(this).closest('.clone-div');
            $parent.find('.change-color').toggleClass('get-sales');

            var counter = $('.get-sales').length.toString();

            console.log(counter * 10);
            $('.total-get-sales').addClass('total-sales');
           $('#total-sales').text(counter * 10 + '%');
        });
    });

    button.trigger("click");

    $(".contacts-invite").on("click", ".trash", function(e){

        if (count>0) {
            e.preventDefault();
            $( e.target ).closest('.clone-div').remove();
        }
        count--;

        hideAndshowtrash();

    });

});
