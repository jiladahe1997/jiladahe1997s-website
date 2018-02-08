import React from 'react';
import ReactDom from 'react-dom';
import './avatarbackground.jpg'
import './indexCustom.css'

//第一部分组件
function Avatar(props){
	return (
		<div>
			<img src={"https://www.gravatar.com/avatar/3edc01cbcb343fae0030d2dfcfb40166?s="+ props.size} />
		</div>
	);
}

function Introduction(props){
	return (
		<div>
			<h1>欢迎来到碧哥の站</h1>
			<hr/>
			<p className="breifPragraph">
				这是一个私人搭建的网站<br/>
				旨在分享我本人的一些学习笔记、感悟以及经验<br/>
				另有一些模块应用于存储一些私人文件或用于朋友间的交流<br/>
				这些部分需要额外的权限才能浏览
			</p>
		</div>
	)
}

function AppAvatar(props){
	return (
		<div>			
			<div className="avatar">
				<Avatar size="100" />
			</div>
			<div className="breif">
				<Introduction />
			</div>
		</div> 
	); 
}



//第二部分组件

function AppNvaigation(props){
	return (
		<ul className="nav">
			<li>
				<a  href="/index" className="navButton-left button button-glow button-rounded button-raised button-primary">首页</a>
			</li>
			<li>
				<a  href="/note" className="navButton button button-glow button-border button-rounded button-primary">学习笔记</a>
			</li>
			<li>
				<a  href="/resume" className="navButton button button-glow button-border button-rounded button-primary">个人简历(18年)</a>
			</li>
			<li>
				<a  href="/login" className="navButton-right button button-glow button-border button-rounded button-primary">Private</a>
			</li>
		</ul>
	)
}



/*第三部分组件*/

function AppFooter(props){
	return(
		<div className="footer">
			<p className="projectAddress">本项目地址 : <a href="https://github.com/jiladahe1997" target="new"><i>https://github.com/jiladahe1997</i></a></p>
		</div>
	)
}


/*组件汇总*/
function App(props){
	return (
		<div className="app">
			<AppAvatar />
			<AppNvaigation />
			<AppFooter />
		</div>
	);
}

ReactDom.render(
	<App />,
	document.getElementById("root")
)


var $li=document.getElementsByName("testTemp");

for(var i=0;i<4;i++){
	$li[i].onclick=function(){
		console.log("正在建设中");
		alert("正在建设中");
	}
}
