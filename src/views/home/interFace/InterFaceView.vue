<template>
    <div class="main_box">
        <div class="card left_box">
            
            
            <InterFaceDebug></InterFaceDebug>
        </div>
        
        <div class="card right_box">
            <div class="title" style="text-align: center;font-weight: bold;height: 30px;">
                <div></div>
                <span>接口调试</span>
                <div></div>
            </div>
            <el-tabs v-model="activeName" type="card" class="demo-tabs">
                <el-tab-pane label="项目接口"><InterFaceList :interface="pstore.interface1" ></InterFaceList></el-tab-pane>
                <el-tab-pane label="第三方接口"><InterFaceList :interface="pstore.interface2" ></InterFaceList></el-tab-pane>
            </el-tabs>
        </div>
    </div>
   
</template>

<script setup>
import InterFaceDebug from './components/InterFaceDebug.vue';
import InterFaceList from './components/InterFaceList.vue';
import {ProjectStore} from '@/store/modoles/proStore' 
const pstore=ProjectStore()





</script>


<style scoped lang="scss">
.main_box{
    height: calc(100% - 42px);
    display: flex;
    .left_box{
        flex: 1;
        padding: 5px;
        
        .demo-tabs > .el-tabs__content {
            padding: 5px;
        }
        
    }
    .right_box{
        flex: 1;
    }
    .title{
            font-weight: bold;
            text-align: center;
            height: 30px;
            line-height: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            
        }
}
</style>

