<template>
<div class="title">
    <div></div>
    <span>接口调试</span>
    <el-button type="primary" @click="saveDebugCase">保存</el-button>
</div>
<div class="mt-4">
    <el-input v-model="caseData.interface.url" style="max-width: 100%" placeholder="请输入url路径" class="input-with-select">
        <template #prepend>
            <el-select v-model="caseData.interface.method" placeholder="请求方法" style="width: 115px">
            <el-option label="GET" value="get" />
            <el-option label="POST" value="post" />
            <el-option label="PUT" value="put" />
            <el-option label="PATCH" value="patch" />
            <el-option label="DELETE" value="delete" />
            </el-select>
        </template>
        <template #append>
            <el-button type="primary" @click="runInterFaceCase()">运行</el-button>
        </template>
    </el-input>
</div>

<el-divider content-position="left">请求信息</el-divider>
<el-tabs type="border-card" class="demo-tabs">
    <el-tab-pane>
        <template #label>
            <span class="custom-tabs-label">
                <img src="@/assets/icons/keyhole.png" width="15" style="margin-right: 10px;">
                <span>请求头</span>
            </span>
        </template>
        <EditorCopmponts v-model="caseData.headers"  lang="json"></EditorCopmponts>
    </el-tab-pane>
    <el-tab-pane >
        <template #label>
            <span class="custom-tabs-label">
                <img src="@/assets/icons/API_api.png" width="15" style="margin-right: 10px;">
                <span>查询参数</span>
            </span>
        </template>
        <EditorCopmponts v-model="caseData.request.params"  lang="json"></EditorCopmponts>
    </el-tab-pane>
    <el-tab-pane >
        <template #label>
            <span class="custom-tabs-label">
                <img src="@/assets/icons/body.png" width="15" style="margin-right: 10px;">
                <span>请求体</span>
            </span>
        </template>
        <div>
            <el-radio-group v-model="bodyType" size="small">
                <el-radio-button value="json">json</el-radio-button>
                <el-radio-button value="form_data">form-data</el-radio-button>
                <el-radio-button value="data">x-www-form-urlencoded</el-radio-button>
            </el-radio-group>
            <div v-if="bodyType==='json'">
                <EditorCopmponts v-model="caseData.request.json"  lang="json"></EditorCopmponts>
            </div>
            <div v-else-if="bodyType==='data'">
                <EditorCopmponts v-model="caseData.request.data"  lang="json"></EditorCopmponts>
            </div>
            <div v-else>
                <div class="div" style="height: 225px;">
                    暂不支持
                    <EditorCopmponts v-model="caseData.setup_script"  lang="plain_text" height="225px"></EditorCopmponts>
                </div>
            </div>
        </div>
    </el-tab-pane>
    <el-tab-pane >
        <template #label>
            <span class="custom-tabs-label">
                <img src="@/assets/icons/instruction.png" width="15" style="margin-right: 10px;">
                <span>前置脚本</span>
            </span>
        </template>
        <EditorCopmponts v-model="caseData.setup_script"  lang="python" height="225px"></EditorCopmponts>
    </el-tab-pane>
    <el-tab-pane >
        <template #label>
            <span class="custom-tabs-label">
                <img src="@/assets/icons/instruction.png" width="15" style="margin-right: 10px;">
                <span>后置脚本</span>
            </span>
        </template>
        <EditorCopmponts v-model="caseData.teardown_script"  lang="python" height="225px"></EditorCopmponts>
    </el-tab-pane>
</el-tabs>
    <el-divider content-position="left">响应信息</el-divider>
    <ResultView :result="resData"></ResultView>
     <!-- 保存用例的弹窗 -->
     <el-dialog v-model="isShowBox" title="保存用例请选择对应的接口" width="500">
        <el-form :model="form_data">
        <el-form-item label="用例名称" :label-width="formLabelWidth">
            <el-input v-model="form_data.name" autocomplete="on" />
        </el-form-item>
        <el-form-item label="选择接口" :label-width="formLabelWidth">
            <el-select v-model="form_data.interface_id" placeholder="请选择接口">
            <el-option v-for="item in proStore.inetrfaces" :label="item.name" :value="item.id" />
            </el-select>
        </el-form-item>
        </el-form>
        <template #footer>
        <div class="dialog-footer">
            <el-button @click="isShowBox=false">取消</el-button>
            <el-button type="primary" @click="saveData">
            确认
            </el-button>
        </div>
        </template>
    </el-dialog>
</template> 


<script setup>
import { reactive,ref } from 'vue';
import EditorCopmponts from '../../../../views/home/components/EditorCopmponts.vue';
import api from '@/api/index'
import {ProjectStore} from '@/store/modoles/proStore'
import { ElMessage} from 'element-plus'
import ResultView from '../../../../components/ResultView.vue';
import { onBeforeUnmount } from 'vue';  


// 构造函数离开该组件触发
onBeforeUnmount(() => {  
  console.log('Component is about to be unmounted');  
//   alert('hello1')
});
// 接口用例绑定的参数
var bodyType=ref('json')
var caseData=reactive({
       interface: {
            url: "",
            method: "GET"
           },
        headers: "{}",
        request: {
            json: "{}",
            data:"{}",
            params:"{}"
        },
        file:[],
        setup_script: "",
        teardown_script: ""
})
var proStore=ProjectStore()
var resData=ref({})
// 运行接口用例的方法
async function runInterFaceCase() {
    const req_body={
        env:proStore.env,
        cases: {
        title: "调试运行",
        interface : caseData.interface,
        headers: JSON.parse(caseData.headers),
        request: {
            params:JSON.parse(caseData.request.params)
           },
        setup_script: caseData.setup_script,
        teardown_script:caseData.teardown_script
     }
    }
    // 判断请求体的格式
    if (bodyType.value==='json'){
        req_body.cases.request.json=JSON.parse(caseData.request.json)
    }
    else if (bodyType.value==='data') {
        req_body.cases.request.data=JSON.parse(caseData.request.data)
    } else if (bodyType.value==='form_data'){
        req_body.cases.request.file=caseData.request.file
    }
    
    var res=await api.runInterFaceCase(req_body)
    if (res.status===200){
        resData.value=res.data
    }else{
        ElMessage({
                type: 'error',
                message: '用例执行异常',
                })
    }
    
}

var isShowBox= ref(false)
var form_data=reactive({
    name:'',
    interface_id:null
})
// 保存调试好的接口用例
function saveDebugCase(){
    isShowBox.value=true
    form_data.name=''
    form_data.interface_id=null
}
async function saveData() {
    var body={
        interface: form_data.interface_id,
        headers: JSON.parse(caseData.headers),
        request: {
            json: JSON.parse(caseData.request.json),
            data:JSON.parse(caseData.request.data),
            params:JSON.parse(caseData.request.params)
        },
        file:caseData.file,
        setup_script: caseData.setup_script,
        teardown_script: caseData.teardown_script,
        title:form_data.name
    }
    var res=await api.addInterFaceCase(body)
    if (res.status===201){
        ElMessage({
                type: 'success',
                message: '保存用例成功',
                })
        isShowBox.value=false
    }else{
        ElMessage({
                type: 'error',
                message: '保存用例失败',
                })
    }
}

</script>

<style scoped lang="scss">
    .custom-tabs-label{
        display: flex;
        justify-content: center;
        align-items: center;
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
</style>