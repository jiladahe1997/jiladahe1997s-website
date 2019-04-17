import Vue from 'Vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import ml from './ml.vue'

Vue.use(iView)
let App = new Vue({
  render(createElement){
    return createElement(ml)
  }
}) 
App.$mount('#app')