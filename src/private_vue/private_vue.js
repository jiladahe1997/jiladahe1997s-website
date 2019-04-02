var Vue = require("vue").default //这里require用的时webpack解析，webpack解析require时会默认放在default里面，
console.log(Vue)


Vue.component("app-searchbox",{
    template:"#app-searchbox",
})

Vue.component("app-container",{
    template:"#appContainer"
})

Vue.component("item",{
    template:"#item"
})

Vue.component("item-img",{
    template:"#itemImg",
    data: ()=>{
        return {
            imgSrc:" "
        }
    }
})

Vue.component("item-text",{
    template:"#itemText",
    data: ()=>{
        return {
            imgText:"加载中..."
        }
    }
})
var app = new Vue({
    el:"#app",
    data:{
        searchboxInput: null
    }
})