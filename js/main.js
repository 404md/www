(function () {
    
      $('.our-members').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        dot:false,
        autoplay: true,
        autoplaySpeed: 2000
    });


})(jQuery);

function NavigationFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navt") {
        x.className += " responsive";
    } else {
        x.className = "navt";
    }
}

function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.2),
        zoom: 15
    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
}