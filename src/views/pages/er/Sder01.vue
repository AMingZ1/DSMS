<template>
  <div class="contents">
    <!-- 员工信息展示区 -->
    <el-tabs type="border-card">
    
            <div class="center">
                <!--点击打开新增抽屉-->
                <el-button type="warning" round class="addDrawer" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;添加人员</el-button>
                <!--点击导入抽屉-->
                <el-button type="success" round class="uploadDrawer" @click="drawer=true"><el-icon><Upload /></el-icon>&nbsp;导入人员</el-button>
                <el-row :gutter="24">
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                        <el-input v-model="memberNameValue" placeholder="请输入人员姓名" clearable/>
                    </el-col>
                    
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                        
                         <!-- 查询条件-人员当前状态 -->
                         <el-select v-model="isFormal" @change="searchTable" class="m-2" size="mini">
                            <el-option
                            v-for="item in isFormalList"
                            :key="item.isFormalId"
                            :label="item.isFormalName"
                            :value="item.isFormalId"
                            ></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6"><div class="grid-content ep-bg-purple" />
                        
                        <el-date-picker
                            v-model="birthDate"
                            format="MM月"
                            value-format="MM"
                            type="month"
                            placeholder="请选择生日月份"
                            />
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="6">
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
                    <el-col :span="6">
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
                    <el-col :span="6">

                    </el-col>
                    <el-col :span="6">
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
                <el-table-column fixed prop="contractNo" label="合同编号" width="110" />
                <el-table-column prop="memberId" label="员工编码" width="100" v-if="show" />
                <el-table-column fixed prop="memberName" label="员工姓名" width="100"  >
                    <template #default="scope" >
                        <el-link type="success" @click="queryMemberP(scope.row)" >{{scope.row.memberName}}</el-link>
                    </template>
                </el-table-column>
                
                <el-table-column  fixed show-overflow-tooltip label="部门" width="160" >
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
                <el-table-column  fixed show-overflow-tooltip label="岗位" width="150" >
                    <template #default="scope">
                        <el-select v-model="scope.row.jobs"   @change="searchTable"
                            class="m-2"  size="mini">
                            <el-option v-for="item in itvJobList2"
                            :key="item.itvJobId"
                            :label="item.itvJobName"
                            :value="item.itvJobId"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  label="员工状态" width="100">
                    <template #default="scope">
                    <el-tag size="mini" v-if="scope.row.isFormal=='0'" type="warning" >试用</el-tag>
                    <el-tag size="mini" v-if="scope.row.isFormal=='1'" type="success" >正式</el-tag>
                    <el-tag size="mini" v-if="scope.row.isFormal=='2'" type="danger" >离职</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="email" show-overflow-tooltip label="电子邮箱"  width="200" />
                <el-table-column prop="tel" show-overflow-tooltip label="手机号码"  width="120" />
                <el-table-column  label="性别" width="100">           
                    <template #default="scope">
                        <el-select v-model="scope.row.sex"   @change="searchTable"
                            class="m-2"  size="mini">
                            <el-option v-for="item in sexList2"
                            :key="item.sexId"
                            :label="item.sexName"
                            :value="item.sexId"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="secLocation" show-overflow-tooltip label="社保所在地" width="150" />
                <el-table-column prop="secInf" show-overflow-tooltip label="社保信息" width="200"  />
                <el-table-column prop="localInf" show-overflow-tooltip label="属地化"  width="200" />
                <el-table-column prop="national" show-overflow-tooltip label="民族"  width="90" />
                <el-table-column  label="政治面貌" width="100">             
                    <template #default="scope">
                        <el-select v-model="scope.row.politStatus"   @change="searchTable"
                            class="m-2"  size="mini">
                            <el-option v-for="item in politStatusList2"
                            :key="item.politStatusId"
                            :label="item.politStatusName"
                            :value="item.politStatusId"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column prop="natPlace" show-overflow-tooltip label="籍贯"  width="100" />
                <el-table-column prop="idCard" show-overflow-tooltip label="身份证号"  width="200" />
                <el-table-column prop="birthDate" show-overflow-tooltip label="出生年月"  width="100" />
                <el-table-column prop="age" label="年龄"  width="100" />
                <el-table-column prop="hxCardId" show-overflow-tooltip label="华夏工资卡号"  width="120" />
                <el-table-column prop="gsCardId" show-overflow-tooltip label="工商银行卡号"  width="120" />
                <el-table-column  label="血型" width="100">
                    <template #default="scope">
                        <el-select v-model="scope.row.bloodType"   @change="searchTable"
                            class="m-2"  size="mini">
                            <el-option v-for="item in bloodTypeList2"
                            :key="item.bloodTypeId"
                            :label="item.bloodTypeName"
                            :value="item.bloodTypeId"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column  label="婚姻状况" width="100">            
                    <template #default="scope">
                        <el-select v-model="scope.row.marryStatus"   @change="searchTable"
                            class="m-2"  size="mini">
                            <el-option v-for="item in marryStatusList2"
                            :key="item.marryStatusId"
                            :label="item.marryStatusName"
                            :value="item.marryStatusId"
                            ></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column show-overflow-tooltip label="最高学历" width="100">
                    <template #default="scope">
                        <el-select v-model="scope.row.higEdu"   @change="searchTable"
                            class="m-2"  size="mini">
                            <el-option v-for="item in higEduList2"
                            :key="item.higEduId"
                            :label="item.higEduName"
                            :value="item.higEduId"
                            ></el-option>
                        </el-select>
                    </template>          
                </el-table-column>
                <el-table-column prop="universityName" show-overflow-tooltip label="毕业学校"  width="120" />
                <el-table-column prop="graDate" show-overflow-tooltip label="毕业时间"  width="100" />
                <el-table-column prop="profession" show-overflow-tooltip label="所学专业"  width="100" />
                <el-table-column show-overflow-tooltip label="最高学位" width="100">
                    <template #default="scope">
                        <el-select v-model="scope.row.higDegree"   @change="searchTable"
                            class="m-2"  size="mini">
                            <el-option v-for="item in higDegreeList2"
                            :key="item.higDegreeId"
                            :label="item.higDegreeName"
                            :value="item.higDegreeId"
                            ></el-option>
                        </el-select>
                    </template> 
                </el-table-column>            
                <el-table-column prop="emeContact" show-overflow-tooltip label="紧急联系人"  width="100" />
                <el-table-column prop="emeRel" show-overflow-tooltip label="与紧急联系人关系"  width="140" />
                <el-table-column prop="emeTel" show-overflow-tooltip label="紧急联系人电话"  width="140" />
                <el-table-column prop="thrAddress" show-overflow-tooltip label="户籍地址"  width="120" />
                <el-table-column prop="resAddress" show-overflow-tooltip  label="居住地址"  width="120" />
                <el-table-column prop="empDate" show-overflow-tooltip  label="入司时间"  width="100" />
                <el-table-column prop="indYear" show-overflow-tooltip label="司龄"  width="80" />
                <el-table-column prop="signDate" show-overflow-tooltip  label="合同签订时间"  width="120" />
                <el-table-column prop="endDate" show-overflow-tooltip label="合同结束时间"  width="120" />
                <el-table-column prop="endDateNew" show-overflow-tooltip label="最新结束时间"  width="120" />
                <el-table-column show-overflow-tooltip label="合同到期提醒" width="120">
                    <template #default="scope">
                    <el-tag size="mini" v-if="scope.row.isRemindC=='Y'"  >是</el-tag>
                    <el-tag size="mini" v-if="scope.row.isRemindC=='N'"  >否</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="probStartDate" show-overflow-tooltip  label="试用期开始时间"  width="130" />
                <el-table-column prop="probEndDate" show-overflow-tooltip  label="试用期结束时间"  width="130" />
                <el-table-column show-overflow-tooltip label="试用期到期提醒" width="130">
                    <template #default="scope">
                    <el-tag size="mini" v-if="scope.row.isRemindP=='Y'"  >是</el-tag>
                    <el-tag size="mini" v-if="scope.row.isRemindP=='N'"  >否</el-tag>
                    </template>
                </el-table-column>
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
                <el-pagination background small layout="total, prev, pager, next" :pager-count="11" :page-size="pageSize"   v-model:current-page="pageNum" @current-change="handleCurrentChange" :total="totalNum" />
            </div>
       
    </el-tabs>

    <!-- 项目信息展示区 -->
    <el-tabs type="border-card" >
        <el-tab-pane label="人员项目信息">
            <div class="center">
                <!--点击打开新增/修改项目信息抽屉-->
                <el-button type="warning" round class="addDrawer" plain @click="clickDrawer2()"><el-icon><Plus /></el-icon></el-button>
            </div>
            <el-input v-model="memberIdShow" v-if="isShowMember"/>
            <el-input v-model="memberNameShow" v-if="isShowMember"/>
            <el-input v-model="deptNameShow" v-if="isShowMember"/>
            <el-table v-loading="loading" :data="tableData2" stripe border style="width: 100%" >
                <el-table-column type="selection" width="40" />
                <el-table-column  fixed show-overflow-tooltip label="部门" width="160" >
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
                <el-table-column prop="memberId" label="员工编码" width="100" v-if="show" />
                <el-table-column fixed prop="memberName" label="员工姓名" width="100" />
                <el-table-column prop="projectName" label="项目名称" width="300" />
                <el-table-column prop="proAddress" label="项目地点" width="200" />
                <el-table-column prop="projectPhase" label="项目阶段" width="200" />
                <el-table-column prop="resMod" label="负责模块" width="120" />
                <el-table-column prop="useTec" label="使用技术" width="200" />
                <el-table-column label="项目经理信息">
                    <el-table-column prop="pmName" label="项目经理" width="100" />
                    <el-table-column prop="pmTel" label="项目经理电话" width="120" />
                    <el-table-column prop="pmEmail" label="项目经理邮箱" width="180" />
                </el-table-column>
                
                <el-table-column fixed="right" label="操作" width="140">
                <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit2(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="handleDelete2(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
            
            <div class="pagination">
                <el-pagination background small layout="total,prev, pager, next" :page-size="pageSize2" :total="totalNum2" />
            </div>
        </el-tab-pane>
    </el-tabs>

    <!-- 添加/修改人员信息抽屉 -->
    <el-drawer v-model="openDrawer" :title="isAdd?'添加人员信息':'修改人员信息'"
        direction="rtl"
        :before-close="drawerClose"
    >
        <div class="item">
            <span>合同编号&nbsp;:</span>
            <el-input v-model="formData.contractNo" placeholder="请输入合同编号" />
        </div>
        <div class="item">
            <span>员工编码&nbsp;:</span>
            <el-input v-model="formData.memberId" disabled placeholder="请输入员工姓名" />
        </div>
        <div class="item">
            <span>员工姓名&nbsp;:</span>
            <el-input v-model="formData.memberName" placeholder="请输入员工姓名" />
        </div>
        <div class="item">
            <span>性别&nbsp;:</span>
            <el-select v-model="formData.sex" class="m-2"  placeholder="---请选择性别---" size="mini" clearable>
                <el-option 
                v-for="item in sexList"
                :key="item.sexId"
                :label="item.sexName"
                :value="item.sexId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
        <span>部门名称&nbsp;:</span>
            <el-select v-model="formData.dept" class="m-2" placeholder="---请选择部门信息---" size="mini">
                <el-option 
                v-for="item in deptList"
                :key="item.deptId"
                :label="item.deptName"
                :value="item.deptId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>岗位名称&nbsp;:</span>
            <el-select v-model="formData.jobs" class="m-2" placeholder="---请选择岗位信息---" size="mini">
                <el-option 
                v-for="item in jobsList"
                :key="item.jobsId"
                :label="item.jobsName"
                :value="item.jobsId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>员工状态&nbsp;:</span>
            <el-select v-model="formData.isFormal" class="m-2"  placeholder="---请选择员工状态---" size="mini" clearable>
                <el-option 
                v-for="item in isFormalList"
                :key="item.isFormalId"
                :label="item.isFormalName"
                :value="item.isFormalId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>社保所在地&nbsp;:</span>
            <el-input v-model="formData.secLocation" placeholder="请输入社保所在地" />
        </div>
        <div class="item">
            <span>社保信息&nbsp;:</span>
            <el-input v-model="formData.secInf" placeholder="请输入社保信息" />
        </div>
        <div class="item">
            <span>属地化&nbsp;:</span>
            <el-input v-model="formData.localInf" placeholder="请输入属地化信息" />
        </div>
        <div class="item">
            <span>民族&nbsp;:</span>
            <el-input v-model="formData.national" placeholder="请输入民族信息" />
        </div>
        <div class="item">
            <span>政治面貌&nbsp;:</span>
            <el-select v-model="formData.politStatus" class="m-2"  placeholder="---请选择政治面貌---" size="mini" clearable>
                <el-option 
                v-for="item in politStatusList"
                :key="item.politStatusId"
                :label="item.politStatusName"
                :value="item.politStatusId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>籍贯&nbsp;:</span>
            <el-input v-model="formData.natPlace" placeholder="请输入籍贯信息" />
        </div>
        <div class="item">
            <span>身份证号&nbsp;:</span>
            <el-input v-model="formData.idCard" placeholder="请输入身份证号" />
        </div>
        <div class="item">
            <span>出生年月&nbsp;:</span>
            <el-date-picker format="YYYYMM" value-format="YYYYMM" v-model="formData.birthDate" type="date" placeholder="请选择出生年月" :size="size" clearable/>
        </div>
        <div class="item">
            <span>年龄&nbsp;:</span>
            <el-input-number v-model="formData.age" :step="2" step-strictly placeholder="请输入年龄" />
        </div>
        <div class="item">
            <span>华夏工资卡号&nbsp;:</span>
            <el-input v-model="formData.hxCardId" placeholder="请输入华夏工资卡号" />
        </div>
        <div class="item">
            <span>工商银行卡号&nbsp;:</span>
            <el-input v-model="formData.gsCardId" placeholder="请输入工商银行卡号" />
        </div>
        <div class="item">
            <span>血型&nbsp;:</span>
            <el-select v-model="formData.bloodType" class="m-2"  placeholder="---请选择血型---" size="mini" clearable>
                <el-option 
                v-for="item in bloodTypeList"
                :key="item.bloodTypeId"
                :label="item.bloodTypeName"
                :value="item.bloodTypeId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>婚姻状况&nbsp;:</span>
            <el-select v-model="formData.marryStatus" class="m-2"  placeholder="---请选择婚姻状况---" size="mini" clearable>
                <el-option 
                v-for="item in marryStatusList"
                :key="item.marryStatusId"
                :label="item.marryStatusName"
                :value="item.marryStatusId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>最高学历&nbsp;:</span>
            <el-select v-model="formData.higEdu" class="m-2"  placeholder="请选择最高学历" >
                <el-option 
                v-for="item in higEduList"
                :key="item.higEduId"
                :label="item.higEduName"
                :value="item.higEduId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>毕业学校&nbsp;&nbsp;:</span>
            <el-input v-model="formData.universityName" placeholder="请输入毕业学校" />
        </div>
        <div class="item">
            <span>所学专业&nbsp;:</span>
            <el-input v-model="formData.profession" placeholder="请输入所学专业" />
        </div>
        <div class="item">
            <span>毕业时间&nbsp;:</span>
            <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.graDate" type="date" placeholder="请选择毕业时间" :size="size" clearable/>
        </div>
        <div class="item">
            <span>最高学位&nbsp;:</span>
            <el-select v-model="formData.higDegree" class="m-2"  placeholder="请选择最高学位" >
                <el-option 
                v-for="item in higDegreeList"
                :key="item.higDegreeId"
                :label="item.higDegreeName"
                :value="item.higDegreeId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>电子邮箱&nbsp;:</span>
            <el-input v-model="formData.email" placeholder="请输入电子邮箱" />
        </div>
        <div class="item">
            <span>手机号码&nbsp;:</span>
            <el-input  show-word-limit maxlength="11" v-model="formData.tel" placeholder="请输入手机号码" />
        </div>
        <div class="item">
            <span>紧急联系人&nbsp;:</span>
            <el-input v-model="formData.emeContact" placeholder="请输入紧急联系人" />
        </div>
        <div class="item">
            <span>关系&nbsp;:</span>
            <el-input v-model="formData.emeRel" placeholder="请输入与紧急联系人关系" />
        </div>
        <div class="item">
            <span>紧急联系人<br>电话&nbsp;:</span>
            <el-input v-model="formData.emeTel" placeholder="请输入紧急联系人电话" />
        </div>
        <div class="item">
            <span>户籍地址&nbsp;:</span>
            <el-input v-model="formData.thrAddress" placeholder="请输入户籍地址" />
        </div>
        <div class="item">
            <span>居住地址&nbsp;:</span>
            <el-input v-model="formData.resAddress" placeholder="请输入居住地址" />
        </div>
        <div class="item">
            <span>入司时间&nbsp;:</span>
            <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.empDate" type="date" placeholder="请选择入司时间" :size="size" clearable/>
        </div>
        <div class="item">
            <span>司龄&nbsp;:</span>
            <el-input v-model="formData.indYear" placeholder="请输入司龄" />
        </div>
        <div class="item">
            <span>合同签订时间&nbsp;:</span>
            <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.signDate" type="date" placeholder="请选择合同签订时间" :size="size" clearable/>
        </div>
        <div class="item">
            <span>合同结束时间&nbsp;:</span>
            <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.endDate" type="date" placeholder="请选择合同结束时间" :size="size" clearable/>
        </div>
        <div class="item">
            <span>最新结束时间&nbsp;:</span>
            <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.endDateNew" type="date" placeholder="请选择最新结束时间" :size="size" clearable/>
        </div>
        <div class="item">
            <span>合同到期提醒&nbsp;:</span>
            <el-select v-model="formData.isRemindC" class="m-2"  placeholder="请选择是否已提醒" >
                <el-option 
                v-for="item in isRemindCList"
                :key="item.isRemindCId"
                :label="item.isRemindCName"
                :value="item.isRemindCId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>试用期&nbsp;&nbsp;<br>开始时间&nbsp;:</span>
            <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.probStartDate" type="date" placeholder="请选择试用期开始时间" :size="size" clearable/>
        </div>
        <div class="item">
            <span>试用期&nbsp;&nbsp;<br>结束时间&nbsp;:</span>
            <el-date-picker format="YYYYMMDD" value-format="YYYYMMDD" v-model="formData.probEndDate" type="date" placeholder="请选择试用期结束时间" :size="size" clearable/>
        </div>
        <div class="item">
            <span>试用期&nbsp;&nbsp;<br>结束提醒&nbsp;:</span>
            <el-select v-model="formData.isRemindP" class="m-2"  placeholder="请选择是否已提醒" >
                <el-option 
                v-for="item in isRemindPList"
                :key="item.isRemindPId"
                :label="item.isRemindPName"
                :value="item.isRemindPId"
                ></el-option>
            </el-select>
        </div>
        <div class="item">
            <span>备注&nbsp;:</span>
            <el-input :rows="3" type="textarea" v-model="formData.remark" placeholder="请输入备注" />
        </div>
        <div class="item">
            <span></span>
            <el-button type="success" @click="editForm"><el-icon><Select /></el-icon>&nbsp;{{isAdd?'添加人员信息':'修改人员信息'}}</el-button>
        </div>
    </el-drawer>

         <!-- 添加/修改项目信息抽屉 -->
         <el-drawer v-model="openDrawer2" :title="isAdd2?'添加人员信息':'修改人员信息'"
            direction="rtl"
            :before-close="drawerClose"
        >
            <div class="item" v-show="false">
                <span>员工编号&nbsp;:</span>
                <el-input v-model="formData2.memberId" placeholder="请输入员工编号"  disabled/>
            </div>
            <div class="item">
                <span>员工姓名&nbsp;:</span>
                <el-input v-model="formData2.memberName" placeholder="请输入员工姓名" disabled />
            </div>
            <div class="item">
            <span>部门名称&nbsp;:</span>
                <el-select v-model="formData2.deptName" class="m-2" placeholder="---请选择部门信息---" size="mini" disabled>
                    <el-option 
                        v-for="item in deptList"
                        :key="item.deptId"
                        :label="item.deptName"
                        :value="item.deptId"
                        ></el-option>
                </el-select>
            </div>

            <div class="item">
                <span>项目名称&nbsp;:</span>
                <el-input v-model="formData2.projectName" placeholder="请输入项目名称" />
            </div>
            <div class="item">
                <span>项目地点&nbsp;:</span>
                <el-input v-model="formData2.proAddress" placeholder="请输入项目地点" />
            </div>
            <div class="item">
                <span>项目阶段&nbsp;:</span>
                <el-input v-model="formData2.projectPhase" placeholder="请输入项目阶段" />
            </div>
            <div class="item">
                <span>负责模块&nbsp;:</span>
                <el-input type="textarea" :rows="1" v-model="formData2.resMod" placeholder="请输入负责模块" />
            </div>
            <div class="item">
                <span>使用技术&nbsp;:</span>
                <el-input type="textarea" :rows="3" v-model="formData2.useTec" placeholder="请输入使用技术" />
            </div>
            <div class="item">
                <span>项目经理&nbsp;:</span>
                <el-input v-model="formData2.pmName" placeholder="请输入项目经理" />
            </div>
            <div class="item">
                <span>项目经理电话&nbsp;:</span>
                <el-input minlength="11" v-model="formData2.pmTel" placeholder="请输入项目经理电话" />
            </div>
            <div class="item">
                <span>项目经理邮箱&nbsp;:</span>
                <el-input v-model="formData2.pmEmail" placeholder="请输入项目经理邮箱" />
            </div>

            <div class="item">
                <span></span>
                <el-button type="success" @click="editForm2"><el-icon><Select /></el-icon>&nbsp;{{isAdd2?'添加项目信息':'修改项目信息'}}</el-button>
            </div>
        </el-drawer>

        <!-- 导入抽屉 -->
        <el-drawer v-model="drawer" size="40%" title="导入人员基本信息"
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
    </div>
</template>

<script>
import {listperson,addForm,updateForm,deleteForm,deleteForm2,addForm2,updateForm2} from '../../../api/sder01'
import {listPersonPro} from '../../../api/sder02'
import {itemList} from '../../../api/itemApi'
import {reactive,toRefs} from 'vue'
import {  $msg_warning } from '@/utils/msg'
export default {
    name:'Sder01',
    setup(){
        let allData = reactive({
            //人员花名册
            tableData:[],
            //人员项目信息
            tableData2:[],

            //下拉框内容
            memberNameValue:'',
            deptNameId:'',
            jobs:'',
            isFormal:'',
            birthDate:'',
            deptId:'',
            deptList:[{deptId:'',deptName:'请选择部门信息'}],
            deptList2:[],
            jobsId:'',
            jobsList:[{jobsId:'',jobsName:'请选择岗位信息'}],
            itvJobList2:[],     
            isFormalId:'',
            isFormalList:[{isFormalId:'',isFormalName:'请选择人员状态'}],
            isFormalList2:[],
            sexId:'',
            sexList:[{sexId:'',sexName:'请选择性别'}],
            sexList2:[],
            politStatusId:'',
            politStatusList:[{politStatusId:'',politStatusName:'请选择政治面貌'}],
            politStatusList2:[],
            isRemindPId:'',
            isRemindPList:[{isRemindPId:'',isRemindPName:'请选择是否已经试用期到期提醒'}],
            isRemindCId:'',
            isRemindCList:[{isRemindCId:'',isRemindCName:'请选择是否已经合同到期提醒'}],
            bloodTypeId:'',
            bloodTypeList:[{bloodTypeId:'',bloodTypeName:'请选择血型'}],
            bloodTypeList2:[],
            higEduId:'',
            higEduList:[{higEduId:'',higEduName:'请选择学历'}],
            higEduList2:[],
            marryStatusId:'',
            marryStatusList:[{marryStatusId:'',marryStatusName:'请选择婚姻状况'}],
            marryStatusList2:[],
            higDegreeId:'',
            higDegreeList:[{higDegreeId:'',higDegreeName:'请选择最高学位'}],
            higDegreeList2:[],
            //人员花名册信息新增、修改
            formData:{
                contractNo:'',
                memberId:'',
                memberName:'',
                sex:'',
                dept:'',
                jobs:'',
                isFormal:'',
                secLocation:'',
                secInf:'',
                localInf:'',
                national:'',
                politStatus:'',
                natPlace:'',
                idCard:'',
                birthDate:'',
                age:'',
                hxCardId:'',
                gsCardId:'',
                bloodType:'',
                marryStatus:'',
                higEdu:'',
                universityName:'',
                graDate:'',
                profession:'',
                higDegree:'',
                email:'',
                tel:'',
                emeContact:'',
                emeRel:'',
                emeTel:'',
                thrAddress:'',
                resAddress:'',
                empDate:'',
                indYear:'',
                signDate:'',
                endDate:'',
                endDateNew:'',
                isRemindC:'',
                probStartDate:'',
                probEndDate:'',
                isRemindP:'',
                remark:''
            },
            //人员项目信息新增、修改
            formData2:{
                deptName:'',
                memberId:'',
                memberName:'',
                projectName:'',
                proAddress:'',
                projectPhase:'',
                resMod:'',
                useTec:'',
                pmName:'',
                pmTel:'',
                pmEmail:''
            },
            //人员花名册信息新增、修改
            openDrawer:false,
            //人员项目信息新增、修改
            openDrawer2:false,
            drawer:false,
            
            isAdd:true,
            isAdd2:true,
            //人员信息分页：每页数
            pageSize:10,
            //人员信息分页：总条数
            totalNum:0,
            //项目信息分页：每页数
            pageSize2:10,
            //项目信息分页：总条数
            totalNum2:0,
            //加载动画
            loading:true,
            //是否显示工号列
            show:false,
            //隐藏存储点击回调后员工信息的内容
            isShowMember:false,
            //点击回调后员工信息的内容
            memberIdShow:'',
            memberNameShow:'',
            deptNameShow:'',
            //正式员工
            showFormal:false,
            //正式员工内容
            formalShowY:false,
            //试用期员工内容
            formalShowN:true,

        })

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
        let loadJobsList = async()=>{
          let prams={
            codeNo:'sdHr_jobName'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.jobsList.push({jobsId:r[i].codeEname,jobsName:r[i].codeCname});
              allData.itvJobList2.push({itvJobId:r[i].codeEname,itvJobName:r[i].codeCname});
            }
          }
          
        }


        loadJobsList()
        //人员状态下拉框
        let loadIsFormalList = async()=>{
          let prams={
            codeNo:'sdEr_isFormal'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.isFormalList.push({isFormalId:r[i].codeEname,isFormalName:r[i].codeCname});
              allData.isFormalList2.push({isFormalId:r[i].codeEname,isFormalName:r[i].codeCname});  
            }
          }
          
        }
        loadIsFormalList()
        //政治面貌下拉框
        let loadPolitStatusList = async()=>{
          let prams={
            codeNo:'sdEr_politStatus'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.politStatusList.push({politStatusId:r[i].codeEname,politStatusName:r[i].codeCname});
              allData.politStatusList2.push({politStatusId:r[i].codeEname,politStatusName:r[i].codeCname});
            }
          }
          
        }
        loadPolitStatusList()
        //性别下拉框
        let loadSexList = async()=>{
          let prams={
            codeNo:'sdEr_sex'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.sexList.push({sexId:r[i].codeEname,sexName:r[i].codeCname});
              allData.sexList2.push({sexId:r[i].codeEname,sexName:r[i].codeCname});
            }
          }
          
        }
        loadSexList()
        //到期提醒下拉框
        let loadIsOrNoList = async()=>{
          let prams={
            codeNo:'sdEr_yesOrNo'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.isRemindPList.push({isRemindPId:r[i].codeEname,isRemindPName:r[i].codeCname});
            }
          }
          
        }
        loadIsOrNoList()

        //血型下拉框
        let loadBloodTypeList = async()=>{
          let prams={
            codeNo:'sdEr_bloodType'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.bloodTypeList.push({bloodTypeId:r[i].codeEname,bloodTypeName:r[i].codeCname}); 
              allData.bloodTypeList2.push({bloodTypeId:r[i].codeEname,bloodTypeName:r[i].codeCname});
            }
          }
          
        }
        loadBloodTypeList()

        //学历下拉框
        let loadHigEduList = async()=>{
          let prams={
            codeNo:'sdHr_edcBckr'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.higEduList.push({higEduId:r[i].codeEname,higEduName:r[i].codeCname});
              allData.higEduList2.push({higEduId:r[i].codeEname,higEduName:r[i].codeCname});
            }
          }
          
        }
        loadHigEduList()
        //婚姻状况下拉框
        let loadMarryStatusList = async()=>{
          let prams={
            codeNo:'sdEr_marryStatus'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.marryStatusList.push({marryStatusId:r[i].codeEname,marryStatusName:r[i].codeCname});
              allData.marryStatusList2.push({marryStatusId:r[i].codeEname,marryStatusName:r[i].codeCname});
            }
          }
          
        }
        loadMarryStatusList()
        //最高学位状况下拉框
        let loadHigDegreeList = async()=>{
          let prams={
            codeNo:'sdEr_higDegree'
          }

          let r= await itemList(prams)
          if(r){
            for(let i=0 ; i< r.length; i++){
              allData.higDegreeList.push({higDegreeId:r[i].codeEname,higDegreeName:r[i].codeCname});
              allData.higDegreeList2.push({higDegreeId:r[i].codeEname,higDegreeName:r[i].codeCname});
            }
          }
          
        }
        loadHigDegreeList()

        //初始化
        let loadTable = async()=>{
            let r = await listperson()
            allData.tableData = r.data.data
            allData.totalNum = r.data.totalNum
            setTimeout(() => {
                allData.loading= false
            }, 500);
            
        }
        loadTable()

        //查询方法
        let searchTable=async()=>{
            allData.tableData2=[]
            let params={
                memberName:allData.memberNameValue,
                isFormal:allData.isFormal,
                birthDate:allData.birthDate,
                jobs:allData.jobs,
                deptName:allData.deptNameId
            }
            let r = await listperson(params)
            allData.tableData = r.data.data
            allData.totalNum = r.totalNum
            setTimeout(() => {
                allData.loading= false
            }, 500);
        }

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


        //项目信息form表单
        let editForm2 = async()=>{
            let r =false;
            //判断是添加还是修改
            if(allData.isAdd2){
            r=await addForm2(allData.formData2)
            }else{
            r=await updateForm2(allData.formData2)
            }
            if(r){
            queryMemberP()
            allData.loading=true
            setTimeout(() => {
                    allData.loading= false
                }, 500);
            }
        }

        
        //修改表单数据
        let handleEdit =async(row)=>{
            //赋值
            allData.formData={...row}
            allData.formData.dept=row.deptName
            allData.isAdd=false
            //打开抽屉
            allData.openDrawer=true;
        }

        let handleEdit2 = async(row)=>{
            //赋值
            allData.formData2={...row}
            allData.isAdd2=false
            //打开抽屉
            allData.openDrawer2=true;
        }

        //执行人员删除方法
        let handleDelete=async(row)=>{
            await deleteForm(row)
            setTimeout(() => {
                loadTable();
            }, 2000);
        }

        //执行项目删除方法
        let handleDelete2=async(row)=>{
            await deleteForm2(row)
            setTimeout(() => {
                loadTable();
            }, 2000);
        }

        //点击员工姓名回调人员项目信息事件
        let queryMemberP = async (row)=>{
            //获取当前行数据，赋值后传入人员项目查询条件中
            let {memberId,isFormal}=row
            let params = {
                memberId,
                isFormal
            }
            let r = await listPersonPro(params)
            allData.tableData2 = r.data.data
             //1、解构出人员项目信息所需的参数并赋值
            let {memberName,deptName} =allData.tableData[0]
            allData.memberIdShow=memberId
            allData.memberNameShow=memberName
            allData.deptNameShow=deptName
            allData.totalNum2 = r.data.totalNum

            //2、解构出人员访谈信息所需信息并赋值
            //决定展示试用期人员访谈信息还是正式员工访谈信息
            // if(isFormal=='1'){
            //     allData.formalShowY=true
            //     allData.formalShowN=false
            //     //查询正式员工访谈信息
            //     let r1 = await listPersonTalk(params)
            //     allData.tableData3 = r1.data
            // }else{
            //     allData.formalShowY=false
            //     allData.formalShowN=true
            //     params = {
            //         ...params,
            //         talkType:'第一周'
            //     }
            //     //查询正式员工访谈信息并页面赋值-第一周
            //     let r2 = await listPersonTalk(params)
            //     allData.tableData4 = r2.data
            //     //第一月
            //     params = {
            //         ...params,
            //         talkType:'第一月'
            //     }
            //     let r3 = await listPersonTalk(params)
            //     allData.tableData5 = r3.data
            //     //面试访谈
            //     params = {
            //         ...params,
            //         talkType:'转正面谈'
            //     }
            //     let r4 = await listPersonTalk(params)
            //     allData.tableData6 = r4.data
            // }
        }

        //打开项目信息抽屉时，赋值人员、部门信息
        let clickDrawer2 = async()=>{

            if( allData.tableData2.length<1){
                return $msg_warning('请选择一位员工进行添加人员项目信息操作!')
            }
            //打开抽屉
            allData.openDrawer2=true
            allData.formData2 = {
                id:'',
                deptName:allData.deptNameShow,
                memberId:allData.memberIdShow,
                memberName:allData.memberNameShow,
                projectName:'',
                proAddress:'',
                projectPhase:'',
                resMod:'',
                useTec:'',
                pmName:'',
                pmTel:'',
                pmEmail:''
            }
        }

        //关闭表单事件
        let drawerClose = ()=>{
            allData.openDrawer=false
            allData.openDrawer2=false
            allData.isAdd=true
            allData.isAdd2=true
            //清空表单
            allData.formData={
                id:'',
                contractNo:'',
                memberId:'',
                memberName:'',
                sex:'',
                deptName:'',
                itvJob:'',
                isFormal:'',
                secLocation:'',
                secInf:'',
                localInf:'',
                national:'',
                politStatus:'',
                natPlace:'',
                idCard:'',
                birthDate:'',
                age:'',
                hxCardId:'',
                gsCardId:'',
                bloodType:'',
                marryStatus:'',
                higEdu:'',
                universityName:'',
                graDate:'',
                profession:'',
                higDegree:'',
                email:'',
                tel:'',
                emeContact:'',
                emeRel:'',
                emeTel:'',
                thrAddress:'',
                resAddress:'',
                empDate:'',
                indYear:'',
                signDate:'',
                endDate:'',
                endDateNew:'',
                isRemindC:'',
                probStartDate:'',
                probEndDate:'',
                isRemindP:'',
                remark:''
            }
            allData.formData2={
                id:'',
                deptName:'',
                memberId:'',
                memberName:'',
                projectName:'',
                proAddress:'',
                projectPhase:'',
                resMod:'',
                useTec:'',
                pmName:'',
                pmTel:'',
                pmEmail:''
            }
        }

        //人员信息分页切换
        let handleCurrentChange=async(val)=>{
            let prams = {
                memberName:allData.memberNameValue,
                isFormal:allData.isFormal,
                birthDate:allData.birthDate,
                jobs:allData.jobs,
                deptName:allData.deptNameId,
                pageNum:val,
            };
            
            let r = await listperson(prams)
            allData.tableData = r.data.data
            allData.totalNum = r.data.totalNum
        }

        //人员信息分页切换
        let handleCurrentChange2=async(val)=>{
            let prams = {
                memberName:allData.memberNameValue,
                isFormal:allData.isFormal,
                birthDate:allData.birthDate,
                jobs:allData.jobs,
                deptName:allData.deptNameId,
                pageNum:val,
            };
            
            let r = await listperson(prams)
            allData.tableData = r.data.data
            allData.totalNum = r.data.totalNum
        }

        return {
            ...toRefs(allData),
            loadTable,handleEdit,handleDelete2,editForm,handleDelete,queryMemberP,editForm2,handleEdit2,drawerClose,clickDrawer2,searchTable,handleCurrentChange,handleCurrentChange2
        }
    }
}
</script>

<style scoped lang="scss">
.contents{
    padding-top: 10px;
    padding-bottom: 10px;
    }
.center{
    float: left;
    padding-top: 2px;
    padding-bottom: 10px;
    width: 95%;
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
  .el-drawer__title{
    color: black;
  }

  .pagination{
    margin-top: 10px;

  }
  .el-drawer rtl open{
    background: red;
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
      .el-input{
        width: 90%;
      }
    }
    .grid-content {
      border-radius: 4px;
      min-height: 12px;
    }

</style>