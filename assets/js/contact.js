(function($, window) {

  /**
   * Custom jquery validation method
   * @param value
   * @param element
   * @param params
   * @returns {*|boolean}
   */
  $.validator.methods.matches = function(value, element, params) {
    var regExp = new RegExp(params);
    return this.optional(element) || regExp.test(value);
  };

  var captchaId;
  var formDataObject = {};
  var $contactForm = $('#contact-us-form');
  var $statusMsg = $('.status-message');

  /**
   * Init and render google reCaptcha widget
   */
  window.createCaptcha = function() {
    captchaId = grecaptcha.render('reCaptcha', {
      'sitekey': '6LfKzxwUAAAAAKcEduxf9b1JqN8RlNlQQtxzKfQX',
      'size': 'invisible',
      'callback': function (token) {
        sendMessage({
          subject: '404.md contact form',
          captchaResponse: token,
          name: formDataObject.user_name,
          email: formDataObject.user_mail,
          phone: formDataObject.user_phone,
          message: formDataObject.user_message
        });
      }
    });
  };

  /**
   * Reinitialize reCaptcha after each sent email
   */
  function resetCaptcha() {
    grecaptcha.reset(captchaId);
  }

  /**
   * Form validation
   */
  $contactForm.validate({
    rules: {
      user_name: {
        required: true,
        minlength: 3
      },
      user_phone: {
        required: true,
        matches: "^([\\d\\s+])+$",
        minlength: 9
      },
      user_mail: {
        required: true,
        email: true
      },
      user_message: {
        required: true,
        minlength: 10
      }
    },
    messages: {
      user_name: {
        required: "Name is required field",
        minlength: $.validator.format("At least {0} characters required!")
      },
      user_phone: {
        required: "Phone is required field",
        matches: 'Please, use following format: 022999999',
        minlength: $.validator.format("At least {0} characters required!")
      },
      user_mail: {
        required: "Email is required",
        email: "Please, enter a valid email"
      },
      user_message: {
        required: "Message required",
        minlength: $.validator.format("At least {0} characters required!")
      }
    },
    submitHandler: function(form) {
      grecaptcha.execute(captchaId);

      // Serialize form data
      $.each($contactForm.serializeArray(), function(i, v) {
        formDataObject[v.name] = v.value;
      });
      $('.empty-field').val('');
    }
  });

  /**
   * Prevent form submission
   */
  $contactForm.on('submit', function (e) {
    e.preventDefault();
  });

  /**
   * Send email object
   * @param emailObj
   */
  function sendMessage(emailObj) {
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:0f1512f6-95c6-4364-bf28-1092393edb00'
    });

    AWS.config.credentials.get(function(err) {
      if (err) {
        showMessage(err, 'error');
        return;
      }
      var cognitoIdentityId = AWS.config.credentials.identityId;

      var cognitoidentity = new AWS.CognitoIdentity();

      cognitoidentity.getCredentialsForIdentity({
        IdentityId: cognitoIdentityId
      }, function(err, data) {
        if (err) {
          showMessage(err, 'error');
        } else {
          var lambda = new AWS.Lambda(data.Credentials);

          var params = {
            FunctionName: 'ContactForm404md',
            Payload: JSON.stringify(emailObj)
          };

          lambda.invoke(params, function(err, data){
            if(parseInt(data.StatusCode) === 200) {
              var response = JSON.parse(data.Payload);

              if (response.errorMessage) {
                showMessage(response.errorMessage, 'error');
              } else {
                showMessage('Thank you for your email');

              }
            } else {
              showMessage(err, 'error');
            }
          });
        }
      });
    });
  }

  /**
   * Show email status message
   * @param message
   * @param type success|error
   */
  function showMessage(message, type) {
    $statusMsg.text(message).addClass(type || 'success');

    setTimeout(function () {
      $statusMsg.empty();
      $statusMsg.text(message).fadeOut('slow');
      resetCaptcha();
    }, 5000);
  }

}(jQuery, window));
