<?php
$amoData = array ('label' => 'site', 'lead_name' => 'Заявка', 'user_name' => $_POST['nick11'], 'phone' => $_POST['phone11'], 'domain' => 'http://' . $_SERVER['HTTP_HOST'] . '/');

if ($amoData['phone']) $amoData['lead_name'] .= ', ' . $amoData['phone'];
          
$params = array ();
	
foreach ($amoData as $key => $value){
	$params[] = $key . '=' . $value;
}

$context = stream_context_create(array(
	'http' => array (
		'method' => 'POST',
		'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
		'content' => join ('&', $params)
	)
));


@file_get_contents("http://parkevent.ru/integration_comagic_amo/amocrm/CreateLead.php", 0, $context);
?>