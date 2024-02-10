<?php
namespace Bible\Server\Tools;
use PDO;
use PDOException;

date_default_timezone_set('America/Fortaleza');


class Sql extends PDO {

	private $conn;
	private $params;
	private $username;
	private $stmt;
	private $PDOException;
	public function __construct( $db = "" )
		{

			$dbName 	= $db == "" ? "elohim43_bible" : $db;
			$user 		= "elohim43_root";
			$passwd 	= "durango2019";

			$this->conn = new PDO( "mysql:host=localhost;dbname=".$dbName.";charset=utf8", $user, $passwd );

		}

	public function f_SelectQuery( $rawQuery, $params = array() ):array
		{
			$this->params = $params;

			$this->f_Query( $rawQuery );
			if($this->PDOException["errorCode"] == null)
				{
					return $this->stmt->fetchAll( PDO::FETCH_ASSOC );
				}
			else
				{
					return $this->PDOException;
				}

		}


	public function f_MultiQuery( $rawQuery, $params = array(), $username = ""):array
		{

			$this->params = $params;
			$this->username = $username;

			$this->f_Query( $rawQuery );
			if($this->PDOException["errorCode"] == null)
				{
					return array("statments" => "OK");
				}
			else
				{
					return $this->PDOException;
				}

		}

	private function f_Query( $rawQuery ):void
		{
			$this->stmt = $this->conn->prepare($rawQuery);
			$params 	= $this->params;
			for($i = 0, $len = Count($params); $i < $len; $i++)
				{

					if( $params[$i]["type"] == "normal" )
						{
							$this->stmt->bindParam( $params[$i]["key"], $params[$i]["value"] , PDO::PARAM_STR ) ;
						}
					else if( $params[$i]["type"] == "upper" )
						{
							$this->stmt->bindParam( $params[$i]["key"], mb_strtoupper( $params[$i]["value"] ) , PDO::PARAM_STR ) ;
						}
					else if( $params[$i]["type"] == "numeric" )
						{
							$this->stmt->bindParam( $params[$i]["key"],  $this->f_FormatCash($params[$i]["value"]) , PDO::PARAM_STR ) ;
						}
					else if( $params[$i]["type"] == "date" )
						{
							$this->stmt->bindParam( $params[$i]["key"],  $this->f_FormatDate($params[$i]["value"]) , PDO::PARAM_STR ) ;
						}
					else if( $params[$i]["type"] == "datehours" )
						{
							$this->stmt->bindParam( $params[$i]["key"],  $this->f_FormatDateHours($params[$i]["value"]) , PDO::PARAM_STR ) ;
						}
					else
						{
							$this->stmt->bindParam( $params[$i]["key"], $params[$i]["value"] , PDO::PARAM_INT ) ;
						}

				}

			$this->execCommand();
			$this->f_SqlCommand();


		}


		public function execCommand() :void
			{

				try {
					$this->stmt->execute();
					$this->PDOException = array("errorCode" => null, "errorMessage" => null);
				}
				catch(PDOException $e) {
					$this->PDOException = array("errorCode" => $e->getCode(), "errorMessage" => $e->getMessage() );
				}

			}



		private function f_SqlCommand() :void
			{

				ob_start();
				$this->stmt->debugDumpParams();
				$sqlcomand = ob_get_contents();
				ob_end_clean();

				$file = fopen('sqlcomand.txt', 'w') or die('Unable to open file!');
				fwrite($file, $sqlcomand . "\n" . json_encode($this->stmt->errorInfo()) );
				fclose($file);

				$this->username != "" || $this->username != null ? Logs::QueryLog($this->stmt->queryString, $this->params, $this->username) : "";


			}

		private function f_FormatDate( $date ) :string
			{

				return substr($date,6) . "-" . substr($date,3,2) . "-" . substr($date,0,2);
			}

		private function f_FormatDateHours( $dateHours ) :string
			{

				return substr($dateHours,6,4) . "-" . substr($dateHours,3,2) . "-" . substr($dateHours,0,2) . " ". substr($dateHours, 11,2) . ":" . substr($dateHours, 14,2) ;
			}

		private function f_FormatCash( $cash ):string
			{
				return str_replace(array(".", ","), array("", "."), $cash);


			}



}


?>
