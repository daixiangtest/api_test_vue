import {defineStore} from 'pinia'

export const ProjectStore=defineStore('proStore',
    {   
        // 全局数据存储
        state: () => {
            return {
                pro:{}
            }

        },
        // 定义全局的方法
        actions:{
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