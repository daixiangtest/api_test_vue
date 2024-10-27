<template>
    <div class="main_box">
        <div class="card left_box">
            <!-- 左侧标题栏 -->
            <div class="title_box">
                <img src="@/assets/icons/data.png" width="25">
                <div class="name">测试环境</div>
                <el-button type="primary" text size="small" icon="CirclePlus" @click="addEnv">添加环境</el-button>
            </div>
            <!-- 环境展示栏 -->
            <el-menu :default-active="env_info.id" class="el-menu-vertical-demo" >
                    <el-menu-item :index="env.id" v-for="env ,index in list_pro" v-bind:key="index" @click="selectEnv(env)">
                        <el-icon><img src="@/assets/icons/data.png" width="15px"></el-icon>
                        <span>{{ env.name }}</span>
                    </el-menu-item>
            </el-menu>
            <!-- 添加项目参数的弹窗 -->
            <el-dialog v-model="isShow" title="添加项目环境" width="500">
                <el-form :model="body" :rules="rulesEnv" ref="data">
                <el-form-item label="环境名称" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="body.name" autocomplete="on" />
                </el-form-item>
                <el-form-item label="环境域名" :label-width="formLabelWidth" prop="host">
                    <el-input v-model="body.host" autocomplete="on" />
                </el-form-item>
                </el-form>
                <template #footer>
                <div class="dialog-footer">
                    <el-button @click="cencelBox">
                        取消
                    </el-button>
                    <el-button type="primary" @click="newEnv(data)">
                        确认
                    </el-button>
                </div>
                </template>
            </el-dialog>
        </div>
        <!-- 中间编辑栏 -->
        <div class="card center_box">
            <el-divider content-position="left">基本信息</el-divider>
            <el-input v-model="env_name" style="max-width: 600px" placeholder="环境名称">
                <template #prepend>环境名称</template>
            </el-input>
            <el-input v-model="env_host" style="max-width: 600px; margin-top: 5px;" placeholder="Http://"> 
                <template #prepend>全局域名</template>
            </el-input>
            <el-divider content-position="left">请求头\数据库</el-divider>
            <el-tabs  class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="全局Header" >
                    <EditorCopmponts v-model="env_header" height='200px' lang="json"></EditorCopmponts>
                </el-tab-pane>
                <el-tab-pane label="DB配置" >
                    <EditorCopmponts v-model="env_db" height='200px' lang="json"></EditorCopmponts>
                </el-tab-pane>  
            </el-tabs>
            <el-divider content-position="left">环境变量</el-divider>
            <el-tabs  class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="全局变量" >
                    <EditorCopmponts v-model="env_global_variable"  lang="json"></EditorCopmponts>
                </el-tab-pane>
                <el-tab-pane label="局部变量" >
                    <EditorCopmponts v-model="env_debug_global_variable"  lang="json"></EditorCopmponts>
                </el-tab-pane>
                
                <el-affix :offset="40" position="bottom">
                    <div class="button_box">
                    <el-button type="primary" plain size="small" @click="saveEnv">保存编辑</el-button>
                    <el-button type="success" plain size="small" @click="copyEnv">复制环境</el-button>
                    <el-button type="danger" plain size="small" @click="delEnv()">删除环境</el-button>
                </div>
                </el-affix>
            </el-tabs>
            
        </div>
        <!-- 右侧编辑栏 -->
        <div class="card right_box">
            <el-divider content-position="left">全局工具函数</el-divider>
            <EditorCopmponts v-model="env_global_func"  lang="python" height="calc(100% - 50px)"></EditorCopmponts>
        </div>
    </div>

    
    
</template>


<script setup>
import api from '@/api/index'
import {ref,onMounted,reactive} from 'vue'
import {ProjectStore} from '@/store/modoles/proStore'
import EditorCopmponts from '../components/EditorCopmponts.vue';
import { ElMessage, ElMessageBox } from 'element-plus'



// 获取项目所有的环境信息
var list_pro=ref([])
var pro_store=ProjectStore()
async function getListPro(){
    const pro_id=pro_store.pro.id
    const res=await api.getTestEnvList(pro_id)
    if (res.status===200){
        list_pro.value=res.data
        // 全局保存测试环境列表
        pro_store.env_list=res.data
    }
}
// 添加项目环境的弹窗
const isShow = ref(false)
const body = reactive({
  name: '',
  host: '',
  project:''
})

