<template>
  <div class="contents">
    <el-tabs type="border-card">
      
          <div class="center">
            <!--点击打开新增抽屉-->
            <el-button type="warning" round class="addDrawer" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;添加需求</el-button>
            <!--点击导入抽屉-->
            <el-button type="success" round class="uploadDrawer" @click="drawer=true"><el-icon><Upload /></el-icon>&nbsp;导入需求</el-button>
            <el-row :gutter="24">
            <el-col :span="5"><div class="grid-content ep-bg-purple" />
              <!-- 查询条件-年份 -->
              <el-select v-model="yearId" @change="searchTable" class="m-2"  size="mini">
                <el-option 
                  v-for="item in yearList"
                  :key="item.yearId"
                  :label="item.yearName"
                  :value="item.yearId"
                  ></el-option>
              </el-select>
            </el-col>
            <el-col :span="5"><div class="grid-content ep-bg-purple" />
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
            <el-col :span="5"><div class="grid-content ep-bg-purple" />
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
            <el-col :span="5"> 
              <el-date-picker 
                    format="YYYYMMDD" 
                    value-format="YYYYMMDD" 
                    v-model="startRecCreateTime" 
                    placeholder="创建时间起"
                   />
            </el-col>
            <el-col :span="5"> 
              <el-date-picker 
                    format="YYYYMMDD" 
                    value-format="YYYYMMDD" 
                    v-model="endRecCreateTime" 
                   placeholder="创建时间止"
                   />
            </el-col>

            <el-col :span="7">
                <el-tooltip content="查询历史"  placement="top" effect="light">
                  <el-switch  inline-prompt active-text="是" inactive-text="否" @change="changeSwitch(val)" v-model="queryHisValue" />
                </el-tooltip>
            </el-col>
            <el-col :span="6">
              <el-tooltip content="查询" placement="top" effect="light">
                <el-button type="primary" @click="searchTable" round ><el-icon><Search /></el-icon></el-button>
              </el-tooltip>
              <el-tooltip content="导出数据" placement="top" effect="light">
                <el-button type="success" @click="exportTable()" round plain><el-icon><Download /></el-icon></el-button>
              </el-tooltip>
              <el-tooltip content="删除数据" placement="top" effect="light">
                <el-button type="success" @click="deleteTable()"  round plain>删除</el-button>
              </el-tooltip>
            </el-col>

          </el-row>

          </div>
            <el-table v-loading="loading"
            :data="tableData" stripe border style="width: 100%" @selection-change="handleSelectionChange" >
              <el-table-column type="selection" width="40" />
              <el-table-column fixed prop="recCreateTime"   label="创建时间" width="100" />
              <el-table-column fixed prop="reqNo" label="岗位需求编号" width="120" />
              <el-table-column fixed prop="year" label="年份" width="60"/>
              <el-table-column fixed label="当前状态" width="120">
                <template #default="scope">
                  <el-tag size="mini" v-if="scope.row.deleteFlag=='0'" type="success" >执行中</el-tag>
                  <el-tag size="mini" v-if="scope.row.deleteFlag=='1'" type="danger" >已删除</el-tag>
                </template>
              </el-table-column>
              
              <el-table-column  show-overflow-tooltip label="需求部门" width="140" >
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
              <el-table-column  show-overflow-tooltip label="需求岗位" width="200" >
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
              <el-table-column prop="jobRequire" show-overflow-tooltip label="岗位要求" width="500"  />
              <el-table-column prop="requireNum" label="需求数量"  width="100" />
              <el-table-column prop="requireContact" label="需求部门联系人" width="130"/>
              <el-table-column prop="dutyPerson" label="岗位责任人"  width="200" />
              <el-table-column prop="planEndDate" label="预计完成时间"  width="200" />
              <el-table-column  label="面试方式"  width="200">
                <template #default="scope">
                  <el-tag size="large" v-if="scope.row.itvWays=='i1'"  >视频</el-tag>
                  <el-tag size="large" v-if="scope.row.itvWays=='i2'"  >当面</el-tag>
                </template>
              </el-table-column>
              <el-table-column  label="是否紧急"  width="200" >
                <template #default="scope">
                  <el-tag size="large" type="danger" v-if="scope.row.isEme=='Y'"  >是</el-tag>
                  <el-tag size="large" v-if="scope.row.isEme=='N'"  >否</el-tag>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="140">
              <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row)">关闭</el-button>
              </template>
            </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <div class="pagination">
              <el-pagination  background layout="total,prev, pager, next" :pager-count="11" :page-size="pageSize"   v-model:current-page="pageNum" @current-change="handleCurrentChange"  :total="totalNum" />
            </div>
      
    </el-tabs>
    
        
        <!-- 添加需求抽屉 -->
        <el-drawer v-model="openDrawer" :title="isAdd?'添加岗位需求':'修改岗位需求信息'"
          direction="rtl"
          :before-close="drawerClose"
        >
        <div class="item">
            <span>岗位需求编号:</span>
            <el-input v-model="formData.reqNo" placeholder="请输入需求编号" disabled />
          </div>
          <div class="item">
            <span>年份:</span>
            <el-select v-model="formData.year" class="m-2"  placeholder="---请选择---" size="mini">
              <el-option 
                  v-for="item in yearList2"
                  :key="item.yearId"
                  :label="item.yearName"
                  :value="item.yearId"
                  ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>部门名称:</span>
            <el-select v-model="formData.deptName" class="m-2" placeholder="---请选择---" size="mini">
              <el-option 
                  v-for="item in deptList2"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                  ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>岗位名称:</span>
            <el-select v-model="formData.itvJob" class="m-2" placeholder="---请选择---" size="mini">
              <el-option 
                  v-for="item in itvJobList2"
                  :key="item.itvJobId"
                  :label="item.itvJobName"
                  :value="item.itvJobId"
                  ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>需求数量:</span>
            <el-input-number v-model="formData.requireNum" :step="1" step-strictly />
          </div>
          <div class="item">
            <span>岗位要求:</span>
            <el-input v-model="formData.jobRequire" :rows="3" type="textarea" placeholder="请输入岗位要求信息"/>
          </div>
          <div class="item">
            <span>需求联系人:</span>
            <el-input v-model="formData.requireContact" placeholder="请输入需求联系人" />
          </div>
          <div class="item">
            <span>责任人:</span>
            <el-input v-model="formData.dutyPerson" placeholder="请输入责任人" />
          </div>
          <div class="item">
            <span>预计完成时间:</span>
            <el-date-picker value-format="YYYYMMDD" v-model="formData.planEndDate" type="date" placeholder="请选择" :size="size"/>
          </div>
          <div class="item">
            <span>面试方式:</span>
            <el-select v-model="formData.itvWays" class="m-2" placeholder="---请选择---" size="mini">
              <el-option 
                  v-for="item in itvWayList"
                  :key="item.itvWayId"
                  :label="item.itvWayName"
                  :value="item.itvWayId"
                  ></el-option>
            </el-select>
          </div>
          <div class="item">
            <span>是否紧急:</span>
            <el-select v-model="formData.isEme" class="m-2" placeholder="---请选择---" size="mini">
              <el-option label="是" value="是"/>
              <el-option label="否" value="否"/>
            </el-select>
          </div>
          <div class="item">
            <span></span>
            <el-button type="success" @click="editForm"><el-icon><Select /></el-icon>&nbsp;{{isAdd?'添加需求':'修改需求'}}</el-button>
          </div>
        </el-drawer>

        <!-- 导入抽屉 -->
        <el-drawer v-model="drawer" size="40%" title="导入岗位需求计划"
        direction="btt"
        :before-close="handleClose" >
          <el-upload
              class="upload-demo"
              drag
              :file-list="fileList"
              :on-preview="filePreview"
              :before-remove="fileRemove"
              :http-request="fileRequest"
              multiple
            >
              <el-icon class="el-icon--upload"><upload-filled /></el-icon>
              <div class="el-upload__text">
                拖拽文件至此或 <em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">
                  文件大小不超过 2mb
                </div>
              </template>
            </el-upload>
        </el-drawer>

  </div>
