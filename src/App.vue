<template>
 <router-view />
</template>

<script>
// import * as echarts from 'echarts'
// import {provide} from 'vue'
// provide('echarts',echarts);
  // import Banner from './components/Banner'
  export default {
     name:'App',
    //  components:{ Banner }
  }
</script>

<style  lang="scss">
  @import url(./assets/fonts/font.css);
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    outline: none;
    font-family: 'ZI DING YI';
  }

   html,body{
    width: 100%;
    height: 100%;
    font-size:0;
    padding: 0;
    margin-left: 0%;
    margin-top: 0%;
  }
  #app{
    height: 100%;
    width: 100%;
    font-size:0;
    padding: 0;
    margin-top: 0%;
  }
 /* .header{
    height: 8%;
    width: 100%;
    background: repeating-linear-gradient(to left ,#fc6075,#ff9b44);
    font-size:0;
    padding: 0;
    } */
    .el-input__inner{
      color: black;
    }
</style>
