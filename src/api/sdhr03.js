//定义人员库API函数--围绕后台实现增删改查
//导入请求函数
import {$getData,$post,$put,$delete} from '../utils/request'
//导入封装的消息弹窗
import {$msg_error, $msg_success,$msg_warning,$confirm} from '../utils/msg'

//返回所有的岗位需求信息
export let listCloud = async(params)=>{
    let data = await $getData('Sdhr03/querySdhr03',params)
   if(data.data.success=='1'){
    $msg_success('查询成功,共查询'+data.data.totalNum+'条记录！')
    return data
   }else{
     $msg_warning(data.data.message)
   }
   return data
 
 }

 //新增人员库内容
 export let addToCloud = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    let data= await $post('Sdhr03/saveSdhr03',params)
    if(data.success=='1'){
        $msg_success('入库成功，请到人才库页面查看。')
    }else{
        $msg_error(data.message)
    }
    return data
 }

 
 //修改表单数据
export let updateForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    let data= await $put('Sdhr03/updateSdhr03',params)
    if(data.success=='1'){
        $msg_success('修改成功')
    }else{
        $msg_error(data.message)
    }
    return data
}

//删除表单数据(逻辑删除)
export let deleteForm = async(params)=>{
    await $confirm('确定删除当前选中的数据吗?')
    let data =await $put('Sdhr03/deleteSdhr03',params)
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
    if(!params.channel){
        message='添加失败，渠道不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.archiveReason){
        message='添加失败，归档原因不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.archiveStatusbfr){
        message='添加失败，归档前状态不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.archiveDate){
        message='添加失败，归档时间不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.workYear){
        message='添加失败，工作年限不能为空！'
        $msg_warning(message)
        return false
    }else if (!params.educationBckr){
        message='添加失败，学历不能为空！'
        $msg_warning(message)
        return false
    }else{
        return true
    }
}