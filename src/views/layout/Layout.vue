<template>
  <!-- <div class="common-layout"> -->
  <el-container>
    <el-header class="common-header">
      <div class="logoDiv">
        <a href="">
          <img src="../../images/sdLog.png" alt="logo" /><span
            style="
              display: inline-block;
              width: 0;
              height: 100%;
              vertical-align: middle;
            "
          ></span>
        </a>
      </div>
      <div class="spanDiv">
        <span class="s1">
          <span class="s2"></span
          ><!--w-[21px] h-[2px] bg-white mb-[5px] block float-left -->
          <span class="s3"></span
          ><!--w-[15px] h-[2px] bg-white mb-[5px] block float-left-->
          <span class="s4"></span
          ><!--w-[21px] h-[2px] bg-white block float-left-->
        </span>
        <span
          style="
            display: inline-block;
            width: 0;
            height: 100%;
            vertical-align: middle;
          "
        ></span>
      </div>
      <div class="textDiv">
        <!-- <span style="display: inline-block;width: 0;height: 100%;vertical-align: middle;"></span> -->
        <h3>沈阳东硕信息技术有限公司经营管理系统(DSMS)</h3>
      </div>
      <div class="other">
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          ellipsis
          background-color="#ff9b44"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1"
            ><el-icon><Message /></el-icon> 邮件</el-menu-item
          >
          <el-menu-item index="2"
            ><el-icon><ChatDotRound /></el-icon>消息</el-menu-item
          >
          <el-sub-menu index="3">
            <template #title
              ><el-icon><Avatar /></el-icon>欢迎您&nbsp;:&nbsp;{{
                showData.userName
              }}</template
            >
            <el-menu-item index="3-1" disabled
              ><el-icon><User /></el-icon>工号&nbsp;:&nbsp;{{
                showData.userId
              }}</el-menu-item
            >
            <el-menu-item index="3-2"
              ><el-icon><Avatar /></el-icon>职位&nbsp;:&nbsp;{{
                showData.jobs
              }}</el-menu-item
            >
            <el-menu-item index="3-3"
              ><el-icon><Setting /></el-icon>修改密码</el-menu-item
            >
            <el-menu-item index="3-4" @click="exit"
              ><el-icon><SwitchButton /></el-icon>退出登录</el-menu-item
            >
          </el-sub-menu>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside class="common-aside" width="230px">
        <el-menu
          default-active="/Layout/Sdhr00"
          background-color="none"
          text-color="#fff"
          active-text-color="#ffd04b"
          router 
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Platform /></el-icon>
              <span>仪表盘</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                id="sdhr00"
                name="menu"
                index="/Layout/Sdhr00"
                @click="addTab('sdhr00', '大盘', '/Layout/Sdhr00')"
              >
                大盘
              </el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sdst06"
                id="sdst06"
                name="menu"
                @click="addTab('sdst06', '任务总览', '/Layout/Sdst06')"
                >任务总览</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="2">
            <template #title>
              <el-icon><Phone /></el-icon>
              <span>招聘管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sdhr01"
                id="sdhr01"
                name="menu"
                @click="addTab('sdhr01', '岗位需求', '/Layout/Sdhr01')"
                >岗位需求</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sdhr02"
                id="sdhr02"
                name="menu"
                @click="addTab('sdhr02', '电联记录', '/Layout/Sdhr02')"
                >电联记录</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sdhr04"
                id="sdhr04"
                name="menu"
                @click="addTab('sdhr04', '面试测评', '/Layout/Sdhr04')"
                >面试测评</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sdhr03"
                id="sdhr03"
                name="menu"
                @click="addTab('sdhr03', '人才库', '/Layout/Sdhr03')"
                >人才库</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="3">
            <template #title>
              <el-icon><Paperclip /></el-icon>
              <span>Offer管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sdof01"
                id="sdof01"
                name="menu"
                @click="addTab('sdof01', 'offer信息维护', '/Layout/Sdof01')"
                >offer信息维护</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><Connection /></el-icon>
              <span>员工关系</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sder01"
                id="sder01"
                name="menu"
                @click="addTab('sder01', '员工信息总览', '/Layout/Sder01')"
                >员工信息总览</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sder03"
                id="sder03"
                name="menu"
                @click="addTab('sder03', '访谈信息管理', '/Layout/Sder03')"
                >访谈信息管理</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sder06"
                id="sder06"
                name="menu"
                @click="addTab('sder06', '年度访谈节点维护', '/Layout/Sder06')"
                >年度访谈节点维护</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item
                index="/Layout/Sder05"
                id="sder05"
                name="menu"
                @click="addTab('sder05', '离职员工信息', '/Layout/Sder05')"
                >离职员工信息</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="5">
            <template #title>
              <el-icon><Money /></el-icon>
              <span>数据管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/">合同信息查询</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">薪资信息查询</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">收款管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">付款管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">客商管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">财务报表(月/季/年)</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>

          <el-sub-menu index="6">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>基础管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/">用户管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">权限配置</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">日志查询</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">邮件管理</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
              <el-menu-item index="/">文档管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>

      <el-main class="common-main">
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          @tab-click="clickTab"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            class="demo-tabs"
            v-for="item in editableTabs"
            :key="item.name"
            :label="item.title"
            :name="item.name"
            :closable="item.closable"
          >
          </el-tab-pane>
        </el-tabs>

        <router-view v-slot="{ Component }">
          <component
            :is="Component"
            :key="name"
            v-if="!$route.meta.keepAlive"
          ></component>
          <keep-alive>
            <component
              :is="Component"
              :key="name"
              v-if="$route.meta.keepAlive"
            ></component>
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>

  <!-- </div> -->
