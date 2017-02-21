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

    $('a').on('click touchend', function(e) {
        var el = $(this);
        var link = el.attr('href');
        window.location = link;
    });

});
