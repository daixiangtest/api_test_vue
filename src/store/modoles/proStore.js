import {defineStore} from 'pinia'
import api from '@/api/index'

export const ProjectStore=defineStore('proStore',
    {   
        // 全局数据存储
        state: () => {
            return {
                // 项目信息
                pro:{},
                // 环境列表
                env_list:[],
                // 选择的测试环境
                env:0,
                // 保存接口列表
                inetrfaces:[],
                // 测试业务流列表
                sceneList:[],
                // 测试计划列表
                taskList: []
            }

        },
        getters:{
            // 过滤出项目接口
            interface1(){
                return this.inetrfaces.filter((item) => {
                    return item.type==='1'
                })
            },
            // 过滤出第三方接口
            interface2(){
                return this.inetrfaces.filter((item) => {
                    return item.type==='2'
                })
            }
        },
        // 定义全局的方法
        actions:{
            // 获取接口列表
            async getInterFaces(){
                const res=await api.getInterFaces(this.pro.id)
                if (res.status===200){
                    this.inetrfaces=res.data
                }else{
                    console.log(`获取项目id${this.pro.id}失败`)
                }
            },
            // 获取测试业务流列表
            async getScenes(){
                const res=await api.getScenes(this.pro.id)
                if (res.status===200){
                    this.sceneList=res.data
                }
            },
            // 获取测试计划
            async getTestTask(){
                const res=await api.getTestTaskList(this.pro.id)
                if (res.status===200){
                    this.taskList=res.data
                }
            }
        },
        persist: {
            enabled:true,
            strategies:{
                key:"users",
                storage:localStorage
            }
        }
    },
    
  
)