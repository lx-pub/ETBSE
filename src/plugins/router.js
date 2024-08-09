import { createRouter } from 'vue-router'
import { createWebHistory, createWebHashHistory, createMemoryHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/home'},
    {
      path: '/home', name: 'home', component: ()=>import('@/views/index.vue'), children: [
        {path: 'test', name: 'test', component: ()=>import('@/views/home/test.vue')},
      ]
    },
    {
      path: '/manager', name: 'manager', component: ()=>import('@/views/manager/index.vue'), children: [

      ]
    },
    {path: '/:other(.*)', component: ()=>import('@/views/404.vue')}
  ]
})

export default router
