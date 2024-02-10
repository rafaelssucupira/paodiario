<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400");

require_once("vendor/autoload.php");
use Bible\Server\Tools\Sql;

define("PARAMETERS", json_decode(file_get_contents('php://input'), TRUE) );

function f_select()
{
	$data = constant("PARAMETERS")["params"];
	$conn = new Sql();
	$result = $conn->f_MultiQuery("insert INTO ver
								( ver_referencia, ver_texto )
								values
								(
									:VER_REFERENCIA,
									:VER_TEXTO
								)", array(array("key" => ":VER_REFERENCIA", "value" => $data["reference"], "type" => "normal"),
										 array("key" => ":VER_TEXTO", "value" => $data["text"], "type" => "normal")));

    echo json_encode($result);


}

if ( isset(constant("PARAMETERS")["action"]) && !empty(constant("PARAMETERS")["action"]) )
{
	$waction = constant("PARAMETERS")["action"];
	$wresult = $waction();
	exit;
}



?>
