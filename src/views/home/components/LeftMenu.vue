<template>
    <div class="logo">
        <img src="@/assets/images/logo1.png">
    </div>
    <!-- 左侧菜单展示 -->
    <el-menu default-active="2" class="el-menu-vertical-demo" router :collapse="us.iscollapse">
        <el-menu-item :index="item.icon" v-for='item in menuList' :key="item.path">
          <img :src="item.iconImg" width="20" style="margin-right: 10px;">
          <span>{{item.name}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
    import {UserStore} from '@/store/modoles/userStore'
    // 控制菜单收放
    const us=UserStore()
    // 定义图标和和操作选项
    var menuList=[
        {
            name:'项目环境',
            path:'/project/testEnv',
            iconImg:require('@/assets/icons/data.png')
        },
		{
			name: '接口管理',
			path: '/project/interface',
			iconImg: require("@/assets/icons/dropbox.png")
		},

		{
			name: '接口用例',
			path: '/project/testStep',
			iconImg: require("@/assets/icons/icon-api-b.png")
		},
		{
			name: '业务流测试',
			path: '/project/testscent',
			iconImg: require("@/assets/icons/liucheng.png")
		},
		{
			name: '测试计划',
			path: '/project/testplan',
			iconImg: require("@/assets/icons/repair.png")
		},
		
		{
			name: '定时任务',
			path: '/project/crontab',
			iconImg: require("@/assets/icons/hourglass.png")
		},
		{
			name: 'bug管理',
			path: '/project/bugs',
			iconImg: require("@/assets/icons/debug.png")
		},
		{
			name: '数据看板',
			path: '/project/records',
			iconImg: require("@/assets/icons/analysis.png")
		}
    ]

</script>

<style scoped lang="scss">
.logo{
    height: 60px;
    text-align: center;
    img{
        height: 60px;

    }
}
.el-menu{
    border-right: none;
}


</style>