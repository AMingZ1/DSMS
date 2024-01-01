import { createRouter, createWebHashHistory } from "vue-router";

//定义路由信息的数组
const routes = [
  {
    //首页内容
    path: "/",
    name: "index",
    component: () => import("../views/pages/Index.vue"),
    meta: {
      title: "首页",
      keepAlive: false // 不缓存该页面
    },
  },
  {
    //登陆页
    name: "login",
    path: "/Login",
    component: () => import("../views/login/Login.vue"),
    meta: {
      title: "登陆页",
      keepAlive: false // 不缓存该页面
    },
  },
  {
    //布局页
    name: "layout",
    path: "/LayOut",
    component: () => import("../views/layout/Layout.vue"),
    children: [
      {
        name: "sdhr00",
        path: "Sdhr00",
        component: () => import("../views/pages/Sdhr00.vue"),
        meta: {
          title: "大盘",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sdhr01",
        path: "Sdhr01",
        component: () => import("../views/pages/hr/Sdhr01.vue"),
        meta: {
          title: "岗位需求",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sdhr02",
        path: "Sdhr02",
        component: () => import("../views/pages/hr/Sdhr02.vue"),
        meta: {
          title: "电联记录",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sdhr03",
        path: "Sdhr03",
        component: () => import("../views/pages/hr/Sdhr03.vue"),
        meta: {
          title: "人才库",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sdhr04",
        path: "Sdhr04",
        component: () => import("../views/pages/hr/Sdhr04.vue"),
        meta: {
          title: "面试测评",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sder01",
        path: "Sder01",
        component: () => import("../views/pages/er/Sder01.vue"),
        meta: {
          title: "员工信息总览",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sder03",
        path: "Sder03",
        component: () => import("../views/pages/er/Sder03.vue"),
        meta: {
          title: "访谈信息维护",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sder05",
        path: "Sder05",
        component: () => import("../views/pages/er/Sder05.vue"),
        meta: {
          title: "离职员工信息",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sder06",
        path: "Sder06",
        component: () => import("../views/pages/er/Sder06.vue"),
        meta: {
          title: "年度访谈节点维护",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sdof01",
        path: "Sdof01",
        component: () => import("../views/pages/of/Sdof01.vue"),
        meta: {
          title: "Offer管理",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },
      {
        name: "sdst06",
        path: "Sdst06",
        component: () => import("../views/pages/st/Sdst06.vue"),
        meta: {
          title: "任务总览",
          keepAlive: true // 添加 meta 字段，标记需要缓存的组件
        },
      },

      // {
      //   name:'sdhr02',
      //   path:'sdhr02',
      //   component:()=> import('../views/pages/Sdhr02'),
      //   meta:{title:'电联记录'}
      // },
      // {
      //   name:'sdhr03',
      //   path:'sdhr04',
      //   component:()=> import('../views/pages/Sdhr03'),
      //   meta:{title:'面试评测'}
      // },
      // {
      //   name:'sdhr04',
      //   path:'sdhr04',
      //   component:()=> import('../views/pages/Sdhr04'),
      //   meta:{title:'人才库'}
      // },
    ],
  },
];

//创建路由器对象
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

//导入nprogress
import NProgress from "nprogress";
import "nprogress/nprogress.css";

//定于路由导航前置守卫
router.beforeEach((to, from, next) => {
  if(to.path === '/Login'){   
    next();
  }else{
    let token = sessionStorage.getItem('token');
    console.log(token);
    if(token==null || token==" "){
      NProgress.start();
      next('/Login')
    }else{
      NProgress.start();
      next()
    }
  }
});

//定于路由导航后置守卫
router.afterEach(() => {
  NProgress.done();
});

export default router;
