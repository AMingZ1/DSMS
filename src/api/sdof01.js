//定义岗位需求API函数--围绕后台实现增删改查
//导入请求函数
import {$getData, $post,$put,$get} from '../utils/request'

//导入封装的消息弹窗
import {$msg_success,$msg_warning, $msg_error} from '../utils/msg'

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

//修改表单数据
export let updateForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }else{
        let data= await $put('Sdof01/updateSdof01',params)
        if(data.success=='1'){
            $msg_success('修改成功')
        }else{
            $msg_error(data.message)
        }
        return data
    }
    }
   
    


//删除表单数据
// export let deleteForm = async(params)=>{
//     await $confirm('确定删除当前选中的数据吗?')
//     let data =await $delete(`Sdhr01/${params}`)
//     if(data.success=='1'){
//         $msg_success('删除成功')
//     }else{
//         $msg_error(data.message)
//     }
    
// }

//提交审批流
export let submitOffer = async(params)=>{
   
    let data= await $put('Sdof01/initiateApproval',params)
    if(data.success=='1'){
      $msg_success('审批流程提交成功！')
      return data
    }else{
     $msg_warning(data.message)
    }
   return data
 }

//新增接口-面试测评调用
export let insertOf01 = async(params)=>{
    let data= await $post('Sdhr04/insertOffer',params)
    if(data.success=='1'){
        $msg_success('Offer信息生成成功')
    }else{
        $msg_error(data.message)
    }
    return data
}

//非空验证
let check=(params)=>{
    let message;
    //非空校验
    if(params.memberName==''|| params.memberName==' '){
        message='修改失败，姓名不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.deptName){
        message='修改失败，部门不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.jobs){
        message='修改失败，岗位不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.empDate){
        message='修改失败，入职时间不能为空！'
        $msg_warning(message)
        return false
    }else if (params.jobAddress==''||params.jobAddress==' '){
        message='修改失败，入职地址不能为空！'
        $msg_warning(message)
        return false
    }else if (params.email==''||params.email==' '){
        message='修改失败，邮箱不能为空！'
        $msg_warning(message)
        return false
    }else if (params.salary==''||params.salary==' '){
        message='修改失败，薪资不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.isDz){
        message='修改失败，试用期薪资不能为空！'
        $msg_warning(message)
        return false
    }else{
        return true
    }
}



//返回所有的岗位需求信息
export let queryTaskBytaskId = async(params)=>{ 
   return await $getData('expense/historicTasks',params);
 }




 //审批通过
export let approve = async(params)=>{
    let data= await $post('Sdof01/applyApprov',params)
    if(data.success=='1'){
        $msg_success(data.message)
    }else{
        $msg_error(data.message)
    }
    return data
}


 //审批驳回
 export let reject = async(params)=>{
    let data= await $post('Sdof01/applyReject',params)
    if(data.success=='1'){
        $msg_success(data.message)
    }else{
        $msg_error(data.message)
    }
    return data
}