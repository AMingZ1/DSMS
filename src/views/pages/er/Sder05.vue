<template>
 
  <div class="contents"></div>
  <div class="center"></div>
    <el-tabs type="border-card">
      
            <div class="center">
                <!--点击打开新增抽屉-->
                <el-button type="warning" round class="addDrawer" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;新增离职人员</el-button>
                <!--点击导入抽屉-->
                <el-button type="success" round class="uploadDrawer" @click="drawer=true"><el-icon><Upload /></el-icon>&nbsp;导入离职人员</el-button>
                <div class="sreach">
                    <div class="sreachItem">
                        <el-input v-model="memberNameValue" placeholder="请输入人员姓名" clearable/>
                    </div>
                    <div class="sreachItem">
                        <el-select v-model="deptValue" class="m-2" placeholder="---请选择部门---" size="mini" clearable>
                        <el-option label="能环事业部" value="能环事业部"/>
                            <el-option label="石化事业部" value="石化事业部"/>
                            <el-option label="MES事业部" value="MES事业部"/>
                            <el-option label="智慧城市" value="智慧城市"/>
                            <el-option label="自动化事业本部-研究所" value="自动化事业本部-研究所"/>
                            <el-option label="大数据服务事业部" value="大数据服务事业部"/>
                            <el-option label="中铝智能铜创科技" value="中铝智能铜创科技"/>
                            <el-option label="其烨科技" value="其烨科技"/>
                        </el-select>
                    </div>
                    <div class="sreachItem">
                        <el-select v-model="itvJobValue" class="m-2" placeholder="---请选择岗位信息---" size="mini" clearable>
                            <el-option label="JAVA开发工程师-初级" value="JAVA开发工程师-初级"/>
                            <el-option label="JAVA开发工程师-中级" value="JAVA开发工程师-中级"/>
                            <el-option label="JAVA开发工程师-高级" value="JAVA开发工程师-高级"/>
                            <el-option label="c++开发工程师-初级" value="c++开发工程师-初级"/>
                            <el-option label="c++开发工程师-中级" value="c++开发工程师-中级"/>
                            <el-option label="c++开发工程师-高级" value="c++开发工程师-高级"/>
                            <el-option label="前端开发-初级" value="前端开发-初级"/>
                            <el-option label="前端开发-中级" value="前端开发-中级"/>
                            <el-option label="前端开发-高级" value="前端开发-高级"/>
                            <el-option label="自动化工程师-初级" value="自动化工程师-初级"/>
                            <el-option label="自动化工程师-中级" value="自动化工程师-中级"/>
                            <el-option label="自动化工程师-高级" value="自动化工程师-高级"/>
                            <el-option label="项目经理" value="项目经理"/>
                        </el-select>
                    </div>
                    <div class="sreachItem">
                        <span></span>
                        <el-tooltip content="查询" placement="top" effect="light">
                        <el-button type="primary" @click="sreachTable" round ><el-icon><Search /></el-icon></el-button>
                        </el-tooltip>
                        <el-tooltip content="导出数据" placement="top" effect="light">
                        <el-button type="success" @click="sreachTable" round plain><el-icon><Download /></el-icon></el-button>
                        </el-tooltip>
                    </div>
                </div>
            </div>
                <el-table v-loading="loading" :data="tableData" stripe border style="width: 100%" >
                    <el-table-column type="selection" width="40" />
                    <el-table-column fixed prop="memberName" label="员工姓名" width="110" >
                        <template #default="scope" >
                            <el-link type="success" @click="queryMemberStatus(scope.row)" >{{scope.row.memberName}}</el-link>
                        </template>
                    </el-table-column>
                    
                    <el-table-column fixed prop="company" label="公司" width="200"/>
                    <el-table-column fixed prop="deptName" label="部门" width="160"/>
                    <el-table-column fixed prop="itvJob" label="岗位" width="160" />
                    <el-table-column prop="memberId" label="员工编码" width="100" v-if="show" />
                    <el-table-column  label="离职审批表" width="100">
                        <el-link type="primary" @click="drawer=true">查看</el-link>
                    </el-table-column>
                    <el-table-column  prop="empDate" label="入职日期" width="100" />
                    <el-table-column  prop="depDate" label="离职日期" width="100" />
                    <el-table-column  prop="depReason" label="离职原因" width="150" />
                    <el-table-column  prop="applyDate" label="申请日期" width="100" />
                    <!-- <el-table-column  label="审批状态" width="100">
                        <template #default="scope">
                        <el-tag size="mini" v-if="scope.row.approveStatus=='01'" type="info" >待提交</el-tag>
                        <el-tag size="mini" v-if="scope.row.approveStatus=='02'" type="primary" >审批中</el-tag>
                        <el-tag size="mini" v-if="scope.row.approveStatus=='03'" type="success" >审批通过</el-tag>
                        <el-tag size="mini" v-if="scope.row.approveStatus=='04'" type="danger" >已驳回</el-tag>
                        </template>
                    </el-table-column> -->
                    <el-table-column  prop="approver" label="本公司审批人" width="120" />
                    <el-table-column  prop="approveDate" label="审批日期" width="100" />
                    <el-table-column  prop="approveRemark" label="审批意见" width="200" />
                    
                    <el-table-column fixed="right" label="操作" width="200">
                        <template #default="scope">
                            <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                            <el-button type="warning" size="small" @click="addCloud(scope.row)">入库</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页区 -->
                <div class="pagination">
                    <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalNum" />
                </div>
                <!-- <div class="steps">
                    <el-steps :space="200" :active="activeSteps" finish-status="success">
                        <el-step title="发起" />
                        <el-step title="主管审批中" />
                        <el-step title="审批通过" />
                    </el-steps>
                </div> -->
               
        
    </el-tabs>
  
        <!-- 添加/修改项目信息抽屉 -->
        <el-drawer v-model="openDrawer" :title="isAdd?'添加人员信息':'修改人员信息'"
            direction="rtl"
            :before-close="drawerClose"
        >
            <div class="item">
                <span>id&nbsp;:</span>
                <el-input v-model="formData.id" placeholder="请输入id" />
            </div>
            <div class="item">
                <span>员工编号&nbsp;:</span>
                <el-input v-model="formData.memberId" placeholder="请输入员工编号" />
            </div>
            <div class="item">
                <span>员工姓名&nbsp;:</span>
                <el-input v-model="formData.memberName" placeholder="请输入员工姓名"  />
            </div>
            <div class="item">
                <span>公司:&nbsp;:</span>
                <el-select v-model="formData.company" class="m-2" placeholder="---请选择公司---" size="mini" >
                    <el-option label="沈阳东硕信息技术有限公司" value="沈阳东硕信息技术有限公司"/>
                </el-select>
            </div>
            <div class="item">
            <span>部门名称&nbsp;:</span>
                <el-select v-model="formData.deptName" class="m-2" placeholder="---请选择部门信息---" size="mini" >
                    <el-option label="能环事业部" value="能环事业部"/>
                    <el-option label="石化事业部" value="石化事业部"/>
                    <el-option label="MES事业部" value="MES事业部"/>
                    <el-option label="智慧城市" value="智慧城市"/>
                    <el-option label="自动化事业本部-研究所" value="自动化事业本部-研究所"/>
                    <el-option label="大数据服务事业部" value="大数据服务事业部"/>
                    <el-option label="中铝智能铜创科技" value="中铝智能铜创科技"/>
                    <el-option label="其烨科技" value="其烨科技"/>
                </el-select>
            </div>

            <div class="item">
                <span>岗位名称:</span>
                <el-select v-model="formData.itvJob" class="m-2" placeholder="---请选择---" size="mini">
                    <el-option label="JAVA开发工程师-初级" value="JAVA开发工程师-初级"/>
                    <el-option label="JAVA开发工程师-中级" value="JAVA开发工程师-中级"/>
                    <el-option label="JAVA开发工程师-高级" value="JAVA开发工程师-高级"/>
                    <el-option label="c++开发工程师-初级" value="c++开发工程师-初级"/>
                    <el-option label="c++开发工程师-中级" value="c++开发工程师-中级"/>
                    <el-option label="c++开发工程师-高级" value="c++开发工程师-高级"/>
                    <el-option label="前端开发-初级" value="前端开发-初级"/>
                    <el-option label="前端开发-中级" value="前端开发-中级"/>
                    <el-option label="前端开发-高级" value="前端开发-高级"/>
                    <el-option label="自动化工程师-初级" value="自动化工程师-初级"/>
                    <el-option label="自动化工程师-中级" value="自动化工程师-中级"/>
                    <el-option label="自动化工程师-高级" value="自动化工程师-高级"/>
                    <el-option label="项目经理" value="项目经理"/>
                </el-select>
            </div>
            <div class="item">
                <span>入职日期:</span>
                <el-date-picker format="YYYYMMDD" v-model="formData.empDate" type="date" placeholder="请选择" :size="size"/>
            </div>

            <div class="item">
                <span>离职日期:</span>
                <el-date-picker format="YYYYMMDD" v-model="formData.depDate" type="date" placeholder="请选择" :size="size"/>
            </div>

            <div class="item">
                <span>离职原因&nbsp;:</span>
                <el-input v-model="formData.depReason" placeholder="请输入离职原因" />
            </div>

            <div class="item">
                <span>申请日期:</span>
                <el-date-picker format="YYYYMMDD" v-model="formData.applyDate" type="date" placeholder="请选择" :size="size"/>
            </div>
            <div class="item">
                <span>备注&nbsp;:</span>
                <el-input v-model="formData.remark" placeholder="请输入备注" />
            </div>


            <div class="item">
                <span></span>
                <el-button type="success" @click="editForm"><el-icon><Select /></el-icon>&nbsp;{{isAdd?'添加离职信息':'修改离职信息'}}</el-button>
            </div>
        </el-drawer>

        <!-- 导入抽屉 -->
        <el-drawer v-model="drawer" size="40%" :title="导入人员离职信息"
            direction="btt"
            :before-close="handleClose" >
            <el-upload
                class="upload-demo"
                drag
                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                multiple
                >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽文件至此或 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                    jpg/png 文件大小不超过 500kb
                    </div>
                </template>
                </el-upload>
        </el-drawer>

