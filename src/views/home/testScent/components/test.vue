<template>
    <!-- <div>
        <el-table :data="tableData" id="dragTable" border style="width: 800px;">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
        </el-table>
    </div> -->
    
    <el-table :data="tableData" style="width: 100%" :show-header="false" id="dragTable">
        <el-table-column label="名称">
            <template #default="scope">
                <el-icon><img src="@/assets/icons/case.png" width="20px"></el-icon>
                <span style="color: #00aaff;font-weight: bold;margin: 0 5px;">步骤{{ scope.$index + 1 }}</span>
                <span>{{ scope.row.icase.id }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
            <template #default="scope" >
                <el-button type="primary" plain icon="Edit" size="small">编辑</el-button>
                <el-button type="danger" plain icon="Delete" size="small">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>
    
<script setup>

    import Sortable from 'sortablejs'
    import { onMounted ,defineProps} from 'vue'

    var props=defineProps({
        SceneCases:[]
  })
    function setSort() {
        const el = document.querySelector('#dragTable table tbody')
        new Sortable(el, {
        sort: true,
            ghostClass: 'sortable-ghost',
            onEnd: (e) => {
                const targetRow = tableData.splice(e.oldIndex, 1)[0]
                tableData.splice(e.newIndex, 0, targetRow)
                
                const newArray = tableData.map((item, index) => {
                return {
                    index: index, // 添加遍历的索引值
                    name: item.id // 取出name字段的值
                }
                })
                console.log(newArray)
            },
        })
    }
    onMounted(() => {
        setSort()
    })

    
    const tableData =props.SceneCases


// const tableData = [
//      {
//         date: '2016-05-03',
//         name: 'Tom',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         date: '2016-05-02',
//         name: 'Cilly',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         date: '2016-05-04',
//         name: 'Linda',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
//     {
//         date: '2016-05-01',
//         name: 'John',
//         address: 'No. 189, Grove St, Los Angeles',
//     },
// ]
</script>
    