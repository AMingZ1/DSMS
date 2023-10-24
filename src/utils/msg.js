//封装消息框

//导入消息框
import {ElMessage,ElMessageBox} from 'element-plus'

//成功的消息框
export let $msg_success = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'success',
      })
}

//警告的消息框
export let $msg_warning = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'warning',
      })
}

//错误的消息框
export let $msg_error = (message,duration=2000)=>{
    ElMessage({
        showClose: true,
        message,
        duration,
        type: 'error',
      })
}

//封装弹窗
//type:success / info / warning / error
export let $confirm= (message,type='warning') =>{
  return new Promise((resolve)=>{
    ElMessageBox.confirm(
      message,
      '请注意：',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type,
      }
    )
      .then(() => {
        // ElMessage({
        //   type: 'success',
        //   message: 'Delete completed',
        // })
        resolve()
      })
      .catch(() => {
        // ElMessage({
        //   type: 'info',
        //   message: 'Delete canceled',
        // })
      })
  })
 
}