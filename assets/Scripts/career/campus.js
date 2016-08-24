(function ($, global) {
    'use strict';

    global.gogoro = global.gogoro || {};
    global.gogoro.Career = Career;

    function Career() {
        global.gogoro.common.gradientHeader();

        $('#contact-form-submit').on('click', function (e) {
            e.preventDefault();

            var $this = $(this);
            var $form = $this.parents('form');

            $form.submit();
        });

        // Form validation
        $('#contact-form').bootstrapValidator({
            fields: {
                names: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: '姓名為必填欄位'
                        }
                    }
                },
                english_names: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: '英文姓名為必填欄位'
                        }
                    }
                },
                gender: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: '性別為必填欄位'
                        }
                    }
                },
                phones: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: '電話為必填欄位'
                        }
                    }
                },
                email: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: '電子郵件信箱為必填欄位'
                        },
                        emailAddress: {
                            message: '請輸入有效的電子郵件信箱'
                        }
                    }
                },
                schools: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: '學校為必填欄位'
                        }
                    }
                },
                faculties: {
                    trigger: 'blur',
                    validators: {
                        notEmpty: {
                            message: '系所為必填欄位'
                        }
                    }
                },
                declaration: {
                    validators: {
                        notEmpty: {
                            //err: '#declaration-messages',
                            message: '&nbsp;'
                        }
                    }
                },
            }
        }).on('success.form.bv', function (e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            var $submitButton = $('#contact-form-submit');

            $submitButton.val('送出中...');
            saveCampusData($form, $submitButton);
        });
    }
}(window.jQuery, window));