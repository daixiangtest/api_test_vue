<template>
    <div class="logo">
        <img src="@/assets/images/test.jpg">
    </div>
    <!-- 左侧菜单展示 -->
    <el-menu default-active="$route.path" class="el-menu-vertical-demo" router :collapse="us.iscollapse">
        <el-menu-item :index="item.icon" v-for='item in menuList' :key="item.path" @click="checkOut_router(item.path)">
          <img :src="item.iconImg" width="20" style="margin-right: 10px;">
          <span>{{item.name}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup>
    import {UserStore} from '@/store/modoles/userStore'
	import {useRouter} from 'vue-router'
    // 控制菜单收放
    const us=UserStore()
    // 定义图标和和操作选项
    var menuList=[
        {
            name:'项目环境',
            path:'/project/home/testenv',
            iconImg:require('@/assets/icons/data.png')
        },
		{
			name: '接口管理',
			path: '/project/home/interface',
			iconImg: require("@/assets/icons/dropbox.png")
		},

		{
			name: '接口用例',
			path: '/project/home/testStep',
			iconImg: require("@/assets/icons/icon-api-b.png")
		},
		{
			name: '业务流测试',
			path: '/project/home/testscent',
			iconImg: require("@/assets/icons/liucheng.png")
		},
		{
			name: '测试计划',
			path: '/project/home/testplan',
			iconImg: require("@/assets/icons/repair.png")
		},
		
		{
			name: '定时任务',
			path: '/project/home/crontab',
			iconImg: require("@/assets/icons/hourglass.png")
		},
		{
			name: 'bug管理',
			path: '/project/home/bugs',
			iconImg: require("@/assets/icons/debug.png")
		},
		{
			name: '数据看板',
			path: '/project/home/records',
			iconImg: require("@/assets/icons/analysis.png")
		}
    ]
	// 跳转路由
	const router=useRouter()
	function checkOut_router(path){
		
		router.push({path})
	}

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