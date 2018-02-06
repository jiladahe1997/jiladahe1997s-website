require ("./manage.html")
require ("./manage.css")
require ("expose-loader?$!./jquery-3.2.1.min");

$.get("/manage/ajax",(data)=>{
	console.log(data);
	//console.log($(".nownote-model th"))
	//console.log($(".nownote-model th")[0])
	$(".nownote-model").attr("id",data[0].id);
	$(".nownote-model th")[0].innerHTML = data[0].title;
	$(".nownote-model th")[1].innerHTML = data[0].catalog;

	for(var i=1;i<data.length;i++){
		$("#"+data[0].id).clone().attr("id",data[i].id).appendTo(".nownote table");
		console.log($("#"+data[i].id + "" + "th"))
		$("#"+data[i].id + " " + "th")[0].innerHTML = data[i].title;
		$("#"+data[i].id + " " + "th")[1].innerHTML = data[i].catalog;
	}
})


var lastclick=$(".note-manage");

$(".manageNote").click(()=>{
	lastclick.css("display","none");			/*隐藏上次点击的元素*/
	$(".note-manage").css("display","block");	/*显示本次点击*/
	lastclick=$(".note-manage");				/*将本次点击元素设定为上次点击元素*/
})

$(".manageNote-add").click(()=>{
	lastclick.css("display","none");
	$(".addnewnote").css("display","block");
	lastclick=$(".addnewnote");
})

$(".manageNote-now").click(()=>{
	lastclick.css("display","none");
	$(".nownote").css("display","block");
	lastclick=$(".nownote");
})
