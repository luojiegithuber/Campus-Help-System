

var x="dt_"; //动态增加的id前缀
var y="dd_";
var list_id="";//说说id

/*增加列表项元素*/
function add(){

  if(!validateForm())return;//表单验证

  //获取表单内容
  var sname=document.getElementById("sname").value;
  var sno=document.getElementById("sno").value;
  var theme=document.getElementById("theme").value;
  var text = document.getElementById('content').value;

 //创建节点
  var dt = document.createElement("dt");
  var dd = document.createElement("dd");

  var div= document.createElement("div");

  var span = document.createElement("span");
  var p = document.createElement("p");
  var btn_mod = document.createElement("button");
  var btn_rm  = document.createElement("button");

  //节点赋值
  dt.innerHTML = sname+"——"+sno;
  dt.setAttribute('id', x+0);/******************/
  div.setAttribute('id', y+0);/****************/

  span.innerHTML= theme;
  
  p.innerHTML=text;
  p.setAttribute('class', "list_content");
  
  btn_mod.innerHTML="修改";
  btn_mod.setAttribute('class', "modify");
  btn_mod.onclick=function(){
     msgbox(1,this.parentNode.id);
  };/*注意一下这里id*/

  btn_rm.innerHTML="删除";
  btn_rm.setAttribute('class', "remove");
  btn_rm.onclick=function(){
     remove(this.parentNode.id);
  };/*注意一下这里id*/ 

  div.appendChild(span);
  div.appendChild(p);
  div.appendChild(btn_mod);
  div.appendChild(btn_rm);

  dd.appendChild(div);

  dt.appendChild(dd);

  var element = document.getElementById("mainlist");
  element.appendChild(dt);

  /*后端加入数据库*/
  
  //将几个字段数据打包成一个对象
  var Addobj = {
    sname:sname,
    sno:sno,
    title:theme,
    content:text,
    time:getDatetime(),
  };
  add_postHttp(Addobj);

}

/*封装添加功能的POST请求,传递一个id和一个对象*/
function add_postHttp(obj){
var xmlhttp;
  if (window.XMLHttpRequest)
  {
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      //成功后赶紧获得id注入进去
      alert(xmlhttp.responseText);
      loadAll();//刷新界面，注入新id
    }
  }
  xmlhttp.open("POST","add_entrust.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("sname="+obj.sname+"&sno="+obj.sno+"&title="+obj.title+"&content="+obj.content+"&time="+obj.time);
}


/*寻找关键字并标红*/
 function search(){
    var Ot1 = document.getElementById("key").value;
    var count = document.getElementById('middle').innerHTML;
    var n = count.split(Ot1).join("<font color='red'>"+ Ot1 +"</font>");//这里是在网上查的，实在想不出来。。。大神还有别的方式吗？
    document.getElementById('middle').innerHTML=n;
}

/*删除列表项元素*/
function remove(id){//先传入的是dd

  /*前端删除*/
  if (!confirm("确认要删除？")) { 
            return; 
        } 

  var parent = document.getElementById("mainlist");
  var child_dd = document.getElementById(id);
  //parent.removeChild(child_dd.parentNode);//这个才是真的dd

  var id=id.replace("dd","dt");
  var child_dt = document.getElementById(id);
  parent.removeChild(child_dt);

  id=id.split('_')[1];

  /*后端删除*/
  rm_postHttp(id);

}

/*封装了删除功能，引入id查表*/
function rm_postHttp(id){
var xmlhttp;
  if (window.XMLHttpRequest)
  {
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      alert(xmlhttp.responseText);
    }
  }
  xmlhttp.open("POST","rm_entrust.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("id="+id);
}

/*表单有效性验证*/
function validateForm(){
  
  var sname=document.getElementById("sname").value;
  var sno=document.getElementById("sno").value;
  var theme=document.getElementById("theme").value;
  var text = document.getElementById('content').value;

  if(sname==''||sno==''||theme==''||text==''){
  	alert("输入没有完全");
  	return 0;
  }

  if(isNaN(sno)||sno.length!=10){
  	alert("学号格式错误");
  	return 0;
  }

  return 1

}


/*确定是否显示修改用的输入框（只有一个哦）*/
function msgbox(n,id){
    list_id=id;
    document.getElementById('inputbox').style.display=n?'block':'none';
}

/*修改功能*/
function mod_btn(id){
    id=list_id;
    var div=document.getElementById(id);//获得委托栏元素

    var theme=div.children[0];//获得委托标题
    var content=div.children[1];//获得委托内容栏目

    var mod_theme=document.getElementById('mod_theme').value;
    var mod_content=document.getElementById('mod_content').value;

    theme.innerHTML=mod_theme;
    content.innerHTML=mod_content;

}



