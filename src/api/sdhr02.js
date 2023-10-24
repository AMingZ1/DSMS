//定义电话邀约API函数--围绕后台实现增删改查
//导入请求函数
import { $getData, $post,$put,$post2,$getFile} from '../utils/request'
//导入封装的消息弹窗
import {$msg_success,$msg_warning,$confirm, $msg_error} from '../utils/msg'

//返回所有的岗位需求信息
export let listPerson = async(params)=>{
    let data = await $getData('Sdhr02/querySdhr02',params)
   if(data.data.success=='1'){
    $msg_success('查询成功，共查询'+data.data.totalNum+'条记录！')
    return data
   }else{
     $msg_warning(data.message)
   }
   return data
 
 }

 //添加表单数据
export let addForm = async(params)=>{
    //非空校验
    if(!checkTab1(params)){ 
        return false
    }
    let data= await $post('Sdhr02/saveSdhr02',params)
    if(data){
        $msg_success('添加成功')
    }
    return data
}
//修改表单数据
export let updateForm = async(params)=>{
    //非空校验
    if(!checkTab1(params)){ 
        return false
    }
    let data= await $put('Sdhr02/updateSdhr02',params)
    if(data){
        $msg_success('修改成功')
    }
    return data
}

//删除表单数据(逻辑删除)
export let deleteForm = async(params)=>{
  await $confirm('确定删除当前选中的数据吗?')
  let data =await $getData('Sdhr02/deleteSdhr02',params)
  if(data.success!='-1'){
      $msg_success('删除成功')
  }else{
    $msg_error('删除失败'+data.message)
  }
  
}


// reqNo:'',
// memberName:'',
// tel:'',
// contactStatus:'',
// contactMember:'',
// contactDate:'',
// itvRemark:''
//非空验证Tab1内容
let checkTab1=(params)=>{
  let message;
  //非空校验
  if(!params.memberName){
      message='添加失败，人员姓名不能为空！'
      $msg_warning(message)
      return false
  }else if (!params.contactMember){
      message='添加失败，联系人不能为空！'
      $msg_warning(message)
      return false
  }else if (!params.tel){
      message='添加失败，联系电话不能为空！'
      $msg_warning(message)
      return false
  }else{
      return true
  }
}




//查询人员附件
export let getAllFiles = async(params)=>{
    return await $getData('file/getAllFiles',params);
}



//导入人员附件
export let importFiles = async(params)=>{
    let data= await $post2('Sdhr02/import',params);
    if(data.success!='-1'){
        $msg_success('导入成功')
    }else{
        $msg_error('导入失败'+data.message)
    }
}



//导入附件
export let importFiles2 = async(params)=>{
    let data= await $post2('file/upload',params);
    if(data.success!='-1'){
        $msg_success('导入成功')
    }else{
        $msg_error('导入失败'+data.message)
    }
}


//删除附件
export let removeFile = async(params)=>{
    let data= await $post2('file/removeFile',params);
    if(data.success!='-1'){
        $msg_success('删除成功')
    }else{
        $msg_error('删除失败'+data.message)
    }
}



//附件导出
export let downloadFile = async(url,params,name)=>{
    console.log(url,params,name);
    await $getFile(url,params).then(res => {
        let blob = new Blob([res.data]);            
        let downloadElement = document.createElement('a');
        // 创建下载的链接
        let href = window.URL.createObjectURL(blob);
        downloadElement.style.display = 'none';
        downloadElement.href = href;
        // 下载后文件名
        downloadElement.download =  name;
        document.body.appendChild(downloadElement);
        // 点击下载
        downloadElement.click();
        // 下载完成移除元素
        document.body.removeChild(downloadElement);
        // 释放掉blob对象
        window.URL.revokeObjectURL(href); 
    })
    .catch(() => {
        $msg_error('导出失败')
    })
}