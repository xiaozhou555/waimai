// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import  VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Api from '../static/js/api'

Vue.use(ElementUI);
Vue.use(VueAxios,axios)
// Vue.prototype.$ajax = Api;
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.prototype.$ajax = function(fun,datas,success,er){
  Api[fun](datas)
    .then(function(response){
      success(response);

    })
    .catch(function(error){
      er(error);
    })
}

new Vue({
  el: '#app',
   router,
  components: { App },
  template: '<App/>'
})