/*读取数据库所有内容*/
function loadAll(){
  document.getElementById('mainlist').innerHTML='';
  var xmlhttp;
  if (window.XMLHttpRequest)
  {
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
  {
      //这里处理回来的JSON数组
      var jsonData=xmlhttp.responseText;//json数组字符串
      
      var jsonobj=JSON.parse(jsonData);//将数组转换成对象

      for(var i in jsonobj){
         read_db(jsonobj[i]);
    }

  }
  }
  xmlhttp.open("GET","loadAll.php",true);
  xmlhttp.send();
}

/*读取数据库查询需要的内容（通过字段值“姓名”）*/
function loadByName(){
  var xmlhttp;
  if (window.XMLHttpRequest)
  {
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
  {
      //这里处理回来的JSON数组
      document.getElementById('mainlist').innerHTML='';
      var jsonData=xmlhttp.responseText;//json数组字符串
      
      var jsonobj=JSON.parse(jsonData);//将数组转换成对象

      for(var i in jsonobj){
         read_db(jsonobj[i]);
    }

  }
  }

  var name=document.getElementById('key_name').value;
  if(name==' '||name==''){
    loadAll();
    return;
  }
  
  xmlhttp.open("POST","loadByName_entrust.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("name="+name);
}




/*传递数据库里读取的参数并做添加*/
function read_db(obj){

  //获取内容
  var id   = obj.id;
  var sno  = obj.sno;
  var sname= obj.sname;
  var theme= obj.title;
  var text = obj.content;
  var time = obj.time;

 //创建节点
  var dt = document.createElement("dt");
  var dd = document.createElement("dd");

  var div= document.createElement("div");

  var span = document.createElement("span");
  var p = document.createElement("p");
  var btn_mod = document.createElement("button");
  var btn_rm  = document.createElement("button");

  //节点赋值
  dt.innerHTML = sname+"——"+sno;
  dt.setAttribute('id', x+id);
  div.setAttribute('id', y+id);

  span.innerHTML= theme;
  
  p.innerHTML=text;
  p.setAttribute('class', "list_content");
  
  btn_mod.innerHTML="修改";
  btn_mod.setAttribute('class', "modify");
  btn_mod.onclick=function(){
     msgbox(1,this.parentNode.id);
  };/*注意一下这里id*/

  btn_rm.innerHTML="删除";
  btn_rm.setAttribute('class', "remove");
  btn_rm.onclick=function(){
     alert(this.parentNode.id);
     remove(this.parentNode.id);

  };/*注意一下这里id*/ 

  div.appendChild(span);
  div.appendChild(p);
  div.appendChild(btn_mod);
  div.appendChild(btn_rm);

  dd.appendChild(div);

  dt.appendChild(dd);

  var element = document.getElementById("mainlist");
  element.appendChild(dt);

}

/*修改列表项并传递修改信息到数据库里*/
function modify(id){
    
    /*前端修改*/
    id=list_id;//dd_{数字}
    var div=document.getElementById(id);//获得委托栏元素

    var theme=div.children[0];//获得委托标题
    var content=div.children[1];//获得委托内容栏目

    var mod_theme=document.getElementById('mod_theme').value;
    var mod_content=document.getElementById('mod_content').value;

    theme.innerHTML=mod_theme;
    content.innerHTML=mod_content;

    /*数据库修改*/
    id=id.split("_")[1];//获取id字符串后面的id数字
    alert(id);
    mod_postHttp(id,mod_theme,mod_content);
}

/*封装修改功能的POST请求,传递一个id和两个变量*/
function mod_postHttp(id,mod_theme,mod_content){
var xmlhttp;
  if (window.XMLHttpRequest)
  {
    xmlhttp=new XMLHttpRequest();
  }
  else
  {
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      alert(xmlhttp.responseText);
    }
  }
  xmlhttp.open("POST","mod_entrust.php",true);
  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlhttp.send("id="+id+"&mod_title="+mod_theme+"&mod_content="+mod_content);
}


function getDatetime(){
var time = new Date();

var arr=time.toLocaleDateString().split('/');

var h=time.getHours(); 
var min=time.getMinutes(); 
var s=time.getSeconds(); 

var datetime=arr[0]+'-'+arr[1]+'-'+arr[2]+' '+h+':'+min+':'+s;
return datetime;

}

