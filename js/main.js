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
    var count = 1;
    var tmpl = $('#form-template').html();

    button.on('click', function (e) {
        if (count > 5) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        tmpl = tmpl
            .replace(/xxx/g, 'user_name' + count)
            .replace(/yyy/g, 'user_mail' + count)
            .replace('_required', 'required');

        $('#destination').append(tmpl);

        count++;
    });


    button.trigger("click");

    $('.mail-input').on("blur", function() {
        if($(this).val() != '') {
            console.log('hi');
            $('.form-block').addClass('get-sales');
        }
    });

});
