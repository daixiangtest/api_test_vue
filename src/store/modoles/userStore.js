
import {defineStore} from 'pinia'

export const UserStore=defineStore('userStore',
    {   
        // 全局数据存储
        state: () => {
            return {
                token:"",
                username:""
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