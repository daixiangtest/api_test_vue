<template>
    <el-tabs type="border-card">
        <el-tab-pane label="响应体">
            <EditorCopmponts v-model="result.response_body" height='200px' lang="json" readOnly=True></EditorCopmponts>
        </el-tab-pane>
        <el-tab-pane label="响应头">
            <div v-for="(i,j) in result.response_header">
                <el-tag type="primary">{{j}}</el-tag>
                <span>:</span>
                <el-tag type="success">{{ i }}</el-tag>
            </div>
        </el-tab-pane>
        <el-tab-pane label="请求信息">
            <el-collapse >
                <el-collapse-item title="General" name="1">
                    <template #icon="{ isActive }">
                    <span class="icon-ele">
                        {{ isActive ? '关闭' : '展开' }}
                    </span>
                    </template>
                    <div>
                        <el-tag type="success">RequestMethod: </el-tag>
                        <el-tag type="danger">{{ result.method }}</el-tag>
                    </div>
                    <div>
                        <el-tag type="success">RequestUrl: </el-tag>
                        <el-tag type="danger">{{ result.url }}</el-tag>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Request Header" name="2">
                    <template #icon="{ isActive }">
                    <span class="icon-ele">
                        {{ isActive ? '关闭' : '展开' }}
                    </span>
                    </template>
                    <div v-for="(i,j) in result.response_header">
                        <el-tag type="success">{{j}}: </el-tag>
                        <el-tag type="danger">{{ i }}</el-tag>
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Request Body" name="3">
                    <template #icon="{ isActive }">
                    <span class="icon-ele">
                        {{ isActive ? '关闭' : '展开' }}
                    </span>
                    </template>
                    <div>
                        <el-tag type="danger">{{ result.requests_body }}</el-tag>
                    </div>
                </el-collapse-item>    
            </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="日志">
            <div style="overflow-x: auto;">
                <div v-for="log in result.log_data" >
                <el-tag v-if="log[0]==='INFO'" type="success">{{ log[0] }}:{{ log[1] }}</el-tag>
                <el-tag v-else-if="log[0]==='DEBUG'" type="info">{{ log[0] }}:{{ log[1] }}</el-tag>
                <el-tag v-else-if="log[0]==='ERROR'" type="danger">{{ log[0] }}:{{ log[1] }}</el-tag>
                <el-tag v-else type="warning">{{ log[0] }}:{{ log[1] }}</el-tag>
            </div>
            </div>
            
        </el-tab-pane>
        <el-tab-pane disabled>
            <!-- 使用插槽更改数据用# label键表示 -->
            <template #label>
                <span v-if="result.state==='成功'" style="color: green;">Assert:{{ result.state }}</span>
                <span v-else-if="result.state==='错误'" style="color: brown;">Assert:{{ result.state }}</span>
                <span v-else>Assert:{{ result.state }}</span>
            </template>
        </el-tab-pane>
        <el-tab-pane disabled>
            <!-- 使用插槽更改数据用# label键表示 -->
            <template #label>
                <span v-if="200 <= result.status_cede && result.status_cede <300" style="color: green;">code:{{ result.status_cede }}</span>
                <span v-else-if="300 <= result.status_cede && result.status_cede < 400" style="color: slategray;">code:{{ result.status_cede }}</span>
                <span v-else-if="400 <= result.status_cede && result.status_cede < 500" style="color: yellow;">code:{{ result.status_cede }}</span>
                <span v-else-if="500 <= result.status_cede && result.status_cede < 600" style="color: brown;">code:{{ result.status_cede }}</span>
                <span v-else>code:{{ result.status_cede }}</span>
            </template>
        </el-tab-pane>
        <el-tab-pane disabled>
            <!-- 使用插槽更改数据用# label键表示 -->
            <template #label>
                Time:{{ result.run_time }}
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import { defineProps} from 'vue';
import EditorCopmponts from '@/views/home/components/EditorCopmponts.vue';


// 声明defineProps 对象通过里面的属性接收外部组件外部的参数
const props = defineProps({
    result:{}
})


</script>

<style scoped>
.icon-ele {
  margin: 0 8px 0 auto;
  color: #409eff;
}
</style>