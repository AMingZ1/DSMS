<template>

  <div class="contents">
    <el-tabs type="border-card">
        
          <div class="center">
            <!--点击打开新增抽屉-->
            <el-button type="warning" round class="addDrawer" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;添加人才</el-button>
            <!--点击导入抽屉-->
             <!--模版导出-->
             <!-- <el-button type="success" round  @click="downloadPersonFile()"><el-icon><Download /></el-icon>&nbsp;导入人员模版下载</el-button>-->
               
             <!--点击导入抽屉-->
               <el-button type="success" round class="uploadDrawer" @click="drawer2=true"><el-icon><Upload /></el-icon>&nbsp;导入人员</el-button>
               
               <el-row :gutter="24">
              <el-col :span="6"><div class="grid-content ep-bg-purple" />
                <el-input v-model="memberNameValue" placeholder="请输入人员姓名" clearable/>
              </el-col>
              <el-col :span="6"><div class="grid-content ep-bg-purple" />
                <!-- 查询条件-部门
                <el-input v-model="deptNameValue" placeholder="请输入人员部门" clearable/>
                -->
                <el-select v-model="deptNameValue" filterable  default-first-option
                 @change="searchTable" class="m-2"  size="mini">
                  <el-option 
                    v-for="item in deptList"
                    :key="item.deptId"
                    :label="item.deptName"
                    :value="item.deptId"
                    ></el-option>
                </el-select>

              </el-col>
              <el-col :span="6"><div class="grid-content ep-bg-purple" />
                <!-- 查询条件-岗位 
                <el-input v-model="itvJobNameValue" placeholder="请输入人员岗位" clearable/>
                -->
                <el-select v-model="itvJobNameValue" filterable default-first-option
                 @change="searchTable" class="m-2"  size="mini">
                  <el-option 
                    v-for="item in itvJobList"
                    :key="item.itvJobId"
                    :label="item.itvJobName"
                    :value="item.itvJobId"
                    ></el-option>
                </el-select>
              </el-col>
              <el-col :span="6"> <div class="grid-content ep-bg-purple" />
                <!-- 查询条件-归档原因 -->
                <el-select v-model="acvReasonId"  @change="searchTable" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in acvReasonList"
                      :key="item.acvReasonId"
                      :label="item.acvReasonName"
                      :value="item.acvReasonId"
                      ></el-option>
                </el-select>
              </el-col>
              
            </el-row>

      
            <el-row :gutter="24">
              <el-col :span="6">
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
              <el-col :span="6"> 
              <el-date-picker  style="width:90%"
                    format="YYYYMMDD" 
                    value-format="YYYYMMDD" 
                    v-model="startRecCreateTime" 
                    placeholder="创建时间起"
                   />
            </el-col>
            <el-col :span="6"> 
              <el-date-picker  style="width:90%"
                    format="YYYYMMDD" 
                    value-format="YYYYMMDD" 
                    v-model="endRecCreateTime" 
                   placeholder="创建时间止"
                   />
            </el-col>
         
              <el-col :span="6">
                <span></span>
                <el-tooltip content="查询" placement="top" effect="light">
                  <el-button type="primary" @click="searchTable" round ><el-icon><Search /></el-icon></el-button>
                </el-tooltip>
                <el-tooltip content="导出数据" placement="top" effect="light">
                  <el-button type="success" @click="exportTable" round plain><el-icon><Download /></el-icon></el-button>
                </el-tooltip>
                <el-tooltip content="删除数据" placement="top" effect="light">
                <el-button type="success" @click="deleteTable()"  round plain> 删除</el-button>
              </el-tooltip>  
              </el-col>
            </el-row>

          </div>
        
        <el-table :data="tableData" stripe border style="width: 100%" 
        @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" />
          <el-table-column  prop="memberNo" label="人才编号" width="100" v-if="false" />
          <el-table-column fixed prop="memberName" label="姓名" width="100" />
          <el-table-column  fixed show-overflow-tooltip label="面试部门" width="200" >
              <template #default="scope" >          
                <el-select  v-model="scope.row.deptName"   @change="searchTable" class="m-2"  size="mini">
                  <el-option v-for="item in deptList2"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column  fixed show-overflow-tooltip label="面试岗位" width="200" >
               <template #default="scope">
               <el-select v-model="scope.row.itvJob"   @change="searchTable"
                 class="m-2"  size="mini">
                  <el-option v-for="item in itvJobList2"
                  :key="item.itvJobId"
                  :label="item.itvJobName"
                  :value="item.itvJobId"
                  ></el-option>
                </el-select>
              </template>

            
            </el-table-column>
          <el-table-column  prop="tel" label="联系电话" width="120" />
          <el-table-column  prop="email" label="邮箱" width="180" />

          <el-table-column  label="简历附件" width="100">
              <template #default="scope">
                <el-link type="primary" @click="updateFileId(scope.row,false)">查看</el-link>
              </template>
          </el-table-column>

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
          <el-table-column prop="archiveDate" label="归档时间" width="200"/>
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
          <el-table-column prop="recCreateName" label="创建人" width="130"/>
          <el-table-column prop="recCreateTime" label="创建时间" width="200"/>

          <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
            <el-button type="success" size="small" @click="updateFileId(scope.row,true)">上传</el-button>
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


    <!-- 附件上传抽屉 -->
    <el-drawer  v-model="drawer" size="60%" title="附件上传"
      direction="ttb"
      :before-close="handleClose" >
      <el-upload  v-show="drawerFile"
          class="upload-demo"
          drag    
          action="#" 
          :on-preview="filePreview"
          :http-request="fileRequest"
          :on-remove="fileRemove"
           v-model:file-list="fileList"
          :show-file-list="false"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽文件至此或 <em>点击上传</em>
          </div>
        </el-upload>          
        <el-table :data="fileList" style="width: 80%;margin-left:10%">
        <el-table-column prop="name" label="文件名" ></el-table-column>
        <el-table-column prop="uploadingTime" label="上传时间" ></el-table-column>
        <el-table-column >
          <template #default="scope">
            <el-button type="text"  @click="handlePreview(scope.row)"> 预览</el-button>
            <el-button type="text"  @click="filePreview(scope.row)"> 下载</el-button>
            <el-button type="text" v-show="drawerFile"  style="color:red" @click="fileRemove(scope.row)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>      
    </el-drawer>


    <el-drawer  v-model="drawer2" size="60%" title="导入人员"
      direction="ttb"
      :before-close="handleClose" >
      <el-upload  v-show="drawerFile"
          class="upload-demo"
          drag    
          action="#" 
          :http-request="importPersonFile"
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            拖拽文件至此或 <em>点击上传</em>
          </div>
        </el-upload>  
    </el-drawer>


  </div>
    
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'
import {listCloud,addToCloud,updateForm,deleteForm,deleteForm2,
  getAllFiles,importFiles,downloadFile,importFiles2,removeFile} from '../../../api/sdhr03'
