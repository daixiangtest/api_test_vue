<template>
  <router-view/>
</template>

<script setup>
import api from '@/api/index'
import {UserStore} from '@/store/modoles/userStore'
// 全局定时验证token是否有效
setInterval(async() =>{
  var ustore=UserStore()
  let Btoken=ustore.token
  if (Btoken !==''){
    let token=Btoken.split(' ')[1]
    var res=await api.verifyApi({"token":token})
    if (res.status !==200){
      ustore.token=''
    }
}
},1000*60*60)


</script>

<style lang="scss">

</style>
