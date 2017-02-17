<?php
$type = $_POST['type'];
if ($type == 'question') {
    $type_text = 'Заказать звонок';
}elseif ($type == 'book') {
    $type_text = 'Заявка "CHIAVARI в подарок"';
}

$name = $_POST['name'];
if (!strlen($name)) {
    die(json_encode(array('result' => 'error', 'message' => 'Не указано поле Имя.')));
}
$phone = $_POST['phone'];
if (!preg_match('/^\+?[\d\s\(\)\-]+$/is', $phone)) {
    die(json_encode(array('result' => 'error', 'message' => 'Неверно указан контактный телефон.')));
}
$text = '<div><h1 style="color: #4d90fe;font-size: 26px; margin-bottom: 25px; display: block;">Уважаемый(ая) <b style="text-decoration: underline">Администратор</b></h1>
<br />Пришла заявка с формы "'.$type_text.'" от <b style="color: aquamarine">' . Date('d.m.Y') . '</b>.</div>
<p style="font-size: 14px;"><span style="font-size: 16px;;">Данные пользователя:</span><br /><span style="color: #0098d9">Имя:</span> ' . $name . '<br /><span style="color: #0098d9">Телефон:</span> ' . $phone . '<br />' . '<br /></p><br /><p>Письмо сгенерировано автоматически.</p>';
/*$text = 'Уважаемый(ая) Администратор, пришла заявка с формы ' . $type_text . ' от ' . Date('d.m.Y') . '. Данные пользователя: Имя: ' . $name . ' Телефон: ' . $phone . $email_string ' Письмо сгенерировано автоматически.';*/
$headers = 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: thelake.ru' . "\r\n";

// отправка письма
mail('clevin.pro@gmail.com, matveev-show@mail.ru', $type_text, $text, $headers);

die(json_encode(array('result' => 'ok')));

/**
 * Created by PhpStorm.
 * User: Clevin
 * Date: 15.02.2017
 * Time: 17:21
 */