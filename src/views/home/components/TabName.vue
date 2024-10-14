<template>
    <div class="tab_box">
        <el-tabs type="card" class="demo-tabs"  v-model="$route.path" @tab-click="check_tab" @tab-remove="del_tab">
            <div class="tab" v-for="tab,index in ustore.tabs" v-bind:key="index">
                <el-tab-pane v-if="$route.path !==tab.path" closable :label="tab.name" :name="tab.path">
                    <template #label>  
                        <span class="custom-tabs-label">
                            <img :src="tab.url">
                            {{tab.name}}
                        </span>  
                    </template>  
                </el-tab-pane>
                <el-tab-pane v-else :label="tab.name" :name="tab.path">
                    <template #label>  
                        <span class="custom-tabs-label">
                            <img :src="tab.url">
                            {{tab.name}}
                        </span>  
                    </template>  
                </el-tab-pane>
            </div>
        </el-tabs>
    </div>
</template>

<script setup>
import {UserStore} from '@/store/modoles/userStore'
import { useRouter } from 'vue-router';
var ustore=UserStore()
var router=useRouter()
// 点击标签款切换路由
function check_tab(ele){
    router.push(ele.props.name)
}
// 删除标签
function del_tab(path){
    ustore.delTabs(path)
}


</script>

<style scoped lang="scss">
    .tab_box{
        height: 40px;
        border-bottom: solid 1px #615f5f;
        text-align: center;
        .custom-tabs-label{
            display: flex;  
            justify-content: center; // 水平居中  
            align-items: center; // 垂直居中  
            height: 20px; // 示例：使父容器占据整个视口高度
        }
        img{
            // margin-left: auto;  
            margin-right: 5px;
            width: 20px;
            height: 20px;
        }
    }
</style>