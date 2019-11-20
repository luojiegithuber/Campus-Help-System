<?php
 header("content-type:text/html;charset=utf-8"); 
error_reporting(E_ALL ^ E_DEPRECATED);
 ini_set("display_errors", 0);
error_reporting(E_ALL ^ E_NOTICE);


$get_name=$_POST['name'];//客户端post过来的姓名  
$get_age=$_POST['age'];//客户端post过来的岁数  

 echo "Hello World ！${get_age}岁的${get_name}";
?>