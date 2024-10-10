<template>
    <el-container>
      <!-- 顶部菜单栏 -->
      <el-aside :style="{width:us.iscollapse?'65px':'180px'}">
        <LeftMenu></LeftMenu>  
      </el-aside>
      <el-container>
        <el-header>
          <HeaderMenu></HeaderMenu>  
        </el-header>
        <el-main>Main</el-main>
        <el-footer>
          <FooterMenu></FooterMenu>
        </el-footer>
      </el-container>
    </el-container>
  </template>

<script setup>
import LeftMenu from './components/LeftMenu.vue';
import FooterMenu from './components/FooterMenu.vue';
import HeaderMenu from './components/HeaderMenu.vue';
import {UserStore} from '@/store/modoles/userStore'
    // 控制菜单收放
    const us=UserStore()

</script>

<style scoped lang="scss">
.el-container{
  height: 100%;
  width: 100%;
  .el-header{
    border-bottom: solid 1px #615f5f;
    height: 55px;
  }
  .el-aside{
    border-right: solid 1px #615f5f;
  }
  .el-footer{
    border-top: solid 1px #615f5f;
    height: 30px
  }
}

</style>

