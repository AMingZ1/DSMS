<template>
  <div class="contents">
    <el-tabs type="border-card">
     
        <div class="center">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-input v-model="memberNameValue"  placeholder="请输入人员姓名" clearable/>
            </el-col>
            <el-col :span="6">
              <!-- 查询条件-部门 -->
              <el-select v-model="deptId" @change="searchTable" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in deptList"
                      :key="item.deptId"
                      :label="item.deptName"
                      :value="item.deptId"
                      ></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
              <!-- 查询条件-岗位 -->
              <el-select v-model="itvJobId" @change="searchTable" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in itvJobList"
                      :key="item.itvJobId"
                      :label="item.itvJobName"
                      :value="item.itvJobId"
                      ></el-option>
                </el-select>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="6">
              <el-date-picker 
                    format="YYYYMMDD" 
                    value-format="YYYYMMDD" 
                    v-model="empData" 
                    type="daterange" 
                    unlink-panels 
                    start-placeholder="入职时间起"
                    end-placeholder="入职时间止" 
                   />
            </el-col>
            <el-col :span="6">
              <!-- 查询条件-审批状态 -->
              <el-select v-model="approveStatusId" @change="searchTable" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in approveStatusList"
                      :key="item.approveStatusId"
                      :label="item.approveStatusName"
                      :value="item.approveStatusId"
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
            <el-table v-loading="loading" :data="tableData" stripe border style="width: 100%" >
              <el-table-column type="selection" width="40" />
              <el-table-column fixed prop="offerNo" label="Offer编号" width="120" />
              <el-table-column fixed prop="memberName" label="姓名" width="120" />
              <el-table-column  fixed show-overflow-tooltip label="入职部门" width="200" >
                <template #default="scope" >          
                      <el-select  v-model="scope.row.deptName"   @change="searchTable" class="m-2"  size="mini">
                          <el-option v-for="item in deptList"
                          :key="item.deptId"
                          :label="item.deptName"
                          :value="item.deptId"
                          ></el-option>
                      </el-select>
                </template>
              </el-table-column>
              <el-table-column  fixed show-overflow-tooltip label="岗位" width="200" >
                <template #default="scope">
                  <el-select v-model="scope.row.jobs"   @change="searchTable"
                          class="m-2"  size="mini">
                          <el-option v-for="item in itvJobList"
                          :key="item.itvJobId"
                          :label="item.itvJobName"
                          :value="item.itvJobId"
                          ></el-option>
                      </el-select>
                </template>
              </el-table-column>
              <el-table-column  prop="approveStatus" label="审批状态" width="100"  >
              <template #default="scope" >
                <el-link type="success" @click="showApprove(scope.row)" >
                  <el-tag size="large" type="info" v-if="scope.row.approveStatus=='00'"  >待提交</el-tag>
                  <el-tag size="large"  v-if="scope.row.approveStatus=='01'"  >审批中</el-tag>
                  <el-tag size="large" type="success" v-if="scope.row.approveStatus=='02'"  >审批通过</el-tag>
                  <el-tag size="large" type="error" v-if="scope.row.approveStatus=='03'"  >已驳回</el-tag>
                </el-link>
              </template>
              </el-table-column>
              <el-table-column prop="empDate" label="入职时间" width="150" />
              <el-table-column   show-overflow-tooltip label="是否接受录用" width="150" >
                <template #default="scope">
                  <el-tag size="large" type="info" v-if="scope.row.isAgree=='00'"  >待定</el-tag>
                  <el-tag size="large"  v-if="scope.row.isAgree=='10'"  >邮件已发送</el-tag>
                  <el-tag size="large" type="success" v-if="scope.row.isAgree=='20'"  >接受</el-tag>
                  <el-tag size="large" type="error" v-if="scope.row.isAgree=='30'"  >拒绝</el-tag>
                </template>
              </el-table-column>
              <el-table-column   show-overflow-tooltip label="应届/往届" width="120" >
                <template #default="scope">
                  <el-tag size="large" type="info" v-if="scope.row.isFreGra=='0'"  >应届</el-tag>
                  <el-tag size="large" type="info" v-if="scope.row.isFreGra=='1'"  >往届</el-tag>
                </template>
              </el-table-column>
              <el-table-column   show-overflow-tooltip label="电脑" width="130" >
                <template #default="scope">
                  <el-tag size="large" type="info" v-if="scope.row.comStatus=='0'"  >自带电脑</el-tag>
                  <el-tag size="large" type="info" v-if="scope.row.comStatus=='1'"  >公司电脑</el-tag>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="email" label="电子邮箱"  width="160" />
              <el-table-column prop="tel" label="电话"  width="120" />
              <el-table-column prop="salary" label="薪资/元"  width="120" />
              <el-table-column   show-overflow-tooltip label="试用期薪资" width="120" >
                <template #default="scope">
                  <el-tag size="large"  v-if="scope.row.isDz=='1'"  >不打折</el-tag>
                  <el-tag size="large"  v-if="scope.row.isDz=='0.8'"  >80%</el-tag>
                </template>
              </el-table-column>
              <el-table-column show-overflow-tooltip prop="jobAddress" label="入职地址"  width="200" />
              <el-table-column   show-overflow-tooltip label="人员状态" width="150" >
                <template #default="scope">
                  <el-tag size="large"  v-if="scope.row.offerStatus=='00'"  >待定</el-tag>
                  <el-tag size="large"  v-if="scope.row.offerStatus=='01'"  >已入职</el-tag>
                  <el-tag size="large"  v-if="scope.row.offerStatus=='02'"  >不录用</el-tag>
                  <el-tag size="large"  v-if="scope.row.offerStatus=='03'"  >劝退</el-tag>
                  <el-tag size="large"  v-if="scope.row.offerStatus=='04'"  >拒绝</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="submitName" label="提交人"  width="120" />
              <el-table-column prop="submitTime" label="提交时间"  width="120" />
              <el-table-column prop="approveName" label="审批人"  width="120" />
              <el-table-column prop="approveTime" label="审批时间"  width="120" />
              <el-table-column prop="wfId" label="工作流id"  width="120" v-if="show" />
              <el-table-column prop="remark" label="备注"  width="200" />
              <el-table-column fixed="right" label="操作" width="200">
              <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">更新</el-button>
                <el-button type="success" size="small" @click="sendMailCk(scope.row)">提交</el-button>
                <el-button type="success" size="small" v-if="scope.row.approveStatus=='01' || scope.row.approveStatus=='03' "  @click="approveClick(scope.row)">审批</el-button>

              </template>
            </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <div class="pagination">
              <el-pagination background layout="total,prev, pager, next" :pager-count="11" :total="totalNum" v-model:current-page="pageNum" @current-change="handleCurrentChange" :page-size="pageSize" />
            </div>
      
      
    </el-tabs>
    <!-- 添加需求抽屉 -->
    <el-drawer v-model="openDrawer" :title="修改Offer信息"
          direction="rtl"
          :before-close="drawerClose"
        >
          <div class="item">
            <span>Offer编号:</span>
            <el-input v-model="formData.offerNo" placeholder="请输入Offer编号" disabled />
          </div>
          <div class="item">
            <span>人员姓名:</span>
            <el-input v-model="formData.memberName" placeholder="请输入人员姓名" />
          </div>
          <div class="item">
            <span>部门名称:</span>
            <el-select v-model="formData.deptName" class="m-2" placeholder="---请选择部门---" size="mini">
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
            <el-select v-model="formData.jobs" class="m-2" placeholder="---请选择岗位---" size="mini">
              <el-option 
                v-for="item in itvJobList"
                :key="item.itvJobId"
                :label="item.itvJobName"
                :value="item.itvJobId"
                ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>入职时间:</span>
            <el-date-picker format="YYYYMMDD" v-model="formData.empDate" type="date" placeholder="请选择年月日" :size="size"/>
            
          </div>
          <div class="item">
            <span>是否接受录用:</span>
            <el-select v-model="formData.isAgree" class="m-2" placeholder="---请选择是否接受录用---" size="mini">
              <el-option 
                v-for="item in isAgreeList"
                :key="item.isAgreeId"
                :label="item.isAgreeName"
                :value="item.isAgreeId"
                ></el-option>
            </el-select>
          </div>
          
          <div class="item">
            <span>应届/往届:</span>
            <el-select v-model="formData.isFreGra" class="m-2" placeholder="---请选择应届/往届---" size="mini">
              <el-option label="应届" value="0"/>
              <el-option label="往届" value="1"/>
            </el-select>
          </div>
          <div class="item">
            <span>电脑:</span>
            <el-select v-model="formData.comStatus" class="m-2" placeholder="---请选择电脑信息---" size="mini">
              <el-option label="自带电脑" value="0"/>
              <el-option label="公司提供" value="1"/>
            </el-select>
          </div>
          <div class="item">
            <span>电子邮箱:</span>
            <el-input v-model="formData.email" placeholder="请输入邮箱地址" />
          </div>
          <div class="item">
            <span>电话号码:</span>
            <el-input v-model="formData.tel" placeholder="请输入电话号码" />
          </div>
          <div class="item">
            <span>薪资/元:</span>
            <el-input v-model="formData.salary" placeholder="请输入电话号码" />
          </div>
          <div class="item">
            <span>试用期薪资:</span>
            <el-select v-model="formData.isDz" class="m-2" placeholder="---请选择试用期薪资---" size="mini">
              <el-option 
                v-for="item in isDzList"
                :key="item.isDzId"
                :label="item.isDzName"
                :value="item.isDzId"
                ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>人员状态:</span>
            <el-select v-model="formData.offerStatus" class="m-2" placeholder="---请选择人员状态---" size="mini">
              <el-option 
                v-for="item in offerStatusList"
                :key="item.offerStatusId"
                :label="item.offerStatusName"
                :value="item.offerStatusId"
                ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>入职地址:</span>
            <el-input type="textarea" v-model="formData.jobAddress" placeholder="请输入入职地址" />
          </div>
          <div class="item">
            <span>备注:</span>
            <el-input type="textarea" v-model="formData.remark" placeholder="请输入备注" />
          </div>
          <div class="item">
            <span></span>
            <el-button type="success" @click="editForm"><el-icon><Select /></el-icon>&nbsp;修改Offer信息</el-button>
          </div>
    </el-drawer>

    <!-- 邮件生成发送对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="请确认双方邮箱信息"
      width="30%" draggable
      :before-close="handleClose">
      <div class="item">
        <span>发送人邮箱:</span>
        <el-input v-model="mailData.sendAddress" disabled placeholder="请输入发送人邮箱地址" />
      </div>
      <div class="item">
        <span>发送人姓名:</span>
        <el-input v-model="mailData.sendName" disabled placeholder="请输入邮箱地址" />
      </div>
      <div class="item">
        <span>收件人姓名:</span>
        <el-input v-model="mailData.receiveName" disabled placeholder="请输入接收人姓名" />
      </div>
      <div class="item">
        <span>收件人邮箱:</span>
        <el-input v-model="mailData.receiveAddress" disabled placeholder="请输入邮箱地址" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="sendMail">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 工作流对话框 -->
    <el-dialog
      v-model="dialogVisible2"
      title="当前审批流"
      width="60%" draggable
      :before-close="handleClose">

      <el-tabs type="border-card">
        <el-tab-pane label="审批数据"   >
          <div class="item">
           <el-table v-loading="loading" :data="tableApproveData" stripe border style="width: 100%" >
              <el-table-column prop="assignee" label="提交人工号"  width="120" />
              <el-table-column prop="assignee" label="提交人姓名"  width="120" />
              <el-table-column prop="createTime" label="开始时间" :formatter="formatDate"   />
              <el-table-column prop="endTime"  label="结束时间"  :formatter="formatDate" />
              <el-table-column prop="name" label="节点名称"   />
              <el-table-column prop="processInstanceId" label="工作流id"  width="120" v-if="show" />
          </el-table>
          </div>
        </el-tab-pane> 

        <el-tab-pane label="流程图"  >
          <img  :src="contentUrl"/>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

     <!-- 审批确认页面 -->
     <el-dialog
      v-model="openApproveDrawer"
      title="请确认审批意见"
      width="50%" draggable
      :before-close="handleClose">
      <div class="item">
        <span>审批意见:</span>   
        <el-input v-model="approveData.comment" placeholder="请输入审批意见" />
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="applyApprove">提交审批</el-button>
          <el-button type="primary" @click="applyReject">驳回审批</el-button>
          <el-button @click="openApproveDrawer = false">取消</el-button>
        </span>
      </template>
    </el-dialog>

    </div>
  
