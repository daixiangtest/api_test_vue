<template>
    <div>
        测试环境
    </div>
    <EditorCopmponts v-model="jsonData" height='200px' lang="json"></EditorCopmponts>
    <EditorCopmponts v-model="pythonData" height='200px' lang="python"></EditorCopmponts>
</template>


<script setup>
import EditorCopmponts from '../components/EditorCopmponts.vue';
import {ref} from 'vue'

var jsonData=ref('{}')
var pythonData=ref('')


</script>