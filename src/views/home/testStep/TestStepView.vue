<template>
    <div class="card main_box">
        <!-- 左侧盒子 -->
        <div class="card left_box">
            <div class="title_box">
                <div class="title_box">
                    <img src="@/assets/icons/icon-api-b.png" width="25">
                </div>
                <div class="name">用例管理</div>  
            </div>
                <el-tabs class="demo-tabs" stretch v-model="ActiveTabs">
                    <el-tab-pane label="项目接口" name="api1">
                        <!-- 菜单展示 -->
                        <el-menu default-active="1" class="el-menu-vertical-demo" >
                            <!-- 注意项index的值必须确保唯一性 -->
                            <el-sub-menu :index="items.id.toString()" v-for="(items,index) in pstore.interface1" key="index">
                                <template #title>
                                    <el-icon size="small"><img src="@/assets/icons/icon-api-a.png" width="20"></el-icon>
                                    <el-tag type="info" size="small" style="margin: 0 5px;">post</el-tag>
                                    <span>{{items.name}}</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item :index="item.id+id" v-for="(item,id) in items.cases" key="id" style="height: 30px; line-height: 30px;"  @click="getCaseID(item.id)">
                                        <el-icon><img src="@/assets/icons/case.png" width="15"></el-icon>
                                        <span style="margin: 0 5px;">{{ item.title }}</span>
                                    </el-menu-item>
                                    <el-menu-item index="item.id+id" style="height: 30px; line-height: 30px;" @click="addCase(items.id)">
                                        <el-icon><img src="@/assets/icons/add-sub.png" width="15"></el-icon>
                                        <span style="color: #409EFF;">添加用例</span>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                        </el-menu>
                    </el-tab-pane>
                    <el-tab-pane label="外部接口" name="api2">
                        <!-- 菜单展示 -->
                        <el-menu default-active="2" class="el-menu-vertical-demo" >
                            <el-sub-menu :index="items.id.toString()" v-for="(items,index) in pstore.interface2" key="index">
                                <template #title>
                                    <el-icon size="small"><img src="@/assets/icons/icon-api-b.png" width="20"></el-icon>
                                    <el-tag type="info" size="small" style="margin: 0 5px;">post</el-tag>
                                    <span>{{items.name}}</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item :index="item.id+id" v-for="(item,id) in items.cases" key="id" style="height: 30px; line-height: 30px;">
                                        <el-icon><img src="@/assets/icons/case.png" width="15"></el-icon>
                                        <span style="margin: 0 5px;">{{ item.title }}</span>
                                    </el-menu-item>
                                    <el-menu-item index="item.id+id"  style="height: 30px; line-height: 30px;" @click="addCase(items.id)">
                                        <el-icon><img src="@/assets/icons/add-sub.png" width="15"></el-icon>
                                        <span style="color: #409EFF;">添加用例</span>
                                    </el-menu-item>
                                </el-menu-item-group>
                            </el-sub-menu>
                        </el-menu>
                    </el-tab-pane>
                </el-tabs>    
        </div>
        <!-- 右侧盒子 -->
        <div class="card right_box">
            <TestCase :case_id></TestCase>
        </div>
    </div>
</template>


<script setup>
import { ref,reactive } from 'vue';
import {ProjectStore} from '@/store/modoles/proStore'
import TestCase from './TestCase.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import api from '@/api';

const pstore=ProjectStore()
const ActiveTabs=ref('api1')
var case_id=ref('')
function getCaseID(id){
    case_id.value=id
}

// 添加接口用例
var newCase=reactive({
    title:'',
    interface:null
})
function addCase(id){
    ElMessageBox.prompt('请输入用例的名称', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '用例名称不为空',
  }
)
    .then(async({ value }) => {
        newCase.title=value
        newCase.interface=id
        const res=await api.addInterFaceCase(newCase)
        if (res.status===201){
            pstore.getInterFaces()
            getCaseID(res.data.id)
            ElMessage({
            type: 'success',
            message: `添加用例:${value}成功`,})
        }
        else{
            ElMessage({
            type: 'success',
            message: `添加用例:${value}失败`,})
        }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '添加用例取消',
      })
    })
}
</script>

<style scoped>
.main_box{
    height: calc(100% - 42px);
    display: flex;

    .left_box{
        width: 200px;
        .title_box{
            display: flex;
            height: 40px;
            align-items: center;
            justify-content: center;
            border-bottom: solid 1px #615f5f;
            .name{
                font-weight: bold;
                font-size: 15px;
                margin: 0 5px;
            }
        }
        .demo-tabs{
            .el-menu-vertical-demo{
                border: none;
            }
           
        }
    }
    .right_box{
        width: calc(100% - 200px);
        padding: 10px;
    }

}
</style>