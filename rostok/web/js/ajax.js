$('.callbackButton_1').click(function (e) {
    e.preventDefault();
    var f= '#form_menu';
    $.ajax({
        type: 'POST',
        url: '/ajax/ajax.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $('#myModal').modal('hide');
                $('#myModal2').modal();
            } else {
                $('#myModal div.f_error_modals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
$('.callbackButton_2').click(function (e) {
    e.preventDefault();
    var f= '#form_callback';
    $.ajax({
        type: 'POST',
        url: '/ajax/ajax.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $('#myModal3').modal('hide');
                $('#myModal2').modal();
            } else {
                $('#myModal3 div.f_error_modals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
$('.callbackButton_3').click(function (e) {
    e.preventDefault();
    var f= '#form_consult';
    $.ajax({
        type: 'POST',
        url: '/ajax/ajax.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $(f + ' input[name=name]').val('');
                $(f + ' input[name=phone]').val('');
                $('#myModal2').modal();
                $('#myFormConsult div.f_error_modals').hide();
            } else {
                $('#myFormConsult div.f_error_modals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
$('.callbackButton_4').click(function (e) {
    e.preventDefault();
    var f= '#form_question';
    $.ajax({
        type: 'POST',
        url: '/ajax/ajax.php',
        dataType: 'json',
        data: {
            'name': $(f + ' input[name=name]').val(),
            'phone': $(f + ' input[name=phone]').val(),
            'type': $(f).data('type')
        },
        success: function (data) {
            if (data.result == 'ok') {
                $(f + ' input[name=name]').val('');
                $(f + ' input[name=phone]').val('');
                $('#myModal2').modal();
                $('#myFormConsult2 div.f_error_modals').hide();
            } else {
                $('#myFormConsult2 div.f_error_modals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