</template>

<script >
//导入路由器，用于退出登录后跳转到登录页
import { useRouter } from "vue-router";
import { userQuery } from "../../api/login";
//导入组合式API
import { reactive, toRefs, onBeforeMount, onMounted, ref, provide } from "vue";

//导入访问后台API
// import {userQuery} from '../../api/login'

import {
  Search,
  Menu as IconMenu,
  Setting,
  Money,
  Phone,
  Platform,
  ChatDotRound,
  Connection,
  Message,
  Avatar,
} from "@element-plus/icons-vue";
export default {
  name: "Layout",
  components: {
    Search,
    Setting,
    Money,
    Phone,
    Platform,
    ChatDotRound,
    Connection,
    Message,
    Avatar,
  },
  setup() {
    //定义登陆人信息
    let userData = reactive({
      userId: sessionStorage.getItem("userId"),
    });
    let showData = reactive({
      userId: "",
      userName: "",
      jobs: "",
    });
    //获取当前项目中的路由器对象
    let $router = useRouter();

    let getUser = async () => {
      let r = await userQuery(userData);
      showData.userId = r.data.userId;
      showData.userName = r.data.userName;
      showData.jobs = r.data.jobs;
      // showData.userId=r.data.userId
      // showData.userName=r.data.userName
      // showData.jobs=r.data.jobs
    };
    getUser();

    //退出系统
    let exit = () => {
      //清除所有浏览器缓存
      sessionStorage.clear();
      localStorage.clear();
      //跳转到登录页
      $router.push("/login");
    };

    //页面挂载之前
    onBeforeMount(() => {
      let token = sessionStorage.getItem("token");
      //有token才能跳转到主页
      if (!token) {
        //跳转到登录页
        $router.push("/login");
      }
    });
    //页面挂载完成后跳转到大盘
    onMounted(() => {
      $router.push("/Layout/Sdhr00");
    });
    

  

    //初始表头
    const editableTabsValue = ref("sdhr00"); //当前所在页面
    const editableTabs = ref([
      {
        title: "大盘",
        name: "sdhr00",
        content: "/Layout/Sdhr00",
      },
    ]);

    //点击左边菜单栏新增头部菜单
    let addTab = (tabName, tabTitle, tabContent) => {
      const tabs = editableTabs.value;
      let flag = true;
      tabs.forEach((tab) => {
        if (tab.name === tabName) {
          flag = false;
        }
      });
      if (flag) {
        editableTabs.value.push({
          title: tabTitle,
          name: tabName,
          content: tabContent,
          closable: true, //让新增的tab有删除功能
        });
      }
      editableTabsValue.value = tabName;

      //修改左边菜单高亮区域
      $('[name="menu"]').removeClass("is-active");
      $("#" + tabName + "").addClass("is-active");
    };

    //点击头部菜单切换tab数据
    let clickTab = (tab) => {
      //跳转页面
      $router.push(editableTabs.value[tab.index]["content"]);

      //修改左边菜单高亮区域
      $('[name="menu"]').removeClass("is-active");
      $("#" + editableTabs.value[tab.index]["name"] + "").addClass("is-active");
    };

    //删除头部菜单栏
    let removeTab = (targetName) => {
      const tabs = editableTabs.value;
      let activeName = editableTabsValue.value;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      editableTabsValue.value = activeName;
      editableTabs.value = tabs.filter((tab) => tab.name !== targetName);

      //如果删除的是当前tab页面，更新view,并且修改左边菜单高亮区域
      const tabs2 = editableTabs.value;
      tabs2.forEach((tab, index) => {
        if (tab.name === activeName) {
          $router.push(editableTabs.value[index]["content"]);

          $('[name="menu"]').removeClass("is-active");
          $("#" + editableTabs.value[index]["name"] + "").addClass("is-active");
        }
      });
    };

    //切换tab
    let jumpTab = (tabName, tabTitle, tabContent,keyId) => {
      //判断要切换的TAB是否操作，不存在就新增一个
      const tabs = editableTabs.value;
      let flag = true;
      tabs.forEach((tab) => {
        if (tab.name === tabName) {
          flag = false;
        }
      });
      if (flag) {
        editableTabs.value.push({
          title: tabTitle,
          name: tabName,
          content: tabContent,
          closable: true, //让新增的tab有删除功能
        });
      }
      editableTabsValue.value = tabName;

      //跳转页面   
      $router.push({name: tabName, state: {keyId: keyId}});

     // console.log($route);
      //修改左边菜单高亮区域
      $('[name="menu"]').removeClass("is-active");
      $("#" + tabName + "").addClass("is-active");
    };
    //提供给其他页面调用
    provide("jumpTab", jumpTab);


    //返回数据
    return {
      ...toRefs(userData),
      exit,
      getUser,
      showData,
      editableTabsValue,
      editableTabs,
      addTab,
      clickTab,
      removeTab,
      jumpTab,
    };
  },
};
//     mounted(){
//          //获取登陆人信息
//          function  userList(){
//             console.log(userId)
//             //分别传入：解构出登陆人信息
//             let {userId} = userData
//             //调用登录api后返回当前用户信息
//             userQuery({userId})
//         }
//         return {
//             userList
//         }
//     }
// }
</script>

