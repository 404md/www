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

function myEvent() {
    var myLatLng = {lat: 46.9869149, lng: 28.8577533};

    var map2 = new google.maps.Map(document.getElementById('map2'), {
        zoom: 18,
        backgroundColor:"#eeeeee",
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
        $('#video').attr('src', '/videos/agora.mp4');
    });

    $('.btn-close').on('click', function(){
        $('.show-video').addClass('hidden');
        $('.image').removeClass('video');
        $('.media-image').fadeIn("slow");
        $('#video').removeAttr('src');
    });

    $('.footer-carousel').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: true,
        autoplay:true,
        autoplaySpeed: 2000,
        dots: false,
        arrows:false,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 630,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // $('.footer-carousel').on('afterChange', function(event, slick, currentSlide, nextSlide){
    //     $('.hidden-div').hide();
    //     $('.hidden-div[data-id=' + (currentSlide + 1) + ']').show();
    // });

    // $('.footer-carousel').on('beforeChange', function(event, slick, currentSlide, centerMode){
    //     if (centerMode == 3) {
    //
    //         $('.hidden-div').show();
    //     } else {
    //         $('.hidden-div').hide();
    //     }
    // });

});
