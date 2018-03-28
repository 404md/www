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
        let route = window.location.pathname;

        if (route === '/ru/contact/'){
          ruTranslation(errMsg);
        } else if (route === '/ro/contact/'){
          roTranslation(errMsg);
        } else {
          $genErr.html(`<div class="error-mc">${errMsg}</div>`);
        }
      },
      onOk: function(okMsg) {
        let route = window.location.pathname;

        if (route === '/contact/'){
          window.location = '/thank-you'
        } else if (route === '/ru/contact/'){
          window.location = '/ru/thank-you'
        } else if (route === '/ro/contact/'){
          window.location = '/ro/thank-you'
        }
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
          roTranslation(errMsg);
        } else if (lnId === 'ruBtn') {
          ruTranslation(errMsg);
        } else {
          $genErr.html(`<div class="error-mc">${errMsg}</div>`);
        }
      },
      onOk: function(okMsg) {
        let lnId = $( "input:checked" ).attr("id");
        if (lnId === 'engBtn') {
          window.location = 'en/thank-you'
        }
        else if (lnId === 'romBtn') {
          window.location = 'ro/thank-you'
        }
        else if (lnId === 'ruBtn') {
          window.location = 'ru/thank-you'
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

function ruTranslation(errMsg) {
  let ruTr = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en"
    + "&tl=ru" + "&dt=t&q=" + encodeURI(errMsg);

    fetch(`${ruTr}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      errMsg = myJson[0][0][0];
      $genErr.html(`<div class="error-mc">${errMsg}</div>`);
    });
}

function roTranslation(errMsg) {
  let roTr = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en"
    + "&tl=ro" + "&dt=t&q=" + encodeURI(errMsg);

  fetch(`${roTr}`)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    errMsg = myJson[0][0][0];
    $genErr.html(`<div class="error-mc">${errMsg}</div>`);
  });
}