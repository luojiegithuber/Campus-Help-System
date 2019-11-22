

var x="msg_"; //动态增加的id前缀
var num=0;
var list_id="";//说说id

/*增加列表项元素*/
function add(){

  validateForm();//表单验证

  //获取表单内容
  var sname=document.getElementById("sname").value;
  var sno=document.getElementById("sno").value;
  var theme=document.getElementById("theme").value;
  var text = document.getElementById('content').innerHTML;

 //创建节点
  var dt = document.createElement("dt");
  var dd = document.createElement("dd");


  //节点赋值
  dt.innerHTML = theme;
  dd.innerHTML = text;

  dt.appendChild(dd) ;

  dt.setAttribute('id', x+num);
  num++;

  var element = document.getElementById("mainlist");
  element.appendChild(dt);
}

/*寻找关键字并标红*/
 function search(){
    var Ot1 = document.getElementById("key").value;
    var count = document.getElementById('middle').innerHTML;
    var n = count.split(Ot1).join("<font color='red'>"+ Ot1 +"</font>");//这里是在网上查的，实在想不出来。。。大神还有别的方式吗？
    document.getElementById('middle').innerHTML=n;
}

/*删除列表项元素*/
function remove(){

  var parent = document.getElementById("mainlist");
  var child = document.getElementById(x+"1");
  parent.removeChild(child);

}


/*修改说说的内容*/
function modify(){

  /*var parent = document.getElementById("mainlist");
  var child = document.getElementById(x+"1");
  parent.removeChild(child);*/
  


}

/*表单有效性验证*/
function validateForm(){
  
  var sname=document.getElementById("sname").value;
  var sno=document.getElementById("sno").value;
  var theme=document.getElementById("theme").value;
  var text = document.getElementById('content').innerHTML;

  if(sname==''||sno==''||theme==''||text==''){
  	alert("输入没有完全");
  	return;
  }

  if(isNaN(sno)||sno.length!=10){
  	alert("学号格式错误");
  	return;
  }

}


/*修改输入框*/
function msgbox(n,id){
    list_id=id;
    document.getElementById('inputbox').style.display=n?'block':'none';
}


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