<style scoped lang="scss">
.common-header {
  //   background: repeating-linear-gradient(to left ,#fc6075,#ff9b44);
  position: relative;
  background: #ff9b44;
  width: 100%;
}

.common-aside {
  height: 100vh;
  background: rgb(84, 85, 100);
  padding: 0;
}
.common-main {
  height: 100vh;
  width: 100vw;
}
img {
  display: inline-block;
  width: 40px;
  height: 40px;
  vertical-align: middle;
}
.logoDiv,
.spanDiv,
.textDiv {
  float: left;
}
.logoDiv {
  height: 100%;
  width: 10%;
  text-align: center;
}
.spanDiv {
  height: 100%;
  width: 4%;
  text-align: center;
}
.textDiv {
  height: 100%;
  width: 40%;
  text-align: center;
  position: relative;
  h3 {
    position: absolute;
    font-size: 20px;
    height: 100%;
    font-family: normal;
    color: white;
    margin: auto;
    vertical-align: middle;
    float: left;
    top: 25%;
  }
}
.other {
  height: 100%;
  width: 30%;
  text-align: center;
  float: right;
  // opacity: 0.5;
  // .box01{
  //     position: relative;
  //     margin: 20px 20px;
  //     width: 50%;
  //     top: -10%;
  // }

  .el-menu-demo {
    left: 5%;

    .el-menu-item {
      font-size: 15px;
    }
  }
}

.s1 {
  display: inline-block;
  width: 30px;
  vertical-align: middle;
}
.s2 {
  width: 25px;
  height: 2px;
  background: white;
  display: block;
  float: left;
  margin-block: 2px;
}
.s3 {
  background: white;
  width: 20px;
  height: 2px;
  display: block;
  float: left;
  margin-block: 4px;
}
.s4 {
  width: 25px;
  height: 2px;
  background: white;
  display: block;
  float: left;
  margin-block: 2px;
}

.el-input__wrapper {
  padding: 0;
  margin-left: 0%;
  margin-top: 0%;
  opacity: 0.5;
}
.el-main {
  flex: 1;
  padding: 6px;
}

.demo-tabs {
  margin: -10px;
}
</style>