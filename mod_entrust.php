<?php    
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

//***********************************************************************
 
    $id=$_POST['id'];                           //post过来的id(找内容用)
    $title=$_POST['mod_title'];            //post过来的标题
    $content=$_POST['mod_content'];//post过来的委托内容  

    $sql="UPDATE entrust SET title='$title', content='$content' WHERE id='$id'";   //根据id找到那一行
    $result=mysqli_query($conn,$sql); 

    if(!$result)echo "error";
    
    mysqli_close($conn);  
?>  