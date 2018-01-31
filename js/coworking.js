'use strict';

jQuery(function($) {
  const $quantity = $('.quantity');
  const $offers = $('.offers');
  const $teamPrice = $('#team-price-value');
  const $change = $('.change-quantity');

  $offers.slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    arrows:true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          infinite: true,
          centerMode: true,
          arrows:false,
          dots: false
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          arrows:false,
          centerMode: true,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          arrows:false
        }
      }
    ]
  });

  console.log($quantity.length);

  /**
   * Calculate discount
   * @param {*} val
   * @returns {Number}
   */
  function calculate(val) {
    let n = parseInt(val) || 1;

    let price = 2500;
    let discount = 1;

    switch (true) {
      case (n === 2):
        discount = .95;
        break;
      case (n > 2 && n <= 7):
        discount = 1 - (((n-2) * .02) + .05);
        break;
      case (n > 7):
        discount = .85;
        break;
    }

    return Math.floor(price * n * discount);
  }

  /**
   * Handle click
   */
  $change.on('click', function() {
    let val = parseInt($quantity.val() || 1);

    if ($(this).data('event') === 'plus') {
      val++;
    } else {
      val--;
    }

    $quantity.val((val <= 0) ? 1 : val).trigger('change');
  });

  /**
   * Handle input change
   */
  $quantity.on('keyup change', function() {
    let val = parseInt($(this).val() || 1);

    $teamPrice.text(calculate(val));
  });
});
