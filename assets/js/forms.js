jQuery(function($) {
  'use strict';

  const $genErr = $('#mc-general-error');
  const $tourForm = $('#subscribe-tour-form');
  const $contactForm = $('#subscribe-contact-form');
  const route = window.location.pathname;

  // $('.required').each(function () {
  //   if ($(this).val === '') {
  //     $('#submit-form').addClass('disabled');
  //   } else {
  //     $('#submit-form').removeClass('disabled');
  //   }
  // });
  //  TO DO:
  //    disable the button if required fields are empty.
  //    validate email value in order to avoid untranslatable errors from MailChimp.

  $('#mce-PHONE').on('input', function() {
    let $input = $(this);
    let regExp = /^[\+]?[(]?[0-9]{3}[)]?[0-9]*$/;
    let isPhone = regExp.test($input.val());
    let $phoneErr = $('#phone-error');
    let errMsg = '';
    let formName = 'contact' || 'tour';

    if (isPhone) {
      $phoneErr.html(`<p>${errMsg}</p>`);
      $('#submit-form').removeClass('disabled');
    } else {
      if (route === `/${formName}`) {
        errMsg = 'Unacceptable value';
      } else if (route === `/ru/${formName}`) {
        errMsg = 'Недопустимое значение';
      } else {
        errMsg = 'Valoare inacceptabilă';
      }

      $phoneErr.html(`<p>${errMsg}</p>`);
      $('#submit-form').addClass('disabled');
    }
  });

  if ($contactForm.length) {
    /**
     * Contact form
     */
    $contactForm.MailChimpForm({
      url: '//404.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=092d77b13b',
      fields: '1:NAME,4:PHONE,0:EMAIL,2:MESSAGE',
      submitSelector: '#submit-form',
      onFail: (errMsg) => {
        if (route === '/ru/contact/'){
          translation(errMsg, 'ru');
        } else if (route === '/ro/contact/'){
          translation(errMsg, 'ro');
        } else {
          $genErr.html(`<div class="error-mc">${errMsg}</div>`);
        }
      },
      onOk: (okMsg) => {
        if (/^\/contact/.test(route)) {
          window.location.href = '/thank-you'
        } else if (/^\/ru\/contact/.test(route)) {
          window.location.href = '/ru/thank-you'
        } else if (/^\/ro\/contact/.test(route)) {
          window.location.href = '/ro/thank-you'
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
      onFail: (errMsg) => {
        let lnId = $('input:checked').attr('id');
        if (lnId === 'romBtn') {
          translation(errMsg, 'ro');
        } else if (lnId === 'ruBtn') {
          translation(errMsg, 'ru');
        } else {
          $genErr.html(`<div class="error-mc">${errMsg}</div>`);
        }
      },
      onOk: (okMsg) => {
        let lnId = $('input:checked').attr('id');
        if (lnId === 'engBtn' && (route === '/tour' || route === '/ru/tour' || '/ro/tour'))  {
          window.location.href = '/thank-you'
        } else if (lnId === 'romBtn' && (route === '/tour' || route === '/ru/tour' || '/ro/tour')) {
          window.location.href = '/ro/thank-you'
        } else if (lnId === 'ruBtn' && (route === '/tour' || route === '/ru/tour' || '/ro/tour')) {
          window.location.href = '/ru/thank-you'
        }
      }
    });
  }

  /**
   * @param {String} errMsg
   * @param {String} lng
   */
  function translation(errMsg,lng) {
    let trUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${lng}&dt=t&q=${encodeURI(errMsg)}`;

    fetch(trUrl).then(res => res.json()).then(myJson => {
      errMsg = myJson[0][0][0];
      $genErr.html(`<div class="error-mc">${errMsg}</div>`);
    });
  }
});
