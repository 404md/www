let errFlag = true;
let messagesTemplate = {};

jQuery(function($) {
  'use strict';

  const $genErr = $('#mc-general-error');
  const $tourForm = $('#subscribe-tour-form');
  const $contactForm = $('#subscribe-contact-form');
  const route = window.location.pathname;
  const contactFields = ['#name', '#mce-PHONE', '#email'];
  const tourFields = ['#mce-EMAIL', '#mce-FNAME', '#mce-LNAME', '#mce-PHONE', '#mce-JOB', '#mce-VDATE', '#lang_ch', '#lang_ch1'];

  if (route === '/ru/contact' || route === '/ru/tour') {
    messagesTemplate = {
      E001: 'Пожалуйста, введите значение',
      E002: 'Некорректная дата',
      E003: 'Отсутствует @ в адресе электронной почты',
      E004: 'Неверный адрес электронной почты',
      E005: 'Слишком много попыток подписки'
    }
  } else if (route === '/ro/contact' || route === '/ro/tour') {
    messagesTemplate = {
      E001: 'Vă rugăm să introduceți o valoare',
      E002: 'Data incorectă',
      E003: 'Lipsește @-ul în adresa de poștă electronică',
      E004: 'Adresa de poștă electronică incorectă',
      E005: 'Prea multe încercări de abonare'
    }
  }

  $('#mce-PHONE').on('input', function() {
    let $input = $(this);
    let regExp = /^[\+]?[(]?[0-9]{3}[)]?[0-9]*$/;
    let isPhone = regExp.test($input.val());
    let $phoneErr = $('#phone-error');
    let errMsg = '';

    if (isPhone) {
      $phoneErr.html(`<p>${errMsg}</p>`);
      errFlag = false;
    } else {
      if (route === '/contact' || route === '/tour') {
        errMsg = 'Unacceptable value';
      } else if (route === '/ru/contact' || route === '/ru/tour') {
        errMsg = 'Недопустимое значение';
      } else if (route === '/ro/contact' || route === '/ro/tour') {
        errMsg = 'Valoare inacceptabilă';
      }
      $phoneErr.html(`<p>${errMsg}</p>`);
      errFlag = true;
    }
  });

  if($contactForm) {
    $('#submit-contact-form').addClass('disabled');
    contactFields.forEach((item) => {
      $(item).on('input', function () {
        if(($('#name').val() !== '' && $('#mce-PHONE').val() !== '' && $('#email').val()) !== '' && errFlag === false) {
          $('#submit-contact-form').removeClass('disabled');
        } else {
          $('#submit-contact-form').addClass('disabled');
        }
      });
      errFlag = true;
    });
  }


  if($tourForm) {

    $('#lang_ch').on('input', () => {
      $('#lang_ch').val('set');
      $('#lang_ch1').val('set');
      if ($('#engBtn').prop('checked')) {
        $('#engBtn1').prop('checked', true);
      } else if ($('#ruBtn').prop('checked')) {
        $('#ruBtn1').prop('checked', true);
      } else if ($('#romBtn').prop('checked')) {
        $('#romBtn1').prop('checked', true);
      }
    });

    $('#lang_ch1').on('input', () => {
      $('#lang_ch1').val('set');
      $('#lang_ch').val('set');
      if ($('#engBtn1').prop('checked')) {
        $('#engBtn').prop('checked', true);
      } else if ($('#ruBtn1').prop('checked')) {
        $('#ruBtn').prop('checked', true);
      } else if ($('#romBtn1').prop('checked')) {
        $('#romBtn').prop('checked', true);
      }
    });

    $('#submit-tour-form').addClass('disabled');
    tourFields.forEach((item) => {
      $(item).on('input', () => {
        if($('#mce-EMAIL').val() !== '' && $('#mce-FNAME').val() !== '' && $('#mce-LNAME').val() !== '' && $('#mce-JOB').val() !== '' && $('#mce-PHONE').val() !== '' && $('#mce-VDATE').val() !== '' && $('#lang_ch').val() !== '' && $('#lang_ch1').val() !== '' && errFlag === false) {
          $('#submit-tour-form').removeClass('disabled');
        } else {
          $('#submit-tour-form').addClass('disabled');
        }
      });
      errFlag = true;
    });
  }

  if ($contactForm.length) {
    /**
     * Contact form
     */
    $contactForm.MailChimpForm({
      url: '//404.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=092d77b13b',
      fields: '1:NAME,4:PHONE,0:EMAIL,2:MESSAGE',
      submitSelector: '#submit-contact-form',
      customMessages: messagesTemplate,
      onFail: (errMsg) => {
        if (route === '/ru/contact/') {
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
        $('#subscribe-contact-form input[type="text"]').val('');
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
      submitSelector: '#submit-tour-form',
      customMessages: messagesTemplate,
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
        $('#subscribe-tour-form input[type="text"]').val('');
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