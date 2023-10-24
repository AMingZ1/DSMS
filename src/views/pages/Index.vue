<template>
  <div></div>
</template>

<script>
import {onBeforeMount} from 'vue'
import {useRouter} from 'vue-router'
import {loginAuto} from '../../api/login'
  export default {
    name:'Index',
    setup(){
      let $router = useRouter()
       //页面挂载之前
       onBeforeMount(async()=>{
            if(await loginAuto()){
            $router.push('/layout')
            }else{
            $router.push('/login')
            }
        })
    }
  }
</script>

<style scoped lang="scss">

</style>