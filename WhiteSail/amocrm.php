<?php

$USER_LOGIN = 'ekaterina@parkevent.ru';
$USER_HASH 	= '1b648712e6187972d5d71046e7cbbe06';
$subdomain 	= 'eventpark';

// id статусов сделок, в которые можно дописывать информацию.
$open_statuses = array(
	// TODO заполнить
	'10863327',
	'10863333',
	'10863330',
	'10881612'
);

$managers_ids = array(
	// TODO fill
);

//-------------------- ОПРЕДЕНИЕ ОТВЕТСТВЕННОГО МЕНЕДЖЕРА -------------//
//$previous_manager_id = file_get_contents('.previous_manager_id.txt');
//$next_manager_id = ($previous_manager_id + 1) % count($managers_ids);
//file_put_contents('.previous_manager_id.txt', $next_manager_id);
$next_manager_id = '955447';
//-------------------- ОТВЕТСТВЕННЫЙ МЕНЕДЖЕР ОПРЕДЕЛЕН -------------//

$name 		= isset($_POST['name'])? $_POST['name'] : 'Неизвестный контакт';
$phone 		= isset($_POST['phone'])? $_POST['phone'] : '';
$email 		= isset($_POST['email'])? $_POST['email'] : '';
$title 		= isset($_POST['item11'])? $_POST['item11'] : 'Неизвестная заявка';
$roistat 	= isset($_COOKIE['roistat_visit']) ? $_COOKIE['roistat_visit'] : null;

$referer	= isset($_POST['referer'])? $_POST['referer'] : '';
$phrase		= isset($_POST['phrase'])? $_POST['phrase'] : '';

$comment 	= '';
if ($referer != '') {
	$comment .= "Источник: $referer \n";
}
if ($phrase != '') {
	$comment .= "Ключевое слово: $phrase";
}

process($name, $phone, $email, $title, $roistat);

