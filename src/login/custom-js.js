import "./custom-css.css";


$(document).ready(function(){
	$(".form-regis").hide();
});



var count = 0;

$("#button-login-regis").on("click",function(){
	if(count==0){
		$(".form-regis").show("slow");
		$("#button-login-regis").toggleClass("btn-success btn-warning").html("登录");
		count++;
	}
	else if(count==1){
		$(".form-regis").hide("slow");
		$("#button-login-regis").toggleClass("btn-success btn-warning").html("注册");
		count=0;
	}
});

document.getElementsByName("username")[0].value="test";
console.log("INPUT标签测试：",document.getElementsByName("username"));
document.getElementById("form-button").onclick=()=>{
	$.post("/login",
		{
		username:document.getElementsByName("username")[0].value,
		password:document.getElementsByName("password")[0].value,
		},
		(data)=>{
			console.log("ajax返回数据测试",data);
			if(data=="login success!"){
				alert("登录成功！");
				window.location="/manage";
			}
			else{
				alert("用户名或密码错误！");
			}
		}
	)

}