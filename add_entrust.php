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
    $sname=$_POST['sname'];        //post过来的名字
    $sno=$_POST['sno'];                 //post过来的学号
    $title=$_POST['title'];                 //post过来的委托标题 
    $content=$_POST['content'];     //post过来的委托内容
    $time=$_POST['time'];               //post过来的时间  


    if(!$result)echo "error";
    
    $sql = "INSERT INTO entrust(sname , sno , title , content , time)VALUES ('$sname', '$sno', '$title','$content','$time')";
 
if (mysqli_query($conn, $sql)) {
    echo "新记录插入成功";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

    
    mysqli_close($conn);  
?>  