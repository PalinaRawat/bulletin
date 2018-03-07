import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ResetPassword from '@/components/ResetPassword'
import Settings from '@/components/Settings'
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
      path: '/reset',
      name: 'ResetPassword',
      component: ResetPassword
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: { requiresAuth: true }
    },
    {
      path: '/change',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authUser = localStorage.getItem('token')
  console.log('authUser: ' + authUser)
  if (to.meta.requiresAuth && !authUser) {
    router.push({ path: '/login', query: { plan: 'private' } })
    next({ name: 'Login' })
  }
  next()
})

export default router
