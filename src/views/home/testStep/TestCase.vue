<template>
   <div class="demo-collapse">
    <el-collapse :model-value="['1','2','4','5','6']">
      <el-collapse-item name="1">
        <template #title>
            <img src="@/assets/icons/icon-api-b.png" width="20" style="margin-right: 10px;">
            <b>API信息</b>
        </template>
        <div>
            <el-input v-model="caseData.interface.url" style="max-width: 100%" class="input-with-select" readonly>
                <template #prepend>
                    <el-select v-model="caseData.interface.method" placeholder="请求方法" style="width: 115px">
                    <el-option label="GET" value="get" />
                    <el-option label="POST" value="post" />
                    <el-option label="PUT" value="put" />
                    <el-option label="PATCH" value="patch" />
                    <el-option label="DELETE" value="delete" />
                    </el-select>
                </template>
            </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template #title>
            <img src="@/assets/icons/case.png" width="20" style="margin-right: 10px;">
            <b>用例名称</b>
        </template>
        <div>
            <el-input v-model="caseData.title" label="用例名称">
                <template #prepend> <span>用例名称</span> </template>
            </el-input>
        </div>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template #title>
            <img src="@/assets/icons/instruction.png" width="20" style="margin-right: 10px;">
            <b>前置脚本</b>
        </template>
        <div class="script_code">
            <div class="edido"><EditorCopmponts v-model="caseData.setup_script"  lang="python" height="225px"></EditorCopmponts></div>
            <div class="card mod">
                <div class="add_code">
                    <el-button @click='addSetupScript("func")' plain size="small" type="success" style="margin-bottom: 8px;">调用全局工具函数</el-button>
                </div>
                <div class="add_code">
                    <el-button @click='addSetupScript("global")' plain size="small" type="success" style="margin-bottom: 8px;">设置全局变量</el-button>
                </div>
                <div class="add_code">
                    <el-button @click='addSetupScript("env")' plain size="small" type="success" style="margin-bottom: 8px;">设置局部变量</el-button>
                </div>
                <div class="add_code">
                    <el-button @click='addSetupScript("sql")' plain size="small" type="success" style="margin-bottom: 8px;">执行sql查询</el-button>
                </div>
            </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template #title>
            <img src="@/assets/icons/keyhole.png" width="20" style="margin-right: 10px;">
            <b>请求头</b>
        </template>
        <div>
            <EditorCopmponts v-model="caseData.headers"  lang="json"></EditorCopmponts>
        </div>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template #title>
            <img src="@/assets/icons/API_api.png" width="20" style="margin-right: 10px;">
            <b>查询参数</b>
        </template>
        <div>
            <EditorCopmponts v-model="caseData.request.params"  lang="json"></EditorCopmponts>
        </div>
      </el-collapse-item>
      <el-collapse-item name="6">
        <template #title>
            <img src="@/assets/icons/body.png" width="20" style="margin-right: 10px;">
            <b>请求体</b>
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
                </div>
            </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="7">
        <template #title>
            <img src="@/assets/icons/instruction.png" width="20" style="margin-right: 10px;">
            <b>后置断言脚本</b>
        </template>
        <div>
            <div class="script_code">
            <div class="edido"><EditorCopmponts v-model="caseData.teardown_script"  lang="python" height="225px"></EditorCopmponts></div>
            <div class="card mod" style="overflow: auto;">
                <div class="add_code">
							<el-button @click="addTearDownCodeMod('func')" plain size="small" type="success" style="margin-bottom: 5px;">调用全局工具函数</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('getBody')" plain size="small" type="success" style="margin-bottom: 5px;">获取响应体</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('global')" plain size="small" type="success" style="margin-bottom: 5px;">设置全局变量</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('env')" plain size="small" type="success" style="margin-bottom: 5px;">设置局部变量</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('sql')" plain size="small" type="success" style="margin-bottom: 5px;">执行sql查询</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('JSextract')" plain
								size="small" type="success" style="margin-bottom: 5px;">Jsonpath提取数据</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('REextract')" plain size="small" type="success" style="margin-bottom: 5px;">正则提取数据</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('http')" plain size="small" type="success" style="margin-bottom: 5px;">HTTP状态码断言</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('eq')" plain size="small" type="success" style="margin-bottom: 5px;">断言相对</el-button>
						</div>
						<div class="add_code">
							<el-button @click="addTearDownCodeMod('contain')" plain size="small" type="success" style="margin-bottom: 5px;">断言包含</el-button>
						</div>
                <!-- <div><el-button type="info" plain size="small" style="margin-bottom: 10px;">Success</el-button></div> -->
            </div>
        </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
  <el-affix position="bottom" :offset="40">
    <div class="buts" v-if="case_id !==''">
    <el-button type="success" size="small" icon='Promotion' round @click="runCase">运行</el-button>
    
    <el-button type="primary" size="small" round icon='CirclePlusFilled' @click="copyCase" v-if="buts===''">复制</el-button>
    <el-button type="primary" size="small" round icon='SuccessFilled' @click="saveCase">保存</el-button> 
    <el-button type="danger" size="small" round icon='DeleteFilled' @click="delCase" v-if="buts===''">删除</el-button>
    <el-button style="flex:1;" type="danger" size="small" round icon='View' @click="openResutl">结果</el-button>
    </div>
  </el-affix>
    <el-drawer v-model="drawer" title="resData.name='测试结果'" :with-header="true" size="40%">
        <ResultView :result="resData"></ResultView>
    </el-drawer>
  