function process($name, $phone, $email, $title, $roistat) {
	$contacts 	= array();

	//---------------------- ИЩЕМ КОНТАКТЫ ПО ТЕЛЕФОНУ И ЕМЕЙЛУ ------------------//
	if (isset($phone) && $phone != '') {
		$phone_query_contacts = get_contacts_by_query($phone);
		$contacts = array_merge($contacts, $phone_query_contacts);
		usleep(200);
	}

	if (isset($email) && $email != '') {
		$email_query_contacts = get_contacts_by_query($email);
		$contacts = array_merge($contacts, $email_query_contacts);
		usleep(200);
	}
	//---------------------- ПОИСК КОНТАКТОВ ЗАКОНЧЕН ------------------//


	//------------------------ ОПРЕДЕЛЯЕМ КОНТАКТ --------------------------//
	$contact_created 	= false;
	$contact 			= check_contacts($contacts, $phone, $email);
	if ($contact == null) { // создаем контакт (пока не отправляем)
		$contact = array(
			'name' 				=> $name,
			'linked_leads_id' 	=> array(),
			'custom_fields' 	=> array(
				array('id' => '330342', 'values' => array(array('enum' => '762508', 'value' => $phone))),
				array('id' => '330344', 'values' => array(array('enum' => '762520', 'value' => $email))),
				array('id' => '418803', 'values' => array(array('value' => $roistat))),
			)
		);
		$contact_created = true;
	}
	//------------------------  КОНТАКТ ОПРЕДЕЛЕН --------------------------//


	//------------------------ ОПРЕДЕЛЯЕМ И СВЯЗЫВАЕМ С КОНТАКТОМ СДЕЛКУ --------------------------//

	$linked_leads_id 	= $contact['linked_leads_id']; // id's всех сделок
	$params 			= '';
	// задаем id в параметрах, берем только сделки контакта.
	for ($i = 0; $i < count($linked_leads_id); $i++) {
		$params .= '&id[]=' . $linked_leads_id[$i];
	}
	// можно еще нахерачить фильтр по статусам

	// ищем сделки с нужными нам id's
	$leads = array();
	if (strlen($params) > 0) { // чтобы не делать лишних запросов
		$leads 	= get_leads($params);
	}
	// ЕСЛИ $leads ПУСТОЙ, ЭТО ЗНАЧИТ, ЧТО У КОНТАКТА НЕТ СДЕЛОК, КОТОРЫЕ С НИМ СВЯЗАНЫ

	// пытаемся найти открытую сделку
	$lead = find_first_corresponding_lead($leads);
	// если есть открытая сделка, то меняем ее
	if ($lead != null) { // ПОДРАЗУМЕВАЕТСЯ, ЧТО КОНТАКТ УЖЕ БЫЛ В AMOCRM
		$task_1 = array(
			'element_id' => $lead['id'],
			'element_type' => 2,
			'status' => 0,
			'task_type' => 1,
			'text' => "ПОВТОРНАЯ ЗАЯВКА! $title",
			'responsible_user_id' => $lead['responsible_user_id'],
			'complete_till' => time() + 30*60
		);
		$tasks = array();
		array_push($tasks, $task_1);
		$data['request']['tasks']['add'] = $tasks;
		$result = add_task($data);

		if ($comment != '') {
			$note = array(
				'element_id' => $lead['id'],
				'element_type' => 2,
				'note_type' => 4,
				'text' => $comment
			);
			$notes = array();
			array_push($notes, $note);
			$data['request']['notes']['add'] = $notes;
			$result = add_note($data);
		}
	}
	else { // ПОДРАЗУМЕВАЕТСЯ, ЧТО ИЛИ КОНТАКТА НЕ БЫЛО В AMOCRM, ЛИБО У ЭТОГО КОНТАКТА НЕ БЫЛО ДОСТУПНЫХ СДЕЛОК
		// СОЗДАЮ СДЕЛКУ
		$lead = array(
			'name' => $title,
			'responsible_user_id' => $next_manager_id,
			'custom_fields' => array(
				array(
					'id' 	=> '418803',
            		'name' 	=> 'roistat',
            		'values' => array(array('value' => $roistat))
				)
			)
		);

		// ДОБАВЛЯЮ В AMOCRM
		$leads 	= array();
		array_push($leads, $lead);
		$data 	= array();
		$data['request']['leads']['add'] = $leads;
		$result = set_leads($data);
		// ДОБАВИЛ СДЕЛКУ В AMO

		if ($result) { // успешно добавил сделку
			$lead_id = $result['add'][0]['id']; // тащу id добавленной сделки
			array_push($contact['linked_leads_id'], $lead_id); // связываю сделку с контактом

			if ($comment != '') {
				$note = array(
					'element_id' => $lead_id,
					'element_type' => 2,
					'note_type' => 4,
					'text' => $comment
				);
				$notes = array();
				array_push($notes, $note);
				$data['request']['notes']['add'] = $notes;
				$result = add_note($data);
			}


			$contacts = array();
			array_push($contacts, $contact);

			if ($contact_created) { // КОНТАКТА НЕ БЫЛО В AMO CRM
				$data['request']['contacts']['add'] = $contacts;
			}
			else { // КОНТАКТ БЫЛ В AMOCRM
				$data['request']['contacts']['update'] = $contacts;
			}

			// УСПЕШНО ЛИ (СОЗДАЛ)? И СВЯЗАЛ
			$result_1 = set_contacts($data);

			if ($result_1) {
				// TODO сделать что-то
			}
			else {
				// TODO сделать что-то
			}
		}
		else { // неудачно добавил сделку
			// TODO что-то делать
		}
	}

	//------------------------ СДЕЛКА СОЗДАНА И СВЯЗАНА С КОНТАКТОМ --------------------------//
}

/**
 * Ищет контакты с помощью $query.
 * @param $query string строка со значением поля для поиска.
 * @return array|null массив контактов или пустой массив.
 */
function get_contacts_by_query($query) {
	global $USER_LOGIN;
	global $USER_HASH;
	global $subdomain;

	$query = urlencode($query);
	$link="https://$subdomain.amocrm.ru/private/api/v2/json/contacts/list?USER_LOGIN=$USER_LOGIN&USER_HASH=$USER_HASH&query=$query";

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	 
	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);

	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	try
	{
	  	#Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  	if($code!=200 && $code!=204)
	    	throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E)
	{
	  	return array();
	}
	 
	/**
	 * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
	 * нам придётся перевести ответ в формат, понятный PHP
	 */
	$Response=json_decode($out,true);
	$Response=$Response['response'];

	return $Response['contacts'];
}

