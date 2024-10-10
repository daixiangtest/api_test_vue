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
                2024年10月10日 19:08:38
             </div>
             <!-- 环境选择 -->
             <el-select v-model="env" placeholder="选择环境" style="width: 240px">
                <el-option label="环境1" value="1"/>
                <el-option label="环境2" value="2"/>
                <el-option label="环境3" value="3"/>
            </el-select>

        </div>
        <!-- 中间布局 -->
        <div class="center_box">自动化测试平台</div>
        <!-- 右侧布局 -->
        <div class="right_box">
            <el-icon size="30"><Rank /></el-icon>
            <img src="@/assets/images/avatar02.png">
        </div>
    </div>
</template>

<script setup>
import {UserStore} from '@/store/modoles/userStore'
import {ref} from 'vue'
const us=UserStore()
// 控制底部顶部菜单栏图标切换
function switchCollap(){
    us.iscollapse= !us.iscollapse
}

let env=ref()
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
        background: url(@/assets/images/header-center-bg.png);
        background-repeat: no-repeat;
        background-size: cover;
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
        img{
            padding-left: 10px ;
            width: 40px;
            height: 40px;
        }
    }
}

</style>