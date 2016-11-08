<?php header('Content-Type: text/html; charset=utf-8'); ?>
<?php 

		$title = "Заявка с сайта weddingweek.ru";
        $name = substr(htmlspecialchars(trim($_POST['name'])), 0, 1000); 		
        $phone = substr(htmlspecialchars(trim($_POST['phone'])), 0, 1000);
        $mail = substr(htmlspecialchars(trim($_POST['email'])), 0, 1000);
        $city = substr(htmlspecialchars(trim($_POST['city'])), 0, 1000);
		
		if($name != "") {
			$name = 'ФИО: '.$name."\r\n<br/>";
		};		
		if($phone != "") {
			$phone = 'Контактный телефон: '.$phone."\r\n<br/>";
		};
		if($mail != "") {
			$mail = 'Почта: '.$mail."\r\n<br/>";
		};
		if($city != "") {
			$city = 'Город проживания: '.$city."\r\n<br/>";
		};

		$mess = $name.$phone.$mail.$city;
		
		require_once "SendMailSmtpClass.php"; // подключаем класс
		
		$mailSMTP = new SendMailSmtpClass('showman2016mail@yandex.ru', 'Qaz123#@!', 'ssl://smtp.yandex.ru', 'request@showman2016.ru', 465);
		// $mailSMTP = new SendMailSmtpClass('логин', 'пароль', 'хост', 'имя отправителя','порт');
		 
		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: weddingweek.ru <weddingweek.ru>\r\n"; // от кого письмо
		$result =  $mailSMTP->send('info@weddingweek.ru', 'Заявка с сайта weddingweek.ru', $mess, $headers); // отправляем письмо	
		if($result === true){
			echo "Письмо успешно отправлено ";
		}else{
			echo "Письмо не отправлено. Ошибка: ".$result;
		}	
	
?> 
