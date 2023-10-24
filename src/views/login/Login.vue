<template>
    <!-- userId:admin,passWord:12345 -->
    <!-- userId:DS0001,passWord:54321  -->
    <div class="container">
        <!-- <img src="../../images/sdLog.png" alt=""/> -->
        <div>
            <div class="imgDiv">
                <img src="../../images/sdLog.png" alt=""/>
            </div>
            <div class="login">
                <div class="item">
                        <h2>欢迎登录</h2>
                </div>
                <div class="item">
                    <h2>沈阳东硕信息技术有限公司</h2>
                </div>
                <div class="item">
                        <span>账号：</span>
                    </div>
                <div class="item">
                        <el-input v-model="userId" placeholder="请输入账号" />
                </div>
                <div class="item">
                        <span>密码：</span>
                </div>
                <div class="item">
                        <el-input v-model="passWord" type="password" placeholder="请输入密码" show-password />
                </div>
                <div class="item">
                        <el-checkbox v-model="ckMe"  />
                        <span class="checkboxText">&nbsp;记住我</span>
                </div>
                <div class="item">
                        <el-button size="large" @click="adminLogin" >登录</el-button>
                </div>
             </div>

             
            
            
        </div>
        
    </div>
    <div class="footer">
        <el-container>
            <el-footer>
                <div class="bottom">
                    <el-link type="warning" href="https://beian.miit.gov.cn/" target="_blank">
                        <h5>辽ICP备2022011797号-2 &nbsp;</h5>
                    </el-link>
                    <el-link type="warning" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=21010202000970" target="_blank">
                        <img src="../../images/beiAn.png" style="float:left;"/><h5>辽公网安备 21010202000970号 &nbsp;</h5>
                    </el-link>
                    <el-link type="warning" href="" target="_blank">
                        <h5> 电话：024-23994399 &nbsp;邮编：110000&nbsp;  地址：沈阳市和平区三好街90-5号1-19-5&nbsp;投诉建议渠道：024-23994399</h5>
                        
                    </el-link>
                </div>
                 <!-- <div class="bottom1">
                   <el-link type="warning" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=21010202000970" target="_blank">
                        <img src="../../images/beiAn.png" style="float:left;"/><h5>辽公网安备 21010202000970号</h5>
                    </el-link> 
                </div>
                <div class="bottom1">
                     <el-link type="warning" href="" target="_blank">
                        <h5> 电话：024-23994399 邮编：110000  地址：沈阳市和平区三好街90-5号1-19-5投诉建议渠道：024-23994399</h5>
                        
                    </el-link>
                    
                </div> -->
                
            </el-footer>
        </el-container>
    </div>
    
</template>

<script>
    //导入组合式API
    import {reactive,toRefs,onBeforeMount} from 'vue'
    //导入访问后台API
    import {login,loginAuto} from '../../api/login'
    //导入路由器，用于登录后跳转到布局页Layout
    import {useRouter} from 'vue-router'
    export default {
        name:'Login',
        setup(){
            //获取当前项目中的路由器对象
            let $router = useRouter()
            //定义登录数据
            let loginData = reactive({
                userId:'',
                passWord:'',
                ckMe:false
            })
            // console.log(loginData)
            //定义管理员登陆方法
            let adminLogin= async()=>{
                //全部传入
                // Login(loginData)
                //分别传入
                // Login({
                //     userId:loginData.userId,
                //     passWord:loginData.passWord
                // })
                //分别传入：解构出后台需要的账号和密码
                // let {userId,passWord} = loginData
                //调用登录api后返回是否登录成功
                let success = await login(loginData)
                //如果成功
                if(success>0){
                    $router.push('/Layout')
                }
            }

            //页面挂载之前
            onBeforeMount(async()=>{
                //从缓存中获取账号和密码
               if(await loginAuto()){
                $router.push('/Layout')
               }
            })
            //返回数据
            return {
               ...toRefs(loginData),
               adminLogin
            }
        }
    }
</script>

<style  scope lang="scss">
    .container{
        height: 90vh;
        width: 100vw;
        display: flex;
        /* background: repeating-linear-gradient(to left ,#fc6075,#ff9b44); */
        justify-content: center;
        align-items: center;
        .imgDiv{
            position:relative;
            
            img{
                position:relative;
                left: 37%;
                display: inline-block;
                justify-content: center;
                width:100px;
                height:100px;
                vertical-align: middle;
        }
        }
        
        .login{
            width: 350px;
            height: 350px;
            border: 1px solid #eee;
            border-radius: 6px;
            color: black;
            font-family: 'font1';
            padding: 10px;
            .item{
                font-size: 15px;
                display: flex;
                align-items: center;
                margin: 10px 0;
                .checkboxText{
                    font-size: 12px;
                }
                h2{
                    flex: 1;
                    text-align: center;
                }
                .el-button{
                    width: 350px;
                    height: 40px;
                    font-size: 20px;
                    color: white;
                    align-items: center;
                    background:repeating-linear-gradient(to left ,#fc6075,#ff9b44) ;
                }
                
            }
        }
    }
    .footer{
        height: 10vh;
        width: 100vw;
        justify-content: center;
        align-items: center;
        display: inline-flex;
        .bottom {
            // // display: flex;
            justify-content: center;
            align-items: center;
            text-align:center;
            padding-top: 10px;
            height: 100%;
            width: 100%;
            .el-link{
                justify-content: center;
                align-items: center;
            }
        }
    }

    
    // .bottom1{
    //     // display: flex;
    //     // justify-content: center;
    //     // align-items: center;
    //     // height: 40px;
    //     // width: 350px;
    //     // left: 0;
    //     // bottom: 0;
        
    // }
    
        
</style>