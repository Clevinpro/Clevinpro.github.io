<link type="text/css" rel="stylesheet" href="form.css" />
<title>Отправка заявки</title>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />

<?php


include "amocrm/include.php";


 @$item11 = $_POST['item11'];

 //------------------ ROISTAT AMO INTEGRATION ----------------//
$_POST['item11'] 	= "Заполнена форма '$item11' на сайте " . $_SERVER['HTTP_HOST'];
$_POST['name'] 		= $_POST['nick11'];
$_POST['phone'] 	= $_POST['phone11'];
$_POST['roistat_visit'] = $_COOKIE['roistat_visit'];
$_POST['roistat_marker'] = $_COOKIE['roistat_marker'];

$curl = curl_init('http://parkevent.ru/amocrm.php');
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($_POST));
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($curl);
curl_close($curl);
//------------------ END ROISTAT AMO INTEGRATION -------------//

 $url = "http://whitesail.moscow/#thanks";
 $title = "$item11"; 
 $subject = "$item11";
 $admail = "zayavka@parkevent.ru";
 $back = "<p><a href=\"javascript: history.back()\">Назад</a></p>";

if(@$_POST['phone11'])
 {
 @$nick11 = $_POST['nick11'];
 @$phone11 = $_POST['phone11'];

 $content = "\n Имя: $nick11
 Номер телефона: $phone11
 Заявка по форме: $item11
";

 if(!@mail($admail, $subject, $content,"Content-type: text/plain; charset=utf-8"))
 {
 echo "Извините, произошла ошибка $back";
 exit;
 }
 else
 {
	 
 require_once (dirname ( __FILE__ ) . '/controller_amocrm_form.php');
 
 echo "Отправка...";
 echo "<meta http-equiv=\"refresh\" content=\"1;URL=$url\">";
 
 amocrm('eventpark', $nick11, $phone11);
 
 }
 }
 else {
 die  (" Пожалуйста, заполните все поля $back"); 
 }

 ?>