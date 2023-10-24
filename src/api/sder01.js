//员工关系调用api
//导入请求函数
import {$getData,$post} from '../utils/request'
//导入封装的消息弹窗
import {$msg_success,$msg_warning,$confirm, $msg_error} from '../utils/msg'


//返回所有的人员信息
export let listperson = async(params)=>{
    let data = await $getData('Sder01/querySder01',params)
   if(data.data.success=='1'){
     $msg_success('查询成功！共查询'+data.data.totalNum+'条记录。')
 
   }else{
     $msg_warning('查询失败!')
   }
   return data
 
 }

 //新增人员花名册内容
 export let addForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    let data= await $post('Sder01/saveSder01',params)
    if(data.success){
        $msg_success(data.message)
        return data
    }else{
        $msg_error(data.message)
    }
    return data
 }

//新增人员项目内容
export let addForm2 = async(params)=>{
  //非空校验
  if(!check(params)){ 
      return false
  }
  let data= await $post('Sder02/saveSder02',params)
  if(data.success){
    $msg_success(data.message)
    return data
}else{
    $msg_error(data.message)
}
return data
}

 //删除表单数据
export let deleteForm = async(params)=>{
    await $confirm('确定删除当前选中的数据吗?')
    let data =await $post('Sdhr01/deleteSder01',params)
    if(data.success){
        $msg_success(data.message)
        return data
    }else{
        $msg_error(data.message)
    }
    return data
    
}

//删除项目表单数据
export let deleteForm2 = async(params)=>{
    await $confirm('确定删除当前选中的数据吗?')
    let data =await $post('Sdhr02/deleteSder02',params)
    if(data.success){
        $msg_success(data.message)
        return data
    }else{
        $msg_error(data.message)
    }
    return data
    
}

 //修改表单数据
export let updateForm = async(params)=>{
    if(!check(params)){ 
        return false
    }
    let data= await $post('Sder01/updateSder01',params)
    if(data.success){
        $msg_success(data.message)
        return data
    }else{
        $msg_error(data.message)
    }
    return data
}
 //修改表单数据
 export let updateForm2 = async(params)=>{
    //非空校验
    // if(!check(params)){ 
    //     return false
    // }
    let data= await $post('Sder02/updateSder02',params)
    if(data.success){
        $msg_success(data.message)
        return data
    }else{
        $msg_error(data.message)
    }
    return data
}

 //非空验证
let check=(params)=>{
    let message;
    //非空校验
    if(!params.deptName){
        message='添加失败，部门不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.jobs){
        message='添加失败，岗位不能为空！'
        $msg_warning(message)
        return false
    }else if(!params.tel){
        message='添加失败，电话不能为空！'
        $msg_warning(message)
        return false
    }else{
        return true
    }
}