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

(function ($) {
    $(function() {
        $('#menu-toggle').click(function () {
            $(this).toggleClass('open');
            $('.main-nav').toggleClass("responsive-nav");
        });
    });
})(jQuery);
