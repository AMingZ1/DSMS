//人员访谈信息调用api
//导入请求函数
import {$getData,$post,$put,$delete} from '../utils/request'
//导入封装的消息弹窗
import {$msg_success,$msg_warning,$confirm} from '../utils/msg'

//返回所有的人员信息
export let listTalk = async(params)=>{
    let data = await $getData('Sder03/querySder03',params)
   if(data.data.success=='1'){
    $msg_success('查询成功,共查询出'+data.data.totalNum+'条记录!')
    return data
   }else{
     $msg_warning('查询失败!')
   }
   return data
 
 }

 //新增人员库内容
 export let addForm = async(params)=>{
    //非空校验
    if(!check(params)){ 
        return false
    }
    let data= await $post('Sder03',params)
    if(data){
        $msg_success('新增成功')
    }
    return data
 }

 //删除表单数据
export let deleteForm = async(params)=>{
    await $confirm('确定删除当前选中的数据吗?')
    let data =await $delete(`Sdhr03/${params}`)
    if(data){
        $msg_success('删除成功')
    }
    
}

 //修改表单数据
export let updateForm = async(params)=>{
    //非空校验
    // if(!check(params)){ 
    //     return false
    // }
    let data= await $put(`Sder03/${params.id}`,params)
    if(data){
        $msg_success('修改成功')
    }
    return data
}

 //非空验证
let check=(params)=>{
    let message;
    //非空校验
    if(!params.deptName){
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