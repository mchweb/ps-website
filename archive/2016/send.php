<?php
$form_url = '1FAIpQLScNNUeqrKj20vwZ4Ew0aFqwzB9KuEtdRjKJW0c1pvp-issANg';

if (isset($_POST['phone'])){
	$phone  = $_POST['phone'];
	$message  = $_POST['message'];
	$url = 'https://docs.google.com/forms/d/e/'.$form_url.'/formResponse';
	$data = array(
		'entry.1246347834' => $phone,
		'entry.1089969093' => $message
	);
	$fields = http_build_query($data);
	
	if( $curl = curl_init() ) {
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER,true);
		curl_setopt($curl, CURLOPT_POST, true);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);		
		$result = curl_exec($curl);
		curl_close($curl);
	}
}

return;