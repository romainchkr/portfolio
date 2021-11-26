<?php

$mail = json_decode(file_get_contents("mail.json"));    // pas utile a terme

$to = 'romain.chikirou@gmail.com';
$subject = 'Contact Portfolio';
$message = $_POST["message"];
$headers = array('From' => $_POST["email"], 'Name' => $_POST["name"]);



$bool = mail($to, $subject, $message);

// test
file_put_contents("mail.json", json_encode(array("name"=> $_POST["email"], "email" => $_POST["email"], "message"=>$_POST["message"], "bool" => $bool)));

echo json_encode($mail);    // pas utile a terme

?>
