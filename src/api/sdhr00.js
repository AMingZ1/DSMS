//定义岗位需求API函数--围绕后台实现增删改查
//导入请求函数
import {$getData, $post,$put} from '../utils/request'

//导入封装的消息弹窗
import {$msg_error, $msg_success,$msg_warning} from '../utils/msg'

//返回所有的任务信息
export let listTask = async(params)=>{
   let data= await $getData('Sdst06/querySdst06',params)
  if(data){
    return data
  }else{
    $msg_warning()
  }
  return data

}
//添加表单数据
export let addForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    // let data= await $post('Sdhr01/Save',params)
    let data= await $post('Sdst06/saveSdst06',params)
    if(data.success=='1'){
        $msg_success('添加成功')
        return data
    }else{
        $msg_error(data.message)
    }
    
}
//修改表单数据
export let updateForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    let data= await $put('Sdst06/updateSdst06',params)
    if(data){
        $msg_success('修改成功')
    }
    return data
}

// //删除表单数据
// export let deleteForm = async(params)=>{
//     await $confirm('确定删除当前选中的数据吗?')
//     let data =await $delete(`Sdhr01/${params}`)
//     if(data){
//         $msg_success('删除成功')
//     }
    
// }

//非空验证
let check=(params)=>{
    let message;
    //非空校验
    if(!params.taskName){
        message='添加失败，任务名称不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.taskMember){
        message='添加失败，参与者不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.taskStatus){
        message='添加失败，任务状态不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.planEndDate){
        message='添加失败，计划结束时间不能为空！'
        $msg_warning(message)
        return false
    }else{
        return true
    }
}



//返回所有的岗位需求信息
export let listOffer = async(params)=>{
    let data= await $getData('Sdof01/querySdof01',params)
   if(data.data.success=='1'){
     $msg_success('查询成功')
     return data
   }else{
     $msg_warning('查询失败')
   }
   return data
 
 }
