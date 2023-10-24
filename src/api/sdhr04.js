//定义人员库API函数--围绕后台实现增删改查
//导入请求函数
import {$get, $getData,$post,$put} from '../utils/request'
//导入封装的消息弹窗
import {$msg_error, $msg_success,$msg_warning,$confirm} from '../utils/msg'

//返回所有的岗位需求信息
export let listTable = async(params)=>{
    let data = await $getData('Sdhr04/query',params)
//    if(data.data.success>0){
    if(data.data.success=='1'){
     $msg_success('查询成功,共查询'+data.data.totalNum+'条记录！')
   }else{
     $msg_warning(data.message)
   }
   return data
 
 }

 //修改表单数据
export let updateForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    let data= await $put('Sdhr04/updateSdhr04',params)
    if(data.success=='1'){
        $msg_success('修改成功')
    }else{
        $msg_error(data.message)
    }
    return data
}

 //新增人员库内容
 export let addForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    let data= await $post('Sdhr04/saveSdhr04',params)
    if(data){
        $msg_success('新增成功')
    }
    return data
 }

 //删除表单数据(逻辑删除)
export let deleteForm = async(params)=>{
    await $confirm('确定删除当前选中的数据吗?')
    let data =await $get('Sdhr04/deleteSdhr04',params)
    if(data.success!='-1'){
        $msg_success('删除成功')
    }else{
      $msg_error('删除失败'+data.message)
    }
    
  }

 //非空验证
let check=(params)=>{
    let message;
    //非空校验
    if(!params.itvDept){
        message='添加失败，面试部门不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.itvJob){
        message='添加失败，岗位不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.itvDate){
        message='添加失败，面试时间不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.itver){
        message='添加失败，面试官不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.memberName){
        message='添加失败，面试人员不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.universityName){
        message='添加失败，学校不能为空！'
        $msg_warning(message)
        return false
    }else{
        return true
    }
}