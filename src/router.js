import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/restaurant',
      name: 'list',
      component: () => import('./views/List.vue')
    },
    {
      path: '/restaurant/:id',
      name: 'restaurant',
      component: () => import('./views/Restaurant.vue')
    },
    {
      path: '/payment',
      name: 'payment',
      component: () => import('./views/Payment.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
        meta: {
          notAuth: true
        }
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('./views/member/Member.vue'),
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: 'info',
          component: () => import('./views/member/Info.vue')
        },
        {
          path: 'orderlist',
          component: () => import('./views/member/Orderlist.vue')
        },
        {
          path: 'orderlist/:id',
          name: 'orderdetail',
          component: () => import('./views/member/Orderdetail.vue')
        }
      ]
    }
  ],
  
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router