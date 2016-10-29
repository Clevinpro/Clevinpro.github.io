$('.modalBtn').click(function (e) {
    e.preventDefault();
    var f= '#formMenu';
    $.ajax({
        type: 'POST',
        url: 'ajaxjs.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $('#modalWindow').css('display', 'none');
                $('#modalSuccess').css('display', 'block');
            } else {
                $('#modalWindow div.errorModals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
$('.callbackButton_2').click(function (e) {
    e.preventDefault();
    var f= '#form_application';
    $.ajax({
        type: 'POST',
        url: 'ajaxjs.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'email': $(f + ' input[name=email]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $('#modalSuccess').css('display', 'block');
            } else {
                $('#myModal div.f_error_modals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
$('.callbackButton_3').click(function (e) {
    e.preventDefault();
    var f= '#form_date';
    $.ajax({
        type: 'POST',
        url: 'ajaxjs.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'email': $(f + ' input[name=email]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $('#modalSuccess').css('display', 'block');
            } else {
                $('#myModal div.f_error_modals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
$('.callbackButton_4').click(function (e) {
    e.preventDefault();
    var f= '#form_price';
    $.ajax({
        type: 'POST',
        url: 'ajaxjs.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'email': $(f + ' input[name=email]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $('#modalSuccess').css('display', 'block');
            } else {
                $('#myModal div.f_error_modals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
$('.callbackButton_5').click(function (e) {
    e.preventDefault();
    var f= '#form_feedback';
    $.ajax({
        type: 'POST',
        url: 'ajaxjs.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'email': $(f + ' input[name=email]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $('#modalSuccess').css('display', 'block');
            } else {
                $('#myModal div.f_error_modals').slideUp().html(data.message).slideDown();
            }
        }
    });
});

