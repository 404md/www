jQuery(function($) {
  'use strict';

  const $formInput = $('input');
  const $tourForm = $('#subscribe-tour-form');
  const $contactForm = $('#subscribe-contact-form');

  $('#mce-PHONE').on('input', function() {
    let $input = $(this);
    let regExp = /^[\+]?[(]?[0-9]{3}[)]?[0-9]*$/;
    let isPhone = regExp.test($input.val());
    let $genErr = $('#phone-error');

    if (isPhone) {
      let errMsg = '';
      $genErr.html(`<p>${errMsg}</p>`);
      $('#submit-form').prop('disabled', false);
    } else {
      let errMsg = 'Unacceptable value';
      $genErr.html(`<p>${errMsg}</p>`);
      $('#submit-form').prop('disabled', true);
    }
  });

  if ($contactForm.length) {
    /**
     * Contact form
     */
    $contactForm.MailChimpForm({
      url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=092d77b13b',
      fields: '1:NAME,4:PHONE,0:EMAIL,2:MESSAGE',
      submitSelector: '#submit-form',
      onFail: function (errMsg) {
        let $genErr = $('#mc-general-error');

        $genErr.html(`<div class="error-mc">${errMsg}</div>`);
      },
      onOk: function(okMsg) {
        window.location = '/thank-you'
      }
    });
  }

  if ($tourForm.length) {
    /**
     * Tour form
     */
    $tourForm.MailChimpForm({
      url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=de06a08172',
      fields: '0:EMAIL,1:FNAME,2:LNAME,3:PHONE,4:JOB,5:VDATE,6:MMERGE3,7:LANG',
      submitSelector: '#submit-form',
      onFail: function (errMsg) {
        let $genErr = $('#mc-general-error');
        let lnId = $( "input:checked" ).attr("id");

        if (lnId === 'romBtn') {
          errMsg = 'Nu se poate asa';
        }
        if (lnId === 'ruBtn') {
          errMsg = 'Что-то пошло не так, какая жалость';
        }

        $genErr.html(`<div class="error-mc">${errMsg}</div>`);
      },
      onOk: function(okMsg) {
        let lnId = $( "input:checked" ).attr("id");
        if (lnId === 'engBtn') {
          window.location = '/en/thank-you'
        }
        if (lnId === 'romBtn') {
          window.location = '/ro/thank-you'
        }
        if (lnId === 'ruBtn') {
          window.location = '/ru/thank-you'
        }
      }
    });
  }

  /**
   * mc:input:error event handler
   */
  $formInput.on('mc:input:error', function() {
    console.log('mc:input:error event fired');
  });

  /**
   * mc:input:ok event handler
   */
  $formInput.on('mc:input:ok', function() {
    console.log('mc:input:ok event fired');
  });
});
