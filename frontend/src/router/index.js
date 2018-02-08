import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ChangePassword from '@/components/ChangePassword'

Vue.use(Router)

var router = new Router({
  authenticated: false,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/changePassword',
      name: 'Change Password',
      component: ChangePassword
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authUser = localStorage.getItem('token')
  if (to.meta.requiresAuth && !authUser) {
    next({ name: 'Login' })
  }
  next()
})

export default router
