import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/index.vue'

import session from '@/components/session/index.vue'
import login from '@/components/session/login.vue'
import regRegular from '@/components/session/regular.vue'
import forgetList from '@/components/session/forgetList.vue'
import forget from '@/components/session/forget.vue'
import agreement from '@/components/session/agreement.vue'

Vue.use(Router);

const router = new Router({
	routes: [
		{path: '/', component: Home},
		{
			path: '/session',
			name: 'session',
			component: session,
			redirect:'/session/login',
			children: [
				{path: '/session/agreement', name: 'agreement', component: agreement},
				{path: '/session/login', name: 'login', component: login},
				{path: '/session/regRegular', name: 'regRegular', component: regRegular},
				{path: '/session/forgetList', name: 'forgetList', component: forgetList},
				{path: '/session/forget', name: 'forget', component: forget}
			]
		},
	]
})

export default router;