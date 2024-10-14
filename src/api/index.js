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
    }
  }