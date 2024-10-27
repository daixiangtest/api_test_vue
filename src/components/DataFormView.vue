<template>  
    <div style="width: 100%;">  
      <el-button type="primary" @click="addRow">添加行</el-button>  
      <el-table :data="tableData" style="width: 100% ;padding: 0,0;"  @selection-change="handleSelectionChange" ref="multipleTable">  
        <!-- <el-table-column type="selection" width="55">

        </el-table-column>   -->
        <el-table-column label="参数名" width="180">
            <template #default="scope">  
            <el-input v-model="scope.row.name" @blur="handleBlur(scope.row, 'name')"></el-input>  
          </template> 
        </el-table-column>  
        <el-table-column label="参数值" width="180">  
          <template #default="scope">  
            <el-input v-model="scope.row.name" style="padding: 0 0;"></el-input>  
          </template>  
        </el-table-column>  
        <el-table-column label="类型" width="80">  
          <template #default="scope">  
            <el-input v-model="scope.row.address" ></el-input>  
          </template>  
        </el-table-column>  
        <el-table-column label="说明" width="180">  
          <template #default="scope">  
            <el-input v-model="scope.row.address" @blur="handleBlur(scope.row, 'address')" size="large"></el-input>  
          </template>  
        </el-table-column> 
        <!-- 可以继续添加其他需要输入的列 -->  
      </el-table>  
      <el-button  
        type="danger"  
        @click="removeRows"  
        :disabled="selectedRows.length"  
      >删除选中行</el-button>  
    </div>  
  </template>  
    
  <script>  
  export default {  
    data() {  
      return {  
        tableData: [  
          {  
            date: '2016-05-02',  
            name: '王小虎',  
            address: '上海市普陀区金沙江路 1518 弄'  
          },  
          // ... 初始数据  
        ],  
        selectedRows: [] // 存储选中的行  
      };  
    },  
    methods: {  
      addRow() {  
        this.tableData.push({  
          date: '', // 可以设置默认值或空字符串  
          name: '',  
          address: ''  
          // ... 其他字段  
        });  
      },  
      removeRows() {  
        this.tableData = this.tableData.filter(row => !this.selectedRows.includes(row));  
        this.selectedRows = []; // 清空选中的行  
      },  
      handleSelectionChange(val) {  
        this.selectedRows = val;  
      },  
      handleBlur(row, fieldName) {  
        // 处理输入框失去焦点时的逻辑  
        console.log(`Row ${row.name} field ${fieldName} updated to:`, row[fieldName]);  
      }  
    }  
  };  
  </script>  
    
  <style scoped>  
  /* 样式可以根据需要调整 */  

  .el-table{
    width: 100% !important; /* 使用 !important 来覆盖可能的其他样式 */  
    box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */  
    padding: 0; /* 移除内边距，如果需要的话 */  
    height: 100%; /* 这通常不起作用，因为单元格的高度由表格控制 */  
    el-table-column{
        box-sizing: border-box; /* 确保内边距和边框包含在宽度内 */  
        padding: 0; /* 移除内边距，如果需要的话 */  
    }
  }
  </style>