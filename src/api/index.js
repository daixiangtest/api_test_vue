import axios from "axios";
import {UserStore} from '../store/modoles/userStore'
import { ElMessage } from 'element-plus'
import router from "@/router";

// 配置请求的url
axios.defaults.baseURL='http://127.0.0.1:8000'
// 配置默认返回请求状态为true
axios.defaults.validateStatus=function () {
    return true; // 默认值
  }
// 跨域请求时自动携带token
axios.defaults.withCredentials=true

// 添加请求拦截器
axios.interceptors.request.use(function (config) {

    if (config.url !== '/api/users/login/'){
      const userStore=UserStore()
      config.headers.Authorization=userStore.token
    }
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.status===401){
      ElMessage({
        message: response.data,
        type: 'error',
        plain: true,
      })
      router.push({name:"login"})
    }
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

//   后端请求的接口封装
  export default {
    // 登录后端接口
    loginApi(params){
      return axios.post('/api/users/login/',params)
    },
    // 验证token是否有效
    verifyApi(params){
      return axios.post('/api/users/token/verify/',params)
    },
    // 查询项目列表
    getProListApi(){
      return axios.get('/api/testPro/projects/')
    },

    // 创建项目
    createProApi(body){
      return axios.post('/api/testPro/projects/',body)
    },

    // 更改项目
    updateProApi(id,body){
      return axios.patch(`/api/testPro/projects/${id}/`,body)
    },

    // 获取项目详情
    getProApi(id){
      return axios.get(`/api/testPro/projects/${id}/`)
    },

    // 删除项目
    delProApi(id){
      return axios.delete(`/api/testPro/projects/${id}/`)
    },
    // 获取项目的环境
    getTestEnvList(pro_id){
      return axios.get('/api/testPro/envs/',
        {params:{project:pro_id}})
    },
    // 添加测试环境
    addTestEnv(body){
      return axios.post('/api/testPro/envs/',body)
    },
    // 修改测试环境
    updateTestEnv(env_id,body){
      return axios.patch(`/api/testPro/envs/${env_id}/`,body)
    },
    // 删除测试环境
    delTestEnv(env_id){
      return axios.delete(`/api/testPro/envs/${env_id}/`)
    },
    // 获取测试环境详情
    getTestEnv(env_id){
      return axios.get(`/api/testPro/envs/${env_id}`)
    },
    // 运行单条接口用例
    runInterFaceCase(body){
      return axios.post('/api/TestInterFace/cases/run/',body)
    },
    // 新增接口
    addInterFace(body){
      return axios.post('/api/TestInterFace/interfaces/',body)
    },
    // 编辑接口
    updateInterFace(interfaces_id,body){
      return axios.patch(`/api/TestInterFace/interfaces/${interfaces_id}/`,body)
    },
    // 删除接口
    delInterFace(interfaces_id){
      return axios.delete(`/api/TestInterFace/interfaces/${interfaces_id}/`)
    },
    // 获取接口列表
    getInterFaces(pro_id){
      return axios.get('/api/TestInterFace/interfaces/',{
        params:{
          project:pro_id
        }
      })
    },
    // 获取测试用例的详情
    getInterFacesCase(case_id){
      return axios.get(`/api/TestInterFace/cases/${case_id}/`)
    },
    // 添加测试用例
    addInterFaceCase(body){
      return axios.post('/api/TestInterFace/cases/',body)
    },
    // 修改测试用例
    updateInterFaceCase(interfaces_id,body){
      return axios.patch(`/api/TestInterFace/cases/${interfaces_id}/`,body)
    },
    // 删除测试用例
    delInterFaceCase(case_id){
      return axios.delete(`/api/TestInterFace/cases/${case_id}/`)
    }

  }