import {itemList} from '../../../api/itemApi'
import { Base64 } from 'js-base64';
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
        deptList2:[],
        itvJobId:'',
        itvJobList:[{itvJobId:'',itvJobName:'请选择面试岗位'}],
        itvJobList2:[],
        endRecCreateTime:'',
        startRecCreateTime:'',
        memberNameValue:'',
        deptNameValue:'',
        itvJobNameValue:'',
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
        fileList:[],
        drawer:false,
        drawerFile:true,
        drawer2:false,
      })


        //格式化日期展示
      let dateFormat= (date) =>{
        if(date==" " || date==""){
          return "";
        }
        let year=date.substr(0, 4);
        let month= date.substr(4, 2);
        let day=date.substr(6, 2);      
        // 拼接
        return year+"-"+month+"-"+day;
      }

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
              allData.deptList.push({deptId:r[i].codeEname,deptName:r[i].codeCname});
              allData.deptList2.push({deptId:r[i].codeEname,deptName:r[i].codeCname});
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
              allData.itvJobList.push({itvJobId:r[i].codeEname,itvJobName:r[i].codeCname});
              allData.itvJobList2.push({itvJobId:r[i].codeEname,itvJobName:r[i].codeCname});
            }
          }
          
        }
        loadItvJobList()
      //表格数据加载
      let loadTable = async()=>{
        let r = await listCloud()
         allData.tableData = r.data.data;
         allData.totalNum = r.totalNum;

         allData.tableData.forEach((item) => {
          let time = dateFormat(item.recCreateTime);
          item.recCreateTime = time;
          
          item.archiveDate = dateFormat(item.archiveDate);
        }); 

      }
      loadTable()

      let searchTable = async()=>{     
        loadDeptList();
        loadItvJobList();

        let prams = {
          deptName:allData.deptNameValue,
          itvJob:allData.itvJobNameValue,
          memberName:allData.memberNameValue,
          channel:allData.channelId,
          archiveReason:allData.acvReasonId,
          archiveStatusbfr:allData.acvStatusId,
          educationBckr:allData.edcBckrId,
          startRecCreateTime:allData.startRecCreateTime,
            endRecCreateTime:allData.endRecCreateTime,
        };
        let r = await listCloud(prams)
        allData.tableData = r.data.data;
        allData.totalNum = r.data.totalNum;
        allData.tableData.forEach((item) => {
          let time = dateFormat(item.recCreateTime);
          item.recCreateTime = time;
          item.archiveDate = dateFormat(item.archiveDate);
        }); 
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
          deptName:allData.deptNameValue,
          itvJob:allData.itvJobNameValue,
          memberName:allData.memberNameValue,
          channel:allData.channelId,
          archiveReason:allData.acvReasonId,
          archiveStatusbfr:allData.acvStatusId,
          educationBckr:allData.edcBckrId,
          startRecCreateTime:allData.startRecCreateTime,
          endRecCreateTime:allData.endRecCreateTime,
          pageNum:val
        };
        let r = await listCloud(prams)
        allData.tableData = r.data.data;
        allData.totalNum = r.data.totalNum;
        allData.tableData.forEach((item) => {
          let time = dateFormat(item.recCreateTime);
          item.recCreateTime = time;
          item.archiveDate = dateFormat(item.archiveDate);
        }); 
      }

    

      //导入人员附件
      let importPersonFile = async(a) => {
        let formData = new FormData();
        formData.append('file', a.file);
        formData.append('businessNo', 'sdhr03');
        formData.append('businessKeyword', 'sdhr03'); 

        await importFiles(formData);
        searchTable();
      }

       //导入人员模版
      let downloadPersonFile =async()=>{
        let name ="人才库导入模板.xls";
        let params = {
          fileId:"Tsdhr03Upload",
           businessKeyword:'sdhr03'
         };
         let url = "file/downloadFile";

         await downloadFile(url,params,name)
      }

      //预览
      let handlePreview = async(file)=>{
            var url = 'http://106.14.152.86:8082/static/sdhr03/'+file.id+file.suffix;  //要预览文件的访问地址          
            // window.open()居中打开  不想居中的话去掉就行
            const width = 1000; 
            const height = 800;
            const top = (window.screen.availHeight - height) / 2;
            const left = (window.screen.availWidth - width) / 2;
            window.open('http://106.14.152.86:8012/onlinePreview?url='
                +encodeURIComponent(Base64.encode(url)),
                '', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);  
      }

      //打开附件页面  
      let updateFileId =async(row,flag)=>{
        //赋值
        allData.fileId = row.memberNo;
        allData.drawer=true;
        //判断是查询还是上传
        flag?allData.drawerFile=true:allData.drawerFile=false;
       
        let prams = {
          businessNo:allData.fileId,
          businessKeyword:"sdhr03"
        };
       
        let data =  await getAllFiles(prams);
        //更新展示附件
        let list = [];
        data.data.forEach((item) => {
          let time = dateFormat(item.recCreateTime);
          list.push({name:item.fileName+item.fileSuffix,id:item.fileId,
            suffix:item.fileSuffix,url:item.filePath,uploadingTime:time});
        });  
        allData.fileList = list; 
      }

      //自己上传附件方法
      let fileRequest = async(a) => {
        //上传附件
        let formData = new FormData();
        formData.append('file', a.file);
        formData.append('businessNo', allData.fileId);
        formData.append('businessKeyword', 'sdhr03');      
        await importFiles2(formData);

          //更新附件
        let prams = {
          businessNo:allData.fileId,
          businessKeyword:"sdhr03"
        };       
        let fileData =  await getAllFiles(prams);
        let list = [];
        fileData.data.forEach((item) => {
            let time = dateFormat(item.recCreateTime);
            list.push({name:item.fileName+item.fileSuffix,id:item.fileId,
            suffix:item.fileSuffix,url:item.filePath,uploadingTime:time});
        });  
        allData.fileList = list;  
      }
     
      //点击文件事件，文件下载
      let filePreview =async(file)=>{
        let name =file.name;
        let params = {
          fileId:file.id,
           businessKeyword:'sdhr03'
         };
        let url = "file/downloadFile";
        await downloadFile(url,params,name)
      }

      
      //附件删除
      let fileRemove =async (file) => {
        let formData = new FormData();
        formData.append('fileId', file.id);
        await removeFile(formData)      
        allData.fileList = allData.fileList.filter((i)=>i.id!=file.id);
      }


       //导出数据
       let exportTable = async() => {
       
            let name ="人才库信息导出.xlsx";
            let params = {
              deptName:allData.deptNameValue,
              itvJob:allData.itvJobNameValue,
              memberName:allData.memberNameValue,
              channel:allData.channelId,
              archiveReason:allData.acvReasonId,
              archiveStatusbfr:allData.acvStatusId,
              educationBckr:allData.edcBckrId,
              startRecCreateTime:allData.startRecCreateTime,
              endRecCreateTime:allData.endRecCreateTime,
            };
              let url = "Sdhr03/export";
              await downloadFile(url,params,name)       
      }

      //保存选中行数据
      let handleSelectionChange = async(rows) => {
          allData.handleSelectionChange=rows;
        
        }

       //删除数据 减选中数据的ID拼接转入到后台
       let deleteTable = async() => {
        let memberNos = "";
        allData.handleSelectionChange.forEach((item) => {  
          memberNos  += item.memberNo+",";
        }); 
        memberNos =memberNos.substring(0,memberNos.length-1);
        let prams = {
          memberNo:memberNos
        };
        await deleteForm2(prams);
        setTimeout(() => {
          searchTable();
        }, 2000);
      }



      return{
        ...toRefs(allData),
        loadTable,loadEdcBckrList,loadChannelList,searchTable,loadDeptList,loadAcvStatusList,loadItvJobList,handleEdit,drawerClose,editForm,handleDelete,handleCurrentChange
        ,importPersonFile,downloadPersonFile,updateFileId,fileRemove,fileRequest,filePreview,exportTable,handlePreview,handleSelectionChange,deleteTable
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