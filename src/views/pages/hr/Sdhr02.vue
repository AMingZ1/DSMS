<template>
 
  <div class="contents">
    <el-tabs type="border-card">
        <el-tab-pane label="电话邀约" @tabs-click="searchTable1" >
            <div class="center">
                <!--点击打开新增抽屉-->
                <el-button type="warning" round class="addDrawer" plain @click="openDrawer1=true"><el-icon><Plus /></el-icon>&nbsp;添加人员</el-button>
                 
                <!--点击导入抽屉-->
                <el-button type="success" round class="uploadDrawer" @click="drawer2=true"><el-icon><Upload /></el-icon>&nbsp;导入人员</el-button>
                
                
                
                <el-row :gutter="24">
                  <el-col :span="6"><div class="grid-content ep-bg-purple" />
                     <el-input v-model="reqNoValue1" placeholder="请输入需求编号" clearable/> <!-- -->
                  </el-col>
                  <el-col :span="6"><div class="grid-content ep-bg-purple" />
                    <el-input v-model="memberNameValue1" placeholder="请输入人员姓名" clearable/>
                  </el-col>
                  <el-col :span="6"><div class="grid-content ep-bg-purple" />
                    <el-select v-model="contactStatusId" class="m-2" @change="searchTable1" placeholder="请选择联系状态" size="mini" clearable>
                      <el-option 
                        v-for="item in contactStatusList"
                        :key="item.contactStatusId"
                        :label="item.contactStatusName"
                        :value="item.contactStatusId"
                        ></el-option>
                    </el-select>
                  </el-col>
                  
                </el-row>

                <el-row :gutter="24">
                <el-col :span="6"> 
                  <el-date-picker  style="width:100%"
                        format="YYYYMMDD" 
                        value-format="YYYYMMDD" 
                        v-model="startRecCreateTime" 
                        placeholder="创建时间起"
                      />
                </el-col>
              <el-col :span="6"> 
                <el-date-picker  style="width:100%"
                      format="YYYYMMDD" 
                      value-format="YYYYMMDD" 
                      v-model="endRecCreateTime" 
                    placeholder="创建时间止"
                    />
              </el-col>
              <el-col :span="6">
              </el-col>

              <el-col :span="6">
                      <el-tooltip content="查询" placement="top" effect="light">
                        <el-button type="primary" @click="searchTable1" round ><el-icon><Search /></el-icon></el-button>
                      </el-tooltip>
                      <el-tooltip content="导出数据" placement="top" effect="light">
                        <el-button type="success" @click="exportTable('1')"  round plain><el-icon><Download /></el-icon></el-button>
                      </el-tooltip>
                      <el-tooltip content="删除数据" placement="top" effect="light">
                      <el-button type="success" @click="deleteTable()"  round plain>删除</el-button>
                    </el-tooltip>
                    </el-col>

            </el-row>

                
            </div>
                <el-table v-loading="loading" :data="tableData" stripe border style="width: 100%"
                    @selection-change="handleSelectionChange" >
                    <el-table-column type="selection" width="40" />
                    <el-table-column fixed prop="recCreateTime"   label="创建时间" width="120" />
                    <el-table-column  fixed prop="planNo" label="电联记录号" width="120" />
                    <el-table-column  fixed prop="reqNo" label="岗位需求编号" width="120"/>      
                    <el-table-column  fixed prop="memberName" label="姓名" width="100"/>
                    <el-table-column  prop="tel" label="联系电话" width="120" />
                    <el-table-column  label="联系状态" width="100">
                      <template #default="scope">
                        <el-tag size="large" v-if="scope.row.contactStatus=='10'"  >未联系</el-tag>
                        <el-tag size="large" v-if="scope.row.contactStatus=='20'"  >已入选</el-tag>
                        <el-tag size="large" v-if="scope.row.contactStatus=='30'"  >电联通过</el-tag>
                        <el-tag size="large" v-if="scope.row.contactStatus=='40'"  >面试通过</el-tag>
                        <el-tag size="large" v-if="scope.row.contactStatus=='50'"  >已关闭</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column  prop="contactMember" label="联系人" width="100"/>
                    <el-table-column prop="contactDate" label="联系时间" width="120"/>
                    <el-table-column  label="简历附件" width="100">
                      <template #default="scope">
                        <el-link type="primary" @click="updateFilePlanNo(scope.row,false)">查看</el-link>
                      </template>
                    </el-table-column>
                    
                    <el-table-column prop="itvRemark" show-overflow-tooltip label="备注" width="500"  />
                    <el-table-column fixed="right" label="操作" width="200">
                      <template #default="scope">
                        <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                        <el-button type="danger" size="small" @click="handleDeleteTab1(scope.row)">删除</el-button>
                        <el-button type="success" size="small" @click="updateFilePlanNo(scope.row,true)">上传</el-button>
                      </template>
                    </el-table-column>
            </el-table>
        <!-- 分页区 -->
        <div class="pagination">
            <el-pagination background layout="total,prev, pager, next" :pager-count="11" v-model:current-page="pageNumTab1" @current-change="handleCurrentChangeTab1" :page-size="pageSizeTab1" :total="totalNumTab1" />
        </div>
        </el-tab-pane>
        <el-tab-pane label="候选人" @tab-click="handleClick">
            <div class="center">
              <el-row :gutter="24">
                <el-col :span="6">
                  <el-input v-model="memberNameValue2" placeholder="请输入人员姓名" clearable/>
                </el-col>
                <el-col :span="6">
                  <!-- 查询条件-部门 -->
                  <el-select v-model="deptId" @change="searchTable2" class="m-2"  size="mini">
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
                  <el-select v-model="itvJobId" @change="searchTable2" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in itvJobList"
                      :key="item.itvJobId"
                      :label="item.itvJobName"
                      :value="item.itvJobId"
                      ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                  <el-tooltip content="查询" placement="top" effect="light">
                    <el-button type="primary" @click="searchTable2" round ><el-icon><Search /></el-icon></el-button>
                  </el-tooltip>
                  <el-tooltip content="导出数据" placement="top" effect="light">
                    <el-button type="success" @click="exportTable('2')"  round plain><el-icon><Download /></el-icon></el-button>
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
            <el-table :data="tableData2" stripe border style="width: 100%" >
                    <el-table-column type="selection" width="40" />
                    <el-table-column  fixed prop="reqNo" label="岗位需求编号" width="120"/>
                    <el-table-column  fixed prop="memberName" label="姓名" width="100"/>
                    <el-table-column  fixed prop="tel" label="联系电话" width="120" />
                    <el-table-column  fixed label="联系状态" width="100">
                      <template #default="scope">
                        <el-tag size="large" v-if="scope.row.contactStatus=='10'"  >未联系</el-tag>
                        <el-tag size="large" v-if="scope.row.contactStatus=='20'"  >已入选</el-tag>
                        <el-tag size="large" v-if="scope.row.contactStatus=='30'"  >电联通过</el-tag>
                        <el-tag size="large" v-if="scope.row.contactStatus=='40'"  >面试通过</el-tag>
                        <el-tag size="large" v-if="scope.row.contactStatus=='50'"  >已关闭</el-tag>
                      </template>
                    </el-table-column>
                   
                    <el-table-column  show-overflow-tooltip label="需求部门" width="200" >
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

                
                    <el-table-column prop="itvDate" label="计划面试时间" width="120"/>
                    <el-table-column prop="itver" label="面试官" width="100"  />
                        <el-table-column fixed="right" label="操作" width="140">
                        <template #default="scope">
                        <el-button type="primary" size="small" @click="handleEditTab2(scope.row)">更新</el-button>
                        <el-button type="warning" size="small" @click="addCloud(scope.row)">入库</el-button>
                        </template>
                    </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <div class="pagination">
                <el-pagination background layout="total,prev, pager, next" :pager-count="11" v-model:current-page="pageNumTab2" @current-change="handleCurrentChangeTab2" :page-size="pageSizeTab2" :total="totalNumTab2" />
            </div>
        </el-tab-pane>
        <el-tab-pane label="电话测评">
            <div class="center">
              <el-row :gutter="24">
                <el-col :span="6">
                  <el-input  style="width:90%" v-model="memberNameValue3"  placeholder="请输入人员姓名" clearable/>
                </el-col>
                <el-col :span="6">
                  <!-- 查询条件-部门 -->
                  <el-select v-model="deptId2" @change="searchTable3" class="m-2"  size="mini">
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
                  <el-select v-model="itvJobId2" @change="searchTable3" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in itvJobList"
                      :key="item.itvJobId"
                      :label="item.itvJobName"
                      :value="item.itvJobId"
                      ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                 
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <!-- <el-col :span="6">
                  <el-date-picker 
                    format="YYYYMMDD" 
                    value-format="YYYYMMDD" 
                    v-model="itvDate" 
                    type="daterange" 
                    unlink-panels 
                    start-placeholder="面试时间起"
                    end-placeholder="面试时间止" 
                   />
                </el-col> -->
                <el-col :span="6">
                   <!-- 查询条件-职业状态 -->
                   <el-select v-model="workStatusId" @change="searchTable3" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in workStatusList"
                      :key="item.workStatusId"
                      :label="item.workStatusName"
                      :value="item.workStatusId"
                      ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                   <!-- 查询条件-面试情况 -->
                   <el-select v-model="itvStatusId" @change="searchTable3" class="m-2"  size="mini">
                    <el-option 
                      v-for="item in itvStatusList"
                      :key="item.itvStatusId"
                      :label="item.itvStatusName"
                      :value="item.itvStatusId"
                      ></el-option>
                  </el-select>
                </el-col>
                <el-col :span="6">
                 
                </el-col>
                <el-col :span="6">
                  <el-tooltip content="查询" placement="top" effect="light">
                    <el-button type="primary" @click="searchTable3" round ><el-icon><Search /></el-icon></el-button>
                  </el-tooltip>
                  <el-tooltip content="导出数据" placement="top" effect="light">
                    <el-button type="success"  @click="exportTable('3')" round plain><el-icon><Download /></el-icon></el-button>
                  </el-tooltip>
                </el-col>
              </el-row>
            </div>
            <el-table :data="tableData3" stripe border style="width: 100%" >
              <el-table-column type="selection" width="40" />
              <el-table-column fixed prop="itvDate" label="面试时间" width="120"/>
              <el-table-column fixed prop="memberName" label="姓名" width="100"/>
              <el-table-column  show-overflow-tooltip label="面试部门" width="200" >
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
              <el-table-column  prop="expLevel" label="经验" width="120" />
              <el-table-column  label="职业状态" width="100" >
                <template #default="scope">
                  <el-tag size="large" v-if="scope.row.workStatus=='0'"  >离职</el-tag>
                  <el-tag size="large" type="warning" v-if="scope.row.workStatus=='1'"  >在职</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="arrivalDate" label="到岗时间" width="120"  />
              <el-table-column prop="hopeSalary" label="薪资" width="120"  />
              <el-table-column  label="面试情况" width="100" >
                <template #default="scope">
                  <el-tag size="large" type="danger" v-if="scope.row.itvStatus=='N'"  >淘汰</el-tag>
                  <el-tag size="large" type="primary" v-if="scope.row.itvStatus=='S'"  >电联通过</el-tag>
                  <el-tag size="large" type="info" v-if="scope.row.itvStatus=='U'"  >待定</el-tag>
                  <el-tag size="large" type="success" v-if="scope.row.itvStatus=='Y'"  >录用</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="itvRemark" label="初面记录" width="500"  />
              <el-table-column prop="itver" label="面试官" width="100"  />
              <el-table-column fixed="right" label="操作" width="140">
              <template #default="scope">
              <el-button type="primary" size="small" @click="handleEditTab3(scope.row)">更新</el-button>
              
              </template>
            </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <div class="pagination">
                <el-pagination background layout="total,prev, pager, next" :pager-count="11" v-model:current-page="pageNumTab3" @current-change="handleCurrentChangeTab3" :page-size="pageSizeTab3" :total="totalNumTab3" />
            </div>
        </el-tab-pane>
    </el-tabs>
    
    <!--Tab1抽屉部分-人员邀约-->
    <el-drawer v-model="openDrawer1" :title="isAdd?'添加邀约人员':'修改邀约人员'"
        direction="rtl"
        :before-close="drawerClose"
      >
        <div class="item">
          <span>岗位需求编号:</span>
          <el-input v-model="formData.reqNo" placeholder="请选择岗位需求编号"  :disabled="disabled" @click="clickReqNo"/>
        </div>
        <div class="item">
          <span>人员姓名:</span>
          <el-input v-model="formData.memberName" placeholder="请输入人员姓名" />
        </div>
        <div class="item">
          <span>联系电话:</span>
          <el-input v-model="formData.tel" placeholder="请输入联系电话" />
        </div>
        <div class="item">
          <span>联系状态:</span>
          <el-select v-model="formData.contactStatus" class="m-2"  placeholder="---请选择---" >
            <el-option label="未联系" value="10"/>
            <el-option label="已入选" value="20"/>
            <el-option label="电联通过" value="30"/>
            <el-option label="面试通过" value="40"/>
            <el-option label="已关闭" value="50"/>
          </el-select>
        </div>
        <div class="item">
          <span>联系人:</span>
          <el-input v-model="formData.contactMember" placeholder="请输入联系人" />
        </div>
        <div class="item">
          <span>联系时间:</span>
          <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.contactDate" type="date" placeholder="请选择" :size="size"/>
        </div>
        <div class="item">
          <span>备注:</span>
          <el-input v-model="formData.itvRemark" :rows="3" type="textarea" placeholder="请输入备注信息"/>
        </div>
        <div class="item">
          <span></span>
          <el-button type="success" @click="editFormTab1"><el-icon><Select /></el-icon>&nbsp;{{isAdd?'添加人员':'修改人员'}}</el-button>
        </div>
    </el-drawer>

    <!--Tab2抽屉部分-候选人-->
    <el-drawer v-model="openDrawerTab2" :title="更新候选人信息"
        direction="rtl"
        :before-close="drawerCloseTab2"
      >
        <div class="item">
          <span>岗位需求编号:</span>
          <el-input v-model="formDataTab2.reqNo" placeholder="请选择岗位需求编号"  disabled />
        </div>
        <div class="item">
          <span>人员姓名:</span>
          <el-input v-model="formDataTab2.memberName" placeholder="请输入人员姓名" />
        </div>
        <div class="item">
          <span>联系电话:</span>
          <el-input v-model="formDataTab2.tel" placeholder="请输入联系电话" />
        </div>
        <div class="item">
          <span>联系状态:</span>
          <el-select v-model="formDataTab2.contactStatus" class="m-2"  placeholder="---请选择---" >
            <el-option 
            v-for="item in contactStatusList"
            :key="item.contactStatusId"
            :label="item.contactStatusName"
            :value="item.contactStatusId"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>需求部门:</span>
          <el-select v-model="formDataTab2.deptName" class="m-2" placeholder="---请选择---" size="mini">
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
          <el-select v-model="formDataTab2.itvJob" class="m-2" placeholder="---请选择---" size="mini">
              <el-option 
                  v-for="item in itvJobList"
                  :key="item.itvJobId"
                  :label="item.itvJobName"
                  :value="item.itvJobId"
                  ></el-option>
            </el-select>
        </div>
        <div class="item">
          <span>计划面试时间:</span>
          <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formDataTab2.itvDate" type="date" placeholder="请选择" :size="size"/>
        </div>
        <div class="item">
          <span>面试官:</span>
          <el-input v-model="formDataTab2.itver" placeholder="请输入面试官" />
        </div>
        <div class="item">
          <span></span>
          <el-button type="success" @click="editFormTab2"><el-icon><Select /></el-icon>&nbsp;更新候选人信息</el-button>
        </div>
    </el-drawer>

    <!--Tab3抽屉部分-面试测评-->
    <el-drawer v-model="openDrawerTab3" :title="更新候选人信息"
        direction="rtl"
        :before-close="drawerCloseTab3"
      >
        <div class="item">
          <span>面试时间:</span>
          <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formDataTab3.itvDate" type="date" placeholder="请选择" :size="size"/>
        </div>
        <div class="item">
          <span>面试部门:</span>
          <el-select v-model="formDataTab3.deptName" class="m-2" placeholder="---请选择---" size="mini">
              <el-option 
                  v-for="item in deptList"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                  ></el-option>
            </el-select>
        </div>
        <div class="item">
          <span>面试岗位:</span>
          <el-select v-model="formDataTab3.itvJob" class="m-2" placeholder="---请选择---" size="mini">
              <el-option 
                  v-for="item in itvJobList"
                  :key="item.itvJobId"
                  :label="item.itvJobName"
                  :value="item.itvJobId"
                  ></el-option>
            </el-select>
        </div>
       
        <div class="item">
          <span>经验:</span>
          <el-input v-model="formDataTab3.expLevel" placeholder="请输入经验" />
        </div>
        <div class="item">
          <span>联系电话:</span>
          <el-input v-model="formDataTab3.tel" placeholder="请输入联系电话" />
        </div>
        <div class="item">
          <span>职业状态:</span>
          <el-select v-model="formDataTab3.workStatus" class="m-2"  placeholder="---请选择---" >
            <el-option 
            v-for="item in workStatusList"
            :key="item.workStatusId"
            :label="item.workStatusName"
            :value="item.workStatusId"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
          <span>到岗时间:</span>
          <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formDataTab3.arrivalDate" type="date" placeholder="请选择" :size="size"/>
        </div>
        <div class="item">
          <span>薪资:</span>
          <el-input v-model="formDataTab3.hopeSalary" placeholder="请输入联系电话" />
        </div>
        <div class="item">
          <span>面试情况:</span>
          <el-select v-model="formDataTab3.itvStatus" class="m-2"  placeholder="---请选择---" >
            <el-option 
            v-for="item in itvStatusList"
            :key="item.itvStatusId"
            :label="item.itvStatusName"
            :value="item.itvStatusId"
            ></el-option>
          </el-select>
        </div>
        <div class="item">
            <span>初面记录:</span>
            <el-input v-model="formDataTab3.itvRemark" :rows="3" type="textarea" placeholder="请输入初面记录"/>
          </div>
       
        <div class="item">
          <span>面试官:</span>
          <el-input v-model="formDataTab3.itver" placeholder="请输入面试官" />
        </div>
        <div class="item">
          <span></span>
          <el-button type="success" @click="editFormTab3"><el-icon><Select /></el-icon>&nbsp;更新面试测评信息</el-button>
        </div>
    </el-drawer>


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

     <!-- 需求编号选择对话框 -->
     <el-dialog v-model="dialogVisible"
      title="请选择岗位需求计划"
      width="45%" draggable
      :before-close="handleClose">
        <el-row :gutter="24">
          <el-col :span="6"><div class="grid-content ep-bg-purple" />
            <el-select v-model="choseData.year" class="m-2"  placeholder="---请选择---" size="mini">
              <el-option 
                  v-for="item in yearList"
                  :key="item.yearId"
                  :label="item.yearName"
                  :value="item.yearId"
                  ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" />
            <el-select v-model="choseData.deptName" class="m-2" placeholder="---请选择需求部门---" size="mini" clearable>
              <el-option 
                  v-for="item in deptList"
                  :key="item.deptId"
                  :label="item.deptName"
                  :value="item.deptId"
                  ></el-option>
              </el-select>
          </el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" />
            <el-select v-model="choseData.itvJob" class="m-2" placeholder="---请选择需求岗位---" size="mini" clearable>
              <el-option 
                  v-for="item in itvJobList"
                  :key="item.itvJobId"
                  :label="item.itvJobName"
                  :value="item.itvJobId"
                  ></el-option>
              </el-select>
          </el-col>
          <el-col :span="6"><div class="grid-content ep-bg-purple" />
            <el-tooltip content="查询" placement="top" effect="light">
              <el-button type="primary" @click="searchHr01" round ><el-icon><Search /></el-icon></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-table v-loading="loading" :data="hr01Data" 
            highlight-current-row stripe border style="width: 100%" @current-change="hr01Chage" >
              <!-- <el-table-column type="selection" width="40" /> -->
              <el-table-column fixed prop="reqNo" label="岗位需求编号"  width="120" />
              <el-table-column fixed prop="year" label="年份" width="60"/>
               
              <el-table-column  show-overflow-tooltip label="需求部门" width="200" >
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
        </el-table>
         <!-- 岗位需求信息分页区 -->
         <div class="pagination">
            <el-pagination background layout="total,total,prev, pager, next" :pager-count="11" :page-size="pageSizeHr01" :total="totalNumHr01" />
        </div>
    </el-dialog> 
  </div>
