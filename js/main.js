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

});
