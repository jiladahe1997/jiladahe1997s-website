import "./resume.css"
import "./resume.html"
var bounce = require("./bounce.js");

//loading 动画
(function(){
    bounce();
    let start_time=null;

    requestAnimationFrame(function progress_animation(time){
        let progress_inner = document.getElementsByClassName("progress-inner")[0];
        if(!start_time) start_time=time;

        let duration_total = 15000;                  //动画预计持续总时间
        let duration_now = time - start_time ;      //动画目前持续时间

        let progress_time = duration_now/duration_total;  //时间进度
        let progress_anime = progress_time;

        progress_inner.style.width = 100*progress_anime + "%";
        progress_inner.children[0].innerHTML = (100*progress_anime+"").substr(0,5) + "%" ;

        if(duration_now < duration_total ){
            requestAnimationFrame(progress_animation);
        }
        else{
            document.getElementsByClassName("loading-bg")[0].style.display = "none";
            document.getElementsByClassName("main")[0].style = "";
            console.log("动画结束！");
        }
    
    })
})()

window.onload = ()=>{
    let wheel_data={};
    wheel_data.countY = 0;
    window.addEventListener("wheel", (e)=>{wheel_move(e,wheel_data)});

    //懒加载图片
    window.addEventListener("wheel",lazy_load);
    //顺序加载图片
    order_load();
}


function wheel_move(e,wheel_data) {
    let rocket = document.getElementsByClassName("rocket")[0];

        if(e.deltaMode == 0) wheel_data.countY += e.deltaY ;
        else wheel_data.countY += e.deltaY/3*100;
        //小于零修正
        if (wheel_data.countY < 0 ) {
            wheel_data.countY = 0 ;
        }
        console.log("countY计数：",wheel_data.countY);
        console.log("countY模式：",e.deltaMode);

        switch (wheel_data.countY/100) {
            case 0:
                rocket.style.top = 202+"px";
                break;
            case 1:
                rocket.style.top = 202+(432-202)/2+"px";
                break;
            case 2:
                rocket.style.top = 202+(432-202)/1+"px";
                let name = document.getElementsByClassName("name")[0];
                let decorate_moon = document.getElementsByClassName("decorate-moon")[0];
                let summary_right = document.getElementsByClassName("summary-right")[0];
                name.classList.toggle("name-show");
                decorate_moon.classList.toggle("decorate-moon-show");
                summary_right.classList.toggle("summary-right-show");
                break;
            case 3:
                rocket.classList.toggle("rocket_left_down_1");
                rocket.style.top = 432+(712-432)/2+"px";
                rocket.style.left = 452-(452-132)/2+"px";
                rocket.style.transform = "rotate(75deg)";
                break;
            case 4:
                rocket.classList.toggle("rocket_left_down_2");
                rocket.style.top = 712+"px";
                rocket.style.left = 132+"px";
                rocket.style.transform = "rotate(0deg)";
                let school = document.getElementsByClassName("school")[0];
                let decorate_school1 = document.getElementsByClassName("decorate-school1")[0];
                let decorate_school2 = document.getElementsByClassName("decorate-school2")[0];
                school.classList.toggle("school-show");
                decorate_school1.classList.toggle("decorate-school1-show");
                decorate_school2.classList.toggle("decorate-school2-show");
                break;
            case 5:
                rocket.classList.toggle("rocket_right_down_1");
                rocket.style.top =  712+(1052-712)/2+ "px";
                rocket.style.left =  132+(382-132)/2+ "px";
                rocket.style.transform = "rotate(-75deg)";
                break;
            case 6:
                rocket.classList.toggle("rocket_right_down_2");
                rocket.style.top = 1052 + "px";
                rocket.style.left = 382 + "px";
                rocket.style.transform = "rotate(0deg)";
                let brief = document.getElementsByClassName("brief")[0];
                let decorate_brief1 = document.getElementsByClassName("decorate-brief1")[0];
                let decorate_brief2 = document.getElementsByClassName("decorate-brief2")[0];
                let decorate_brief4 = document.getElementsByClassName("decorate-brief4")[0];
                for(let i=0;i<decorate_brief4.children.length;i++){
                    for(let j=0;j<decorate_brief4.children[i].children.length;j++){
                        decorate_brief4.children[i].children[j].classList.add("decorate-brief4-"+(i+1)+"-"+(j+1));
                        console.log(decorate_brief4.children[i].children[j]);
                    }
                }
                brief.classList.toggle("brief-show");
                decorate_brief1.classList.toggle("decorate-brief1-show");
                //decorate_brief1.classList.toggle("decorate-brief1-rotate");         //发现css一次可以添加两个animation
                decorate_brief2.classList.toggle("decorate-brief2-show");

                break;
            default:
                break;
        }
}


function lazy_load(){
    let lazy_img1 = document.getElementsByClassName("contact-phone")[0].children[0];
    let lazy_img2 = document.getElementsByClassName("contact-qq")[0].children[0];
    let lazy_img3 = document.getElementsByClassName("contact-mail")[0].children[0];
    let window_Height = window.innerHeight;
    let scroll_Height = window.scrollY;
    let element_Height = document.getElementsByClassName("contact-phone")[0].children[0].offsetTop;

    if (window_Height + scroll_Height >= element_Height) {
        console.log(lazy_img1)
        //开始加载
        lazy_img1.setAttribute("src",lazy_img1.getAttribute("lazy-data"));
        lazy_img2.setAttribute("src",lazy_img2.getAttribute("lazy-data"));
        lazy_img3.setAttribute("src",lazy_img3.getAttribute("lazy-data"));
    
    }
}


function order_load(){
    let img1 = document.getElementsByClassName("mainAchievement-personalGithub")[0].children[0];
    let img2 = document.getElementsByClassName("mainAchievement-personalWebsite")[0].children[0];

    //加载图片1：
    img1.setAttribute("src",img1.getAttribute("order-data"));

    img1.addEventListener("load",()=>{
        console.warn("顺序加载，图片1加载完毕，开始加载图片2");
        img2.setAttribute("src",img2.getAttribute("order-data"));
        img2.addEventListener("load",()=>{
            console.warn("顺序加载，图片2加载完毕");
        })
    })
}