</template>

<script>
//导入组合式API
import {reactive,toRefs} from 'vue'
//导入访问后台API
import {listJobs} from '../../../api/sdhr01'
import {listPerson,addForm,updateForm,
  deleteForm,getAllFiles,importFiles,downloadFile,importFiles2,removeFile,deleteForm2} from '../../../api/sdhr02'
import {addToCloud} from '../../../api/sdhr03'
import {itemList} from '../../../api/itemApi'
import { Base64 } from 'js-base64';
//导入封装的消息弹窗
//import {$msg_success,$msg_warning, $msg_error} from '../utils/msg'

export default {
    name:'Sdhr02',
    setup(){
        let allData = reactive({
            tableData:[],
            tableData2:[],
            tableData3:[],
            isAdd:true,
            disabled:false,
            //分页相关：
            //tab1
            pageSizeTab1:10,
            totalNumTab1:0,
            pageNumTab1:1,

            //tab2
            pageSizeTab2:10,
            totalNumTab2:0,
            pageNumTab2:1,

            //tab3
            pageSizeTab3:10,
            totalNumTab3:0,
            pageNumTab3:1,


            //添加、修改Tab1邀约记录的表单内容
            formData:{
                reqNo:'',
                memberName:'',
                tel:'',
                contactStatus:'',
                contactMember:'',
                contactDate:'',
                itvRemark:''
            },
            //Tab2更新表单内容
            formDataTab2:{
              reqNo:'',
              memberName:'',
              tel:'',
              contactStatus:'',
              deptName:'',
              itvJob:'',
              itvDate:'',
              itver:''
            },
            //tab3更新表单内容
            formDataTab3:{
              itvDate:'',
              memberName:'',
              deptName:'',
              itvJob:'',
              expLevel:'',
              workStatus:'',
              arrivalDate:'',
              hopeSalary:'',
              itvStatus:'',
              itvRemark:'',
              itver:''
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

            //选择岗位需求编号弹窗的查询条件
            choseData:{
              year:'',
              deptName:'',
              itvJob:'',
            },
            hr01Data:[],
            pageSizeHr01:10,
            totalNumHr01:0,
            //下拉框值
            yearList:[{yearId:'',yearName:'请选择年份'}],
            deptId:'',
            deptList:[{deptId:'',deptName:'请选择需求部门'}],
            itvJobId:'',
            itvJobList:[{itvJobId:'',itvJobName:'请选择岗位信息'}],
            deptList2:[{deptId:'',deptName:'请选择需求部门'}],
            itvJobList2:[{itvJobId:'',itvJobName:'请选择岗位信息'}],
            channelId:'',
            channelList:[{channelId:'',channelName:'请选择渠道'}],
            archiveStatusBfrId:'',
            archiveStatusBfrList:[{archiveStatusBfrId:'',archiveStatusBfrName:'请选择归档前状态'}],
            educationBckrId:'',
            educationBckrList:[{educationBckrId:'',educationBckrName:'请选择学历'}],
            workStatusId:'',
            workStatusList:[{workStatusId:'',workStatusName:'请选择职业状态'}],
            itvStatusId:'',
            itvStatusList:[{itvStatusId:'',itvStatusName:'请选择面试情况'}],
            //是否打开抽屉
            openDrawer1:false,
            openDrawer2:false,
            openDrawerTab2:false,
            openDrawerTab3:false,          
            dialogVisible:false,
            reqNoValue1:'',
            memberNameValue1:'',
            contactStatusValue1:'',
            memberNameValue2:'',
            endRecCreateTime:'',
            startRecCreateTime:'',
            //tab3查询区域内容
            memberNameValue3:'',
            deptId2:'',
            itvJobId2:'',
            itvDate:'',
            loading:true,
            //查询区域筛选框
            contactStatusList:[{contactStatusId:'',contactStatusName:'请选择联系状态'}],
            contactStatusId:'',
            fileList:[],
            drawer:false,
            drawerFile:true,
            drawer2:false,
        })

        //查询区域下拉框方法
        let loadContactStatusList = async()=>{
          let prams={
            codeNo:'sdHr_contactStatus'
          }
          
          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.contactStatusList.push({contactStatusId:r[i].codeEname,contactStatusName:r[i].codeCname})
            }
          }
          
        }
        loadContactStatusList()
        
        //年份下拉框
        let loadYearList = async()=>{
          let prams={
            codeNo:'sdhr_year'
          }
          
          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.yearList.push({yearId:r[i].codeEname,yearName:r[i].codeCname})
            }
          }
        }
        

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
        //职业状态下拉框
        let loadWorkStatusList = async()=>{
          let prams={
            codeNo:'sdHr_workStatus'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.workStatusList.push({workStatusId:r[i].codeEname,workStatusName:r[i].codeCname})
            }
          }
        }
        loadWorkStatusList()
        //面试情况下拉框
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


        //格式化日期展示
      let dateFormat2= (date) =>{
        if(date==" " || date==""){
          return "";
        }
        let year=date.substr(0, 4);
        let month= date.substr(4, 2);
        let day=date.substr(6, 2);      
        // 拼接
        return year+"-"+month+"-"+day;
      }

      //加载tab1页表格数据
      let loadTable = async()=>{
        let r = await listPerson();
        allData.tableData = r.data.data;
        allData.totalNumTab1 = r.data.totalNum;
        allData.tableData.forEach((item) => {
          item.recCreateTime = dateFormat2(item.recCreateTime);     
          item.contactDate = dateFormat2(item.contactDate);
        }); 

        setTimeout(() => {
          allData.loading= false
        }, 500);
      }
      //加载tab2页表格数据
      let loadTable2 = async()=>{
        let prams = {
            contactStatus:'20,30,40',
        }
        let r = await listPerson(prams);
        allData.tableData2 = r.data.data;
        allData.totalNumTab2 = r.data.totalNum;

        allData.tableData2.forEach((item) => {
          item.itvDate = dateFormat2(item.itvDate); 
        }); 

      }

      //加载tab3页表格数据
      let loadTable3 = async()=>{
        let prams = {
            contactStatus:'20,30,40,50'
        }
        let r = await listPerson(prams);
        allData.tableData3 = r.data.data;
        allData.totalNumTab3 = r.data.totalNum;
        allData.tableData3.forEach((item) => {
          item.itvDate = dateFormat2(item.itvDate); 
          item.arrivalDate = dateFormat2(item.arrivalDate); 
        }); 
      }
      loadTable()

      loadTable2()

      loadTable3()

      
      //Tab1电话邀约查询方法
      let searchTable1= async()=>{
        let prams = {
          reqNo:allData.reqNoValue1,
          memberName:allData.memberNameValue1,
          contactStatus:allData.contactStatusId,
          startRecCreateTime:allData.startRecCreateTime,
          endRecCreateTime:allData.endRecCreateTime
        };
        
        let r = await listPerson(prams);
        allData.tableData = r.data.data;
        allData.totalNumTab1 = r.data.totalNum;
        allData.tableData.forEach((item) => {
          item.recCreateTime = dateFormat2(item.recCreateTime);     
          item.contactDate = dateFormat2(item.contactDate);
        }); 
      }
      //Tab1电话邀约新增/修改方法
      let editFormTab1 = async()=>{
        let r =false;
        //判断是添加还是修改
        if(allData.isAdd){
          r=await addForm(allData.formData)
        }else{
          r=await updateForm(allData.formData)
        }
        if(r){
          loadTable();
          loadTable2();
          loadTable3();
          allData.loading=true
          setTimeout(() => {
                allData.loading= false
            }, 500);
        }
      }

       //Tab1电话邀约删除方法
       let handleDeleteTab1=async(row)=>{ 
        let  prams={
          planNo:row.planNo
        }
        await deleteForm(prams)
        setTimeout(() => {
          loadTable();
        }, 2000);
      }

      //Tab2候选人查询方法
      let searchTable2= async()=>{
        let prams = {
          memberName:allData.memberNameValue2,
          deptName:allData.deptId,
          itvJob:allData.itvJobId,
          contactStatus:'20,30,40'
        };
        
        let r = await listPerson(prams);
        allData.tableData2 = r.data.data;
        allData.totalNumTab2 = r.data.totalNum;
        allData.tableData.forEach((item) => {
          item.itvDate = dateFormat2(item.itvDate); 
        }); 
      }

      //Tab2新增/修改方法
      let editFormTab2 = async()=>{
        let r =await updateForm(allData.formDataTab2)
        if(r){
          loadTable();
          loadTable2();
          loadTable3();
          allData.loading=true
          setTimeout(() => {
                allData.loading= false
            }, 500);
        }
      }

      //tab3查询方法
      let searchTable3= async()=>{
        let itvDateStr
       if(allData.itvDate!=null){
        itvDateStr= allData.itvDate[0]+','+allData.itvDate[1]
       }
        
        let prams = {
          memberName:allData.memberNameValue3,
          deptName:allData.deptId2,
          itvJob:allData.itvJobId2,
          contactStatus:'20,30,40,50',
          itvDate:itvDateStr,
          workStatus:allData.workStatusId,
          itvStatus:allData.itvStatusId
        };
        
        let r = await listPerson(prams);
        allData.tableData3 = r.data.data;
        allData.totalNumTab3 = r.data.totalNum;
        allData.tableData.forEach((item) => {
          item.itvDate = dateFormat2(item.itvDate); 
          item.arrivalDate = dateFormat2(item.arrivalDate); 
        }); 
      }

      //tab3修改
      let editFormTab3 = async()=>{
        let r =await updateForm(allData.formDataTab3)
        if(r){
          loadTable();
          loadTable2();
          loadTable3();
          allData.loading=true
          setTimeout(() => {
                allData.loading= false

            }, 500);
          allData.openDrawerTab3=false
        }
      }

      //  //Tab2删除方法,无需删除，修改状态即可
      //  let handleDeleteTab2=async(row)=>{ 
      //   let  prams={
      //     planNo:row.planNo
      //   }
      //   await deleteForm(prams)
      //   setTimeout(() => {
      //     loadTable();
      //   }, 2000);
      // }
      

      //修改Tab1表单数据
      let handleEdit =(row)=>{
        //赋值
        allData.formData={...row}
        allData.isAdd=false
        //打开抽屉
        allData.disabled=true
        allData.openDrawer1=true;
      }

      //修改Tba2表单数据
      let handleEditTab2 =(row)=>{
        //赋值
        allData.formDataTab2={...row}
        //打开抽屉
        allData.openDrawerTab2=true;
      }

      //修改Tba3表单数据
      let handleEditTab3 =(row)=>{
        //赋值
        allData.formDataTab3={...row}
        //打开抽屉
        allData.openDrawerTab3=true;
      }

      //添加到人员库，打开人员库抽屉，完善信息后添加
      let addCloud = async(row) =>{
        loadChannelList()
        loadArchiveStatusBfrList()
        loadEducationBckrList()
        allData.formData2={...row}
        
        allData.openDrawer2=true;
      }
      let querySdhr02 = async()=>{
        // loadTable()
      }

      let searchTable = async ()=>{
        let row = window.getSelection()
        console.log(row)
      }
     
      //人员库抽屉的添加方法
      let addFormToCloud = async()=>{
        let r =await addToCloud(allData.formData2)
        if(r){
          // loadTable2();
          allData.openDrawer2=false
        }
      }

      let uploadClik = async (row) =>{
        allData.drawer=true
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
        formData.append('planNo', 'sdhr02');
        formData.append('businessKeyword', 'sdhr02');
        await importFiles(formData);
        searchTable1();
        searchTable2();
        searchTable3();
      }

       //导出人员模版
      let downloadPersonFile =async()=>{
        let name ="电联记录导入模板.xls";
        let params = {
          fileId:"Tsdhr02Upload",
           businessKeyword:'sdhr02'
         };
         let url = "file/downloadFile";

         await downloadFile(url,params,name)
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
       let updateFilePlanNo =async(row,flag)=>{
        //赋值
        allData.filePlanNo = row.planNo;
        allData.drawer=true;
        //判断是查询还是上传
        flag?allData.drawerFile=true:allData.drawerFile=false;
       
        let prams = {
          businessNo:allData.filePlanNo,
          businessKeyword:"sdhr02"
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
        formData.append('businessNo', allData.filePlanNo);
        formData.append('businessKeyword', 'sdhr02');   
        
        console.log(formData);
        await importFiles2(formData);

  
          //更新附件
        let prams = {
          businessNo:allData.filePlanNo,
          businessKeyword:"sdhr02"
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
      console.log(file);
        let name =file.name;
        let params = {
          fileId:file.id,
           businessKeyword:'sdhr02'
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
       let exportTable = async(table) => {
        //区分不同页面的导出
          if(table=="1"){
              let name ="电话邀约信息导出.xlsx";
              let params = {
                reqNo:allData.reqNoValue1,
                memberName:allData.memberNameValue1,
                contactStatus:allData.contactStatusId,
                startRecCreateTime:allData.startRecCreateTime,
                endRecCreateTime:allData.endRecCreateTime
              };
              let url = "Sdhr02/export";
              await downloadFile(url,params,name)
          }else if (table=="2"){
              let name ="候选人信息导出.xlsx";
              let params = {
                deptName:allData.deptId,
                itvJob:allData.itvJobId,
                contactStatus:'20,30,40,50'
              };
              let url = "Sdhr02/export";
              await downloadFile(url,params,name)
          
          }else if (table=="3"){
              let name ="电话测评信息导出.xlsx";
              let params = {
                deptName:allData.deptId2,
                itvJob:allData.itvJobId2,
                contactStatus:'20,30,40,50'
              };
              let url = "Sdhr02/export";
              await downloadFile(url,params,name)
          
          }
      }
      
       //保存选中行数据
     let handleSelectionChange = async(rows) => {
        allData.handleSelectionChange=rows;
       
      }

       //删除数据 减选中数据的ID拼接转入到后台
       let deleteTable = async() => {
        let planNos = "";
        allData.handleSelectionChange.forEach((item) => {  
          planNos  += item.planNo+",";
        }); 
        planNos =planNos.substring(0,planNos.length-1);
        let prams = {
          planNo:planNos
        };
        await deleteForm2(prams);
        setTimeout(() => {
          searchTable1();
        }, 2000);
      }

       //关闭Tab1表单事件
       let drawerClose = ()=>{
        allData.openDrawer1=false
        allData.isAdd=true
        allData.disabled=false
        //清空表单
        allData.formData={
            memberName:'',
            tel:'',
            contactStatus:'',
            contactMember:'',
            contactDate:'',
            itvRemark:''
        }
      }

      //关闭Tab2表单事件
      let drawerCloseTab2 = ()=>{
        allData.openDrawerTab2=false
        //清空表单
        allData.formDataTab2={
          reqNo:'',
          memberName:'',
          tel:'',
          contactStatus:'',
          deptName:'',
          itvJob:'',
          itvDate:'',
          itver:''
        }
      }

      //关闭Tab3表单事件
      let drawerCloseTab3 = ()=>{
        allData.openDrawerTab3=false
        //清空表单
        allData.formDataTab3={
          itvDate:'',
          memberName:'',
          deptName:'',
          itvJob:'',
          expLevel:'',
          workStatus:'',
          arrivalDate:'',
          hopeSalary:'',
          itvStatus:'',
          itvRemark:'',
          itver:''
        }
      }

      
      //关闭表单事件
      let drawerClose2 = ()=>{
        allData.openDrawer2=false
        //清空表单
        allData.formData2={
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
        }
      }

      //点击新增人员中的岗位需求编号
      let clickReqNo=()=>{
        if(allData.isAdd){
          allData.dialogVisible=true
          loadYearList()
          loadDeptList()
          loadItvJobList()
        }
      }

      let searchHr01=async()=>{
        let prams = {
          year:allData.choseData.year,
          deptName:allData.choseData.deptName,
          itvJob:allData.choseData.itvJob,
          queryHis:'0'
        };
        
        let r = await listJobs(prams)
        allData.hr01Data = r.data.data
        allData.totalNumHr01 = r.data.totalNum
      }

      //选择岗位需求编号后回调
      let hr01Chage=(row)=>{
        allData.formData.reqNo=row.reqNo
       
        allData.dialogVisible=false
      }

      //Tab1分页切换
      let handleCurrentChangeTab1=async(val)=>{

        let prams = {
          reqNo:allData.reqNoValue1,
          memberName:allData.memberNameValue1,
          contactStatus:allData.contactStatusId,
          pageNum:val,
          startRecCreateTime:allData.startRecCreateTime,
          endRecCreateTime:allData.endRecCreateTime,
        };
        
        let r = await listPerson(prams);
        allData.tableData = r.data.data;
        allData.totalNumTab1 = r.data.totalNum;
        allData.tableData.forEach((item) => {
          item.recCreateTime = dateFormat2(item.recCreateTime);     
          item.contactDate = dateFormat2(item.contactDate);
        }); 

      }

      //Tab2分页切换
      let handleCurrentChangeTab2=async(val)=>{

        let prams = {
          memberName:allData.memberNameValue2,
          contactStatus:'20,30,40',
          pageNum:val,
        };

        let r = await listPerson(prams);
        allData.tableData2 = r.data.data;
        allData.totalNumTab2 = r.data.totalNum;
        allData.tableData2.forEach((item) => {
          item.itvDate = dateFormat2(item.itvDate); 
        }); 

        }

      //Tab3分页切换
      let handleCurrentChangeTab3=async(val)=>{
        let prams = {
          memberName:allData.memberNameValue2,
          contactStatus:'20,30,40,50',
          pageNum:val,
        };

        let r = await listPerson(prams);
        allData.tableData3 = r.data.data;
        allData.totalNumTab3 = r.data.totalNum;
        allData.tableData3.forEach((item) => {
          item.itvDate = dateFormat2(item.itvDate); 
          item.arrivalDate = dateFormat2(item.arrivalDate); 
        }); 

        }

      return {
        ...toRefs(allData),
        loadTable,
        querySdhr02,
        loadTable2,
        handleEdit,
        searchTable,
        addCloud,
        addFormToCloud,
        drawerClose2,
        drawerClose,
        uploadClik,
        searchTable1,
        searchTable2,
        searchTable3,
        searchHr01,
        loadContactStatusList,
        clickReqNo,
        hr01Chage,
        handleCurrentChangeTab1,
        handleCurrentChangeTab2,
        editFormTab1,
        handleDeleteTab1,
        editFormTab2,
        handleEditTab2,
        drawerCloseTab2,
        loadArchiveStatusBfrList,
        loadEducationBckrList,
        handleCurrentChangeTab3,
        loadWorkStatusList,
        loadItvStatusList,
        drawerCloseTab3,
        handleEditTab3,
        editFormTab3,       
        fileRequest,
        updateFilePlanNo,
        filePreview,
        fileRemove,
        exportTable,
        downloadPersonFile,
        importPersonFile,
        handlePreview,
        deleteTable,handleSelectionChange
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
 


    .card-title{
  font-weight: 800;
  color: #323333;
}
.medical-title{
  width: 80%;
  display: flex;
  justify-content: space-between;
}
  
  .upload-demo{
    margin-top: -1%;
   
   }


  // upload_box {
  //           margin-top: 0.1389rem;
 
  //           /deep/ .el-upload-list--picture-card .el-upload-list__item-actions {
  //             width: 0.6944rem;
  //             height: 0.6944rem;
  //             // position: fixed;
  //             z-index: 999999;
  //           }
  //           /deep/ .el-upload {
  //             position: relative;
  //             border-radius: 0.0208rem;
  //             width: 0.6944rem;
  //             height: 0.6944rem;
  //             background-size: 100% 100%;
  //           }
 
  //           /deep/ .el-upload-list__item {
  //             border-radius: 0.0208rem;
  //             width: 0.6944rem;
  //             height: 0.6944rem;
  //             background-size: 100% 100%;
  //             /deep/ .el-upload-list__item-thumbnail {
  //               border-radius: 0.0208rem;
  //               width: 0.6944rem;
  //               height: 0.6944rem;
  //               background-size: 100% 100%;
  //             }
  //           }
  //           /deep/ .el-upload--picture-card {
  //             // margin: 0 auto;
  //             // display: block;
  //             // border: 1px solid red;
  //             // display: flex;
  //             // align-content: center;
  //             // align-items: center;
  //             text-align: center;
  //             position: relative;
  //             .el-icon-plus {
  //               position: absolute;
  //               top: 50%;
  //               left: 50%;
  //               transform: translate(-50%, -50%);
  //             }
  //           }
  //         }


</style>