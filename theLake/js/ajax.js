$('.modalBtn').click(function (e) {
    e.preventDefault();
    var f= '#formMenu';
    $.ajax({
        type: 'POST',
        url: 'ajax.php',
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
                $('#modalWindow').css('display', 'none');
                $('#modalSuccess').css('display', 'block');
            } else {
                $('#modalWindow div.errorModals').slideUp().html(data.message).slideDown();
            }
        }
    });
});

$('.formBtn1').click(function (e) {
    e.preventDefault();
    var f= '#form1';
    $.ajax({
        type: 'POST',
        url: 'ajax.php',
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
                $('#modalSuccess').css('display', 'block');
            } else {
                $('#modalWindow div.errorModals').slideUp().html(data.message).slideDown();
            }
        }
    });
});

$('.formBtn2').click(function (e) {
    e.preventDefault();
    var f= '#form2';
    $.ajax({
        type: 'POST',
        url: 'ajax.php',
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
                $('#modalSuccess').css('display', 'block');
            } else {
                $('#modalWindow div.errorModals').slideUp().html(data.message).slideDown();
            }
        }
    });
});
