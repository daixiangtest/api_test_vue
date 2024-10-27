<template>  
  <div>
  </div>
    <div><el-button type="primary" @click="openDraweradd">添加接口</el-button></div>
    <el-table :data="interface" border style="width: 100%">
      <el-table-column prop="name" label="接口名称" width="150" />
      <el-table-column prop="url" label="接口地址" width="260" />
      <el-table-column prop="method" label="请求方法" width="180"  />
      <el-table-column label="操作">
        <template #default="scoped">
          <el-button type="primary" icon="Edit" circle plain @click="edit_interface(scoped.row)"/>
          <el-button type="danger" icon="Delete" circle plain @click="delInterface(scoped.row.id)"/>
        </template>
        
      </el-table-column>
    </el-table>


    <!-- 右侧抽屉弹窗 -->
    <el-drawer v-model=isShow title="title"  direction="rtl" class="demo-drawer">
      <div class="demo-drawer__content">
        <el-form :model="interfaceData" label-width="auto" style="max-width: 100%">
          <el-form-item label="接口名称">
            <el-input v-model="interfaceData.name" />
          </el-form-item>
          <el-form-item label="接口地址">
            <el-input v-model="interfaceData.url" />
          </el-form-item>
          <el-form-item label="请求方式">
            <el-select v-model="interfaceData.method">
              <el-option label="GET" value="get" />
              <el-option label="POST" value="post" />
              <el-option label="PATCH" value="patch" />
              <el-option label="PUT" value="put" />
              <el-option label="DELETE" value="delete" />
            </el-select>
          </el-form-item>
          <el-form-item label="接口类型">
            <el-select v-model="interfaceData.type">
              <el-option label="项目接口" value="1" />
              <el-option label="第三方接口" value="2" />
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm" type="info">取消</el-button>
          <el-button v-if="title==='添加接口'" type="primary" @click="onClick">确定</el-button>
          <el-button v-else type="primary" @click="updateInterfase(interfaceData)">确定</el-button>
        </div>
      </div>
    </el-drawer>
</template>  
  
<script setup>  
import api from '@/api';
import {ProjectStore} from '@/store/modoles/proStore' 
import { defineProps,ref,reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
const props=defineProps({
  interface:[]
})

var isShow=ref(false)
const pstore=ProjectStore()

// 控制弹窗展示
var title=ref('添加接口')

var interfaceData=reactive(
  {
    name:'',
    url:'',
    method:'get',
    type:'1',
    project:pstore.pro.id
  }
)
function openDraweradd(){
    title.value='添加接口'
    isShow.value=true
    interfaceData.name=''
    interfaceData.url=''
    interfaceData.method='get'
    interfaceData.type='1'
}
function cancelForm(){
  isShow.value=false
}

// 添加接口
async function onClick() {
  var res=await api.addInterFace(interfaceData)
  if (res.status===201){
    ElMessage({
                type: 'success',
                message: '添加成功',
                })
    pstore.getInterFaces()
    isShow.value=false
  }else{
    ElMessage({
                type: 'error',
                message: '添加失败',
                })
  }
} 
 // 提示是否删除
 function test(){
  alert('sss')
}

function delInterface(id){
  ElMessageBox.confirm(
    '接口用例删除以后数据不可恢复，确认删除吗',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async() => {
      const res=await api.delInterFace(id)
      if (res.status===204){
          ElMessage({
          type: 'success',
          message: '删除成功',})
          pstore.getInterFaces()
      }else{
        ElMessage({
        type: 'error',
        message: '删除失败',
      })
      }
      
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}
// 打开接口编辑
function edit_interface(item){
  title.value='编辑接口'
  isShow.value=true
  interfaceData.name=item.name
  interfaceData.url=item.url
  interfaceData.method=item.method
  interfaceData.type=item.type
  interfaceData.id=item.id
}
// 提交编辑信息
async function updateInterfase(item){
    const res=await api.updateInterFace(item.id,interfaceData)
    if (res.status===200){
      ElMessage({
          type: 'success',
          message: '更改成功',})
          pstore.getInterFaces()
          isShow.value=false
    }else{
      ElMessage({
          type: 'error',
          message: '更改失败',})
          isShow.value=false
    }
}
</script>  
  
<style scoped>  

</style>