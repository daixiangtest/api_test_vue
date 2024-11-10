<template>
    <div class="main">
        <!-- 折现图展示数据 -->
         <div class="box1" id="chat_pro_record">

         </div>
         <!-- 展示执行记录的表格数据 -->
         <el-table :data="recoders" stripe style="width: 100%" size="small">
            <el-table-column label="执行时间" width="180">
                <template #default="scope">
					{{dateTools.rDate(scope.row.create_time)}}
					<!-- {{dateTools.rTime(scope.row.create_time)}} -->
				</template>
            </el-table-column>
            <el-table-column prop="env" label="执行环境" width="180" />
            <el-table-column prop="task" label="测试计划" />
            <el-table-column prop="all" label="总用例" />
            <el-table-column prop="success" label="通过数" />
            <el-table-column prop="pass_rate" label="通过率">
                <template #default="scope">
					{{(scope.row.pass_rate * 100).toFixed(2) + '%'}}
				</template>
            </el-table-column>
            <el-table-column prop="address" label="测试报告">
                <template #default="scope">
					<el-button @click="showReport(scope.row)" icon="View" type="primary" plain
						size="small">查看报告</el-button>
				</template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import api from '@/api/index'
import {ProjectStore} from '@/store/modoles/proStore'
import {ref,onMounted} from 'vue'
import mychart from '@/utils/chart'
import dateTools from '@/utils/dateTools'
import { useRouter } from 'vue-router'

const router = useRouter()
var pStore=ProjectStore()

// 测试执行记录的数据
var recoders=ref([])
// 获取测试执行记录的方法
async function getRecoderList(){
    var params={
        project:pStore.pro.id
    }
    var res=await api.getTestRecords(params)
    if (res.status===200){
        recoders.value=res.data
        chartData()
    }
}
// 处理数据进行图标渲染 (item.pass_rate * 100).toFixed(2) + '%'
function chartData(){
    let pass_rate=[]
    let times=[]
    recoders.value.forEach((item) => {
        pass_rate.push((item.pass_rate * 100).toFixed(2))
        times.push(dateTools.rhost(item.create_time))
    })
    times.reverse()
    pass_rate.reverse()
    var elm=document.getElementById('chat_pro_record')
    mychart.chart3(elm,pass_rate,times)
}
// 挂在组件后获取执行记录的数据
onMounted(() =>{
    getRecoderList()
})

// 查看测试报告
function showReport(item){
    router.push({
        name:"report",
        params:{
            id:item.id
        }
    })
}

</script>


<style scoped lang="scss">
.box1 {
		height: 260px;
		background: #282828;
		margin-bottom: 10px;
	}

.main {
    padding: 10px;
}


</style>