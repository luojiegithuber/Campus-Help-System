<?php    
/* 
*用户登录，服务器进行的处理 
*/  
error_reporting(E_ALL ^ E_DEPRECATED);
 ini_set("display_errors", 0);
error_reporting(E_ALL ^ E_NOTICE);
error_reporting(E_ALL ^ E_WARNING);

header("Content-Type: text/html;charset=utf-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "web_site";
 
// 创建连接
$conn = new mysqli($servername, $username, $password, $dbname);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 

$sql="SELECT * FROM entrust";  
$result=mysqli_query($conn,$sql); 
$arr = array(); 
while($row = mysqli_fetch_array($result)) { 
  $count=count($row);//不能在循环语句中，由于每次删除 row数组长度都减小 
  for($i=0;$i<$count;$i++){ 
    unset($row[$i]);
  } 
  array_push($arr,$row); 
} 
echo json_encode($arr,JSON_UNESCAPED_UNICODE); 
mysqli_close($conn);  
?>  