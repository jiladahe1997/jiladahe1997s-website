import "./index_vue.css" 
import Vue from "vue"

Vue.component("vue-avatar",{
    template:"#avatar",
})

Vue.component("vue-introduction",{
    template:"#Introduction"
})

Vue.component("vue-nav",{
    template:"#nav"
})

Vue.component("vue-footer",{
    template:"#footer"
})

new Vue({
    el:"#app"
})