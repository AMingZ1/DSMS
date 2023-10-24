//定义操作登录API函数--围绕后台实现增删改查
//导入请求函数
import {$getData} from '../utils/request'
//导入封装的消息弹窗
import {$msg_warning} from '../utils/msg'

//返回对应的的小代码信息
export let itemList = async(params)=>{
    let data= await $getData('Sdst03/getItemList',params)
   if(data.data.success=='1'){
     return data.data.data
   }else{
     $msg_warning()
   }
 }