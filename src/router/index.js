import Vue from 'vue'

import Router from 'vue-router'

import Login from '../components/Login/login'

import Home from '../components/Home/home'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/home', component: Home },
    { path: '/login', component: Login }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
