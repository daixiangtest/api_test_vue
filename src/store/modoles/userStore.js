
import {defineStore} from 'pinia'

export const UserStore=defineStore('userStore',
    {   
        // 全局数据存储
        state: () => {
            return {
                token:"",
                username:"",
                iscollapse:false,
                // 表示历史访问路由的信息
                tabs:[]
            }

        },
        // 定义全局的方法
        actions:{
            // 保存token
            saveToken(value){
                this.token='Bearer '+value
            },
            saveUserName(value){
                this.username=value
            },
            // 保存路由名称
            saveTabs(rout){
                const res=this.tabs.find((item) => {
                   return item.path===rout.path
                })
                if (!res){
                    this.tabs.push({name:rout.meta.name,path:rout.path,url:rout.meta.iconImg})
                }   
            },
            delTabs(path){
                
                // 过滤掉path符合的值重新赋值
                this.tabs = this.tabs.filter((item) => {
                   return item.path !==path
                })
            }

        },
        persist: {
            enabled:true,
            strategies:{
                key:"users",
                storage:localStorage
            }
        },
        
    },
    
  
)