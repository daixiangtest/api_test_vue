<template>
    <div class="main_box">
        <!-- 左侧展示栏 -->
        <div class="card left_box">
            <!-- 执行用例标题 -->
            <div class="title_box">
                <img src="@/assets/icons/liucheng.png" width="25">
                <div class="name">业务流</div>
                <el-button type="primary" text size="small" icon="CirclePlus" @click="addScene">添加</el-button>
            </div>

            <el-menu :default-active="activeScene.id" class="el-menu-vertical-demo" >
                    <el-menu-item :index="scene.id" v-for="scene ,index in pstore.sceneList" v-bind:key="index" @click="selectScene(scene)">
                        <el-icon><img src="@/assets/icons/liucheng.png" width="15px"></el-icon>
                        <span>{{ scene.name }}</span>
                    </el-menu-item>
            </el-menu>
        </div>
        <!-- 右侧展示栏 -->
        <div class="card right_box">
            <el-card style="background: none;">
                <el-divider content-position="left">业务流信息</el-divider>
                <div class="name_edit">
                    <el-input v-model="activeScene.name" style="max-width: 100%" placeholder="Please input">
                        <template #prepend>业务流名称</template>
                    </el-input>
                    <div class="btns">
                        <el-button type="primary"  plain icon="SuccessFilled" size="small" @click="update_name(activeScene)">保存</el-button>
                        <el-button type="primary" v-if="runStatus" plain icon="Promotion" @click="runSceneCase(activeScene.id)" size="small">运行</el-button>
                        <el-button type="primary" v-else loading plain icon="Promotion" size="small">运行</el-button>
                        <el-button type="danger" plain icon="Delete" @click="delScene(activeScene.id)" size="small">删除</el-button>
                    </div>
                </div>
            </el-card>
            <el-card style="background: none;margin-top: 5px;">
                <el-divider content-position="left">业务流执行步骤</el-divider>
                <el-table :data="SceneCases" style="width: 100%" :show-header="false" id="dragTable">
                    <el-table-column label="名称">
                        <template #default="scope">
                            <el-icon><img src="@/assets/icons/case.png" width="20px"></el-icon>
                            <span style="color: #00aaff;font-weight: bold;margin: 0 5px;">步骤{{ scope.$index + 1 }}</span>
                            <span>{{ scope.row.icase.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="200">
                        <template #default="scope" >
                            <el-button type="primary" plain icon="Edit" size="small" @click="edit_case(scope.row.icase.id)">编辑</el-button>
                            <el-button type="danger" plain icon="Delete" size="small" @click="del_case(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-divider>
                    <el-icon><star-filled /></el-icon>
                </el-divider> 
                <el-button type="primary" size="small" @click="openCases()">添加用例</el-button>  
            </el-card>
        </div>
        <!-- 展示运行结果的抽屉 -->
        <el-drawer v-model="drawer" title="业务流执行结果" :with-header="true" size="40%">
            <RunResutlCase :resutl="result"></RunResutlCase>
        </el-drawer>
        <!-- 编辑用例的抽屉展示 -->
        <el-drawer v-model="drawer_case" title="编辑业务流用例" :with-header="true" size="50%">
            <TestCase :case_id="case_id" :buts="but"></TestCase>
        </el-drawer>
        <!-- 展示接口的用例抽屉新增到业务流中 -->
        <el-drawer v-model="add_case" title="用例选择框" :with-header="true" size="30%">
            <AddTestScent :scene='activeScene' :cases="SceneCases" @refresh='getSceneCases()'></AddTestScent>
        </el-drawer>
    </div>
</template>

<script setup>
import api from '@/api/index';
import {ProjectStore} from '@/store/modoles/proStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref ,onMounted} from 'vue';
import RunResutlCase from './components/RunResutlCase.vue';
import Sortable from 'sortablejs';
import TestCase from '../testStep/TestCase.vue';
import AddTestScent from './components/AddTestScent.vue';
// 更改用例执行步骤
async function updateSort() {
    // 修改caseList中的order字段
    let body= []
    body = SceneCases.value.map((item, index) => {
                return {
                    sort:index+1, // 添加遍历的索引值
                    id: item.id // 取出name字段的值
                }
                })
    var res=await api.updateSceneCase(body)
    if (res.status===200){
        ElMessage({
                    type: 'success',
                    message: '更改顺序成功',
                    })
            SceneCases.value =[]
            // pstore.getScenes()
            getSceneCases()

    }else{
        ElMessage({
                    type: 'error',
                    message: '更改顺序失败',
                    })
            // pstore.getScenes()
            getSceneCases()
    }
}

// 处理拖拽结束事件  
function setSort() {
        const el = document.querySelector('#dragTable table tbody')
        new Sortable(el, {
        sort: true,
            ghostClass: 'sortable-ghost',
            onEnd: (e) => {
                const targetRow = SceneCases.value.splice(e.oldIndex, 1)[0]
                SceneCases.value.splice(e.newIndex, 0, targetRow)
                // let body= []
                // SceneCases.value.forEach((item, index, array) => {
                //     body.push({
                //         id:item.id,
                //         sort:index+1,
                //     })
                // });
                // const newArray = SceneCases.value.map((item, index) => {
                // return {
                //     index: index+1, // 添加遍历的索引值
                //     id: item.id // 取出name字段的值
                // }
                
                // })
                updateSort()
                // console.log(newArray)
            },
        })
    }

var pstore=ProjectStore()
// 默认激活的业务流定义
var activeScene=ref({
    id:'',
    name:''
})
onMounted(() => {
    setSort()
	})
// 判断默认的业务流激活状态
onMounted(() => {
    if (pstore.sceneList.length>0){
        selectScene(pstore.sceneList[0])
        
    }
    
})
// 点击选中的业务流
function selectScene(item){
    activeScene.value=item
    getSceneCases()
}

// 添加业务流
async function addScene(){
    const res=await api.addScene({
        name:"新建业务流",
        project:pstore.pro.id
    })
    if (res.status==201){
        ElMessage({
                type: 'success',
                message: '添加成功',
                })
        pstore.getScenes()
        activeScene.value=res.data
    }

}

// 获取任务流执行顺序
var SceneCases=ref([])
async function getSceneCases() {
    const res=await api.getScenesCase(activeScene.value.id)
    if (res.status===200){
        SceneCases.value=res.data
    }
}

// 更改业务流名称
async function update_name(item){
    const res=await api.updateScene(item.id,{name: item.name})
    if (res.status===200){
        ElMessage({
                    type: 'success',
                    message: '保存成功',
                    })
    }else{
        ElMessage({
                    type: 'error',
                    message: '保存失败',
                    })
    }
}


// 删除业务流
function delScene(scene_id){
    ElMessageBox.confirm(
    '测试任务删除后数据不可恢复，确认删除吗？',
    '警告',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
        const res=await api.delScene(scene_id)
        if (res.status===204){
            ElMessage({
                    type: 'success',
                    message: '删除成功',
                    })
            pstore.getScenes()
            selectScene(pstore.sceneList[0])
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

// 运行测试业务流
// 接收运行结果的数据
var result=ref({})
// 运行状态的展示
var runStatus=ref(true)
// 运行结果的抽屉开关
var drawer=ref(false)
async function runSceneCase(id) {
    if (pstore.env===0){
        ElMessage({
        type: 'info',
        message: '请选择项目环境',
      })
    }
    var body={
        env:pstore.env,
        scene:id
    }
    runStatus.value=false
    const res=await api.runScene(body)
    if (res.status===200){
        result.value=res.data
        runStatus.value=true
        drawer.value=true
    }else{
        ElMessage({
        type: 'error',
        message: '用例执行异常',
      })
      runStatus.value=true
      
    }
    
}

// 编辑执行的用例
var drawer_case=ref(false)
var case_id=ref('')
var but=ref('')
function edit_case(id){
    drawer_case.value=true
    case_id.value=id
    but.value='but'
    
}
// 打开添加用例的页面
var add_case=ref(false)
function openCases(){
    add_case.value=true
}
// 删除执行用例
async function del_case(id) {
    var res=await api.delSceneCase(id)
    if (res.status===204){
        ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getSceneCases()
    }else{
        ElMessage({
        type: 'error',
        message: '删除失败',
      })
    }
}

</script>


<style scoped lang="scss">
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

    .right_box{
        flex: 1;
        .name_edit{
            display: flex;
            .btns{
                width: 300px;
                text-align: center;
            }

        }
    }
}
</style>
