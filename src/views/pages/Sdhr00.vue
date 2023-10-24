<template>
  <div class="contents">
    <el-row :gutter="24">
      <el-col :span="12">
        <el-tabs type="border-card" class="demo-tabs">
          <el-tab-pane class="col-table">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><List /></el-icon>
                <span>任务栏</span>
              </span>
            </template>
            <div class="btnTask">
              <el-tooltip content="新增任务" placement="right" effect="light">
                <el-button
                  type="success"
                  size="small"
                  round
                  class="addTask"
                  plain
                  @click="clickOpenTask"
                  ><el-icon><Plus /></el-icon
                ></el-button>
              </el-tooltip>
            </div>

            <el-table
              name="task"
              :data="tableData"
              stripe
              border
              height="150"
              max-height="150"
              style="width: 100%; font-size: 12px"
            >
              <el-table-column prop="taskId" label="任务编号" v-if="show" />
              <el-table-column
                prop="taskName"
                show-overflow-tooltip
                label="任务名称"
                width="280"
              />
              <el-table-column
                prop="taskMember"
                show-overflow-tooltip
                label="参与者"
                width="100"
              />
              <el-table-column label="任务状态" width="100">
                <template #default="scope">
                  <el-tag
                    size="mini"
                    v-if="scope.row.taskStatus == '00'"
                    type="success"
                    >已关闭</el-tag
                  >
                  <el-tag
                    size="mini"
                    v-if="scope.row.taskStatus == '01'"
                    type="warning"
                    >进行中</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="planEndDate"
                label="预计结束时间"
                width="140"
              />
              <el-table-column
                prop="actEndDate"
                label="实际结束时间"
                width="140"
              />
              <el-table-column label="是否延期" width="90">
                <template #default="scope">
                  <el-tag
                    size="mini"
                    v-if="scope.row.isPostpone == 'Y'"
                    type="error"
                    >已延期</el-tag
                  >
                  <el-tag
                    size="mini"
                    v-if="scope.row.isPostpone == 'N'"
                    type="success"
                    >正常</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column
                prop="recCreateTime"
                label="创建时间"
                width="140"
              />
              <el-table-column fixed="right" label="操作" width="140">
                <template #default="scope">
                  <el-button
                    type="primary"
                    size="small"
                    @click="clickUpdateTask(scope.row)"
                    >修改</el-button
                  >
                  <el-button
                    type="success"
                    size="small"
                    @click="confirmTask(scope.row)"
                    >确认</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <div class="pagination">
              <el-pagination
                background
                small
                layout="prev, pager, next"
                :page-size="pageSize"
                v-model:current-page="pageNum"
                @current-change="handleCurrentChange"
                :total="totalNum"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="12">
        <el-tabs type="border-card" class="demo-tabs">
          <el-tab-pane class="col-table">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon><Flag /></el-icon>
                <span>代办栏</span>
              </span>
            </template>

            <el-tabs type="card">
              <el-tab-pane>
                <template #label>
                  <span class="custom-tabs-label">
                    招聘管理({{ 0 }})
                  </span>
                </template>
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="custom-tabs-label"> Offer管理({{ offTableData.length }}) </span>
                </template>

                <el-table
                  name="unfinished" :show-header="false"
                  v-loading="loading" :data="offTableData" stripe border style="width: 100%" 
                >
             
              <el-table-column  label="展示"  >
                <template  #default="scope" >
               
                  <span @click="clickJumpTab('sdof01', 'offer信息维护', '/Layout/Sdof01',scope.row.offerNo)">
                    有一条{{ scope.row.deptName}}部门的off正在等待您审批!(入职人员:{{ scope.row.memberName }})
                  </span>
                </template>

             
            </el-table-column>
                </el-table>
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="custom-tabs-label">
                    员工关系({{ 0 }})
                  </span>
                </template>

                <h1>您在员工关系一共有X条需要操作的代办</h1>
              </el-tab-pane>

              <el-tab-pane>
                <template #label>
                  <span class="custom-tabs-label"> 数据管理({{ 0 }}) </span>
                </template>

                <h1>您在数据管理一共有X条需要操作的代办</h1>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <el-row :gutter="24">
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" />
        <v-chart
          class="chart"
          style="width: 100%; height: 550px"
          :option="option"
          v-if="isShowRadar"
        />
      </el-col>
      <el-col :span="12"
        ><div class="grid-content ep-bg-purple" />
        <v-chart
          class="chart"
          style="width: 100%; height: 550px"
          :option="option2"
          v-if="isShowRadar"
        />
      </el-col>
    </el-row>

    <!-- <div class="chartDiv" >
      <div class="chartItem">
        <v-chart class="chart" :option="option" v-if="isShowRadar" />
      </div>
      <div class="chartItem">
        <v-chart class="chart"  :option="option2" v-if="isShowRadar" />
      </div>
    </div> -->
    <!-- 任务新增 -->
    <el-dialog
      v-model="dialogVisible"
      title="请添加任务"
      width="30%"
      draggable
      direction="rtl"
      :before-close="handleClose"
    >
      <div class="item">
        <span>任务名称：</span>
        <el-input
          type="textarea"
          v-model="taskData.taskName"
          placeholder="请输入任务名称"
        />
      </div>
      <div class="item">
        <span>参与者：</span>
        <el-input v-model="taskData.taskMember" placeholder="请输入参与者" />
      </div>
      <div class="item">
        <span>任务状态：</span>
        <el-select
          v-model="taskData.taskStatus"
          class="m-2"
          placeholder="---请选择任务状态---"
          size="mini"
        >
          <el-option label="进行中" value="01" />
        </el-select>
      </div>
      <div class="item">
        <span>计划结束日期：</span>
        <el-date-picker
          value-format="YYYYMMDD"
          v-model="taskData.planEndDate"
          type="date"
          placeholder="请选择计划结束时间"
          :size="size"
        />
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="addTask">添加</el-button>
          <el-button @click="handleClose">取消</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 任务修改 -->
    <el-dialog
      v-model="dialogVisible2"
      title="请修改任务"
      width="30%"
      draggable
      direction="rtl"
      :before-close="handleClose"
    >
      <div class="item">
        <span>任务名称：</span>
        <el-input
          type="textarea"
          v-model="taskData.taskName"
          placeholder="请输入任务名称"
        />
      </div>
      <div class="item">
        <span>参与者：</span>
        <el-input v-model="taskData.taskMember" placeholder="请输入参与者" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="updateTask">修改</el-button>
          <el-button @click="handleClose">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
