<?php
$_Cash = array(
  "500.00" => array("weight" => false),
  "200.00" => array("weight" => false),
  "100.00" => array("weight" => false),
  "50.00"  => array("weight" => false),
  "20.00"  => array("weight" => false),
  "10.00"  => array("weight" => false),
  "5.00"   => array("weight" => false),
  "2.00"   => array("weight" => 8.50),
  "1.00"   => array("weight" => 7.50),
  "0.50"   => array("weight" => 7.80),
  "0.20"   => array("weight" => 5.74),
  "0.10"   => array("weight" => 4.10),
  "0.05"   => array("weight" => 3.92),
  "0.02"   => array("weight" => 3.06),
  "0.01"   => array("weight" => 2.30) 
);

if(isset($_POST["jQueryAjax"])) {
  echo json_encode($_Cash);
}

?>