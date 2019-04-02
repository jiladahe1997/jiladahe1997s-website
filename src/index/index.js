import React from 'react';
import ReactDom from 'react-dom';
import './avatarbackground.jpg';
import './indexCustom.css';

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
			<li>
				<a href="/ml" className="navButton-right button button-glow button-border button-rounded button-primary">毕业设计</a>
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


/* 服务器状态组件 */

class ServerState extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			startTime : null,
			nowTime : null,
		}
		//this.getTime = this.getTime.bind(this);
		this.sendDataByWebSocket = this.sendDataByWebSocket.bind(this)
		this.wb = {}                                                       //这里额外初始化wb这个变量，因为在render中需要用到wb，不初始化会报undefined错
	}

	/*componentDidMount(){
		this.tickId = setInterval(this.getTime,1000);
	}*/

	componentDidMount(){
		this.establishWebSocket();
		this.tickId = setInterval(this.sendDataByWebSocket,1000);
	}

	componentWillUnmount(){
		clearInterval(this.tickId)
	}

	/*getTime(){
		let ajax = new XMLHttpRequest();
		ajax.open("get","./ajax/server_time");
		ajax.onreadystatechange = ()=>{
			if(ajax.readyState == ajax.DONE){
				if(ajax.status == 200 ){
					console.log(typeof(ajax.response));
					this.setState({
						startTime:JSON.parse(ajax.response).startTime,
						nowTime : JSON.parse(ajax.response).nowTime,
					})
					return
				}
			}
			this.setState({
				startTime : '获取失败',
				nowTime : '获取失败'
			})
		}
		ajax.send();
	}*/

	establishWebSocket(){
		this.wb = new WebSocket("ws://120.78.151.148:3000/websocket/server_time");       //注意 wb 这个变量声明在 react组件 内部，而不是声明在状态中，这在react中是允许的
		this.wb.addEventListener("open",function(){				  					// 这样做的目的是为了其他函数能够访问一个函数内部的变量
			console.log("websocket connect established!");
		})
		this.wb.addEventListener("message",(e)=>{
			var data = JSON.parse(e.data);
			this.setState({
				startTime:data.startTime,
				nowTime:data.nowTime
			})
			
		})
	}

	sendDataByWebSocket(){
		this.wb.send("Get Server Time");
		//bug测试
		this.test = {
			id:"1",
			name:2
		}
	}

	render(){
		return <div className='serverTime'>
			服务器运行时间：<p>{this.state.startTime} -----</p>
			<p> {this.state.nowTime}</p>
			<p>websocket状态：{ (this.wb.readyState==0 && "连接未建立") || (this.wb.readyState==1 && "连接已建立") || (this.wb.readyState==3 && "连接已关闭 ") ||(this.wb.readyState==4 && "连接已关闭 ")}</p>	
		</div>
	}
}


/*组件汇总*/
function App(props){
	return (
		<div className="app">
			<AppAvatar />
			<AppNvaigation />
			<AppFooter />
			<ServerState />
		</div>
	);
}

ReactDom.render(
	<App />,
	document.getElementById("root")
)