</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import {listPerson} from '../../../api/sder05'
export default {
    name:'Sder05',
    setup(){
        let allData=reactive({
            tableData:[],
            formData:{
                memberName:'',
            },
            isAdd:true,
            pageSize:10,
            totalNum:0,
            openDrawer:false,
            drawer:false,
            memberNameValue:'',
            deptValue:'',
            itvJobValue:'',
            loading:true,
            show:false,
            activeSteps:1

        })

         //初始化
         let loadTable = async()=>{
            let r = await listPerson()
            allData.tableData = r.data
            let count = Object.keys(allData.tableData)
            allData.totalNum = count.length
            setTimeout(() => {
                allData.loading= false
            }, 500);
        }
    
        loadTable()

        //人员信息form表单中的按钮
        let editForm=async()=>{
            let r =false;
            //判断是添加还是修改
            if(allData.isAdd){
            r=await addForm(allData.formData)
            }else{
            r=await updateForm(allData.formData)
            }
            if(r){
            loadTable();
            allData.loading=true
            setTimeout(() => {
                    allData.loading= false
                }, 500);
            }
        }

        let queryMemberStatus = async (row)=>{
            let {approveStatus}=row
            if(approveStatus=='01'){
                allData.activeSteps=1
            }else if(approveStatus=='02'){
                allData.activeSteps=2
            }else if(approveStatus=='03'){
                allData.activeSteps=3
            }else if(approveStatus=='04'){
                allData.activeSteps=1
            }else{
                allData.activeSteps
            }
        }
         //修改表单数据
         let handleEdit =async(row)=>{
            //赋值
            allData.formData={...row}
            allData.isAdd=false
            //打开抽屉
            allData.openDrawer=true;
        }
         //执行删除方法
         let handleDelete=async(row)=>{
            let {id}=row
            await deleteForm(id)
            setTimeout(() => {
                loadTable();
            }, 2000);
        }
        

            //关闭表单事件
        let drawerClose = ()=>{
            allData.openDrawer=false
            allData.isAdd=true
            //清空表单
            allData.formData={
                
            }
            
        }
        return {
            ...toRefs(allData),
            loadTable,editForm,handleEdit,handleDelete,drawerClose,queryMemberStatus
        }
    }
}
</script>

<style scoped lang="scss">
.contents{
  padding-top: 6px;
  
}
.center{
    float: left;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .contents{
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .tableItem{
        padding-top: 2px;
        padding-bottom: 2px;
    }
  .item{
    font-size: 14px;
    display: flex;
    align-items: center;
    margin: 10px 0px;
     span{
      width: 100px;
      text-align: right;
      margin-right: 8px;
     }
    div{
      flex: 1;
    }
  }
  .sreach{
    padding-top: 10px;
    padding-bottom: 10px;
    width: 1400px;
    .sreachItem{
      float: left;
      width: 300px;
      padding-right: 10px;
      .m-2{
        width: 300px;
      }
      span{
      width: 100px;
      text-align: left;
     }
    }
    
  }
  .upload-demo{
    padding-top: 0px;
  }
  .steps{
    padding-top: 10px;
  }
  .el-drawer__title{
    color: black;
  }

  .pagination{
    margin-top: 10px;

  }
  .el-drawer rtl open{
    background: red;
  }

</style>