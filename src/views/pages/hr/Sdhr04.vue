<template>
  <div class="contents">
    <el-tabs type="border-card">
      
        <div class="center">
          <!--点击打开新增抽屉-->
          <el-button type="warning" round class="addDrawer" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;添加测评信息</el-button>
          <!--点击导入抽屉-->
          <el-button type="success" round class="uploadDrawer"  @click="drawer2=true"><el-icon><Upload /></el-icon>&nbsp;导入测评信息</el-button>
          <el-row :gutter="24">
            <el-col :span="6"><div class="grid-content ep-bg-purple" />
              <el-input v-model="memberNameValue" placeholder="请输入人员姓名" clearable/>
            </el-col>
            
            <el-col :span="6"> <div class="grid-content ep-bg-purple" />
              <!-- 查询条件-面试结果 -->
              <el-select v-model="itvStatusId" @change="searchTable" class="m-2"  size="mini">
                <el-option 
                  v-for="item in itvStatusList"
                  :key="item.itvStatusId"
                  :label="item.itvStatusName"
                  :value="item.itvStatusId"
                  ></el-option>
              </el-select>
            </el-col>
           
            <el-col :span="6"> <div class="grid-content ep-bg-purple" />
              <el-date-picker 
                    format="YYYYMMDD" 
                    value-format="YYYYMMDD" 
                    v-model="itvDate" 
                    type="daterange" 
                    unlink-panels 
                    start-placeholder="面试时间起"
                    end-placeholder="面试时间止" 
                   />
            </el-col>
            
          </el-row>
          <el-row :gutter="24">
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
            
            <el-col :span="6">
              <!-- 查询条件-当前状态 -->
              <el-select v-model="nowStatusId" @change="searchTable" class="m-2"  size="mini">
                <el-option 
                  v-for="item in nowStatusList"
                  :key="item.nowStatusId"
                  :label="item.nowStatusName"
                  :value="item.nowStatusId"
                  ></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              <span></span>
              <el-tooltip content="查询" placement="top" effect="light">
                <el-button type="primary" @click="searchTable" round ><el-icon><Search /></el-icon></el-button>
              </el-tooltip>
              <el-tooltip content="导出数据" placement="top" effect="light">
                <el-button type="success" @click="exportTable()" round plain><el-icon><Download /></el-icon></el-button>
              </el-tooltip>
            </el-col>
          </el-row>
        </div>

        <div class="tableDiv">  
          <el-table v-loading="loading" :data="tableData" stripe border style="width: 100%" >
            <el-table-column type="selection" width="40" />
            <el-table-column   prop="planNo" label="电联记录号" width="120" v-if="false"/>
            <el-table-column   prop="reqNo" label="岗位需求编号" width="120" v-if="false"/>
            <el-table-column fixed prop="memberName" lazy label="面试人员" width="100"  >
              <template #default="scope" >
                <el-link type="success" @click="showRadar(scope.row)" >{{scope.row.memberName}}</el-link>
              </template>
            </el-table-column>
            <el-table-column fixed prop="itvDate" label="面试时间" width="120"/>

            <el-table-column  show-overflow-tooltip label="面试部门" width="200" >
              <template #default="scope" >          
                      <el-select  v-model="scope.row.itvDept"   @change="searchTable" class="m-2"  size="mini">
                          <el-option v-for="item in deptList2"
                          :key="item.deptId"
                          :label="item.deptName"
                          :value="item.deptId"
                          ></el-option>
                      </el-select>
                </template>
            </el-table-column>

            <el-table-column  show-overflow-tooltip label="面试岗位" width="200" >
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

            <el-table-column  label="面试结果" width="100">
              <template #default="scope">
                  <el-select v-model="scope.row.itvStatus"   @change="searchTable"
                      class="m-2"  size="mini">
                      <el-option v-for="item in itvStatusList"
                      :key="item.itvStatusId"
                      :label="item.itvStatusName"
                      :value="item.itvStatusId"
                      ></el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column  label="简历附件" width="100">
                      <template #default="scope">
                        <el-link type="primary" @click="updateFileItvNo(scope.row,false)">查看</el-link>
                      </template>
             </el-table-column>

            <el-table-column  label="当前状态" width="100">
              <template #default="scope">
                  <el-select v-model="scope.row.nowStatus"   @change="searchTable"
                      class="m-2"  size="mini">
                      <el-option v-for="item in nowStatusList"
                      :key="item.nowStatusId"
                      :label="item.nowStatusName"
                      :value="item.nowStatusId"
                      ></el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="itver" label="面试官" width="100" />
            <el-table-column  label="面试方式" width="100">
              <template #default="scope">
                  <el-select v-model="scope.row.itvWays"   @change="searchTable"
                      class="m-2"  size="mini">
                      <el-option v-for="item in itvWaysList"
                      :key="item.itvWaysId"
                      :label="item.itvWaysName"
                      :value="item.itvWaysId"
                      ></el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="universityName" label="学校"  width="200" />
            <el-table-column  label="学历" width="140">
              <template #default="scope">
                  <el-select v-model="scope.row.educationBckr"   @change="searchTable"
                      class="m-2"  size="mini">
                      <el-option v-for="item in edcBckrList"
                      :key="item.edcBckrId"
                      :label="item.edcBckrName"
                      :value="item.edcBckrId"
                      ></el-option>
                  </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="professionL" label="专业"  width="200" />
            <el-table-column label="个人基本素质评价(40)">
              <el-table-column prop="score1" label="沟通、表达能力(20)"  width="160" />
              <el-table-column prop="score2" label="判断、分析、反应能力(10)"  width="200" />
              <el-table-column prop="score3" label="责任心、纪律性(10)"  width="160" />
            </el-table-column>
            <el-table-column label="专业知识和技能评价(60)">
              <el-table-column prop="score4" label="专业知识(30)"  width="120" />
              <el-table-column prop="score5" label="项目经验(15)"  width="120" />
              <el-table-column prop="score6" label="学习能力(15)"  width="120" />
            </el-table-column>
            <el-table-column prop="sumScore" label="综合分数"  width="100" />
            <el-table-column prop="tel" label="电话"  width="120" />
            <el-table-column prop="email" label="邮箱"  width="180" />
            <el-table-column prop="arrivalDate" label="报道时间"  width="200" />
            <el-table-column prop="hopeSalary" label="期望薪资"  width="130" />
            <el-table-column prop="evaluation" show-overflow-tooltip label="入库主观评价"  width="300" />
            <el-table-column fixed="right" label="操作" width="350">
              <template #default="scope">
                <el-button type="success" size="small" @click="updateFileItvNo(scope.row,true)">上传</el-button>
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                <el-button type="warning" size="small" @click="addCloud(scope.row)">入库</el-button>
                <el-button type="success" size="small" @click="addOffer(scope.row)">生成Offer</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区 -->
          <div class="pagination">
            <el-pagination background layout="total,prev, pager, next" :pager-count="11" :total="totalNum" v-model:current-page="pageNum" @current-change="handleCurrentChange" :page-size="pageSize" />
          </div>

          <!-- 抽屉 -->
          <el-drawer v-model="openDrawer" :title="isAdd?'添加面试测评信息':'修改面试测评信息'"
            direction="rtl"
            :before-close="drawerClose"
          >
            <div class="item">
              <span>面试记录号:</span>
              <el-input v-model="formData.itvNo" disabled placeholder="请输入面试记录号" />
            </div>
            <div class="item">
              <span>电联记录号:</span>
              <el-input v-model="formData.planNo" placeholder="请输入电联记录号" />
            </div>
          
            <div class="item">
              <span>面试部门:</span>
              <el-select v-model="formData.itvDept" class="m-2" placeholder="---请选择面试部门---" size="mini">
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
              <el-select v-model="formData.itvJob" class="m-2" placeholder="---请选择岗位---" size="mini">
                <el-option 
                  v-for="item in itvJobList"
                  :key="item.itvJobId"
                  :label="item.itvJobName"
                  :value="item.itvJobId"
                  ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>面试时间:</span>
              <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.itvDate" type="date" placeholder="请选择" :size="size"/>
            </div>
            <div class="item">
              <span>面试官:</span>
              <el-input v-model="formData.itver" placeholder="请输入面试官" />
            </div>
            <div class="item">
              <span>面试方式:</span>
              <el-select v-model="formData.itvWays" class="m-2" placeholder="请选择面试方式" size="mini">
                <el-option 
                  v-for="item in itvWaysList"
                  :key="item.itvWaysId"
                  :label="item.itvWaysName"
                  :value="item.itvWaysId"
                  ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>面试人员:</span>
              <el-input v-model="formData.memberName" placeholder="请输入人员姓名" />
            </div>
            <div class="item">
              <span>学校:</span>
              <el-input v-model="formData.universityName" placeholder="请输入学校名称" />
            </div>
            <div class="item">
              <span>学历:</span>
              <el-select v-model="formData.educationBckr" class="m-2"  placeholder="请选择学历" >
                <el-option 
                  v-for="item in edcBckrList"
                  :key="item.edcBckrId"
                  :label="item.edcBckrName"
                  :value="item.edcBckrId"
                  ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>专业:</span>
              <el-input v-model="formData.professionL" placeholder="请输入专业名称" />
            </div>

            <div class="item">
              <span>沟通<br>表达能力:</span>
              <!-- <el-input v-model="formData.professionL" placeholder="请输入专业名称" /> -->
              <div class="slider-demo-block" >
                <el-slider v-model="formData.score1" show-input max="20" @change="changeScore(formData.score_1)" />
              </div>
            </div>
            <div class="item">
              <span>判断、分析<br>反应能力:</span>
              <!-- <el-input v-model="formData.professionL" placeholder="请输入专业名称" /> -->
              <div class="slider-demo-block" >
                <el-slider v-model="formData.score2" show-input max="10" @change="changeScore(formData.score_2)" />
              </div>
            </div>
            <div class="item">
              <span>责任心、<br>纪律性:</span>
              <!-- <el-input v-model="formData.professionL" placeholder="请输入专业名称" /> -->
              <div class="slider-demo-block" >
                <el-slider v-model="formData.score3" show-input max="10" @change="changeScore(formData.score_3)" />
              </div>
            </div>
            <div class="item">
              <span>专业知识:</span>
              <!-- <el-input v-model="formData.professionL" placeholder="请输入专业名称" /> -->
              <div class="slider-demo-block" >
                <el-slider v-model="formData.score4" show-input max="30" @change="changeScore(formData.score_4)" />
              </div>
            </div>
            <div class="item">
              <span>项目经验:</span>
              <!-- <el-input v-model="formData.professionL" placeholder="请输入专业名称" /> -->
              <div class="slider-demo-block" >
                <el-slider v-model="formData.score5" show-input max="15" @change="changeScore(formData.score_5)" />
              </div>
            </div>
            <div class="item">
              <span>学习能力:</span>
              <!-- <el-input v-model="formData.professionL" placeholder="请输入专业名称" /> -->
              <div class="slider-demo-block" >
                <el-slider v-model="formData.score6" show-input max="15" @change="changeScore(formData.score_6)"/>
              </div>
            </div>
            <div class="item">
              <span>综合得分:</span>
              <!-- <el-input v-model="formData.professionL" placeholder="请输入专业名称" /> -->
              <el-tag :type="scoreType">{{formData.sumScore}}</el-tag>
            </div>
            <div class="item">
              <span>面试结果:</span>
              <el-select v-model="formData.itvStatus" class="m-2" placeholder="请选择面试结果" size="mini">
                <el-option 
                  v-for="item in itvStatusList"
                  :key="item.itvStatusId"
                  :label="item.itvStatusName"
                  :value="item.itvStatusId"
                  ></el-option>
              </el-select>
            </div>
            <div class="item">
              <span>报道时间:</span>
              <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.arrivalDate" type="date" placeholder="请选择" :size="size"/>
            </div>
            <div class="item">
              <span>入库主观评价:</span>
              <el-input v-model="formData.evaluation" :rows="3" type="textarea" placeholder="请输入入库主观评价信息"/>
            </div>
            <div class="item">
              <span></span>
              <el-button type="success" @click="editForm"><el-icon><Select /></el-icon>&nbsp;{{isAdd?'添加面试测评信息':'修改面试测评信息'}}</el-button>
            </div>
          </el-drawer>

        </div>
       
     
    </el-tabs>
    <!-- 需求编号选择对话框 -->
    <el-dialog v-model="dialogVisible"
      title="面试成绩雷达图"
      width="45%" draggable modal="false"
      :before-close="handleClose">
          <div class="radarDiv" style="width:800px;height:600px">
            <v-chart class="chart" :option="option" v-if="isShowRadar" />
          </div>
    </el-dialog>
    <!--抽屉部分-添加人员库-->
    <el-drawer v-model="openDrawer2" :title="添加人员库"
        direction="rtl"
        :before-close="drawerClose2"
      >
       
        <div class="item">
          <span>人员姓名:</span>
          <el-input v-model="formData2.memberName" placeholder="请输入人员姓名" disabled/>
        </div>
        <div class="item">
          <span>联系电话:</span>
          <el-input v-model="formData2.tel" placeholder="请输入联系电话" disabled/>
        </div>
        <div class="item">
          <span>需求部门:</span>
          <el-select v-model="formData2.deptName" class="m-2"  placeholder="---请选择需求部门---" disabled>
            <el-option 
                  v-for="item in deptList"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                  ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>需求岗位:</span>
          <el-select v-model="formData2.itvJob" class="m-2"  placeholder="---请选择需求岗位---" disabled>
            <el-option 
                  v-for="item in itvJobList"
                  :key="item.itvJobId"
                  :label="item.itvJobName"
                  :value="item.itvJobId"
                  ></el-option>
          </el-select>
        </div>
       
        <div class="item">
          <span>渠道:</span>
          <el-select v-model="formData2.channel" class="m-2"  placeholder="---请选择渠道---" >
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
          <el-input type="textarea" v-model="formData2.archiveReason" placeholder="请输入归档原因" />
        </div>
        <div class="item">
          <span>归档前状态:</span>
          <el-select v-model="formData2.archiveStatusBfr" class="m-2"  placeholder="---请选择归档前状态---" >
            <el-option 
                  v-for="item in archiveStatusBfrList"
                  :key="item.archiveStatusBfrId"
                  :label="item.archiveStatusBfrName"
                  :value="item.archiveStatusBfrId"
                  ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>归档时间:</span>
          <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData2.archiveDate" type="date" placeholder="请选择归档时间" :size="size"/>
        </div>
        <div class="item">
          <span>工作年限:</span>
          <el-input v-model="formData2.workYear" placeholder="请输入工作年限" />
        </div>
        <div class="item">
          <span>学历:</span>
          <el-select v-model="formData2.educationBckr" class="m-2"  placeholder="---请选择学历---" >
            <el-option 
                  v-for="item in educationBckrList"
                  :key="item.educationBckrId"
                  :label="item.educationBckrName"
                  :value="item.educationBckrId"
                  ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span></span>
          <el-button type="success" @click="addFormToCloud"><el-icon><House /></el-icon>&nbsp;人员入库</el-button>
        </div>
    </el-drawer>
  </div>


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

