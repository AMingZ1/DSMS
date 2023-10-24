<template>

  <div class="contents">
    <el-tabs type="border-card">
        
          <div class="center">
            <!--点击打开新增抽屉-->
            <el-button type="warning" round class="addDrawer" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;添加人才</el-button>
            <!--点击导入抽屉-->
            <el-button type="success" round class="uploadDrawer"><el-icon><Upload /></el-icon>&nbsp;导入信息</el-button>
            <el-row :gutter="24">
              <el-col :span="6"><div class="grid-content ep-bg-purple" />
                <el-input v-model="memberNameValue" placeholder="请输入人员姓名" clearable/>
              </el-col>
              <el-col :span="6"><div class="grid-content ep-bg-purple" />
                <!-- 查询条件-渠道 -->
                <el-select v-model="channelId" @change="searchTable" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in channelList"
                      :key="item.channelId"
                      :label="item.channelName"
                      :value="item.channelId"
                      ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6"><div class="grid-content ep-bg-purple" />
                <!-- 查询条件-学历 -->
                <el-select v-model="edcBckrId" @change="searchTable" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in edcBckrList"
                      :key="item.edcBckrId"
                      :label="item.edcBckrName"
                      :value="item.edcBckrId"
                      ></el-option>
                </el-select>
              </el-col>
            </el-row>

            <el-row :gutter="24">
              <el-col :span="6">
                <!-- 查询条件-归档原因 -->
                <el-select v-model="acvReasonId" @change="searchTable" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in acvReasonList"
                      :key="item.acvReasonId"
                      :label="item.acvReasonName"
                      :value="item.acvReasonId"
                      ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                <!-- 查询条件-归档前状态 -->
                <el-select v-model="acvStatusId" @change="searchTable" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in acvStatusList"
                      :key="item.acvStatusId"
                      :label="item.acvStatusName"
                      :value="item.acvStatusId"
                      ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6">
                
              </el-col>
              <el-col :span="6">
                <span></span>
                <el-tooltip content="查询" placement="top" effect="light">
                  <el-button type="primary" @click="searchTable" round ><el-icon><Search /></el-icon></el-button>
                </el-tooltip>
                <el-tooltip content="导出数据" placement="top" effect="light">
                  <el-button type="success" @click="searchTable" round plain><el-icon><Download /></el-icon></el-button>
                </el-tooltip>
              </el-col>
            </el-row>
          </div>
        
        <el-table :data="tableData" stripe border style="width: 100%" >
          <el-table-column type="selection" width="40" />
          <el-table-column  prop="memberNo" label="人才编号" width="100" v-if="false" />
          <el-table-column fixed prop="memberName" label="姓名" width="100" />
          <el-table-column  fixed show-overflow-tooltip label="面试部门" width="200" >
              <template #default="scope">
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_001'">能环事业部</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_002'">石化事业部</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_003'">MES事业部</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_004'">智能装备事业部</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_005'">智慧城市</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_006'">自动化事业本部-研究所</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_007'">大数据服务事业部</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_008'">中铝智能铜创科技</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.deptName=='DEPT_009'">其烨科技</el-tag>
              </template>
            </el-table-column>
            <el-table-column  fixed show-overflow-tooltip label="面试岗位" width="200" >
              <template #default="scope">
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_002'"  >JAVA开发工程师-中级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_001'"  >JAVA开发工程师-初级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_003'"  >JAVA开发工程师-高级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_004'"  >c++开发工程师-初级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_005'"  >c++开发工程师-中级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_006'"  >c++开发工程师-高级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_007'"  >前端开发-初级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_008'"  >前端开发-中级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_009'"  >前端开发-高级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_010'"  >自动化工程师-初级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_011'"  >自动化工程师-中级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_012'"  >自动化工程师-高级</el-tag>
                <el-tag size="large" type="info" v-if="scope.row.itvJob=='JOB_013'"  >项目经理</el-tag>
              </template>
            </el-table-column>
          <el-table-column  prop="tel" label="联系电话" width="120" />
          <el-table-column  prop="email" label="邮箱" width="180" />
          <el-table-column  show-overflow-tooltip label="渠道" width="200" >
              <template #default="scope">
                <el-tag size="large" v-if="scope.row.channel=='01'"  >猎聘</el-tag>
                <el-tag size="large" v-if="scope.row.channel=='02'"  >智联</el-tag>
                <el-tag size="large" v-if="scope.row.channel=='03'"  >前程无忧</el-tag>
                <el-tag size="large" v-if="scope.row.channel=='04'"  >BOSS直聘</el-tag>
                <el-tag size="large" v-if="scope.row.channel=='05'"  >拉勾</el-tag>
                <el-tag size="large" v-if="scope.row.channel=='06'"  >58同城</el-tag>
                <el-tag size="large" v-if="scope.row.channel=='07'"  >赶集网</el-tag>
                <el-tag size="large" v-if="scope.row.channel=='08'"  >内荐</el-tag>
                <el-tag size="large" v-if="scope.row.channel=='99'"  >其他</el-tag>
              </template>
            </el-table-column>
          <el-table-column  show-overflow-tooltip label="归档原因" width="200" >
              <template #default="scope">
                <el-tag size="large" v-if="scope.row.archiveReason=='10'"  >直接上传到人才库</el-tag>
                <el-tag size="large" v-if="scope.row.archiveReason=='20'"  >被淘汰</el-tag>
                <el-tag size="large" v-if="scope.row.archiveReason=='30'"  >取消录用</el-tag>
                <el-tag size="large" v-if="scope.row.archiveReason=='40'"  >已离职</el-tag>
                <el-tag size="large" v-if="scope.row.archiveReason=='50'"  >已入职其他职位</el-tag>
                <el-tag size="large" v-if="scope.row.archiveReason=='60'"  >职位关闭自动归档</el-tag>
                <el-tag size="large" v-if="scope.row.archiveReason=='70'"  >初筛不通过</el-tag>
              </template>
            </el-table-column>
          <el-table-column  show-overflow-tooltip label="归档前状态" width="120" >
              <template #default="scope">
                <el-tag size="large" v-if="scope.row.archiveStatusbfr=='01'"  >待筛选</el-tag>
                <el-tag size="large" v-if="scope.row.archiveStatusbfr=='02'"  >初筛通过</el-tag>
                <el-tag size="large" v-if="scope.row.archiveStatusbfr=='03'"  >初筛未通过</el-tag>
                <el-tag size="large" v-if="scope.row.archiveStatusbfr=='04'"  >面试流程中</el-tag>
                <el-tag size="large" v-if="scope.row.archiveStatusbfr=='05'"  >面试未通过</el-tag>
                <el-tag size="large" v-if="scope.row.archiveStatusbfr=='06'"  >已取消录用</el-tag>
                <el-tag size="large" v-if="scope.row.archiveStatusbfr=='07'"  >待入职</el-tag>
                <el-tag size="large" v-if="scope.row.archiveStatusbfr=='08'"  >其他</el-tag>
              </template>
            </el-table-column>
          <el-table-column prop="archiveDate" label="归档时间" width="130"/>
          <el-table-column prop="workYear" label="工作年限"  width="100" />
          <el-table-column  show-overflow-tooltip label="学历" width="100" >
              <template #default="scope">
                <el-tag size="large" v-if="scope.row.educationBckr=='01'"  >中专</el-tag>
                <el-tag size="large" v-if="scope.row.educationBckr=='02'"  >大专</el-tag>
                <el-tag size="large" v-if="scope.row.educationBckr=='03'"  >本科</el-tag>
                <el-tag size="large" v-if="scope.row.educationBckr=='04'"  >本科学士</el-tag>
                <el-tag size="large" v-if="scope.row.educationBckr=='05'"  >硕士研究生</el-tag>
                <el-tag size="large" v-if="scope.row.educationBckr=='06'"  >博士研究生</el-tag>
                <el-tag size="large" v-if="scope.row.educationBckr=='07'"  >其他</el-tag>
              </template>
          </el-table-column>
          <el-table-column prop="remark" show-overflow-tooltip label="备注"  width="200" />
          <el-table-column fixed="right" label="操作" width="140">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
        <!-- 分页区 -->
        <div class="pagination">
          <el-pagination background layout="total,prev, pager, next" :pager-count="11" :total="totalNum" v-model:current-page="pageNum" @current-change="handleCurrentChange" :page-size="pageSize" />
        </div>
     
    </el-tabs>

    <el-drawer v-model="openDrawer" :title="isAdd?'添加岗位需求':'修改岗位需求信息'"
        direction="rtl"
        :before-close="drawerClose"
      >
        <div class="item">
          <span>人才编号:</span>
          <el-input v-model="formData.memberNo" placeholder="请输入人才编号" disabled />
        </div>
        <div class="item">
          <span>人员姓名:</span>
          <el-input v-model="formData.memberName" placeholder="请输入人员姓名" />
        </div>
        <div class="item">
          <span>面试部门:</span>
          <el-select v-model="formData.deptName"  class="m-2"  size="mini">
              <el-option 
                v-for="item in deptList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
                ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>岗位名称:</span>
          <el-select v-model="formData.itvJob"  class="m-2"  size="mini">
              <el-option 
                v-for="item in itvJobList"
                :key="item.itvJobId"
                :label="item.itvJobName"
                :value="item.itvJobId"
                ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>联系电话:</span>
          <el-input v-model="formData.tel" placeholder="请输入人员姓名" />
        </div>
        <div class="item">
          <span>邮箱:</span>
          <el-input v-model="formData.email" placeholder="请输入人员姓名" />
        </div>
        <div class="item">
          <span>渠道:</span>
          <el-select v-model="formData.channel"  class="m-2"  size="mini">
              <el-option 
                v-for="item in channelList"
                :key="item.channelId"
                :label="item.channelName"
                :value="item.channelId"
                ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>归档原因:</span>
          <el-select v-model="formData.archiveReason"  class="m-2"  size="mini">
              <el-option 
                v-for="item in acvReasonList"
                :key="item.acvReasonId"
                :label="item.acvReasonName"
                :value="item.acvReasonId"
                ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>归档前状态:</span>
          <el-select v-model="formData.archiveStatusbfr"  class="m-2"  size="mini">
              <el-option 
                v-for="item in acvStatusList"
                :key="item.acvStatusId"
                :label="item.acvStatusName"
                :value="item.acvStatusId"
                ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>归档时间:</span>
          <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.archiveDate" type="date" placeholder="请选择" :size="size"/>
        </div>
        <div class="item">
          <span>工作年限:</span>
          <el-input v-model="formData.workYear" placeholder="请输入人员姓名" />
        </div>
        <div class="item">
          <span>学历:</span>
          <el-select v-model="formData.educationBckr"  class="m-2"  size="mini">
              <el-option 
                v-for="item in edcBckrList"
                :key="item.edcBckrId"
                :label="item.edcBckrName"
                :value="item.edcBckrId"
                ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>归档备注:</span>
          <el-input type="textarea" v-model="formData.remark" placeholder="请输入归档备注" />
        </div>
        <div class="item">
          <span></span>
          <el-button type="success" @click="editForm"><el-icon><Select /></el-icon>&nbsp;{{isAdd?'添加需求':'修改需求'}}</el-button>
        </div>
     </el-drawer>

  </div>
    
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import {listCloud,addToCloud,updateForm,deleteForm} from '../../../api/sdhr03'
import {itemList} from '../../../api/itemApi'
export default {
    name:'Sdhr03',
    setup(){
      let allData = reactive({
        tableData:[],
        formData:{
          memberNo:'',
          memberName:'',
          deptName:'',
          itvJob:'',
          tel:'',
          email:'',
          channel:'',
          archiveReason:'',
          archiveStatusbfr:'',
          archiveDate:'',
          workYear:'',
          educationBckr:'',
          remark:''
        },
        //查询条件下拉框
        channelId:'',
        channelList:[{channelId:'',channelName:'请选择渠道'}],
        acvStatusId:'',
        acvStatusList:[{acvStatusId:'',acvStatusName:'请选择归档前状态'}],
        edcBckrId:'',
        edcBckrList:[{edcBckrId:'',edcBckrName:'请选择学历'}],
        acvReasonId:'',
        acvReasonList:[{acvReasonId:'',acvReasonName:'请选择归档原因'}],
        deptId:'',
        deptList:[{deptId:'',deptName:'请选择面试部门'}],
        itvJobId:'',
        itvJobList:[{itvJobId:'',itvJobName:'请选择面试部门'}],

        memberNameValue:'',
        openDrawer:false,
        isAdd:true,
        //分页：每页数
        pageSize:10,
        //分页：总条数
        totalNum:0,
        pageNum:1,
        //查询筛选区域
        // yearList:[],
        // yearId:0,

      })
      //渠道下拉框
      let loadChannelList = async()=>{
          let prams={
            codeNo:'sdHr_channel'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.channelList.push({channelId:r[i].codeEname,channelName:r[i].codeCname})
            }
          }
          
        }
        loadChannelList()
      //学历下拉框
      let loadEdcBckrList = async()=>{
          let prams={
            codeNo:'sdHr_edcBckr'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.edcBckrList.push({edcBckrId:r[i].codeEname,edcBckrName:r[i].codeCname})
            }
          }
          
        }
        loadEdcBckrList()
      //归档原因下拉框
      let loadAcvReasonList = async()=>{
          let prams={
            codeNo:'sdhr_acvReason'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.acvReasonList.push({acvReasonId:r[i].codeEname,acvReasonName:r[i].codeCname})
            }
          }
          
        }
        loadAcvReasonList()
      //归档前状态下拉框
      let loadAcvStatusList = async()=>{
          let prams={
            codeNo:'sdHr_acvStatus'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.acvStatusList.push({acvStatusId:r[i].codeEname,acvStatusName:r[i].codeCname})
            }
          }
          
        }
        loadAcvStatusList()

        //部门下拉框
        let loadDeptList = async()=>{
          let prams={
            codeNo:'sdHr_deptName'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.deptList.push({deptId:r[i].codeEname,deptName:r[i].codeCname})
            }
          }
          
        }
        loadDeptList()

        //岗位下拉框
        let loadItvJobList = async()=>{
          let prams={
            codeNo:'sdHr_jobName'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.itvJobList.push({itvJobId:r[i].codeEname,itvJobName:r[i].codeCname})
            }
          }
          
        }
        loadItvJobList()
      //表格数据加载
      let loadTable = async()=>{
        let r = await listCloud()
         allData.tableData = r.data.data
         allData.totalNum = r.totalNum
      }
      loadTable()

      let searchTable = async()=>{
       
        let prams = {
          memberName:allData.memberNameValue,
          channel:allData.channelId,
          archiveReason:allData.acvReasonId,
          archiveStatusbfr:allData.acvStatusId,
          educationBckr:allData.edcBckrId
        };
        let r = await listCloud(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
        setTimeout(() => {
                allData.loading= false
            }, 500);
      }

      let handleEdit=async(row)=>{
          //赋值
          allData.formData={...row}
          allData.isAdd=false
          //打开抽屉
          allData.openDrawer=true;
      }

      //关闭表单事件
      let drawerClose = ()=>{
        allData.openDrawer=false
        allData.isAdd=true
        //清空表单
        allData.formData={
          reqNo:'',
          year:'',
          deptName:'',
          itvJob:'',
          requireNum:'',
          jobRequire:'',
          requireContact:'',
          dutyPerson:'',
          planEndDate:'',
          itvWays:'',
          isEme:''
        }
      }

      let editForm=async()=>{
        let r =false;
          //判断是添加还是修改
          if(allData.isAdd){
            r=await addToCloud(allData.formData)
          }else{
            r=await updateForm(allData.formData)
          }
          if(r){
            loadTable();
          }
      }

      let handleDelete=async(row)=>{
        let  prams={
            memberNo:row.memberNo
          }
          await deleteForm(prams)
          setTimeout(() => {
            loadTable();
          }, 2000);
      }

      //分页切换
      let handleCurrentChange=async(val)=>{
        let prams = {
          memberName:allData.memberNameValue,
          channel:allData.channelId,
          archiveReason:allData.acvReasonId,
          archiveStatusbfr:allData.acvStatusId,
          educationBckr:allData.edcBckrId,
          pageNum:val
        };
        let r = await listCloud(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
      }
      return{
        ...toRefs(allData),
        loadTable,loadEdcBckrList,loadChannelList,searchTable,loadDeptList,loadAcvStatusList,loadItvJobList,handleEdit,drawerClose,editForm,handleDelete,handleCurrentChange
      }
    }
}
</script>

<style scoped lang="scss">
  .center{
    float: left;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 98%;
  }
  .item{
    font-size: 14px;
    display: flex;
    align-items: center;
    margin: 10px 0px;
     span{
      width: 100px;
      text-align: left;
     }
    div{
      flex: 1;
    }
  }
  .sreach{
    padding-top: 10px;
    padding-bottom: 10px;
    width: 100%;
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
  .el-row {
      margin-bottom: 6px;
    }
    .el-row:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;
      .el-input{
        width: 90%;
      }
      .m-2{
        width: 90%;
        color: black;
        padding-right: 10px;
      }
    }
    .grid-content {
      border-radius: 4px;
      min-height: 12px;
    }

</style>