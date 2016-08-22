<?php
$type = $_POST['type'];
if ($type == 'menu') {
    $type_text = 'Заказ на просчет меню';
} elseif ($type == 'degustation') {
    $type_text = 'Запись на бесплатную дегустацию';

} elseif ($type == 'question') {
    $type_text = 'Есть вопрос';
} else {
    $type_text = 'Обратный звонок';
}
$name = $_POST['name'];
if (!strlen($name)) {
    die(json_encode(['result' => 'error', 'message' => 'Не указано поле Имя.']));
}
$phone = $_POST['phone'];
if (!preg_match('/^\+?[\d\s\(\)\-]+$/is', $phone)) {
    die(json_encode(['result' => 'error', 'message' => 'Неверно указан контактный телефон.']));
}
$text = '<p>Уважаемый(ая) <b>Администратор</b>,<br />пришла заявка с формы '.$type_text.' от ' . Date('d.m.Y') . '.</p><p><b>Данные пользователя</b><br />Имя: ' . $name . '<br />Телефон: ' . $phone . '<br /></p><br /><p>Письмо сгенерировано автоматически.</p>';
/*$text = 'Уважаемый(ая) Администратор, пришла заявка с формы ' . $type_text . ' от ' . Date('d.m.Y') . '. Данные пользователя: Имя: ' . $name . ' Телефон: ' . $phone . ' Письмо сгенерировано автоматически.';*/
$headers = 'Content-type: text/html; charset=UTF-8' . "\r\n";
$headers .= 'From: rostok.catering' . "\r\n";

// отправка письма
mail('rostok@rostok.catering, 1936293@gmail.com, d.agafonenko@yandex.ru, oleggalyanovskij@gmail.com', $type_text, $text, $headers);


die(json_encode(['result' => 'ok']));