$(function() {
    'use strict';

    const $formInput = $('input');


    $('#submit-form').on('click', function() {
        console.log('AAAAA')
    })

    /**
     * Init MailChimpForm
     */
    $('#subscribe-form').MailChimpForm({
        url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=de06a08172',
        fields: 'EMAIL,FNAME,LNAME,PHONE,JOB,VDATE,MMERGE3,LANG',
        submitSelector: '#submit-form',
        onFail: function(message){},
        onOk: function(okMsg){
            window.location=`/tour-ty`
        }
    });

    /**
     * mc:input:error event handler
     */
    $formInput.on('mc:input:error', function() {
        console.log('mc:input:error event fired');
        $(this).css({'border': '1px solid red'});
    });

    /**
     * mc:input:ok event handler
     */
    $formInput.on('mc:input:ok', function() {
        console.log('mc:input:ok event fired');
        $(this).css({'border': '1px solid green'});
    });

});
