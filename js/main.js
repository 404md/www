

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
        center: new google.maps.LatLng(46.9861808, 28.8577161),
        zoom: 18

    }
    var map = new google.maps.Map(mapCanvas, mapOptions);
}
