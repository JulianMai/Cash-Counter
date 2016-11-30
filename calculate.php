<?php
// $_Cash (array)
include("cashdata.php");

// extend cashdata for zero values
$_Cash["0.00"] = array("weight" => 0.00);

$_Value = "0.00";
$_Input = "0.00";
$_Type  = "count";

if(!empty($_POST["value"])) {
  $_Value = $_POST["value"];	
}
if(!empty($_POST["input"])) {
  $_Input = $_POST["input"];	
}
if(!empty($_POST["type"])) {
  $_Type = $_POST["type"];	
}

($_Type == "count") ? 
  $_Result = round((float) $_Value * (float) $_Input, 2):
  $_Result = round((float) $_Input / (float) $_Cash[$_Value]["weight"]) * (float) $_Value;

$_Echo = ($_Type == "count") ? number_format($_Result, 2, '.', '') : $_Result;

echo json_encode(array("result" => $_Echo));
?>