import "./note.css";
import "./note-background.jpg"
import "./title.jpg"
import "./note_bg.jpg"
require ("./note.html");;
require ("expose-loader?$!./jquery-3.2.1.min");

var count_ajax=1;//计数器，表示当前是第几次获取数据，根据不同的次数，生成的div id不同，发送的ajax请求也不同。

/*第一次加载页面渲染note*/
$.get("/note/webdev?count="+count_ajax*5,function(data){
	console.log("ajax返回数据：",data);
	/*获取到数据后渲染html*/
	for(var i=0;i<data.length;i++){
		$(".model-"+(i+1)).attr("href","/note/"+data[i].id);
		$(".model-"+(i+1) + " div .note-model-title").html(data[i].title);
		$(".model-"+(i+1) + " div .note-model-writetime").html(data[i].writetime.substr(0,10));
		$(".model-"+(i+1) + " div .note-model-brief").html(data[i].note.substr(0,150));
	}

	/*设置随机背景*/
	for(var i=0;i<5;i++){
		var left = String(parseInt(Math.random()*680))+"px;";
		var top = parseInt(Math.random()*680)+"px;";
		console.log(left,top);
		$(".model-"+(i+1)).attr("style","background-position:"+left+top);
	}
})


/*为鼠标滚动操作注册一个回调函数*/
$(window).scroll(function(){
	/*如果这次滚动滚动到了底部*/
	if($(window).scrollTop() + $(window).height() >= $(document).height()){
		alert("滚动到底部");

		/*根据当前的计数器count_ajax获取数据*/
		$.get("/note/webdev?count="+((count_ajax+1)*5),function(data){
			console.log("ajax返回数据：",data);

			if(data.length==0){
				alert("没有更多数据！")
				$(window).off("scroll");
			}

			else{
				/*根据当前计数器coutn_ajax的值确定id并渲染一个新的note*/
				var new_note=$("#note-0").clone().attr("id","note-"+count_ajax).insertAfter("#note-"+(count_ajax-1));
				console.log(new_note);

				/*渲染数据*/
				for(var i=0;i<data.length;i++){
					$("#note-"+count_ajax + " .model-"+(i+1)).attr("href","/note/"+data[i].id);
					$("#note-"+count_ajax + " .model-"+(i+1) + " div .note-model-title").html(data[i].title);
					$("#note-"+count_ajax + " .model-"+(i+1) + " div .note-model-writetime").html(data[i].writetime.substr(0,10));
					$("#note-"+count_ajax + " .model-"+(i+1) + " div .note-model-brief").html(data[i].note.substr(0,150));
				}

				for(var i=data.length;i<5;i++){
					$("#note-"+count_ajax + " .model-"+(i+1)).attr("href","/note");
					$("#note-"+count_ajax + " .model-"+(i+1) + " div .note-model-title").html("暂无");
					$("#note-"+count_ajax + " .model-"+(i+1) + " div .note-model-writetime").html("暂无");
					$("#note-"+count_ajax + " .model-"+(i+1) + " div .note-model-brief").html("暂无");
				}

				/*背景随机*/
				for(var i=0;i<5;i++){
					var left = String(parseInt(Math.random()*680))+"px;";
					var top = parseInt(Math.random()*680)+"px;";
					console.log(left,top);
					$("#note-"+count_ajax + " .model-"+(i+1)).attr("style","background-position:"+left+top);

				}

						/*计数器加1，*/
				count_ajax=count_ajax+1;
			}
		})
	}
})