//导入访问后台API
import { listTask, updateForm, addForm,listOffer } from "../../api/sdhr00";

import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart, LineChart } from "echarts/charts";
import VChart, { THEME_KEY } from "vue-echarts";
import { reactive, ref, toRefs , inject  } from "vue";


//导入封装的消息弹窗
import { $confirm, $msg_error } from "../../utils/msg";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
use([
  CanvasRenderer,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);



export default {
  name: "Sdhr00",
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: "light",
  },
  setup() {
    let allData = reactive({
      userId: sessionStorage.getItem("userId"),
      tableData: [],
      offTableData:[],
      loading: true,
      isShowRadar: true,
      show: false,
      widthBar: "500px",
      heightBar: "500px",
      //任务新增对话框
      dialogVisible: false,
      //任务修改对话框
      dialogVisible2: false,
      taskData: {
        taskId: "",
        taskName: "",
        taskMember: "",
        taskStatus: "",
        recCreateTime: "",
        planEndDate: "",
        actEndDate: "",
      },
      formData: {
        id: "",
      },
      //分页：每页数
      pageSize: 10,
      //分页：总条数
      totalNum: 0,
      //分页：当前页
      pageNum: 1,
    });

    let option = ref({
      title: {
        text: "入职统计",
        left: "center",
      },
      xAxis: {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      yAxis: {
        type: "value",
      },
      tooltip: {
        trigger: "axis",
      },
      // legend: {
      //   data: ['Evaporation', 'Precipitation', 'Temperature']
      // },
      series: [
        {
          color: "#ff9b44",
          data: [7, 6, 19, 12, 13, 11, 17, 9, 5, 7, 10, 8],
          type: "bar",
          name: "入职人数",
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    });

    let option2 = ref({
      title: {
        text: "试用期访谈记录",
        left: "center",
      },
      xAxis: {
        type: "category",
        data: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月",
        ],
      },
      yAxis: {
        type: "value",
      },
      tooltip: {
        trigger: "axis",
      },
      // legend: {
      //   data: ['Evaporation', 'Precipitation', 'Temperature']
      // },
      series: [
        {
          color: "#ff9b44",
          data: [3, 6, 5, 3, 9, 11, 2, 4, 8, 12, 7, 6],
          type: "bar",
          name: "应访谈:",
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
        {
          color: "#fc6075",
          data: [3, 6, 5, 3, 9, 11, 2, 4, 8, 12, 7, 2],
          type: "bar",
          name: "实际访谈：",
          backgroundStyle: {
            color: "rgba(180, 180, 180, 0.2)",
          },
        },
      ],
    });
    


    //加载表格数据
    let loadTask = async () => {
      let prams = {
        recCreator: allData.userId,
        taskStatus: "01",
      };
      let r = await listTask(prams);
      allData.tableData = r.data.data;

      allData.totalNum = r.data.totalNum;
      setTimeout(() => {
        allData.loading = false;
      }, 500);
    };
    loadTask();


    //加载表格数据
    let loadTable = async()=>{
         let r = await listOffer()
         allData.offTableData = r.data.data
         setTimeout(() => {
                allData.loading= false
            }, 500);
      }
      loadTable()


    let clickOpenTask = () => {
      allData.dialogVisible = true;
    };

    let addTask = async () => {
      let r = await addForm(allData.taskData);
      if (r) {
        loadTask();
        allData.loading = true;
        setTimeout(() => {
          allData.loading = false;
        }, 500);
      }
    };

    let clickUpdateTask = async (row) => {
      //赋值
      allData.taskData = { ...row };
      //打开抽屉
      allData.dialogVisible2 = true;
    };

    let updateTask = async () => {
      let r = await updateForm(allData.taskData);
      if (r) {
        allData.dialogVisible2 = false;
        loadTask();
        allData.loading = true;
        setTimeout(() => {
          allData.loading = false;
        }, 500);
      }
    };

    //关闭表单事件
    let handleClose = () => {
      allData.dialogVisible = false;
      allData.dialogVisible2 = false;
      //清空表单
      allData.taskData = {
        taskId: "",
        taskName: "",
        taskMember: "",
        taskStatus: "",
        recCreateTime: "",
        planEndDate: "",
        actEndDate: "",
      };
    };

    let confirmTask = async (row) => {
      if (row.taskStatus == "00") {
        await $confirm("任务已经完成，无需更新");
      }
      if (row.actEndDate == " ") {
        $msg_error("请更新实际结束时间后再确认任务完成！");
        return;
      }
      await $confirm("请您确认本项任务已经完成");
      //年
      let year = new Date().getFullYear();
      //月份是从0月开始获取的，所以要+1;
      let month = new Date().getMonth() + 1;
      //日
      let day = new Date().getDate();
      let time = year + "" + month + "" + day;
      let prams = {
        taskId: row.taskId,
        taskName: row.taskName,
        taskMember: row.taskMember,
        recCreateTime: row.recCreateTime,
        planEndDate: row.planEndDate,
        taskStatus: "00",
        actEndDate: time,
      };
      let r = await updateForm(prams);
      if (r) {
        loadTask();
        allData.loading = true;
        setTimeout(() => {
          allData.loading = false;
        }, 500);
      }
    };

    let handleCurrentChange = async (val) => {
      let prams = {
        recCreator: allData.userId,
        taskStatus: "01",
        pageNum: val,
      };

      let r = await listTask(prams);
      allData.tableData = r.data.data;
    };



    //调用父页面方法切换头部菜单，并且跳转页面
    const  jumpTab =   inject('jumpTab');    
    let clickJumpTab =  function (tabName, tabTitle, tabContent,keyId) {   
      jumpTab(tabName, tabTitle, tabContent,keyId);      
    };

    return {
      ...toRefs(allData),
      option,
      option2,
      clickOpenTask,
      addTask,
      loadTask,
      clickUpdateTask,
      updateTask,
      handleClose,
      confirmTask,
      handleCurrentChange,
      clickJumpTab
    };
  },
};
</script>

<style scoped lang="scss">
[name="task"] {
  /deep/ th {
    padding: 1;
  }
  /deep/ td {
    padding: 0;
  }
}

[name="unfinished"] {
  /deep/ th {
    padding: 1;
  }
  /deep/ td {
    padding: 0;
  }
}

.chartDiv {
  // style="width:800px;height:600px"
  display: inline;
  width: 90%;
  height: 50%;
  position: absolute;
  .chartItem {
    float: left;
    height: 100%;
    width: 50%;
  }
}
.taskDiv {
  width: 100%;
  height: 50%;
  position: absolute;
  .taskItem {
    width: 50%;
    height: 50%;
    float: left;
  }
}

//  .echarts chart{
//   float: left;
//  }
//  .echarts chart2{
//   float: left;
//  }
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 20px;
}

.col-table {
  height: 200px;
}

.item {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin: 10px 0px;
  span {
    width: 100px;
    text-align: right;
  }
  div {
    flex: 1;
  }
}
.btnTask {
  padding-bottom: 6px;
}

// .demo-tabs{
//   height: 300px;
// }
</style>