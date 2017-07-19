// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
// import router from './router/index.js'
import Home from './components/HelloFromVux'



import login from './components/login/login.vue'
import regRegular from './components/register/Regular.vue'
import forgetList from './components/forget/forgetList.vue'
import forget from './components/forget/forget.vue'
import agreement from './components/agreement/index.vue'


Vue.use(VueRouter)






const routes = [
	{path: '/', component: Home},
	{path: '/agreement/index',name:'agreement', component: agreement},
	{path: '/login/regular', name:'login', component:login},
	{path: '/register/regular', name:'regRegular', component:regRegular},
	{path: '/forget/forgetList', name:'forgetList', component:forgetList},
	{path: '/forget/forget', name:'forget', component:forget},
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
