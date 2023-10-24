//请求相关

//导入axios
import axios from "axios";
//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//导入接口根地址
import {BASE_URL} from '../config/conster'
axios.defaults.headers.common['token'] = sessionStorage.getItem('token');
//初始化axios对象
var instance = axios.create({   
    //设置请求地址前缀
    baseURL: BASE_URL,
    //超时时间
    timeout:'500000',
    //请求头信息
    headers:{
        //  'X-Custom-Header':'foobar'
         'Content-Type': "application/json",
        //'Content-Type': "application/x-www-form-urlencoded"
        "Access-Control-Allow-Origin":"*"
    }
});

//添加请求拦截器
instance.interceptors.request.use(function(config){
    //在发送请求之前做些什么
    axios.defaults.headers.common['token'] = sessionStorage.getItem('token');
    NProgress.start();
    $setToken
    return config;
},function(error){
    //对错误请求做些什么
    NProgress.done();
    return Promise.reject(error);
})

//添加响应拦截器
instance.interceptors.response.use(function(response){
    //对响应数据做些什么
    NProgress.done();
    return response;
},function(error){
    //对响应错误错误做些什么
    NProgress.done();
    return Promise.reject(error);
})

//定义一个get请求方法
export let $get = async (url,params)=>{
    
    let {data}= await instance.get(url,{params})
     let success,message,token
     if(Object.keys(data).length > 0 ){
        //后端时使用
         success =  data.success
         message =  data.message
         token   =  data.token
        //前端测试使用
        //  success =  data[0].success
        //  message =  data[0].message
        //  token   =  data[0].token
     }
     return {success,message,token};
    
}

//定义一个get请求方法
export let $getData = async (url,params)=>{
    
    let {data}= await instance.get(url,{params})
    //  let success,message,token
    //  if(Object.keys(data).length > 0 ){
    //      success =  data[0].success
    //      message =  data[0].message
    //      token   =  data[0].token
    //  }
     return {data};
    
}

//定义一个post请求 
export let $post = async (url,params)=>{
    let json =JSON.stringify(params)
    // let {data}= await instance.post(url,{json})
    let {data}= await instance.post(url,json)
    return data;
}

//定义一个put请求 
export let $put = async (url,params)=>{
    params =JSON.stringify(params)
    // let {data}= await instance.post(url,{json})
    let {data}= await instance.put(url,params)
    return data;
}

//定义删除delete请求
export let $delete = async(url,params)=>{
    
    let {data} =await instance.delete(url,params)
    return data
}

//设置token方法，该方法会将浏览器缓存中的token信息添加到请求头
export let $setToken = ()=>{
    //将token信息保存到请求头中
    instance.defaults.headers.common['token'] = sessionStorage.getItem('token');
}


//定义一个下载的get请求方法
export let $downLoadGet = async (url,params)=>{
    
    let {data}= await instance.get(url,{params})
     let success,message,token
     if(Object.keys(data).length > 0 ){
        //后端时使用
         success =  data.success
         message =  data.message
         token   =  data.token
        //前端测试使用
        //  success =  data[0].success
        //  message =  data[0].message
        //  token   =  data[0].token
     }
     return {success,message,token};
    
}


var instance2 = axios.create({   
    //设置请求地址前缀
    baseURL: BASE_URL,
    //超时时间
    timeout:'500000',
    //请求头信息
    headers:{
        //  'X-Custom-Header':'foobar'
         //'Content-Type': "application/json",
        'Content-Type': "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin":"*"
    }
});

export let $post2 = async (url,params)=>{
    //let json =JSON.stringify(params)
    // let {data}= await instance.post(url,{json})
    let {data}= await instance2.post(url,params)
    return data;
}


//初始化axios对象
var instance3 = axios.create({   
    //设置请求地址前缀
    baseURL: BASE_URL,
    //超时时间
    timeout:'500000',
    responseType:'blob',
    //请求头信息
    headers:{
        //  'X-Custom-Header':'foobar'
         'Content-Type': "application/json",
        //'Content-Type': "application/x-www-form-urlencoded"
        "Access-Control-Allow-Origin":"*"
    }
});



//定义一个get请求方法
export let $getFile = async (url,params)=>{   
     return await instance3.get(url,{params});
   
}
