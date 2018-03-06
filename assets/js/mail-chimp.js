$(function() {
    'use strict';

    const $formInput = $('.mc-error');

    /**
     * Init MailChimpForm
     */
    $('#subscribe-form').MailChimpForm({
        url: '//mitocgroup.us11.list-manage.com/subscribe/post?u=13a7a5fca813b378c24ec9fe3&id=092d77b13b',
        fields: '1:NAME,PHONE,0:EMAIL,2:MESSAGE',
        submitSelector: '#submit-form'
    });

    /**
     * mc:input:error event handler
     */
    $formInput.on('mc:input:error', function(message) {
        console.log('mc:input:error event fired');
    });

    /**
     * mc:input:ok event handler
     */
    $formInput.on('mc:input:ok', function(message) {
        console.log('mc:input:ok event fired');
    });
});
