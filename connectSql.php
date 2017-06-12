<?php
	header('Content-type:application/json;charset:utf8');
	$username = $_REQUEST['username'];
	//echo $username;
	$message = $_REQUEST['message'];
	//echo $content;
	class connMysql{
		public $servername;
		public $usernames;
		public $password;
		public $dbname;
		public $conn;
		public function __construct($servername,$usernames,$password,$dbname){
			$this->servername = $servername;
			$this->username = $usernames;
			$this->password = $password;
			$this->dbname = $dbname;
		}
		public function getConnection(){
			try{
				$dsn = "mysql:host=$this->servername;dbname=$this->dbname";
				$this->conn = new PDO($dsn,$this->username,$this->password);
				$this->conn->query('set names utf8');
			}catch(PDOException $e){
				echo $e->getMessage();
			}
		}

		public function insertData($sql){
			if($this->conn == null){
				$this->getConnection();
			}
				$result = $this->conn->exec($sql);
				echo $result;
				$this->closeCon();
				
		}
		public function closeCon(){
			$this->conn = null;
		}
	}

	class realConnection extends connMysql{
		public function __construct($servername,$usernames,$password,$dbname){
			parent::__construct($servername,$usernames,$password,$dbname);
			
		}
		public function insertRealData($username,$message){
			//$timeing = date("Y-m-d H:i:s");

			$sql = "INSERT INTO chartingData(username, message) VALUES ($username,$message)";
			//echo $sql;
			$this->insertData($sql);
		}
		// public function insertRealData(){
		// 	//$timeing = date("Y-m-d H:i:s");

		// 	$sql = "INSERT INTO chartDatas(username, content) VALUES (1,2)";
		// 	//$sql ='UPDATE `pariseTable` SET `num`=num+1 WHERE id=1';
		// 	$this->insertData($sql);
		// }
	}

	$connection = new realConnection('localhost','root','','chartDB');
	$connection->insertRealData($username,$message);
	// $connection->insertRealData();
?>