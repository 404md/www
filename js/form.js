(function($) {
    window.fnames = [];
    window.ftypes = [];
    fnames[0]='EMAIL';ftypes[0]='email';
    fnames[1]='FNAME';ftypes[1]='text';
    // fnames[2]='LNAME';ftypes[2]='text';
    fnames[3]='MMERGE3';ftypes[3]='phone';
    fnames[4]='MMERGE4';ftypes[4]='text';
    fnames[7]='MMERGE7';ftypes[7]='date';
    fnames[5]='MMERGE5';ftypes[5]='text';

    $.extend($.validator.messages, {
        required: "This field is required.",
        remote: "Please fill this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a date (ISO) correct.",
        number: "Please enter a valid number.",
        digits: "Please enter only numbers.",
        creditcard: "Te rugăm să introduci un numar de carte de credit valid.",
        equalTo: "Please enter a valid credit card number.",
        accept: "Please enter a value with a valid extension.",
        maxlength: $.validator.format("Please enter no more than {0} characters"),
        minlength: $.validator.format("Please enter at least {0} characters."),
        rangelength: $.validator.format("Please enter a value between {0} and {1} characters."),
        range: $.validator.format("Please enter a value between {0} and {1}."),
        max: $.validator.format("Please enter a value equal to or less than {0}."),
        min: $.validator.format("Please enter a value equal to or greater than {0}.")
    });
}(jQuery));
