<?php
$type = $_POST['type'];
if ($type == 'question') {
    $type_text = 'Задать вопрос';
}elseif ($type == 'application') {
    $type_text = 'Заявка на мероприятие';
}elseif ($type == 'date') {
    $type_text = 'Сободна ли дата';
}elseif ($type == 'price') {
    $type_text = 'Стоимость услуг';
 } else {
    $type_text = 'Обратный звонок';
}
if ($_POST['email']) {
    $email = $_POST['email'];
    $email_string = " email:  $email" ;
}
$name = $_POST['name'];
if (!strlen($name)) {
    die(json_encode(array('result' => 'error', 'message' => 'Не указано поле Имя.')));
}
$phone = $_POST['phone'];
if (!preg_match('/^\+?[\d\s\(\)\-]+$/is', $phone)) {
    die(json_encode(array('result' => 'error', 'message' => 'Неверно указан контактный телефон.')));
}
$text = '<p>Уважаемый(ая) <b>Администратор</b>,<br />пришла заявка с формы '.$type_text.' от ' . Date('d.m.Y') . '.</p><p><b>Данные пользователя</b><br />Имя: ' . $name . '<br />Телефон: ' . $phone . '<br />' . $email_string . '<br /></p><br /><p>Письмо сгенерировано автоматически.</p>';
/*$text = 'Уважаемый(ая) Администратор, пришла заявка с формы ' . $type_text . ' от ' . Date('d.m.Y') . '. Данные пользователя: Имя: ' . $name . ' Телефон: ' . $phone . $email_string ' Письмо сгенерировано автоматически.';*/
$headers = 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: agordeev.ru' . "\r\n";

// отправка письма
mail('agordeev.ru@yandex.ru, matveev-show@mail.ru', $type_text, $text, $headers);

die(json_encode(array('result' => 'ok')));