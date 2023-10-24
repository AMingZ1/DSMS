//定义岗位需求API函数--围绕后台实现增删改查
//导入请求函数
import {$getData, $post,$put,$delete} from '../utils/request'

//导入封装的消息弹窗
import {$msg_success,$msg_warning,$confirm} from '../utils/msg'

//返回所有的岗位需求信息
export let listJobs = async(params)=>{
   let data= await $getData('Sdhr01/getInfo',params)
  if(data.data.success=='1'){
    $msg_success('查询成功，共查询'+data.data.totalNum+'条记录！')
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
    let data= await $post('Sdhr01/addSdhr01',params)
    if(data){
        $msg_success('添加成功')
    }
    return data
}
//修改表单数据
export let updateForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    let data= await $put('Sdhr01/updateSdhr01',params)
    if(data){
        $msg_success('修改成功')
    }
    return data
}

//删除表单数据(逻辑删除)
export let deleteForm = async(params)=>{
    await $confirm('确定删除当前选中的数据吗?')
    let data =await $getData('Sdhr01/deleteSdhr01',params)
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
    if(!params.year){
        message='添加失败，年份不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.deptName){
        message='添加失败，需求部门不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.itvJob){
        message='添加失败，需求岗位不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.requireNum){
        message='添加失败，需求数量不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.jobRequire){
        message='添加失败，岗位要求不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.requireContact){
        message='添加失败，需求联系人不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.dutyPerson){
        message='添加失败，责任人不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.planEndDate){
        message='添加失败，计划完成时间不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.itvWays){
        message='添加失败，面试方式不能为空！'
        $msg_warning(message)
        return false
    }else{
        return true
    }
}
