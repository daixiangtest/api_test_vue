<template>
    <div class="head_box">
        <!-- 左侧布局 -->
        <div class="left_box">
            <!-- 图标 -->
            <el-icon size="28" @click="switchCollap">
                <Expand v-if="us.iscollapse" />
                <Fold v-else />
            </el-icon>
            <!-- 时间展示 -->
             <div class="time_info">
                {{ntime}}
             </div>
             <!-- 环境选择 -->
             <el-select v-model="env1" placeholder="选择环境" style="width: 240px">
                <el-option v-for="env in envList" :label="env.name" :value="env.id" :key="env.id"/>
            </el-select>

        </div>
        <!-- 中间布局 -->
        <div class="center_box">自动化测试平台</div>
        <!-- 右侧布局 -->
        <div class="right_box">
            <el-icon size="30" @click="screenFull.toggle()"><Rank /></el-icon>
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img src="@/assets/images/avatar02.png">
                </span>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item icon="Menu" @click="checkoutPro()">选择项目</el-dropdown-item>
                    <el-dropdown-item icon="SwitchButton" @click="loginOut()">退出登录</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import {UserStore} from '@/store/modoles/userStore'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import { ElMessage } from 'element-plus'
import {ProjectStore} from '@/store/modoles/proStore'
import { storeToRefs } from 'pinia'

// 页面全屏展示的库(需要安装screenfull)
import screenFull from 'screenfull'
const us=UserStore()
// 控制顶部菜单栏图标的收放功能
function switchCollap(){
    us.iscollapse= !us.iscollapse
}
// 控制选中的环境变量做全局存储
var proStore=ProjectStore()
// 将全局对象转化为ref的响应式对象
var proStoreRef=storeToRefs(proStore)
var envList=proStoreRef.env_list
var env1=proStoreRef.env


// 定义时间
function getTime(){
    let now_time=new Date()
    let y=now_time.getFullYear()
    let M=now_time.getMonth()+1
    let d=now_time.getDate()
    let h=now_time.getHours()
    let m=now_time.getMinutes()
    let s=now_time.getSeconds()
    if (h<10){
        return '0'+h
    }
    if (m<10){
        return '0'+m
    }
    if (s<10){
        return '0'+s
    }
    return `${y}年${M}月${d}日 ${h}:${m}:${s}`
}
var ntime=ref()
// 定时任务执行获取时间
setInterval(() => {
    ntime.value=getTime()
},1000)

// 切换至项目页面
const router=useRouter()
function checkoutPro(){
    router.push({name:"project"})
}

// 退出返回登录页面
function loginOut(){
    router.push({name:"login"})
    ElMessage({
                    message: '退出登录成功',
                    type: 'success',
                })
    us.token=''
}

</script>

<style scoped lang="scss">
.head_box{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: url(@/assets/images/header-line.png);
    background-repeat: no-repeat;
    background-size:cover;
    height: 55px;
    padding: 0 20px;
    // 左侧样式
    .left_box{
        display: flex;
        align-items: center;
        height: 55px;
        flex: 1;
        .time_info{
            color: rgb(48, 207, 207);
            font-weight: bold;
            width: 130px;
        }
        .el-icon{
            margin-top: 10px;
            margin: 0 10px;
            
        }
        .el-select{
            margin-right: 10px;
        }
    }
    // 中间样式
    .center_box{
        background-image: url(@/assets/images/header-center-bg.png);
        background-size: cover;
        background-repeat: no-repeat;
        height: 37px;
        width: 500px;
        line-height: 45px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: rgb(48, 207, 207);
        flex: 1;
    }
    // 右侧样式
    .right_box{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: right;
        .el-dropdown-link{
            // padding-left: 10px ;
            width: 40px;
            height: 40px;
            outline: none;
            img{
            width: 40px;
            height: 40px;
        }
        }
        
    }
}

</style>