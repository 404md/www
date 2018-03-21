jQuery(function($) {
  'use strict';

  const $formInput = $('input');
  const $tourForm = $('#subscribe-tour-form');
  const $contactForm = $('#subscribe-contact-form');

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
            //setTimeout(() => { $genErr.html(''); }, 5000);
        },
      onOk: function(okMsg) {
          window.location='/thank-you'
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

            let lnid = $( "input:checked" ).attr("id");
            if(lnid==="eng_btn"){

            }
            if(lnid==="rom_btn"){
               errMsg="Nu se poate asa";
            }
            if(lnid==="ru_btn"){
                errMsg="Что-то пошло не так, какая жалость"
            }

            $genErr.html(`<div class="error-mc">${errMsg}</div>`);
        },
      onOk: function(okMsg) {
           let lnid = $( "input:checked" ).attr("id");
           if(lnid==="eng_btn"){
               window.location='/thank-you'
           }
            if(lnid==="rom_btn"){
                window.location='/thank-you'
            }
            if(lnid==="ru_btn"){
                window.location='/thank-you'
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
