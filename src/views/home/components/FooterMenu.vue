<template>
    <div class="footer">
        当前项目名称：{{ pro_data.pro.name }}  创建时间：{{pro_data.pro.create_time}}  测试负责人：{{ pro_data.pro.leader }}
    </div>
</template>

<script setup>
import {ProjectStore} from '@/store/modoles/proStore'
var pro_data=ProjectStore()

</script>


<style scoped lang="scss">
    .footer{
        height: 29px;
        line-height: 29px;
        text-align: center;
        font-size: 14px;
        color: #7a8481df;
    }
</style>