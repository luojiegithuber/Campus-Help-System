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
 
$get_username=$_POST['username'];//客户端post过来的用户名  
$get_password=$_POST['password'];//客户端post过来的密码  

    $sql="SELECT * FROM user WHERE name='$get_username'";   //根据用户名找
    $result=mysqli_query($conn,$sql); 
    $row=mysqli_fetch_assoc($result); //取得一行

    

    if(!empty($row)){  
        //存在该用户  
        if($get_password==$row['psd']){  
            //用户名密码匹配正确  
           //****** mysqli_query("UPDATE user SET status='1' WHERE id =$result[id]");/*这里的数组不需要加单引号*/  
            $back['status']="1";  
            $back['info']="login success";  
            $back['sex']=$row['sex'];  
            $back['nicename']=$row['nicename'];  
            header("location:main.html");
            echo(json_encode($back));   
        }else{
            /*密码错误*/  
            $back['status']="-2";  
            $back['info']="password error";  
            echo(json_encode($back));   
        }  
  
    }else{  
        //不存在该用户  
        $back['status']="-1";  
        $back['info']="user not exist";  
        echo(json_encode($back));   
    }  
           
    mysqli_close($conn);  
?>  