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
  {
    path: '/project/home',
    name: 'home',
    
    component: () => import('../views/home/HomeView.vue'),
    // 默认重定向到测试环境展示
    redirect: '/project/home/testenv',
    // 配置子路由
    children:[
      {
        path: '/project/home/testenv',
        name: 'testenv',
        component: () => import('../views/home/testEnv/TestEnvView.vue'),
        meta:{
          name:'项目环境',
          iconImg:require('@/assets/icons/data.png')

        }
      },
      {
        path: '/project/home/interface',
        name: 'interface',
        component: () => import('../views/home/interFace/InterFaceView.vue'),
        meta:{
          name:'接口管理',
          iconImg: require("@/assets/icons/dropbox.png")
        }
      },
      {
        path: '/project/home/testStep',
        name: 'testStep',
        component: () => import('../views/home/testStep/TestStepView.vue'),
        meta:{
          name:'接口用例',
          iconImg: require("@/assets/icons/icon-api-a.png")

        }
      },
      {
        path: '/project/home/testscent',
        name: 'testscent',
        component: () => import('../views/home/testScent/TestScentView.vue'),
        meta:{
          name:'业务流测试',
          iconImg: require("@/assets/icons/liucheng.png")
        }
      },
      {
        path: '/project/home/testplan',
        name: 'testplan',
        component: () => import('../views/home/testPlan/TestPlanView.vue'),
        meta:{
          name:'测试计划',
          iconImg: require("@/assets/icons/repair.png")
        }
      },
      {
        path: '/project/home/crontab',
        name: 'crontab',
        component: () => import('../views/home/crontab/CrontabView.vue'),
        meta:{
          name:'定时任务',
          iconImg: require("@/assets/icons/hourglass.png")
        }
      },
      {
        path: '/project/home/bugs',
        name: 'bugs',
        component: () => import('../views/home/bugs/BugsView.vue'),
        meta:{
          name:'bug管理',
          iconImg: require("@/assets/icons/debug.png")
        }
      },
      {
        path: '/project/home/records',
        name: 'records',
        component: () => import('../views/home/records/RecordsView.vue'),
        meta:{
          name:'数据看板',
          iconImg: require("@/assets/icons/analysis.png")
        }
      },
      {
				path: '/records/report/:id',
				name: 'report',
				component: () => import( /* webpackChunkName: "about" */ '../views/home/testReport/reportView.vue'),
				meta: {
					name: "测试报告",
          iconImg: require("@/assets/icons/file-addition.png")
				}
			},

    ]
  },
  {
    path: '/project/testEnv',
    name: 'testEnv',
    
    component: () => import('../views/testEnv/TestEnvView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 添加路由导航守卫
import {UserStore} from '../store/modoles/userStore'

router.beforeEach(async (to) => {


  const usStore=UserStore()
  // 判断是否有子路由标签有则全局保存
  if (to.meta.name){
    usStore.saveTabs(to)
  }

  let token=usStore.token
  if (
    // 检查用户是否存在token且不在登录页面
    token === '' && to.name !== 'login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'login' }
  }
})

export default router
