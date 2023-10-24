<template>
  <div class="contents">
    <el-tabs type="border-card">
     
        <div class="center">
            <el-row :gutter="24">
                <el-col :span="4">
                    <el-input v-model="memberNameValue" placeholder="请输入人员姓名" clearable/>
                </el-col>
                <el-col :span="4">
                    <!-- 查询条件-任务状态 -->
                    <el-select v-model="taskStatus" @change="searchTable" class="m-2"  size="mini">
                        <el-option 
                        v-for="item in taskStatusList"
                        :key="item.taskStatusId"
                        :label="item.taskStatusName"
                        :value="item.taskStatusId"
                        ></el-option>
                    </el-select>
                </el-col>
                <el-col :span="7">
                    <el-date-picker 
                        format="YYYYMMDD" 
                        value-format="YYYYMMDD" 
                        v-model="planEndDate" 
                        type="daterange" 
                        unlink-panels 
                        start-placeholder="预计完成时间起"
                        end-placeholder="预计完成时间止" 
                    />
                </el-col>
                <el-col :span="2">
                    <el-tooltip content="是否延期：实际时间晚于预计时间"  placement="top" effect="light">
                        <el-switch  inline-prompt active-text="是" inactive-text="否" @change="changeSwitch(val)" v-model="isPostpone" />
                    </el-tooltip>
                </el-col>
                <el-col :span="4">
                    <el-tooltip content="查询" placement="top" effect="light">
                        <el-button type="primary" @click="searchTable" round ><el-icon><Search /></el-icon></el-button>
                    </el-tooltip>
                    <el-tooltip content="导出数据" placement="top" effect="light">
                        <el-button type="success" @click="searchTable" round plain><el-icon><Download /></el-icon></el-button>
                    </el-tooltip>
                </el-col>
            </el-row>
        </div>
        <el-table v-loading="loading"
            :data="tableData" stripe border style="width: 100%" >
            <el-table-column type="selection" width="40" />
            <el-table-column prop="taskId" label="任务编号" v-if="show" />
            <el-table-column fixed prop="recCreateName" show-overflow-tooltip label="姓名" width="100" />
            <el-table-column fixed prop="taskName" show-overflow-tooltip label="任务名称" width="500" />
            <el-table-column prop="taskMember" show-overflow-tooltip label="参与者" width="130" />
            <el-table-column fixed label="任务状态" width="100">
                <template #default="scope">
                  <el-tag size="mini" v-if="scope.row.taskStatus=='00'" type="success" >已关闭</el-tag>
                  <el-tag size="mini" v-if="scope.row.taskStatus=='01'" type="warning" >进行中</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="planEndDate" label="预计完成时间" width="140"  />
            <el-table-column prop="actEndDate" label="实际完成时间" width="140"  />
            <el-table-column fixed label="是否延期" width="100">
                <template #default="scope">
                    <el-tag size="mini" v-if="scope.row.isPostpone=='Y'" type="error" >已延期</el-tag>
                    <el-tag size="mini" v-if="scope.row.isPostpone=='N'" type="success" >正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="recCreateTime" label="创建时间" width="140"  />
            
            </el-table>
            <!-- 分页区 -->
            <div class="pagination">
              <el-pagination  background layout="total,prev, pager, next" :pager-count="11" :page-size="pageSize"   v-model:current-page="pageNum" @current-change="handleCurrentChange"  :total="totalNum" />
            </div>
    
    </el-tabs>
  </div>
</template>

<script>
//导入组合式API
import {reactive,toRefs} from 'vue'
 //导入访问后台API
 import {listTask} from '../../../api/sdhr00'
import {itemList} from '../../../api/itemApi'
export default {
    name:"Sdst06",
    setup(){
        //定义数据
      let allData = reactive({
        tableData:[],
        //是否打开抽屉
        openDrawer:false,
        drawer:false,
        //表单数据
        formData:{
          
        },
        //查询数据
        memberNameValue:'',
        taskStatus:'',
        planEndDate:'',
        taskStatusId:'',
        taskStatusList:[{taskStatusId:'',taskStatusName:'请选择任务状态'}],
        isPostpone:false,
        //分页：每页数
        pageSize:10,
        //分页：总条数
        totalNum:0,
        pageNum:1,
        loading:true,
       
      })
      //年份下拉框
      let loadTaskStatusList = async()=>{
        let prams={
          codeNo:'sdSt_taskStatus'
        }
        
        let r= await itemList(prams)
        for(let i=0 ; i< r.length; i++){
          allData.taskStatusList.push({taskStatusId:r[i].codeEname,taskStatusName:r[i].codeCname})
        }
      }
      loadTaskStatusList()

      //加载表格数据
      let loadTable = async()=>{
         let r = await listTask()
         allData.tableData = r.data.data
         allData.totalNum = r.data.totalNum
         setTimeout(() => {
                allData.loading= false
            }, 500);
      }
      loadTable()
      
      //筛选查询
      let searchTable = async () =>{
        let planEndDateStr
          if(allData.planEndDate!=null){
            planEndDateStr= allData.planEndDate[0]+','+allData.planEndDate[1]
          }
        let prams = {
          recCreateName:allData.memberNameValue,
          taskStatus:allData.taskStatus,
          planEndDate:planEndDateStr,
          isPostpone:allData.isPostpone
        };
        
        let r = await listTask(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
      }

      //分页切换
      let handleCurrentChange =async(val)=>{
        let planEndDateStr
          if(allData.planEndDate!=null){
            planEndDateStr= allData.planEndDate[0]+','+allData.planEndDate[1]
          }
        let prams = {
          recCreateName:allData.memberNameValue,
          taskStatus:allData.taskStatus,
          planEndDate:planEndDateStr,
          isPostpone:allData.isPostpone,
          pageNum:val
        };
        
        let r = await listTask(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
      }

      //查询历史滑块改变方法
      let changeSwitch =async()=>{
        searchTable()
      }


      return{
        ...toRefs(allData),searchTable,handleCurrentChange,changeSwitch
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
  .el-row {
      margin-bottom: 6px;
      width: 100%;
    }
    .el-row:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;
      .el-input{
        width: 90%;
      }
      .el-select{
        width: 90%;
      }
      .el-date-picker{
        width: 80%;
      }
    }
</style>