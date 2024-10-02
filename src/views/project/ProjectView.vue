<template>
    <div class="pro_page">
        <div class="pro_box">
            <!-- 顶部内容 -->
             <div class="welecome">
              <span>欢迎使用自动化测试平台</span>
              <el-button type="primary" @click="showform">添加项目</el-button>
             </div>
             <div class="pro_list">
              <el-carousel type="card" height="600px">
                <el-carousel-item v-for="(item,index) in pro_list" :key="index">
                    <!-- 项目卡片 -->
                     <div class="pro">
                        <div @click="open_pro(item)">
                          <!-- <img src='../../assets/images/pro02.png'> -->
                          <img :src="imageUrls.urls[index]">   
                          <div class="name">{{item.name}}</div>
                        </div>
                        <div class="btn_box">
                            <el-button type="success"  icon="Edit" @click="clickUpdate(item)"></el-button>
                            <el-button type="success"  icon="Delete" @click="delproject(item)"></el-button>
                        </div>
                     </div>
                </el-carousel-item>
              </el-carousel>
             </div>
        </div>

    </div>
    <!--  添加项目弹框-->
    <el-dialog v-model="isShow" title="添加项目" width="500">
    <el-form :model="proData">
      <el-form-item label="项目名称" :label-width="formLabelWidth">
        <el-input v-model="proData.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="项目负责人" :label-width="formLabelWidth">
        <el-input v-model="proData.leader" autocomplete="on" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="off_form">取消</el-button>
        <el-button type="primary" @click="addProject">确认</el-button>
      </div>
    </template>
  </el-dialog>

  <!--  编辑项目弹框-->
  <el-dialog v-model="is_update" title="更改项目" width="500">
    <el-form :model="pro_update_edit">
      <el-form-item label="项目名称" :label-width="formLabelWidth">
        <el-input v-model="pro_update_edit.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="项目负责人" :label-width="formLabelWidth">
        <el-input v-model="pro_update_edit.leader" autocomplete="on" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="off_edit">取消</el-button>
        <el-button type="primary" @click="updatePro()">确认</el-button>
      </div>
    </template>
  </el-dialog>
  </template>



<script setup>
import {ref,reactive} from 'vue'
import api from '../../api/index'
import { ElMessage ,ElMessageBox} from 'element-plus'
import {useRouter} from 'vue-router'
import {ProjectStore} from '@/store/modoles/proStore'

let pro_list=ref([])
async function getProList() {
  const res = await api.getProListApi()
  if (res.status===200){
    pro_list.value=res.data
  } 
}
getProList()

const isShow=ref(false)
// 创建项目弹窗操作
function showform(){
  isShow.value=true
}
// 关闭添加项目弹窗操作
function off_form(){
  isShow.value=false
  proData.name=''
  proData.leader=''
}

// 添加项目操作
async function addProject() {
  const res = await api.createProApi(proData)
  // 请求接口添加成功提示
  if (res.status===201){
    ElMessage({
    message: '创建项目成功',
    type: 'success',
  })
  } 
  // 接口请求不成功提示失败
  else{
    ElMessage({
    message: '创建项目失败',
    type: 'error',
  })
}
  // 项目添加操作完成关闭弹窗重新过去项目列表
  off_form()
  getProList()

}
// 添加的项目数据
const proData=reactive({
  name:"",
  leader:""
})
// 项目图片展示地址
const imageUrls=reactive(
        {
            urls:[
            require('@/assets/images/pro01.png'),  
            require('@/assets/images/pro02.png'),  
            require('@/assets/images/pro03.png'),
            require('@/assets/images/pro04.png'),
            require('@/assets/images/pro05.png'),
            require('@/assets/images/pro06.png'),
            require('@/assets/images/pro07.png'),
            require('@/assets/images/pro08.png')
            ]  
        }
    )

// 删除项目
function delproject(pro){
  // 提示确认是否删除成功
  ElMessageBox.confirm(
    `删除项目:${pro.name}后数据将不再恢复，是否确认删除？`,
    // '删除项目后数据将不再恢复，是否确认删除？',
    '提示！',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      const res=await api.delProApi(pro.id)
      if (res.status===204){
        ElMessage({
        type: 'success',
        message: '删除成功',
      })
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
    getProList()   
}

// 更改项目信息相关操作
const is_update=ref(false)
const pro_update_edit=ref({})
function clickUpdate(pro){
  is_update.value=true
  pro_update_edit.value={...pro}
}
// 调用接口更新项目信息
async function updatePro(){
  let pro_id=pro_update_edit.value.id
  const res= await api.updateProApi(pro_id,pro_update_edit.value)
  if(res.status===200){
    ElMessage({
        type: 'success',
        message: '更改成功',
      })
    is_update.value=false
    getProList()
  }
}
// 关闭添加项目弹窗操作
function off_edit(){
  is_update.value=false
}

// 进入项目详情
const router = useRouter()

function open_pro(pro){
  let proStore=ProjectStore()
  router.push({name:'home'})
  proStore.pro=pro
}


</script>

<style lang="scss" scoped>
@import './project.scss'

</style>
  