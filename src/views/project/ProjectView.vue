<template>
    <div class="pro_page">
        <div class="pro_box">
            <!-- 顶部内容 -->
             <div class="welecome">
              <span>欢迎使用自动化测试平台</span>
              <el-button type="primary">添加项目</el-button>
             </div>
             <div class="pro_list">
              <el-carousel type="card" height="600px">
                <el-carousel-item v-for="(item,index) in pro_list" :key="index">
                    <!-- 项目卡片 -->
                     <div class="pro">
                        <img src="../../assets/images/pro01.png">
                        <div class="name">
                          {{item.name}}
                        </div>
                        <div class="btn_box">
                            <el-button type="success"  icon="Edit"></el-button>
                            <el-button type="success"  icon="Delete"></el-button>
                        </div>
                     </div>
                  
                </el-carousel-item>
              </el-carousel>
             </div>
        </div>

    </div>
  </template>



<script setup>
import {ref} from 'vue'
import api from '../../api/index'

let pro_list=ref([])
async function getProList() {
  const res = await api.getProListApi()
  if (res.status===200){
    pro_list.value=res.data
  } 
}
getProList()





</script>

<style lang="scss" scoped>
@import './project.scss'

</style>
  