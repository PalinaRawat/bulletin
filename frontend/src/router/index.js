import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Signup from '@/components/Signup'
import Login from '@/components/Login'
import Home from '@/components/Home'
import ResetPassword from '@/components/ResetPassword'
// import Settings from '@/components/Settings'

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
      component: Login,
      meta: { requiresAuth: true }
    }
  ]
})

/* Check to make sure the user has auth permission to access the page */
router.beforeEach((to, from, next) => {
  const authUser = localStorage.getItem('token')
  if (to.meta.requiresAuth && !authUser) {
    // console.log("requiresAuth: true")
  }
  next()
})

export default router