/**
 * Ищет сделки с помощью $params.
 * @param $params string описаны в спецификации amo.
 * @return array|null массив сделок или пустой массив.
 */
function get_leads($params) {
	global $USER_LOGIN;
	global $USER_HASH;
	global $subdomain;

	$link = "https://$subdomain.amocrm.ru/private/api/v2/json/leads/list?USER_LOGIN=$USER_LOGIN&USER_HASH=$USER_HASH";
	$link .= $params; // Дописываем параметры

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);
	curl_close($curl);

	$code=(int)$code;
	$errors=array(
	  301=>'Moved permanently',
	  400=>'Bad request',
	  401=>'Unauthorized',
	  403=>'Forbidden',
	  404=>'Not found',
	  500=>'Internal server error',
	  502=>'Bad gateway',
	  503=>'Service unavailable'
	);
	try
	{
	  	#Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
	  	if($code!=200 && $code!=204)
	    	throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E)
	{
		return array();
	}

	/**
	 * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
	 * нам придётся перевести ответ в формат, понятный PHP
	 */
	$Response=json_decode($out,true);
	$Response=$Response['response'];

	return $Response['leads'];
}

/**
 * Ищет первую сделку из списка, status_id обозначает, что сделка еще открыта.
 * @param $leads array сделок.
 * @return array|null сделку или null, если нет ни одной.
 */
function find_first_corresponding_lead($leads) {
	global $open_statuses;

	for ($i = 0; $i < count($leads); $i++) {
		if (in_array($leads[$i]['status_id'], $open_statuses)) {
			return $leads[$i];
		}
	}

	return null;
}

/**
 * Делает что-то со сделками.
 * @param $data array request со сделками для обновления или добавления.
 * @return array|null данные с id обновленных или добавленных сделок или null в случае неуспеха.
 */
function set_leads($data) {
	global $USER_LOGIN;
	global $USER_HASH;
	global $subdomain;

	$link = "https://$subdomain.amocrm.ru/private/api/v2/json/leads/set?USER_HASH=$USER_HASH&USER_LOGIN=$USER_LOGIN";

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($data));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);
	 
	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);

	$code=(int)$code;
	$errors=array(
		301=>'Moved permanently',
		400=>'Bad request',
		401=>'Unauthorized',
		403=>'Forbidden',
		404=>'Not found',
		500=>'Internal server error',
		502=>'Bad gateway',
		503=>'Service unavailable'
	);

	try
	{
	  	#Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
		if($code!=200 && $code!=204)
	    	throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E)
	{
		return null;
	}

	/**
	 * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
	 * нам придётся перевести ответ в формат, понятный PHP
	 */
	$Response=json_decode($out,true);
	$Response=$Response['response'];

	return $Response['leads'];
}

/**
 * Делает что-то с контактами.
 * @param $data array request с контактами для обновления или добавления.
 * @return array|null данные с id обновленных или добавленных контактов или null в случае неуспеха.
 */
function set_contacts($data) {
	global $USER_LOGIN;
	global $USER_HASH;
	global $subdomain;

	$link = 'https://' . $subdomain . ".amocrm.ru/private/api/v2/json/contacts/set?USER_LOGIN=$USER_LOGIN&USER_HASH=$USER_HASH";

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($data));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);

	$code=(int)$code;
	$errors=array(
		301=>'Moved permanently',
		400=>'Bad request',
		401=>'Unauthorized',
		403=>'Forbidden',
		404=>'Not found',
		500=>'Internal server error',
		502=>'Bad gateway',
		503=>'Service unavailable'
	);
	try
	{
		#Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
		if($code!=200 && $code!=204)
			throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E)
	{
        return null;
	}

	/**
	 * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
	 * нам придётся перевести ответ в формат, понятный PHP
	 */
	$Response=json_decode($out,true);
	$Response=$Response['response'];

	return $Response['contacts'];
}

