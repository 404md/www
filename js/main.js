(function () {

    $(".navt li a").on("click", function () {
        console.log('hi');
        $(".navt").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });

})(jQuery);

function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navt") {
        x.className += " responsive";
    } else {
        x.className = "navt";
    }
}