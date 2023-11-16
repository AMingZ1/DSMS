//常量定义

let model = {
    //开发阶段访问接口地址
    //办公室
    //dev:'http://192.168.3.69:8081',  
    //服务器
    dev:'http://106.14.152.86:8081',    
    // dev:'http://172.20.10.2:8081',  
    //家里  
    // dev:'http://192.168.2.3:8081',  
    // dev:'http://localhost:8081,
    //测试阶段访问接口地址
    test:'',
    //正式阶段访问接口地址
    pro:''
}

//定义请求根路径
export const BASE_URL=model.dev

//需求计划中上传文件的地址
export const hr01_fileUpload_url = BASE_URL + '/file/upload'
//需求计划中下载文件的地址
export const hr01_fileDownload_url = BASE_URL + '/file/downloadFile'