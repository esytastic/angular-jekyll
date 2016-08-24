(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.Contact = Contact;

    function Contact() {
        global.gogoro.common.gradientHeader();

        $('#contact-form-submit').on('click', function (e) {
            e.preventDefault();

            var $this = $(this);
            var $form = $this.parents('form');

            $form.submit();
        });

        $('#ss-submit').on('click', function (e) {
            e.preventDefault();

            var $this = $(this);
            var $form = $this.parents('form');

            $form.submit();
        });

        // Form validation
        $('#contact-form').bootstrapValidator({
            fields: {
                name: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: nameMessage
                        }
                    }
                },
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
                },
                subject: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: subjectMessage
                        }
                    }
                },
                message: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: messageMessage
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

            var $submitButton = $('#contact-form-submit');

            $submitButton.val('Sending...');
            saveContactData($form, $submitButton);
            // // Simulate sending
            //setTimeout(function () {
            //    $('#contact-form-sent').modal('show');
            //    $submitButton.val('Send');
            //    $('input, textarea', $form).not('input[type=submit]').val('');
            //    $form.data('bootstrapValidator').resetForm();
            //}, 2000);

            //// Use Ajax to submit form data
            //$.post($form.attr('action'), $form.serialize(), function (result) {
            //    // ... Process the result ...
            //}, 'json');
        });





        // Form validation
        $('#ss-form').bootstrapValidator({
            fields: {
                name: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: nameMessage
                        }
                    }
                },
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
                },
                subject: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: subjectMessage
                        }
                    }
                },
                message: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: messageMessage
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

            var $submitButton = $('#contact-form-submit');

            $submitButton.val('Sending...');
            saveContactData($form, $submitButton);
            // // Simulate sending
            //setTimeout(function () {
            //    $('#contact-form-sent').modal('show');
            //    $submitButton.val('Send');
            //    $('input, textarea', $form).not('input[type=submit]').val('');
            //    $form.data('bootstrapValidator').resetForm();
            //}, 2000);

            //// Use Ajax to submit form data
            //$.post($form.attr('action'), $form.serialize(), function (result) {
            //    // ... Process the result ...
            //}, 'json');
        });
    }
}(window.jQuery, window));
