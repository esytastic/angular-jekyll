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
                            message: emailMessage
                        },
                        emailAddress: {
                            message: emailValidMessage
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