import Vue from 'Vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import './ml.css'
import app from './app.vue'

Vue.use(iView)
let App = new Vue({
  render(createElement){
    return createElement(app)
  }
}) 
App.$mount('#app')