
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navt") {
        x.className += " responsive";
    } else {
        x.className = "navt";
    }
}