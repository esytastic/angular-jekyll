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

    $.ajax(apiUrl, {
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

    $('#modal-close-btn').click(function () {
        window.location.reload();
    });

    $.ajax(apiUrl, {
        type: "POST",
        data: JSON.stringify(sendData),
        dataType: "json",
        contentType: "application/json",
        headers: {
            '__RequestVerificationToken': csrfToken
        },
        success: function (response) {
            $('#contact-form-sent').modal('show');
            //$submitButton.val('Send');
            $('input, textarea', $form).not('input[type=submit]').val('');
            $form.data('bootstrapValidator').resetForm();
        },
        error: function (response) {
            console.log('error');
            console.log(response);
        }
    });
};

saveCampusData = function ($form, $submitButton) {
    var csrfToken = $('input[name=__RequestVerificationToken]').val();
    var nameData = $('input#names').val();
    var englishNamesData = $('input#english_names').val();
    var genderData = $('input#gender').val();
    var phonesData = $('input#phones').val();
    var emailData = $('input#email').val();
    var schoolsData = $('input#schools').val();
    var facultiesData = $('input#faculties').val();
    var question_01 = ($('input#question-01').prop("checked")) ? 1 : 0;
    var question_02 = ($('input#question-02').prop("checked")) ? 1 : 0;
    var question_03 = ($('input#question-03').prop("checked")) ? 1 : 0;
    var question_04 = ($('input#question-04').prop("checked")) ? 1 : 0;
    var question_05 = ($('input#question-05').prop("checked")) ? 1 : 0;
    var question_06 = ($('input#question-06').prop("checked")) ? 1 : 0;
    var question_07 = ($('input#question-07').prop("checked")) ? 1 : 0;
    var question_08 = ($('input#question-08').prop("checked")) ? 1 : 0;
    var question_09 = ($('input#question-09').prop("checked")) ? 1 : 0;
    var question_10 = ($('input#question-10').prop("checked")) ? 1 : 0;
    var participateData = $('input[name*=participate]:checked').val();
    var identitiesData = $('input[name*=identities]:checked').val();
    var identityOtherData = $('input#identity_other').val();
    var recommendationsData = $('textarea#recommendations').val();

    var sendData = {
        Names: nameData,
        EnglishNames: englishNamesData,
        Gender: genderData,
        Email: emailData,
        Phones: phonesData,
        Schools: schoolsData,
        Faculties: facultiesData,
        Q01: question_01,
        Q02: question_02,
        Q03: question_03,
        Q04: question_04,
        Q05: question_05,
        Q06: question_06,
        Q07: question_07,
        Q08: question_08,
        Q09: question_09,
        Q10: question_10,
        Participate: participateData,
        Identities: identitiesData,
        IdentityOther: identityOtherData,
        Recommendations: recommendationsData
    };

    $('#modal-close-btn').click(function () {
        window.location.reload();
    });

    $.ajax(apiUrl, {
        type: "POST",
        data: JSON.stringify(sendData),
        dataType: "json",
        contentType: "application/json",
        headers: {
            '__RequestVerificationToken': csrfToken
        },
        success: function (response) {
            $('#campus-form-sent').modal('show');
            $submitButton.val('送出');
            $('input, textarea', $form).not('input[type=submit]').val('');
            $form.data('bootstrapValidator').resetForm();
        },
        error: function (response) {
            console.log('error');
            console.log(response);
        }
    });
};