</template>

<script>
  //导入组合式API
  import {reactive,toRefs} from 'vue'
  //导入访问后台API
  import {listJobs,addForm,updateForm,deleteForm,deleteForm2,downloadFile,importFiles} from '../../../api/sdhr01'
  import {itemList} from '../../../api/itemApi'
  //导入上传下载地址
  import {hr01_fileDownload_url,hr01_fileUpload_url} from '../../../config/conster'
  import { $msg_error } from '@/utils/msg'

  export default {
    name:'Sdhr01',
    setup(){
      //定义数据
      let allData = reactive({
        
        tableData:[],
        selectTableRows: [],
        //是否打开抽屉
        openDrawer:false,
        drawer:false,
        isAdd:true,
        //表单数据
        formData:{
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
        },
        //查询数据
        queryHisValue:false,
        //分页：每页数
        pageSize:10,
        //分页：总条数
        totalNum:0,
        //分页：当前页
        pageNum:1,
        loading:true,
        //查询下拉框内容
        yearList:[{yearId:'',yearName:'请选择年份'}],
        yearId:'',
        deptList:[{deptId:'',deptName:'请选择需求部门'}],
        deptId:'',
        itvJobList:[{itvJobId:'',itvJobName:'请选择岗位信息'}],
        itvJobId:'',
        //添加/修改弹窗中的下拉框
        yearList2:[{yearId:'',yearName:'请选择年份'}],
        deptList2:[{deptId:'',deptName:'请选择需求部门'}],
        itvJobList2:[{itvJobId:'',itvJobName:'请选择岗位信息'}],
        itvWayList:[{itvWayId:'',itvWayName:'请选择面试方式'}],
        itvWayId:'',
        recCreateTime:'',
        endRecCreateTime:'',
        startRecCreateTime:'',
        //文件上传下载定义：
        //头信息中加入token
        headers:{token:sessionStorage.getItem('token')},
        //传递参数
        uploadData:{
          businessNo:'123',
          businessKeyword:'sdhr01'
        },
        hr01_fileDownload_url,
        hr01_fileUpload_url,
        fileName:'',
        //文件列表
        fileList:[{
          name:'岗位需求导入模板.xls'
        }],
        
      })
      
      
      //加载表格数据
      let loadTable = async()=>{
         let r = await listJobs()
         allData.tableData = r.data.data
         allData.totalNum = r.data.totalNum
         setTimeout(() => {
                allData.loading= false
            }, 500);
      }
      loadTable()
      //年份下拉框
      let loadYearList = async()=>{
        let prams={
          codeNo:'sdhr_year'
        }
        
        let r= await itemList(prams)
        for(let i=0 ; i< r.length; i++){
          allData.yearList.push({yearId:r[i].codeEname,yearName:r[i].codeCname})
          allData.yearList2.push({yearId:r[i].codeEname,yearName:r[i].codeCname})
        }
      }
      loadYearList()

      //部门下拉框
      let loadDeptList = async()=>{
        let prams={
          codeNo:'sdHr_deptName'
        }

        let r= await itemList(prams)
        for(let i=0 ; i< r.length; i++){
          allData.deptList.push({deptId:r[i].codeEname,deptName:r[i].codeCname})
          allData.deptList2.push({deptId:r[i].codeEname,deptName:r[i].codeCname})
        }
      }
      loadDeptList()

      //岗位下拉框
      let loadItvJobList = async()=>{
        let prams={
          codeNo:'sdHr_jobName'
        }

        let r= await itemList(prams)
        for(let i=0 ; i< r.length; i++){
          allData.itvJobList.push({itvJobId:r[i].codeEname,itvJobName:r[i].codeCname})
          allData.itvJobList2.push({itvJobId:r[i].codeEname,itvJobName:r[i].codeCname})
        }
      }
      loadItvJobList()

      //面试方式下拉框
      let loadItvWayList = async()=>{
        let prams={
          codeNo:'sdHr_itvWays'
        }
        let r= await itemList(prams)
        for(let i=0 ; i< r.length; i++){
          allData.itvWayList.push({itvWayId:r[i].codeEname,itvWayName:r[i].codeCname})
        }
      }
      loadItvWayList()

       //编辑表单数据的方法
       let editForm = async()=>{
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

      //修改表单数据
      let handleEdit =(row)=>{
        //赋值
        allData.formData={...row}
        allData.isAdd=false
        //打开抽屉
        allData.openDrawer=true;
      }
      //执行删除方法
      let handleDelete=async(row)=>{
        await deleteForm(row)
        setTimeout(() => {
          loadTable();
        }, 2000);
      }

      //查询历史滑块改变方法
      let changeSwitch =async()=>{
        searchTable()
      }
      //筛选查询
      let searchTable = async () =>{
        let prams = {
          year:allData.yearId,
          deptName:allData.deptId,
          itvJob:allData.itvJobId,
          queryHis:allData.queryHisValue,
          startRecCreateTime:allData.startRecCreateTime,
          endRecCreateTime:allData.endRecCreateTime

        };
        
        let r = await listJobs(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
      }

      let handleCurrentChange=async(val)=>{
        let prams = {
          year:allData.yearId,
          deptName:allData.deptId,
          itvJobValue:allData.itvJobId,
          pageNum:val,
          queryHis:allData.queryHisValue
        };
        
        let r = await listJobs(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
      }


      //点击下载文件
      let filePreview = async (file)=>{
        let name =file.name;
        let params = {
           fileId:'Tsdhr01Upload',
           businessKeyword:'sdhr01'
         };
        let url = "file/downloadFile";
        await downloadFile(url,params,name)
       
      }

      //文件删除时
      let fileRemove = (file)=>{
        if(file.name=='岗位需求导入模板.xls'){
          $msg_error('不允许删除原始模板信息！')
          return false 
        }
      }

       //自己上传附件方法
       let fileRequest = async(a) => {
        //上传附件
        let formData = new FormData();
        formData.append('file', a.file);
        formData.append('businessNo', allData.fileId);
        formData.append('businessKeyword', 'sdhr01');      
        await importFiles(formData);
      }

       //导出数据
       let exportTable = async() => {
      
          let name ="岗位需求信息导出.xlsx";
          let params = {
            year:allData.yearId,
            deptName:allData.deptId,
            itvJob:allData.itvJobId,
            queryHis:allData.queryHisValue,
            startRecCreateTime:allData.startRecCreateTime,
            endRecCreateTime:allData.endRecCreateTime
          };
          let url = "Sdhr01/export";
          await downloadFile(url,params,name)
         
      }

        //保存选中行数据
      let handleSelectionChange = async(rows) => {
        allData.handleSelectionChange=rows;
        console.log(rows);
        console.log(allData.handleSelectionChange);
      }

      
      //删除数据 减选中数据的ID拼接转入到后台
      let deleteTable = async() => {
        let reqNos = "";
        allData.handleSelectionChange.forEach((item) => {  
          reqNos  += item.reqNo+",";
        }); 
        reqNos =reqNos.substring(0,reqNos.length-1);
        let prams = {
          reqNo:reqNos
        };
        console.log(prams);
        await deleteForm2(prams);
        setTimeout(() => {
          loadTable();
        }, 2000);
      }

      return {
        ...toRefs(allData),
        editForm,
        drawerClose,
        handleEdit,
        handleDelete,
        searchTable,
        handleCurrentChange,
        loadTable,
        loadYearList,
        loadDeptList,
        loadItvJobList,
        changeSwitch,
        loadItvWayList,
        filePreview,
        fileRemove,
        fileRequest,
        exportTable,
        deleteTable,
        handleSelectionChange
      }
    }

  }
</script>

<style scoped lang="scss">

  .center{
    // float: left;
    padding-top: 10px;
    padding-bottom: 10px;
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
.search{
    padding-top: 10px;
    padding-bottom: 10px;
    width: 1400px;
    .searchItem{
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

  .pagination{
    margin-top: 10px;

  }

  .el-row {
    margin-bottom: 20px;
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
  
</style>
