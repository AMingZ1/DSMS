//文件上传下载共用类
//导入axios
import axios from "axios"
import {$msg_error} from '../utils/msg'
/**
 * 文件工具类
 * MimeType                                                                     文件类型
 * application/msword                                                          word(.doc)
 * application/vnd.ms-powerpoint                                               powerpoint(.ppt)
 * application/vnd.ms-excel                                                    excel(.xls)
 * application/vnd.openxmlformats-officedocument.wordprocessingml.document     word(.docx)
 * application/vnd.openxmlformats-officedocument.presentationml.presentation   powerpoint(.pptx)
 * application/vnd.openxmlformats-officedocument.spreadsheetml.sheet           excel(.xlsx)
 * application/x-rar-compressed                                                rar
 * application/zip                                                             zip
 * application/pdf                                                             pdf 
 * video/*                                                                     视频文件
 * image/*                                                                     图片文件
 * text/plain                                                                  纯文本
 * text/css                                                                    css文件
 * text/html                                                                   html文件
 * text/x-java-source                                                          java源代码
 * text/x-csrc                                                                 c源代码
 * text/x-c++src                                                               c++源代码
 */
//文件上传校验公用方法(xls/xlsx)
export let $beforeUpload = async (file)=>{
    //定义文件格式
    let uploadTypes=['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    //判断格式是否正确
    const isXls = uploadTypes.includes(file.type)
    //判断大小是否合适
    const isSize = file.size / 1024 / 1024 < 2
    
    if(!isXls){
      $msg_error('只能上传【xls/xlsx】文件！')
    }
    if (!isSize){
      $msg_error('文件大小不能超过2MB！')
    }
   
    return isXls && isSize
  }

//文件上传校验公用方法(图片)
export let $beforeUploadImg = async (file)=>{
  //定义文件格式
  let uploadTypes=['image/png','image/jpeg']
  //判断格式是否正确
  const isXls = uploadTypes.includes(file.type)
  //判断大小是否合适
  const isSize = file.size / 1024 / 1024 < 2
  
  if(!isXls){
    $msg_error('只能上传【.png/.jpg】文件！')
  }
  if (!isSize){
    $msg_error('文件大小不能超过2MB！')
  }
 
  return isXls && isSize
}

//文件下载的公用方法，传入url，目标数据，文件信息
export let $downloadFile = async (downLoadData,url,file) =>{
    await axios({
        url,
        method:'post',
        data:downLoadData,
        headers:{
          'Content-Type':'application/json',
          'token':sessionStorage.getItem('token')
        },
        responseType:'blob'
      }).then((res)=>{
        const blob =new Blob([res.data])
        var downloadElement =document.createElement("a")
        var href =window.URL.createObjectURL(blob)
        downloadElement.href=href
        downloadElement.download =decodeURIComponent(file.name)
        document.body.appendChild(downloadElement)
        downloadElement.click()
        document.body.removeChild(downloadElement)
        window.URL.revokeObjectURL(href)
      })
    }