</template>

<script>
//导入组合式API
import {reactive,toRefs,onActivated } from 'vue'
  //导入访问后台API
import {listOffer,updateForm,submitOffer,queryTaskBytaskId,approve,reject} from '../../../api/sdof01'
import {itemList} from '../../../api/itemApi'
import {$getFile} from '../../../utils/request'
export default {
    name:'Sdof01',
    setup(){
      //定义数据
      let allData = reactive({
        tableData:[],
        tableApproveData:[],
        //是否打开抽屉
        openDrawer:false,
        drawer:false,
        //表单数据
        formData:{
          offerNo: '',
          memberName: '',
          deptName: '',
          empDate:'',
          isAgree: '',
          isFreGra: '',
          comStatus: '',
          email: '',
          tel: '',
          offerStatus: '',
          salary:'',
          isDz:'',
          offerStatus:'',
          jobAddress:'',
          remark: ''
        },
        //查询数据
        deptId:'',
        deptList:[{deptId:'',deptName:'请选择部门'}],
        itvJobId:'',
        itvJobList:[{itvJobId:'',itvJobName:'请选择岗位'}],
        approveStatusId:'',
        approveStatusList:[{approveStatusId:'',approveStatusName:'请选择审批状态'}],
        isAgreeId:'',
        isAgreeList:[{isAgreeId:'',isAgreeName:'请选择是否接受录用'}],
        isDzId:'',
        isDzList:[{isDzId:'',isDzName:'请选择试用期薪资'}],
        offerStatusId:'',
        offerStatusList:[{offerStatusId:'',offerStatusName:'请选择人员状态'}],
        //分页：每页数
        pageSize:10,
        //分页：总条数
        totalNum:0,
        loading:true,
        //邮件生成对话框
        dialogVisible:false,
        //工作流对话框
        dialogVisible2:false,
        memberNameValue:'',
        empDateVal1:'',
        empDateVal2:'',
        //邮件数据
        mailData:{
          offerNo:'',
          sendAddress:'sydsgs@163.com',
          sendName:'沈阳东硕信息技术有限公司',
          receiveAddress:'',
          receiveName:''
        },
        show:false,
        contentUrl:"",
        openApproveDrawer:false,
      
        approveData:{
          offerNo: '',
          wfId:"",
          comment: ''
        },
      })

      //缓存的组件激活时调用
      onActivated(async()=> {

        let offerNo = history.state.keyId;
        if(offerNo!=null){
          let prams = {
            offerNo:offerNo
          };
        
        let r = await listOffer(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
        setTimeout(() => {
                allData.loading= false
            }, 500);
        }        
    });

      

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
        //岗位下拉框
        let loadApproveStatusList = async()=>{
        let prams={
          codeNo:'sdof_approveStatus'
        }

        let r= await itemList(prams)
        if(r){
          for(let i=0 ; i< r.length; i++){
            allData.approveStatusList.push({approveStatusId:r[i].codeEname,approveStatusName:r[i].codeCname})
          }
        }
        
      }
      loadApproveStatusList()
      //是否接受录用下拉框
      let loadIsAgreeList = async()=>{
        let prams={
          codeNo:'sdOf_isAgree'
        }

        let r= await itemList(prams)
        if(r){
          for(let i=0 ; i< r.length; i++){
            allData.isAgreeList.push({isAgreeId:r[i].codeEname,isAgreeName:r[i].codeCname})
          }
        }
        
      }
      loadIsAgreeList()
      //试用期薪资下拉框
      let loadIsDzList = async()=>{
        let prams={
          codeNo:'sdOf_isDz'
        }

        let r= await itemList(prams)
        if(r){
          for(let i=0 ; i< r.length; i++){
            allData.isDzList.push({isDzId:r[i].codeEname,isDzName:r[i].codeCname})
          }
        }
        
      }
      loadIsDzList()
      //人员状态下拉框
      let loadOfferStatusList = async()=>{
        let prams={
          codeNo:'sdOf_offerStatus'
        }

        let r= await itemList(prams)
        if(r){
          for(let i=0 ; i< r.length; i++){
            allData.offerStatusList.push({offerStatusId:r[i].codeEname,offerStatusName:r[i].codeCname})
          }
        }
        
      }
      loadOfferStatusList()
      
       
      //加载表格数据
      let loadTable = async()=>{

        let offerNo = history.state.keyId;
        let r ;
        if(offerNo!=null){
          let prams = {
            offerNo:offerNo
          };     
           r = await listOffer(prams);
        }else{
           r = await listOffer();
        }
      
         allData.tableData = r.data.data;
         allData.totalNum = r.totalNum;
         setTimeout(() => {
                allData.loading= false
            }, 500);
      }
      loadTable()

     
 
      let searchTable = async()=>{
        let empDateStr
        if(allData.empDate!=null){
          empDateStr= allData.empDate[0]+','+allData.empDate[1]
        }
        let prams = {
          memberName:allData.memberNameValue,
          deptName:allData.deptId,
          jobs:allData.itvJobId,
          empDate:empDateStr,
          approveStatus:allData.approveStatusId
        };

        let r = await listOffer(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
        setTimeout(() => {
                allData.loading= false
            }, 500);
      }

       //编辑表单数据的方法
      let editForm = async()=>{
        let r =await updateForm(allData.formData)
        if(r){
          loadTable();
        }
      }
      //关闭表单事件
      let drawerClose = ()=>{
        allData.openDrawer=false
        //清空表单
        allData.formData={
          offerNo: '',
          memberName: '',
          deptName: '',
          empDate:'',
          isAgree: '',
          isFreGra: '',
          comStatus: '',
          email: '',
          tel: '',
          offerStatus: '',
          salary:'',
          isDz:'',
          offerStatus:'',
          remark: ''
        }
      }

      //修改表单数据
      let handleEdit =(row)=>{
        //赋值
        allData.formData={...row}
        //打开抽屉
        allData.openDrawer=true;
      }
      

      let sendMailCk=(row)=>{
        allData.dialogVisible=true
        allData.mailData.offerNo=row.offerNo
        allData.mailData.receiveAddress=row.email
        allData.mailData.receiveName=row.memberName
        allData.formData=row
      }

    

      //打开审批历史记录
      let showApprove =async(row)=>{
        allData.dialogVisible2=true;

        let params = {
          processId:row.wfId
        };
        let url = "expense/processDiagram";
        //查询审批流程图
        await $getFile(url,params).then(res => {
            let blob = new Blob([res.data]);            
            let  contentUrl = window.URL.createObjectURL(blob);					
            allData.contentUrl = contentUrl;
         }).catch(() => {
          console.log("有异常");
         });

         //查询审批流程数据
         let prams = {
          processInstanceId:row.wfId
         };
         let r = await queryTaskBytaskId(prams);
         allData.tableApproveData = r.data;
      }

       //时间格式化
       let formatDate =(row, column)=>{
                
                if(row[column.property]==null){
                  return  "";
                }
                // 获取单元格数据
                let datac = row[column.property];
                let dtc = new Date(datac)
                //获取月,默认月份从0开始
                let dtuMonth = dtc.getMonth() + 1
                //获取日
                let dtuDay = dtc.getDate()
                //处理1-9月前面加0
                if (dtuMonth < 10) {
                    dtuMonth = "0" + (dtc.getMonth() + 1)
                }
                //处理1-9天前面加0
                if (dtuDay < 10) {
                    dtuDay = "0" + dtc.getDate()
                }
                //获取小时
                let dtuHours = dtc.getHours()
                //处理1-9时前面加0
                if (dtuHours < 10) {
                    dtuHours = "0" + dtc.getHours()
                }
                //获取分钟
                let dtuMinutes = dtc.getMinutes()
                //处理1-9分前面加0
                if (dtuMinutes < 10) {
                    dtuMinutes = "0" + dtc.getMinutes()
                }
                //获取秒
                let dtuSeconds = dtc.getSeconds()
                //处理1-9秒前面加0
                if (dtuSeconds < 10) {
                    dtuSeconds = "0" + dtc.getSeconds()
                }
                //组装年月日时分秒,按自己的要求来
                let dd=dtc.getFullYear() + "/" + dtuMonth + "/" + dtuDay+" " + dtuHours + ":" + dtuMinutes + ":" + dtuSeconds;
                return  row.TableIsbibei=dd;
       }


         //打开审批页面
      let approveClick =(row)=>{
        //赋值
        allData.approveData.wfId = row.wfId;
        allData.approveData.offerNo = row.offerNo;
        allData.approveData.comment="";
        //打开抽屉
        allData.openApproveDrawer=true;
      }
      //提交审批
      let applyApprove =async()=>{
        
         //查询审批流程数据
         let prams = {
          wfId:allData.approveData.wfId,
          offerNo:allData.approveData.offerNo,
          comment:allData.approveData.comment,
         }; 

         await approve(prams);
         allData.openApproveDrawer=false;
      }

      //驳回审批
      let applyReject =async()=>{
        
        //查询审批流程数据
        let prams = {
          wfId:allData.approveData.wfId,
          offerNo:allData.approveData.offerNo,
          comment:allData.approveData.comment,
         }; 
        await reject(prams);
        allData.openApproveDrawer=false;
     }
      

      //分页切换
      let handleCurrentChange=async(val)=>{
        let empDateStr
        if(allData.empDate!=null){
          empDateStr= allData.empDate[0]+','+allData.empDate[1]
        }
        let prams = {
          memberName:allData.memberNameValue,
          deptName:allData.deptId,
          jobs:allData.itvJobId,
          empDate:empDateStr,
          approveStatus:allData.approveStatusId,
          pageNum:val
        };
        let r = await listOffer(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum

      }

      //确认提交，审批流发起
      let sendMail = async()=>{
        let r =await submitOffer(allData.formData);

        if(r.success=='1'){     
          allData.tableData.forEach((a) => {
            if (a.offerNo === allData.mailData.offerNo) {
                a.approveStatus="01"
            }
          });

          allData.dialogVisible = false;
        }
        
      }

      
      return {
        ...toRefs(allData),
        editForm,
        drawerClose,
        handleEdit,sendMailCk,showApprove,searchTable,handleCurrentChange,sendMail,
        formatDate,approveClick,applyApprove,applyReject
      }
    }
}
</script>

<style scoped lang="scss">
  .center{
    float: left;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 95%;
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
  .el-drawer__title{
    color: black;
  }
  .el-row {
      margin-bottom: 6px;
    }
    .el-row:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;
      
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
  .pagination{
    margin-top: 10px;

  }

</style>