<template>
  <div class="contents">
      <el-tabs type="border-card">
         
            <div class="center">
                <!--点击打开新增抽屉-->
                <el-button type="warning" round class="addDrawer" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;添加需求</el-button>
                <!--点击导入抽屉-->
                <el-button type="success" round class="uploadDrawer" @click="drawer=true"><el-icon><Upload /></el-icon>&nbsp;导入需求</el-button>
                <el-row :gutter="24">
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                        <el-input v-model="memberNameValue" placeholder="请输入人员姓名" clearable/>
                    </el-col>
                    
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                        <!-- 查询条件-岗位 -->
                        <el-select v-model="jobs" @change="searchTable" class="m-2"  size="mini">
                            <el-option 
                            v-for="item in jobsList"
                            :key="item.jobsId"
                            :label="item.jobsName"
                            :value="item.jobsId"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                       <!-- 查询条件-部门 -->
                       <el-select v-model="deptNameId" @change="searchTable" class="m-2"  size="mini">
                            <el-option 
                            v-for="item in deptList"
                            :key="item.deptId"
                            :label="item.deptName"
                            :value="item.deptId"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                        <el-tooltip content="查询" placement="top" effect="light">
                            <el-button type="primary" @click="searchTable" round ><el-icon><Search /></el-icon></el-button>
                        </el-tooltip>
                        <el-tooltip content="导出数据" placement="top" effect="light">
                            <el-button type="success" @click="downloadTable" round plain><el-icon><Download /></el-icon></el-button>
                        </el-tooltip>
                    </el-col>
                </el-row>
                
              </div>
                <el-table v-loading="loading" :data="tableData" stripe border style="width: 100%" >
                    <el-table-column type="selection" width="40" />
                    <el-table-column fixed prop="phoAddress" label="图片地址" width="100" v-if="false"  />
                    <el-table-column fixed prop="memberId" label="人员编号" width="100" />
                    <el-table-column fixed prop="memberName" label="员工姓名" width="100"  >
                        <template #default="scope" >
                            <el-link type="success" @click="queryDetail(scope.row)" >{{scope.row.memberName}}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column fixed label="人员类型" width="100">
                        <template #default="scope">
                        <el-tag size="mini" v-if="scope.row.memberType=='0'" type="warning" >试用</el-tag>
                        <el-tag size="mini" v-if="scope.row.memberType=='1'" type="primary" >正式</el-tag>
                        <el-tag size="mini" v-if="scope.row.memberType=='2'" type="error" >离职</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column  fixed label="访谈状态" width="100">
                        <template #default="scope">
                        <el-tag size="mini" v-if="scope.row.talkStatus=='00'" type="error" >已逾期</el-tag>
                        <el-tag size="mini" v-if="scope.row.talkStatus=='10'" type="warning" >未完成</el-tag>
                        <el-tag size="mini" v-if="scope.row.talkStatus=='20'" type="success" >已完成</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="recTalkTime" label="最近访谈时间" width="120" />
                    <el-table-column prop="remTalkTime" label="最近提醒访谈时间" width="140" />

                    <el-table-column   show-overflow-tooltip label="部门" width="140" >
                      <template #default="scope">
                          <el-tag size="large"  v-if="scope.row.deptName=='DEPT_001'">能环事业部</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_002'">石化事业部</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_003'">MES事业部</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_004'">智能装备事业部</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_005'">智慧城市</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_006'">自动化事业本部-研究所</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_007'">大数据服务事业部</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_008'">中铝智能铜创科技</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_009'">其烨科技</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_SH'">沈阳东硕-上海基地</el-tag>
                          <el-tag size="large" v-if="scope.row.deptName=='DEPT_SY'">沈阳东硕-沈阳基地</el-tag>
                      </template>
                      </el-table-column>
                      <el-table-column   show-overflow-tooltip label="岗位" width="160" >
                      <template #default="scope">
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_002'"  >JAVA开发工程师-中级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_001'"  >JAVA开发工程师-初级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_003'"  >JAVA开发工程师-高级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_004'"  >c++开发工程师-初级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_005'"  >c++开发工程师-中级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_006'"  >c++开发工程师-高级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_007'"  >前端开发-初级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_008'"  >前端开发-中级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_009'"  >前端开发-高级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_010'"  >自动化工程师-初级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_011'"  >自动化工程师-中级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_012'"  >自动化工程师-高级</el-tag>
                          <el-tag size="large" v-if="scope.row.jobs=='JOB_013'"  >项目经理</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column prop="empDate" label="入职日期" width="100"  />
                    <el-table-column prop="formalDate" label="转正日期"  width="100" />
                    <el-table-column prop="pmNameF" label="入职时项目经理" width="130"/>
                    <el-table-column prop="projectName" label="入职时项目组信息"  width="180" />
                    <el-table-column prop="talkNo" label="访谈计划号"  width="100" v-if="show"/>
                    <el-table-column prop="remark" label="备注"  width="200" />
                    <el-table-column fixed="right" label="操作" width="140">
                    <template #default="scope">
                    <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <!-- 分页区 -->
                <div class="pagination">
                    <el-pagination background small layout="total,prev, pager, next" :page-size="pageSize" :total="totalNum" />
                </div>
      
        
    </el-tabs>
     <!-- 访谈信息 -->

     <el-tabs type="border-card">
        <el-tab-pane label="人员访谈明细信息">
          <!-- <template #extra> -->
              <el-button class="updateBtn" round plain type="success"><el-icon><Upload /></el-icon>&nbsp;导入数据</el-button>
              <!-- </template> -->
            <!-- 头像上传、展示区域 -->
              <el-upload
              class="avatar-uploader"
              :action="hr01_fileUpload_url"
              :show-file-list="false"
              :headers="headers"
              :data="uploadData"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>

            <!-- 详细信息展示区域 -->
            <el-descriptions class="margin-top" :column="3" :size="size" border>
              <!-- 操作区 -->
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                      <user />
                    </el-icon>
                    姓名：
                  </div>
                </template>
                {{destData.memberName}}
              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon >
                    <CoffeeCup />
                    </el-icon>
                    部门：
                  </div>
                </template>
                {{ destData.deptName }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                      <office-building />
                    </el-icon>
                    岗位：
                  </div>
                </template>
               {{ destData.jobs }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                    <Avatar />
                    </el-icon>
                    入职时项目经理
                  </div>
                </template>
                {{ destData.pmNameF }}
              </el-descriptions-item>

              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">
                    <el-icon :style="iconStyle">
                    <Coin />
                    </el-icon>
                    入职时项目信息：
                  </div>
                </template>
               {{ destData.projectNameF }}
              </el-descriptions-item>


          </el-descriptions>
          <!-- 访谈信息=>试用期员工,分别查询出当前年份第一周、第一 月、转正访谈的访谈内容，查询时根据员工信息及访谈类型查询出访谈明细的员工的当年访谈内容-->
          <el-tabs type="border-card">
            <el-tab-pane label="第一周">
              <!-- 第一周 -->
              <!--点击打开新增抽屉-->
              <el-button type="warning" round class="addFirstW" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;新增</el-button>
              <div class="tableDiv">
                  <el-table v-loading="loading" :data="tableData2" stripe border style="width: 100%" >
                    <el-table-column type="selection" width="40" />
                    <el-table-column fixed prop="talkType" label="访谈类型" width="100" v-if="showFormal"/>
                    <el-table-column fixed prop="talkDate" label="跟踪时间" width="100" />
                    <el-table-column prop="isFormal" label="是否正式员工" width="100"  v-if="showFormal"/>
                    <el-table-column prop="talkContent1" label="公司内部评价" width="300" />
                    <el-table-column prop="talkContent1" label="项目经理评价" width="300" />
                    <el-table-column prop="talkContent1" label="入职后对公司整体印象与面试沟通的是否反差并举例说明" width="500" />
                    <el-table-column  prop="talkContent2" label="对公司基本情况、福利、管理制度不清楚的点" width="500" />
                    <el-table-column  prop="talkContent3" label="工作氛围感受" width="300" />
                    <el-table-column  prop="talkContent4" label="对目前工作环境适应和满意度" width="300" />
                    <el-table-column  prop="talkContent5" label="项目经理进行工作安排方面怎么样" width="300" />
                    <el-table-column  prop="talkContent6" label="对岗位的了解" width="300" />
                    <el-table-column  prop="talkContent7" label="遇到困难及是否有需要帮助的" width="300" />
                    <el-table-column  prop="talkContent8" label="其他问题" width="200" />
                    <el-table-column prop="pmNameNow" label="现阶段项目经理" width="130" />
                    <el-table-column  prop="pmFeedback" label="项目经理反馈" width="200" />
                    <el-table-column  prop="dailyNum" label="标准日报天数" width="110" />
                    <el-table-column  prop="dailyNumFin" label="完成填报天数" width="110" />
                  </el-table>
              </div>
              
            </el-tab-pane>
            <el-tab-pane label="第一月">
              <!-- 第一月 -->
              <el-button type="warning" round class="addFirstM" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;新增</el-button>
              <div class="tableDiv">
                <el-table v-loading="loading" :data="tableData3" stripe border style="width: 100%" >
                  <el-table-column type="selection" width="40" />
                  <el-table-column fixed prop="talkType" label="访谈类型" width="100" v-if="showFormal"/>
                  <el-table-column prop="isFormal" label="是否正式员工" width="100"  v-if="showFormal"/>
                  <el-table-column fixed prop="talkDate" label="跟踪时间" width="100" />
                  <el-table-column prop="talkContent1" label="公司内部评价" width="300" />
                  <el-table-column prop="talkContent1" label="项目经理评价" width="300" />
                  <el-table-column prop="talkContent1" label="与周围同事是否都熟悉" width="300" />
                  <el-table-column prop="talkContent2" label="对公司的了解及感受" width="300" />
                  <el-table-column prop="talkContent3" label="对自身岗位和工作的了解" width="300" />
                  <el-table-column prop="talkContent4" label="工作挑战性如何" width="300" />
                  <el-table-column prop="talkContent5" label="项目经理、带教人等帮助或关心程度如何" width="300" />
                  <el-table-column prop="talkContent6" label="是否有出差,适应程度如何" width="200" />
                  <el-table-column prop="talkContent7" label="其他问题" width="200" />
                  <el-table-column prop="pmNameNow" label="现阶段项目经理" width="130" />
                  <el-table-column prop="pmFeedback" label="项目经理反馈" width="200" />
                  <el-table-column  prop="dailyNum" label="标准日报天数" width="110" />
                  <el-table-column  prop="dailyNumFin" label="完成填报天数" width="110" />
                </el-table>
              </div>
              
            </el-tab-pane>
            <el-tab-pane label="转正面谈">
              <!-- 转正 -->
              <el-button type="warning" round class="addFormal" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;新增</el-button>
              <div class="tableDiv">
                <el-table v-loading="loading" :data="tableData4" stripe border style="width: 100%" >
                  <el-table-column type="selection" width="40" />
                  <el-table-column fixed prop="talkType" label="访谈类型" width="100" v-if="showFormal"/>
                  <el-table-column prop="isFormal" label="是否正式员工" width="100"  v-if="showFormal"/>
                  <el-table-column fixed prop="talkDate" label="跟踪时间" width="100" />
                  <el-table-column prop="talkContent1" label="公司内部评价" width="300" />
                  <el-table-column prop="talkContent1" label="项目经理评价" width="300" />
                  <el-table-column prop="talkContent1" label="清楚自己目前的岗位职责吗" width="300" />
                  <el-table-column prop="talkContent2" label="现在可以独立完成岗位工作吗" width="300" />
                  <el-table-column prop="talkContent3" label="您在工作中存在的问题有哪些" width="300" />
                  <el-table-column prop="talkContent4" label="下一步工作要求及安排" width="300" />
                  <el-table-column prop="talkContent5" label="您一年内想对自己的职业发展期望是什么" width="300" />
                  <el-table-column prop="talkContent6" label="对公司的管理制度（财务报销、人力资源管理制度）了解了多少，有哪些需要再了解的" width="600" />
                  <el-table-column prop="talkContent7" label="生活上是否能适应" width="200" />
                  <el-table-column prop="talkContent8" label="是否了解转正后工资" width="200" />
                  <el-table-column prop="talkContent9" label="其他问题" width="200" />
                  <el-table-column prop="pmNameNow" label="现阶段项目经理" width="130" />
                  <el-table-column prop="pmFeedback" label="项目经理反馈" width="200" />
                  <el-table-column prop="pmScore" label="项目经理评分" width="120" />
                  <el-table-column prop="dailyNum" label="标准日报天数" width="110" />
                  <el-table-column prop="dailyNumFin" label="完成填报天数" width="110" />
                </el-table>
              </div>
              
            </el-tab-pane>
            <el-tab-pane label="正式访谈">
              <!-- 访谈信息=>正式员工,查询出当前年份上半年和下半年的访谈内容，查询时根据员工信息查询出访谈明细的正式员工的当年访谈内容-->
              <el-button type="warning" round class="addYear" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;新增</el-button>
              <el-button type="success" round class="queryNowYear" plain @click="queryNowYear"><el-icon><Search /></el-icon>&nbsp;仅查当年</el-button>
              <div class="tableDiv">
                <el-table v-loading="loading" :data="tableData5" stripe border style="width: 100%" >
                  <el-table-column type="selection" width="40" />
                  <el-table-column fixed prop="talkType" label="访谈阶段" width="100"/>
                  <el-table-column fixed prop="talkDate" label="跟踪时间" width="100" />
                  <el-table-column prop="isFormal" label="是否正式员工" width="100"  v-if="showFormal"/>
                  <el-table-column prop="talkContent1" label="所在项目组" width="150" />
                  <el-table-column prop="pmNameNow" label="项目经理" width="100" />
                  <el-table-column prop="talkContent1" label="公司内部评价" width="300" />
                  <el-table-column prop="talkContent1" label="项目经理评价" width="300" />
                  <el-table-column  prop="talkContent2" label="身体状况" width="200" />
                  <el-table-column  prop="talkContent3" label="近阶段工作强度" width="200" />
                  <el-table-column  prop="talkContent4" label="工作环境与氛围" width="200" />
                  <el-table-column  prop="talkContent5" label="目前负责的项目组的模块" width="200" />
                  <el-table-column  prop="talkContent6" label="当前的小规划" width="200" />
                  <el-table-column  prop="talkContent7" label="生活问题" width="200" />
                  <el-table-column  prop="talkContent8" label="遇到困难及是否有需要帮助" width="200" />
                  <el-table-column  prop="talkContent9" label="其他问题" width="200" />
                  <el-table-column  prop="pmFeedback" label="项目经理反馈" width="200" />
                  <el-table-column  prop="pmScore" label="项目经理评分" width="200" />
              </el-table>
              </div>
              
              <!-- 分页 -->
              <div class="pagination">
                  <el-pagination background layout="total,prev, pager, next" :page-size="pageSize2" :total="totalNum2" />
              </div>
            </el-tab-pane>
          </el-tabs>
          
                
        </el-tab-pane>
    </el-tabs>
    
    
 
  
      
      <!-- 添加需求抽屉 -->
      <el-drawer v-model="openDrawer" :title="isAdd?'添加人员访谈主信息':'修改人员访谈主信息'"
        direction="rtl"
        :before-close="drawerClose"
      >
        <div class="item">
          <span>年份:</span>
          <el-select v-model="formData.year" class="m-2"  placeholder="---请选择---" size="mini">
            <el-option label="2022" value="2022"/>
            <el-option label="2023" value="2023"/>
            <el-option label="2024" value="2024"/>
            <el-option label="2025" value="2025"/>
          </el-select>
        </div>
        <div class="item">
          <span>部门名称:</span>
          <el-select v-model="formData.deptName" class="m-2" placeholder="---请选择---" size="mini">
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
          <span>需求数量:</span>
          <el-input-number v-model="formData.requireNum" :step="2" step-strictly />
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
          <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.planEndDate" type="date" placeholder="请选择" :size="size"/>
        </div>
        <div class="item">
          <span>面试方式:</span>
          <el-select v-model="formData.itvWays" class="m-2" placeholder="---请选择---" size="mini">
            <el-option label="视频" value="视频"/>
            <el-option label="当面" value="当面"/>
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
              :action="hr01_fileUpload_url"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
              :headers="headers"
              :data="uploadData"
              :file-list="fileList"
              :on-preview="fileDownload"
              :before-remove="removeFile"
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
import {listTalk,addForm,updateForm,deleteForm} from '../../../api/sder03'
//导入上传下载地址
import {hr01_fileDownload_url,hr01_fileUpload_url} from '../../../config/conster'
//导入文件下载方法
import {$downloadFile,$beforeUploadImg} from '../../../api/upload'
export default {
    name:'Sder03',
    setup(){
        //定义数据
      let allData = reactive({
        tableData:[],
        
        //第一周
        tableData2:[],
        //第一月
        tableData3:[],
        //转正面谈
        tableData4:[],
        //正式半年度访谈
        tableData5:[],
        //是否打开抽屉
        openDrawer:false,
        drawer:false,
        isAdd:true,
        //表单数据
        formData:{
          id:'',
          memberId:'',
          memberName:'',
          memberType:'',
          deptName:'',
          itvJob:'',
          empDate:'',
          formalDate:'',
          pmNameF:'',
          projectName:'',
          talkNo:'',
          remark:''
        },
        //描述列表中数据
        destData:{
          memberName:'',
          deptName:'',
          jobs:'',
          projectNameF:'',
          pmNameF:''
        },
        //查询数据
        itvJobValue:'',
        deptValue:'',
        memberNameValue:'',
        //分页：每页数
        pageSize:10,
        //分页：总条数
        totalNum:0,
        loading:true,
        //上传头信息中加入token
        headers:{token:sessionStorage.getItem('token')},
        //传递参数
        uploadData:{
          businessNo:'123',
          businessKeyword:'sder03'
        },
        imageUrl:'',
        fileName:'',
        hr01_fileUpload_url,
        hr01_fileDownload_url,
      })

      
      //加载表格数据
      let loadTable = async()=>{
         let r = await listTalk()
         allData.tableData = r.data.data
         allData.totalNum = r.data.totalNum
         setTimeout(() => {
                allData.loading= false
            }, 500);
      }
      loadTable()

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
          id:'',
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
        let {id}=row
        await deleteForm(id)
        setTimeout(() => {
          loadTable();
        }, 2000);
      }

      let searchTable = async () =>{
        let prams = {
          year:allData.yearValue,
          deptName:allData.deptValue,
          itvJobValue:allData.itvJobValue
        };
        
        let r = await listJobs(prams)
        allData.tableData = r.data.data
        allData.totalNum=r.data.totalNum

      }

      //上传
      let handleAvatarSuccess = (response,uploadFile) => {
        allData.imageUrl = URL.createObjectURL(uploadFile.raw)
      }

      //点击主信息查询明细信息(明细由主信息+项目信息构建而成)
      let queryDetail = (row)=>{

        allData.destData={...row}
        allData.imageUrl= row.phoAddress
        queryDetail1()
        queryDetail2()
        queryDetail3()
        queryDetail4()
      }

      let queryDetail1 =()=>{

      }

      let queryDetail2 =()=>{
        
      }
      
      let queryDetail3 =()=>{
        
      }
      let queryDetail4 =()=>{
        
      }

      //文件上传前
      let beforeUpload = (file)=>{
        
        let uploadTypes=$beforeUploadImg(file)
        
        return uploadTypes
      }
      //上传成功后
      let handleSuccess =(res)=>{
        let {fileName,success} = res
        if(success){
          allData.fileName=fileName
        }

      }
      return {
        ...toRefs(allData),
        editForm,
        drawerClose,
        handleEdit,
        handleDelete,
        searchTable,handleAvatarSuccess,queryDetail,queryDetail1,queryDetail2,queryDetail3,queryDetail4,beforeUpload,handleSuccess
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

  .pagination{
    margin-top: 10px;

  }

  .avatar-uploader {
    width: 120px;
    height: 120px;
    display: block;
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
}

  .avatar-uploader {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    .el-icon{
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      text-align: center;
    }
  }
  .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .avatar-uploader {
    border-color: var(--el-color-primary);
  }
  .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: black;
    width: 120px;
    height: 120px;
    text-align: center;
  }
  .el-descriptions {
    margin-top: 20px;
  }
  .cell-item {
    display: flex;
    align-items: center;
  }
  .margin-top {
    margin-top: 20px;
  }
  .updateBtn{
    float: right;
  }
  .tableDiv{
    padding-top: 6px;
  }
 
</style>