</template>

<script setup>
import {ref,defineProps,reactive, watch} from 'vue'
import EditorCopmponts from '@/views/home/components/EditorCopmponts.vue';
import api from '@/api/index'
import {ProjectStore} from '@/store/modoles/proStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import ResultView from '@/components/ResultView.vue';


var drawer=ref(false)
var pstore=ProjectStore()
var props=defineProps({
    case_id:'',
    buts:''
})
// 查看运行接口
function openResutl(){
    drawer.value=true
}

// 用例绑定数据
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
        teardown_script: "",
        title:''
})
var bodyType=ref('json')
// 获取用例详情的函数
var caseObj={}
async function getCaseInfo(case_id) {
    const res=await api.getInterFacesCase(case_id)
    if (res.status===200){
        caseObj=res.data
        caseData.title=caseObj.title
        caseData.interface=caseObj.interface
        caseData.setup_script=caseObj.setup_script
        caseData.file=caseObj.file
        caseData.teardown_script=caseObj.teardown_script
        caseData.headers=JSON.stringify(caseObj.headers,0,4)
        caseData.request.json=JSON.stringify(caseObj.request.json || {})
        caseData.request.data=JSON.stringify(caseObj.request.data || {})
        caseData.request.params=JSON.stringify(caseObj.request.params || {})
    }
    
}

// 监听函数监听case_id 的变化来更新用例参数
watch (() => props.case_id,(id) =>{
    if (id !==''){
        getCaseInfo(id)
    }
})

// 清空数据
function cleanData(){
    caseData.title=''
    caseData.interface={
        method:'get',
        url:''
    }
    caseData.setup_script=''
    caseData.file=[]
    caseData.teardown_script=''
    caseData.headers='{}'
    caseData.request.json='{}'
    caseData.request.data='{}'
    caseData.request.params='{}'
    caseObj={}
}

// 删除测试用例
function delCase(){
    ElMessageBox.confirm(
    `当前用例名称:${caseData.title} 删除后数据不可恢复`,
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
        const res=await api.delInterFaceCase(props.case_id)
        if (res.status===204){
            ElMessage({
            type: 'success',
            message: '删除成功',})
            pstore.getInterFaces()
            cleanData()
        }
        else{
            ElMessage({
            type: 'error',
            message: '删除失败',})
        }
   })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
var newCaseData=reactive({
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
        teardown_script: "",
        title:''
})
// 复制测试用例
async function copyCase(){
    newCaseData.title=caseData.title+'+Copy'
    newCaseData.interface=caseData.interface.id
    newCaseData.setup_script=caseData.setup_script
    newCaseData.teardown_script=caseData.teardown_script
    newCaseData.headers=JSON.parse(caseData.headers)
    newCaseData.request.json=JSON.parse(caseData.request.json)
    newCaseData.request.data=JSON.parse(caseData.request.data)
    newCaseData.request.params=JSON.parse(caseData.request.params)
    const res=await api.addInterFaceCase(newCaseData)
    if (res.status===201){
        ElMessage({
            type: 'success',
            message: '复制成功',})
            pstore.getInterFaces()
    }else{
        ElMessage({
            type: 'error',
            message: '复制失败',})
    }
}

