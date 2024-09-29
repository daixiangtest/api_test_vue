import { createRouter, createWebHistory } from 'vue-router'

const routes = [
 
  {
    path: '/',
    name: 'Index',
    
    component: () => import('../views/IndexView.vue')
  },
  // 登录页面路由
  {
    path: '/user/login',
    name: 'login',
    
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/project',
    name: 'project',
    
    component: () => import('../views/project/ProjectView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
