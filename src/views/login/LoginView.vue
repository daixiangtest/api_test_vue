<template>
    <div class="login_page">
        <div class="login_box">
            <!-- 左侧图片 -->
            <div class="left_box">
                <img src="../../assets/images/login_left4.png"  class="login_img">
            </div>
            <!-- 右侧登录框 -->
            <div class="right_box">
                <div class="header">
                    <div class="logo">
                        <img src="../../assets/images/logo.png" >
                    </div>
                    <div class="title">自动化测试平台</div>
                </div>
                <div class="login_form">
                    <!-- 登录表单 -->
                    <el-form :model="loginForm" label-width="auto" style="max-width: 600px" :rules="rulesLogin" ref="loginRef">
                        <el-form-item prop="username">
                            <el-input v-model="loginForm.username" placeholder="请输入用户名" prefix-icon="Avatar"/>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码" prefix-icon="Lock"/>
                        </el-form-item>
                        <el-form-item>
                        <el-button  @click="resetFrom(loginRef)" style="width: 185px;" round>重置</el-button>
                        <el-button @click="user_login(loginRef)" type="primary" style="width: 185px;" round>登录</el-button>
                        </el-form-item>
                    </el-form>
					
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import api from '../../api/index'
    import { ElMessage } from 'element-plus'
    import { useRouter } from 'vue-router'
    import {UserStore} from '@/store/modoles/userStore'
    
    // 声明变量赋值
    const loginForm=reactive(
        {
            username:"",
            password:""
        }
    )
    // 创建路由对象
	const router = useRouter()
    // 创建pinia 实例化对象
    const Store=UserStore()
    // 创建一个表单引用对象
    const loginRef = ref()
    // 定义登录方法
    function user_login(loginRef) {
        // 引用表单对象对表单进行前置校验
        loginRef.validate(async function(res1) {
            // 校验失败直接返回结果
            if (!res1) return
            const res=await api.loginApi(loginForm)
            if (res.status==200){
                // 提示登录成功
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })

                // 保存token到全局变量中
                Store.saveToken(res.data.token)
                Store.saveUserName(loginForm.username)
                // 跳转至项目页面的路由
                router.push({name:'project'})
            }else{
                ElMessage.error('登录失败')
                loginRef.resetFields()
            }         
        })    
    }

    function resetFrom(loginRef){
        loginRef.resetFields()
        // loginRef.validate(function (res){
        //     if (!res) return
        //     loginRef.resetFields()
        // })

    }
    const rulesLogin = reactive({
        username:[{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password:[{ required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 10, message: '密码长度在6到10为之间', trigger: 'blur' },]
    })

</script>
  
<style lang="scss" scoped>
@import './login.scss'

</style>