</template>


<script>
import { reactive, toRefs } from '@vue/reactivity'
import {listTable,addForm,updateForm,deleteForm,importFiles,
  getAllFiles,downloadFile,importFiles2,removeFile} from '../../../api/sdhr04'
import {insertOf01} from '../../../api/sdof01'
import {itemList} from '../../../api/itemApi'
import {addToCloud} from '../../../api/sdhr03'
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { RadarChart } from "echarts/charts";
//导入封装的消息弹窗
import {$msg_error} from '../../../utils/msg'
import { Base64 } from 'js-base64';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref } from "vue";

use([
  CanvasRenderer,
  RadarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);
export default {
    name:'Sdhr04',
    components: {
        VChart
    },
    provide: {
      [THEME_KEY]: "light"
    },
    setup(){
        let allData = reactive({
            tableData:[],
            formData:{
              itvNo:'',
              planNo:'',
              itvDept:'',
              itvJob:'',
              itvDate:'',
              itver:'',
              itvWays:'',
              memberName:'',
              universityName:'',
              educationBckr:'',
              professionL:'',
              score1:0,
              score2:0,
              score3:0,
              score4:0,
              score5:0,
              score6:0,
              sumScore:0,
              itvStatus:'',
              nowStatus:'',
              arrivalDate:'',
              evaluation:''
            },

            //添加人员库的内容
            formData2:{
                memberName:'',
                tel:'',
                deptName:'',
                itvJob:'',
                channel:'',
                archiveReason:'',
                archiveStatusBfr:'',
                archiveDate:'',
                workYear:'',
                educationBckr:''
            },
            //查询条件
            memberNameValue:'',
            deptId:'',
            deptList:[{deptId:'',deptName:'请选择面试部门'}],
            itvJobId:'',
            itvJobList:[{itvJobId:'',itvJobName:'请选择面试岗位'}],
            itvStatusId:'',
            deptList2:[{deptId:'',deptName:'请选择需求部门'}],
            itvJobList2:[{itvJobId:'',itvJobName:'请选择岗位信息'}],
            itvStatusList:[{itvStatusId:'',itvStatusName:'请选择面试结果'}],
            nowStatusId:'',
            nowStatusList:[{nowStatusId:'',nowStatusName:'请选择当前状态'}],
            edcBckrId:'',
            edcBckrList:[{edcBckrId:'',edcBckrName:'请选择学历'}],
            itvWaysId:'',
            itvWaysList:[{itvWaysId:'',itvWaysName:'请选择面试方式'}],
            channelList:[{channelId:'',channelName:'请选择渠道'}],
            archiveStatusBfrId:'',
            archiveStatusBfrList:[{archiveStatusBfrId:'',archiveStatusBfrName:'请选择归档前状态'}],
            educationBckrId:'',
            educationBckrList:[{educationBckrId:'',educationBckrName:'请选择学历'}],

            openDrawer:false,
            openDrawer2:false,
            isAdd:true,
            scoreType:'info',
            pageSize:10,
            totalNum:0,
            pageNum:1,
            loading:true,
            isShowRadar:false,
            dialogVisible:false,
            fileList:[],
            drawer:false,
            drawerFile:true,
            drawer2:false,
        })
        
        const radarVal=reactive([]);

        
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
              allData.itvJobList.push({itvJobId:r[i].codeEname,itvJobName:r[i].codeCname})
              allData.itvJobList2.push({itvJobId:r[i].codeEname,itvJobName:r[i].codeCname})
            }
          }
          
        }
        loadItvJobList()

        //面试结果下拉框
        let loadItvStatusList = async()=>{
          let prams={
            codeNo:'sdHr_itvStatus'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.itvStatusList.push({itvStatusId:r[i].codeEname,itvStatusName:r[i].codeCname})
            }
          }
          
        }
        loadItvStatusList()

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
        loadEdcBckrList();
        //面试方式下拉框
        let loadItvWaysList = async()=>{
          let prams={
            codeNo:'sdHr_itvWays'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.itvWaysList.push({itvWaysId:r[i].codeEname,itvWaysName:r[i].codeCname})
            }
          }     
        }
        loadItvWaysList();
        //当前状态下拉框
        let loadNowStatusList = async()=>{
          let prams={
            codeNo:'sdHr_nowStatus'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.nowStatusList.push({nowStatusId:r[i].codeEname,nowStatusName:r[i].codeCname})
            }
          }
          
        }
        loadNowStatusList()

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
        loadChannelList();

        //归档前状态下拉框
        let loadArchiveStatusBfrList = async()=>{
          let prams={
            codeNo:'sdHr_acvStatus'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.archiveStatusBfrList.push({archiveStatusBfrId:r[i].codeEname,archiveStatusBfrName:r[i].codeCname})
            }
          }
          
        }
        //学历下拉框
        let loadEducationBckrList = async()=>{
          let prams={
            codeNo:'sdHr_edcBckr'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.educationBckrList.push({educationBckrId:r[i].codeEname,educationBckrName:r[i].codeCname})
            }
          }
          
        }
        loadEducationBckrList();
        //查询表单数据
        let loadTable= async()=>{
          let r = await listTable()
          // allData.tableData = r.data
          allData.tableData = r.data.data
          allData.totalNum = r.data.totalNum
          setTimeout(() => {
                allData.loading= false
            }, 500);
        }
        loadTable()

        let searchTable = async()=>{
          let itvDateStr
          if(allData.itvDate!=null){
            itvDateStr= allData.itvDate[0]+','+allData.itvDate[1]
          }
          let prams = {
            memberName:allData.memberNameValue,
            itvDept:allData.deptId,
            itvJob:allData.itvJobId,
            itvDate:itvDateStr,
            itvStatus:allData.itvStatusId,
            nowStatus:allData.nowStatusId
          };
          let r = await listTable(prams)
          allData.tableData = r.data.data
          allData.totalNum = r.data.totalNum
          setTimeout(() => {
                  allData.loading= false
              }, 500);
        }

      //分页切换
      let handleCurrentChange=async(val)=>{
        let itvDateStr
        if(allData.itvDate!=null){
          itvDateStr= allData.itvDate[0]+','+allData.itvDate[1]
        }
        let prams = {
          memberName:allData.memberNameValue,
          itvDept:allData.deptId,
          itvJob:allData.itvJobId,
          itvDate:itvDateStr,
          itvStatus:allData.itvStatusId,
          nowStatus:allData.nowStatusId,
          pageNum:val
        };

        let r = await listTable(prams)
        allData.tableData = r.data.data
        allData.totalNum = r.data.totalNum
        }

        //新增数据
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
          }
        }

        let handleEdit = (row)=>{
          //赋值
          allData.formData={...row}
          allData.isAdd=false
          //打开抽屉
          allData.openDrawer=true;
    
        }
        let handleDelete =async (row)=>{
          let  prams={
            itvNo:row.itvNo
          }
          await deleteForm(prams)
          setTimeout(() => {
            loadTable();
          }, 2000);
        }

        let changeScore =()=>{
          allData.formData.sumScore =
           allData.formData.score1 + 
           allData.formData.score2 + 
           allData.formData.score3 + 
           allData.formData.score4 + 
           allData.formData.score5 + 
           allData.formData.score6 
           if(allData.formData.sumScore<60){
            allData.scoreType='danger'
           }else if(60<allData.formData.sumScore 
                      && allData.formData.sumScore<80){
            allData.scoreType='warning'
           }else if(allData.formData.sumScore>80){
            allData.scoreType='success'
           }
        }

        let addOffer=async(row)=>{
          if(!row.itver){
            $msg_error("请补充人员姓名")
            return false
          }else if(!row.itvDept){
            $msg_error("请补充面试部门")
            return false
          }else if(!row.itvJob){
            $msg_error("请补充面试岗位")
            return false
          }else if(!row.email){
            $msg_error("请补充邮箱信息") 
            return false
          }else if(!row.arrivalDate){
            $msg_error("请补充入职时间")
            return false
          }else if (row.nowStatus!='10'){
            $msg_error("面试还未通过，无法生成Offer信息！")
            return false
          }
          let {itvNo,memberName,itvDept,arrivalDate,email,tel,hopeSalary}=row
          let addList = {
            itvNo,
            memberName,
            itvDept,
            empDate:arrivalDate,
            email,
            tel,
            salary:hopeSalary,
            isAgree:'00',
            offerStatus:'00',
            approveStatus:'00'
          }
          await insertOf01(addList)
          
        }

       

        //展示人员分数六边形
        let showRadar=(row)=>{
          allData.dialogVisible=true
          setTimeout(() => {
            allData.isShowRadar=true
            radarVal.splice(0,radarVal.length)
            radarVal.push(...[row.score1,row.score2,row.score3,row.score4,row.score5,row.score6])
          }, 500);
          
        }

        let option = ref({
          title: {
            text: "面试评分",
            left: "center"
          },
          legend: {
            // data: ["aaa"]
          },
          radar: {
              // shape: 'circle',
              color:'#ff9b44',
              indicator: [
              { name: '沟通、表达能力（20%）', max: 20 },
              { name: '判断、分析、反应能力（10%）', max: 10 },
              { name: '责任心、纪律性（10%）', max: 10 },
              { name: '专业知识（30%）', max: 30 },
              { name: '项目经验（15%）', max: 15 },
              { name: '学习能力（15%）', max: 15 }
              ]
          },
          series: [
            {
                type: 'radar',
                color:'#ff9b44',
                data: [
                    {
                    value: radarVal,
                    // name: 'aaa'
                    }
                ]
            }
          ]
        });

      //添加到人员库，打开人员库抽屉，完善信息后添加
      let addCloud = async(row) =>{
        loadChannelList()
        loadArchiveStatusBfrList()
        loadEducationBckrList()
        allData.formData2={...row}
        
        allData.openDrawer2=true;
      }

      //人员库抽屉的添加方法
      let addFormToCloud = async()=>{
        let r =await addToCloud(allData.formData2)
        if(r){
          // loadTable2();
          allData.openDrawer2=false
        }
      }

    

       //格式化日期展示
    let dateFormat= (date) =>{
      let year=date.substr(0, 4);
      let month= date.substr(4, 2);
      let day=date.substr(6, 2);
      let hours=date.substr(8, 2);
      let minutes=date.substr(10, 2);
      let seconds=date.substr(12, 2);      
      // 拼接
      return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
    }


     //导入人员附件
      let importPersonFile = async(a) => {
        let formData = new FormData();
        formData.append('file', a.file);
        formData.append('itvNo', 'sdhr04');
        formData.append('businessKeyword', 'sdhr04');
        await importFiles(formData);
        searchTable();
      }


      //预览
      let handlePreview = async(file)=>{
            var url = 'http://106.14.152.86:8082/static/sdhr02/'+file.id+file.suffix;  //要预览文件的访问地址          
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
       let updateFileItvNo =async(row,flag)=>{
        //赋值
        allData.fileItvNo = row.itvNo;
        allData.drawer=true;
        //判断是查询还是上传
        flag?allData.drawerFile=true:allData.drawerFile=false;
       
        let prams = {
          businessNo:allData.fileItvNo,
          businessKeyword:"sdhr04"
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
        formData.append('businessNo', allData.fileItvNo);
        formData.append('businessKeyword', 'sdhr04');   
        
       
        await importFiles2(formData);

          //更新附件
        let prams = {
          businessNo:allData.filePlanNo,
          businessKeyword:"sdhr04"
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
           businessKeyword:'sdhr04'
         };
        let url = "file/downloadFile";
        await downloadFile(url,params,name)
      }

      
      //附件删除
      let fileRemove =async (file) => {
        let formData = new FormData();
        formData.append('fileId', file.id);
        await removeFile(formData);      
        allData.fileList = allData.fileList.filter((i)=>i.id!=file.id);
      }

      
       //导出数据
       let exportTable = async() => {
        let name ="面试测评信息导出.xlsx";
        let itvDateStr
          if(allData.itvDate!=null){
            itvDateStr= allData.itvDate[0]+','+allData.itvDate[1]
          }
        let params = {
            memberName:allData.memberNameValue,
            itvDept:allData.deptId,
            itvJob:allData.itvJobId,
            itvDate:itvDateStr,
            itvStatus:allData.itvStatusId,
            nowStatus:allData.nowStatusId
        };
        let url = "Sdhr04/export";
        await downloadFile(url,params,name)
        
      }

        return {
            ...toRefs(allData),
            loadTable,
            editForm,
            handleEdit,
            handleDelete,
            changeScore,
            showRadar,
            addOffer,
            loadDeptList,
            loadItvJobList,
            searchTable,
            loadItvStatusList,
            addCloud,
            addFormToCloud,handleCurrentChange,fileRemove,
            importPersonFile,handlePreview,updateFileItvNo,fileRequest,filePreview,exportTable
            
        }
    }
}
</script>

<style scoped lang="scss">
.pagination{
    margin-top: 10px;

}
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
    // .radarDiv{
    //   height: 500px;
    //   width: 500px;
    // }
    
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

   
</style>