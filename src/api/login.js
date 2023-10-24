//定义操作登录API函数--围绕后台实现增删改查
//导入请求函数
import {$get,$getData,$setToken} from '../utils/request'

//导入js-md5
import md5 from 'js-md5'

//导入封装的消息弹窗
import {$msg_success,$msg_warning} from '../utils/msg'

//定义登录方法
export let login = async (params)=>{
   //结构出ckMe
   let {ckMe} = params
    //console.log(md5(params.userId))
    //对密码进行加密-md5加密原始密码，然后再数组反转再加密
    let passWordMd5 = md5(md5(params.passWord).split('').reverse().join())
    //登录成功后，服务器会返回这些关键字段
    //token是唯一凭证：令牌。
    //之后向服务器做的每一次提交都需要带上这个令牌。
    //这里重新组装参数是为了防止显示密码时看到md5解析过后的无序密码
    let paramsQuery={
      userId:params.userId,
      passWord:passWordMd5,
      ckMe:params.ckMe
    }
   let {success,message,token} = await $get('/Login',paramsQuery)
   //    console.log(success,message,token);
   if(success>0){
        //浏览器缓存有两种：sessionStorage(浏览器关闭就清空)和lacalStorage(需要手动清除，否则一直存在)
         sessionStorage.setItem('token',token)
         sessionStorage.setItem('userId',params.userId)
        // //将token信息设置为请求头内容
         $setToken()
         $msg_success(message)
         //判断是否需要记住我
         if(ckMe){
            //缓存登录名和密码(加密过后的密码)
            localStorage.setItem('userId',params.userId)
            localStorage.setItem('passWord',params.passWord)
         }
   }else{
    message='登录失败，请检查用户名或密码' 
    $msg_warning(message)
   }
   return success
}

//记住我选项自动登录
export let loginAuto = async ()=>{
   //从缓存中获取账号和密码
   let userId = localStorage.getItem('userId') 
   let passWord = localStorage.getItem('passWord') 
   if(userId && passWord){
         let params = {userId,passWord}
         let {success,message,token} = await $get('Login',params)
         if(success){
               sessionStorage.setItem('token',token)
               $setToken()
               $msg_success(message)
               return true
         }else{
         message='自动登录失败，请检查用户名或密码' 
         $msg_warning(message)
         return false
         }
   }else{
      return false
   }
   
}

export let userQuery = async (params) =>{
   // let data = await $getData('/Login/getUser',params)
   let data = await $getData('/Login/getUser',params)
   if(data){
      return data
   }
}

