(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.StayTuned = StayTuned;



    function StayTuned() {
        global.gogoro.common.gradientHeader();

        $('#stay-form-submit').on('click', function (e) {
            e.preventDefault();

            var $this = $(this);
            var $form = $this.parents('form');

            $form.submit();
        });

        // Form validation
        $('#stay-tuned-form').bootstrapValidator({
            fields: {
                FirstName: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: firstNameMessage
                        }
                    }
                },
                LastName: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: lastNameMessage
                        }
                    }
                },
                City: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: cityMessage
                        }
                    }
                },
                Country: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: countryMessage
                        }
                    }
                },
                Email: {
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
            var $submitButton = $('#stay-form-submit');
            $submitButton.val('Sending...');
            document.getElementById("stay-tuned-form").submit();

        });

        // process after submit
        setTimeout(function () {
            var response = $('#response').val();
            if (response === 'success') {
                $('#contact-form-sent').modal('show');
                $('#response').val('');
                $('#stay-tuned-form').data('bootstrapValidator').resetForm();
            }
        }, 1000);

        // when user close modal, redirect to home page
        $('#contact-form-sent').on('hidden.bs.modal', function () {
            location.href = "http://www.gogoro.com";
        })
    }
}(window.jQuery, window));