function check_contacts($contacts, $phone, $email) {
	for ($i = 0; $i < count($contacts); $i++) {

		$contact = $contacts[$i];

		for ($j = 0; $j < count($contact['custom_fields']); $j++) {
			$field = $contact['custom_fields'][$j];

			if ($field['id'] == '330342' && $phone == $field['values'][0]['value']) {
				return $contact;
			}

			if ($field['id'] == '330344' && $email == $field['values'][0]['value']) {
				return $contact;
			}
		}
	}
	return null;
}

function add_task($data) {
	global $USER_LOGIN;
	global $USER_HASH;
	global $subdomain;

	#Формируем ссылку для запроса
	$link="https://$subdomain.amocrm.ru/private/api/v2/json/tasks/set?USER_LOGIN=$USER_LOGIN&USER_HASH=$USER_HASH";

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($data));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);

	$code=(int)$code;
	$errors=array(
		  301=>'Moved permanently',
		  400=>'Bad request',
		  401=>'Unauthorized',
		  403=>'Forbidden',
		  404=>'Not found',
		  500=>'Internal server error',
		  502=>'Bad gateway',
		  503=>'Service unavailable'
	);
	try
	{
		#Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
		if($code!=200 && $code!=204)
			throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',$code);
	}
	catch(Exception $E)
	{
	  	return array();
	}

	/**
	 * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
	 * нам придётся перевести ответ в формат, понятный PHP
	 */
	$Response=json_decode($out,true);
	$Response=$Response['response']['tasks']['add'];

	return $Response;
}

function add_note($data) {
	global $USER_LOGIN;
	global $USER_HASH;
	global $subdomain;

	#Формируем ссылку для запроса
	$link="https://$subdomain.amocrm.ru/private/api/v2/json/notes/set?USER_LOGIN=$USER_LOGIN&USER_HASH=$USER_HASH";

	$curl=curl_init(); #Сохраняем дескриптор сеанса cURL
	#Устанавливаем необходимые опции для сеанса cURL
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,true);
	curl_setopt($curl,CURLOPT_USERAGENT,'amoCRM-API-client/1.0');
	curl_setopt($curl,CURLOPT_URL,$link);
	curl_setopt($curl,CURLOPT_CUSTOMREQUEST,'POST');
	curl_setopt($curl,CURLOPT_POSTFIELDS,json_encode($data));
	curl_setopt($curl,CURLOPT_HTTPHEADER,array('Content-Type: application/json'));
	curl_setopt($curl,CURLOPT_HEADER,false);
	curl_setopt($curl,CURLOPT_COOKIEFILE,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_COOKIEJAR,dirname(__FILE__).'/cookie.txt'); #PHP>5.3.6 dirname(__FILE__) -> __DIR__
	curl_setopt($curl,CURLOPT_SSL_VERIFYPEER,0);
	curl_setopt($curl,CURLOPT_SSL_VERIFYHOST,0);

	$out=curl_exec($curl); #Инициируем запрос к API и сохраняем ответ в переменную
	$code=curl_getinfo($curl,CURLINFO_HTTP_CODE);

	$code=(int)$code;
	$errors=array(
		301=>'Moved permanently',
		400=>'Bad request',
		401=>'Unauthorized',
		403=>'Forbidden',
		404=>'Not found',
		500=>'Internal server error',
		502=>'Bad gateway',
		503=>'Service unavailable'
	);
	try
	{
		#Если код ответа не равен 200 или 204 - возвращаем сообщение об ошибке
		if($code!=200 && $code!=204)
			throw new Exception(isset($errors[$code]) ? $errors[$code] : 'Undescribed error',(int)$code);
	}
	catch(Exception $E)
	{
	  	die('Ошибка: '.$E->getMessage().PHP_EOL.'Код ошибки: '.$E->getCode());
	}

	/**
	 * Данные получаем в формате JSON, поэтому, для получения читаемых данных,
	 * нам придётся перевести ответ в формат, понятный PHP
	 */
	$Response=json_decode($out,true);
	$Response=$Response['response']['notes']['add'];

	return $Response;
}