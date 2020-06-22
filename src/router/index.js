import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '../pages/home/Goods.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'goods',
    component: Goods
  },
  {
    path: '/evaluation',
    name: 'evaluation',
    component: (resolve)=> require (['@/pages/home/Evaluation.vue'],resolve)
  },
  {
    path: '/merchants',
    name: 'merchants',
    component: ()=> import ('@/pages/home/Merchants.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  linkExactActiveClass:'active',
  routes
})

export default router