//  保存测试用例
async function saveCase() {
    newCaseData.title=caseData.title
    newCaseData.interface=caseData.interface.id
    newCaseData.setup_script=caseData.setup_script
    newCaseData.teardown_script=caseData.teardown_script
    newCaseData.headers=JSON.parse(caseData.headers)
    newCaseData.request.params=JSON.parse(caseData.request.params)
    newCaseData.request.json=JSON.parse(caseData.request.json)
    newCaseData.request.data=JSON.parse(caseData.request.data)
    var res=await api.updateInterFaceCase(props.case_id,newCaseData)
    if (res.status===200){
        ElMessage({
        type: 'success',
        message: '保存成功',})
        pstore.getInterFaces()
    }
    else{
        ElMessage({
        type: 'error',
        message: '保存失败',})
    }
}
var resData=ref({})
// 运行测试用例
async function runCase(params) {
    const req_body={
        env:pstore.env,
        cases: {
        title: caseData.title,
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
        drawer.value=true
    }else{
        ElMessage({
                type: 'error',
                message: '用例执行异常',
                })
    }
}  

// 定义输出前置脚本的用例模版
function addSetupScript(item){
    if (item === "func") {
			caseData.setup_script += '\n# 调用全局工具函数random_mobile随机生成一个手机号码\nmobile = global_func.random_mobile()'
		} else if (item === "global") {
			caseData.setup_script += '\n# 设置局部变量\ntest.save_global_variable("变量名","变量值")'
		} else if (item === "env") {
			caseData.setup_script += '\n# 设置局部变量\ntest.save_env_variable("变量名","变量值")'
		} else if (item === "sql") {
			caseData.setup_script +=
				'\n # ----执行sql语句(需要在环境中配置数据库连接信息)----\n # db.连接名.execute_all(sql语句) \nsql = "SELECT count(*) as count FROM futureloan.member"\nres = db.aliyun.execute_all(sql)'
		}
}
// 生成后置脚本
function addTearDownCodeMod(item) {
		if (item === "getBody") {
			caseData.teardown_script += '\n# Demo:获取响应体(json)  \nbody = response.json()';
			caseData.teardown_script += '\n# Demo2:获取响应体(字符串)  \nbody = response.text';
		} else if (item === "JSextract") {
			caseData.teardown_script +=
				'\n# Demo:jsonpath提取response中的msg字段  \nmsg = test.json_extract(response.json(),"$..msg")';
		} else if (item === "REextract") {
			caseData.teardown_script += '\n# Demo:正则提取响应体中的数据  \nres = test.re_extract(response.text,"正则表达式",)';
		} else if (item === "sql") {
			caseData.setup_script +=
				'\n # ----执行sql语句(需要在环境中配置数据库连接信息)----\n # db.连接名.execute_all(sql语句) \nsql = "SELECT count(*) as count FROM futureloan.member"\nres = db.aliyun.execute_all(sql)'
		} else if (item === "global") {
			caseData.teardown_script += '\n# 设置局部变量\ntest.save_global_variable("变量名","变量值")'
		} else if (item === "env") {
			caseData.teardown_script += '\n# 设置局部变量\ntest.save_env_variable("变量名","变量值")'
		} else if (item === "func") {
			caseData.teardown_script += '\n# 调用全局工具函数random_mobile随机生成一个手机号码\nmobile = global_func.random_mobile()'
		} else if (item === "http") {
			caseData.teardown_script +=
				'\n# 断言http状态码 \n# Demo:断言http状态码是否为200  \ntest.assertion("相等",200,response.status_code)';
		} else if (item === "eq") {
			caseData.teardown_script += '\n# 断言相等 \ntest.assertion("相等","预期结果","实际结果")';
		} else if (item === "contain") {
			caseData.teardown_script += '\n# 断言包含:预期结果中的内容在实际结果中是否存在 \ntest.assertion("包含","预期结果","实际结果")';
		}
	}
</script>

<style scoped lang="scss">
    .script_code{
        display: flex;
        .edido{
            flex: 1;
        }
        .mod{
            width: 300px;
            height: 220px;
            overflow: auto;

        }
    }
    .buts{
        text-align: center;
        justify-content: center;
        
    }

</style>