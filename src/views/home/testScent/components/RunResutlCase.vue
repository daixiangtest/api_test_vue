<template>
    <el-descriptions class="margin-top" title="执行结果" :column="4" :size="small" border>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <List />
          </el-icon>
          总数
        </div>
      </template>
      {{ resutl.all }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Checked />
          </el-icon>
          通过
        </div>
      </template>
      {{ resutl.success }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <Failed />
          </el-icon>
          失败
        </div>
      </template>
      {{ resutl.fail }}
    </el-descriptions-item>
    <el-descriptions-item>
      <template #label>
        <div class="cell-item">
          <el-icon :style="iconStyle">
            <SwitchFilled />
          </el-icon>
          错误
        </div>
      </template>
      {{ resutl.error }}
    </el-descriptions-item>
  </el-descriptions>
  <h4>执行详情</h4>

  <el-table :data="resutl.cases" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <ResultView :result="props.row"></ResultView>
      </template>
    </el-table-column>
    <el-table-column label="用例名称" prop="name" />
    <el-table-column label="请求方法" prop="method" />
    <el-table-column label="响应状态码" prop="status_code" />
    <el-table-column label="执行结果" prop="state" />
  </el-table>
</template>

<script setup>
  import {ref,defineProps} from 'vue'
  import ResultView from '@/components/ResultView.vue';
  var props=defineProps({
    resutl:{}
  })


</script>

<style scoped lang="scss">

</style>