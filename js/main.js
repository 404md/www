(function () {

    $(".navt li a").on("click", function () {
        console.log('hi');
        $(".navt").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });


})(jQuery);