function cencelBox(){
    isShow.value=false
    body.name=''
    body.host=''
}

function addEnv(){
    isShow.value=true
}
const data=ref()
function newEnv(data){
    data.validate(async function(res1){
        // 校验失败直接返回结果
        if (!res1) return
        body.project=pro_store.pro.id
        var res= await api.addTestEnv(body)
        if (res.status===201){
            ElMessage({
                type: 'success',
                message: '添加成功',
                })
            getListPro()
            isShow.value=false
            body.name=''
            body.host=''
        }
        else{
            ElMessage({
                type: 'error',
                message: '添加失败',
                })
        }
        })
    }
// 输入框架校验规则
const rulesEnv = reactive({
        name:[{ required: true, message: '项目名称不能为空', trigger: 'blur' }],
        host:[{ required: true, message: '环境域名不能为空', trigger: 'blur' },
        {  
            required: true,  
            pattern: /^(https?:\/\/[^\s]+)$/,   
            message: 'URL格式不正确，必须以http://或https://开头',   
            trigger: ['blur', 'change']   
        }  ,]
    })


// 页面数据信息
var env_name=ref('')
var env_host=ref('')
var env_header=ref('{}')
var env_db=ref('[]')
var env_global_variable=ref('{}')
var env_debug_global_variable=ref('{}')
var env_global_func=ref('')
// 展示环境信息
// envName.value="ceshi"
var env_info=ref({id:1})
function selectEnv(env){
    env_info.value=env
    env_name.value=env.name
    env_host.value=env.host
    env_header.value=JSON.stringify(env.headers,0,4) || '{}'
    env_db.value=JSON.stringify(env.db,0,4) || '[]'
    env_global_variable.value=JSON.stringify(env.global_variable,0,4) || '{}'
    env_debug_global_variable.value=JSON.stringify(env.debug_global_variable,0,4) || '{}'
    env_global_func.value=env.global_func
}
// 通过onMounted 生命周期钩子函数来实现组件挂在数据完毕后设置一个默认的环境
onMounted (async() =>{
    await getListPro()
    if (list_pro.value.length>0){
        selectEnv(list_pro.value[0])
    }
})

// 环境的增删改操作
function delEnv(){
    ElMessageBox.confirm(
    '项目环境删除后数据不可恢复，确认删除吗？',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
        var res=await api.delTestEnv(env_info.value.id)
        if (res.status===204){
            getListPro()
            ElMessage({
            type: 'success',
            message: '删除成功',
            })
        if (list_pro.value.length>0){
            selectEnv(list_pro.value[0])}
        }     
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })
}

async function copyEnv(){
    var body=env_info.value
    body.name=env_info.value.name+"copy"
    var res= await api.addTestEnv(body)
    if (res.status===201){
        ElMessage({
            type: 'success',
            message: '复制成功',
            })
        getListPro()
    }else{
        ElMessage({
            type: 'error',
            message: '复制失败',
            })
    }
}   

async function saveEnv() {
    var env_id =env_info.value.id
    var body={
        name:env_name.value,
        host:env_host.value,

        headers:JSON.parse(env_header.value),
        db:JSON.parse(env_db.value),
        global_variable:JSON.parse(env_global_variable.value),
        debug_global_variable:JSON.parse(env_debug_global_variable.value),
        global_func:env_global_func.value
    }
    var res = await api.updateTestEnv(env_id,body)
    if (res.status ===200){
        ElMessage({
            type: 'success',
            message: '更新成功',
            })
        getListPro()
    }else{
        ElMessage({
            type: 'error',
            message: '更新失败',
            })
        getListPro()
    }
    
}

</script>

<style lang="scss" scoped>
.main_box{
    height: calc(100% - 42px);
    width: 100%;
    display: flex;
    .left_box{
        width: 200px;
        .title_box{
            display: flex;
            height: 40px;
            align-items: center;
            justify-content: center;
            border:solid 1px #615f5f;
            .name{
                font-weight: bold;
                font-size: 15px;
                margin: 0 5px;
            }
        }
    }

    .center_box{
        width: 500px;
        .button_box{
            text-align: center;
        }
    }

    .right_box{
        flex: 1;
    }
}

</style>