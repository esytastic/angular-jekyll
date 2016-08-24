$("#send-informed-email").click(function () {
    sendData();
});

AddAntiForgeryToken = function (data) {
    data.__RequestVerificationToken = $('input[name=__RequestVerificationToken]').val();
    return data;
};

saveEmailData = function ($form, $submitButton) {
    var csrfToken = $('input[name=__RequestVerificationToken]').val();
    var emailData = $('input#informed-email-address').val();

    $.ajax("/about/api/save/informed-email", {
        type: "POST",
        data: { '': emailData },
        dataType: "json",
        headers: {
            '__RequestVerificationToken': csrfToken
        },
        success: function (response) {
            $submitButton.val('Sent!');
            setTimeout(function () {
                window.history.back();
                //$('#email-sign-up').modal('hide');
                //$('input[type=email], textarea', $form).val('').blur();
                //$form.data('bootstrapValidator').resetForm();
            }, 1000);
        },
        error: function (response) {
            console.log('error');
            console.log(response);
        }
    });
};

saveContactData = function ($form, $submitButton) {
    var csrfToken = $('input[name=__RequestVerificationToken]').val();
    var nameData = $('input#contact-name-first').val();
    var emailData = $('input#contact-email-address').val();
    var companyData = $('input#contact-company').val();
    var subjectData = $('input#contact-subject').val();
    var messageData = $('textarea#contact-message').val();

    var sendData = { Names: nameData, Email: emailData, Companies: companyData, Subjects: subjectData, Messages: messageData };

    console.log(sendData);

    $.ajax("/about/api/save/contact", {
        type: "POST",
        data: JSON.stringify(sendData),
        dataType: "json",
        contentType: "application/json",
        headers: {
            '__RequestVerificationToken': csrfToken
        },
        success: function (response) {
            $('#contact-form-sent').modal('show');
            $submitButton.val('Send');
            $('input, textarea', $form).not('input[type=submit]').val('');
            $form.data('bootstrapValidator').resetForm();
        },
        error: function (response) {
            console.log('error');
            console.log(response);
        }
    });
};

(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.KeepMeInformed = KeepMeInformed;

    function KeepMeInformed() {
        global.gogoro.common.gradientHeader();

        $('#email-sign-up-submit').on('click', function (e) {
            e.preventDefault();

            var $this = $(this);
            var $form = $this.parents('form');

            $form.submit();
        });

        // Form validation
        $('#email-sign-up-form').bootstrapValidator({
            fields: {
                email: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: 'Your email is required and cannot be empty'
                        },
                        emailAddress: {
                            message: 'Your email address is not a valid'
                        }
                    }
                }
            }
        }).on('success.form.bv', function (e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            var $submitButton = $('#email-sign-up-submit');

            $submitButton.val('Sending...');
            saveEmailData($form, $submitButton);
            /*
            // // Simulate sending
            setTimeout(function() {
              $submitButton.val('Sent!');

              setTimeout(function() {
                $('#email-sign-up').modal('hide');
                $('input[type=email], textarea', $form).val('').blur();
                $submitButton.val('Send');
                $form.data('bootstrapValidator').resetForm();
              }, 1000);

            }, 2000);

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                // ... Process the result ...
            }, 'json');
            */
        });
    }
}(window.jQuery, window));
