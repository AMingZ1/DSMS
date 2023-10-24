<template>
  <div class="contents">
    <el-tabs type="border-card">
    
          <div class="center">
            <!--点击打开新增抽屉-->
            <el-button type="warning" round class="addDrawer" plain @click="openDrawer=true"><el-icon><Plus /></el-icon>&nbsp;添加需求</el-button>
           
            <div class="sreach">
              <div class="sreachItem">
                <el-select v-model="yearValue" class="m-2"  placeholder="---请选择年份---" size="mini" clearable>
                    <el-option label="2022" value="2022"/>
                    <el-option label="2023" value="2023"/>
                    <el-option label="2024" value="2024"/>
                    <el-option label="2025" value="2025"/>
                  </el-select>
              </div>
            </div>
            
          </div>
            <el-table v-loading="loading" :data="tableData" stripe border style="width: 100%" >
              <el-table-column type="selection" width="40" />
              <el-table-column fixed prop="recCreateTime" label="创建时间" width="100" />
              <el-table-column fixed prop="recCreateName" label="创建人" width="100" />
              <el-table-column fixed prop="year" label="年度" width="120" />
              <el-table-column fixed prop="node1" label="上半年访谈节点" width="140"/>
              <el-table-column fixed prop="node2" label="下半年访谈节点" width="140" />
              <el-table-column prop="remark" label="备注" width="200" />
              <el-table-column fixed="right" label="操作" width="140">
              <template #default="scope">
                <el-button type="primary" size="small" @click="handleEdit(scope.row)">修改</el-button>
                <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
            </el-table>
            <!-- 分页区 -->
            <div class="pagination">
              <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="totalNum" />
            </div>
      
    </el-tabs>
    
        
        <!-- 添加需求抽屉 -->
        <el-drawer v-model="openDrawer" :title="isAdd?'添加岗位需求':'修改岗位需求信息'"
          direction="rtl"
          :before-close="drawerClose"
        >
        <div class="item">
            <span>id:</span>
            <el-input v-model="formData.id" placeholder="请输入id" />
          </div>
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
            <span>上半年访谈节点:</span>
            <el-date-picker format="YYYYMMDD" v-model="formData.node1" type="date" placeholder="请选择" :size="size"/>
          </div> 
          <div class="item">
            <span>下半年访谈节点:</span>
            <el-date-picker format="YYYYMMDD" v-model="formData.node2" type="date" placeholder="请选择" :size="size"/>
          </div>
          <div class="item">
            <span>岗位要求:</span>
            <el-input v-model="formData.remark" :rows="3" type="textarea" placeholder="请输入备注"/>
          </div>
         
          <div class="item">
            <span></span>
            <el-button type="success" @click="editForm"><el-icon><Select /></el-icon>&nbsp;{{isAdd?'添加计划节点':'修改计划节点'}}</el-button>
          </div>
        </el-drawer>
    </div>
</template>

<script>
//导入组合式API
import {reactive,toRefs} from 'vue'
//导入访问后台API
import {listPlan} from '../../../api/sder06'
export default {
    name:'Sder06',
    setup(){
        //定义数据
      let allData = reactive({
        tableData:[],
        //是否打开抽屉
        openDrawer:false,
        drawer:false,
        isAdd:true,
        //表单数据
        formData:{
          id:'',
          year:'',
          node1:'',
          node2:'',
          remark:''
        },
        //查询数据
        yearValue:'',
        //分页：每页数
        pageSize:10,
        //分页：总条数
        totalNum:0,
        loading:true,
        
      })
      //加载表格数据
      let loadTable = async()=>{
         let r = await listPlan()
         allData.tableData = r.data
         let count = Object.keys(allData.tableData)
         allData.totalNum = count.length
         setTimeout(() => {
                allData.loading= false
            }, 500);
      }
      loadTable()
       //编辑表单数据的方法
       let editForm = async()=>{
        // let r =false;
        // //判断是添加还是修改
        // if(allData.isAdd){
        //   r=await addForm(allData.formData)
        // }else{
        //   r=await updateForm(allData.formData)
        // }
        // if(r){
        //   loadTable();
        //   allData.loading=true
        //   setTimeout(() => {
        //         allData.loading= false
        //     }, 500);
        // }
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
      return {
        ...toRefs(allData),
        editForm,
        drawerClose
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

</style>