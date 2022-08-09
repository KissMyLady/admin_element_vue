/**
 * 全局设置
 */


let local = "http://127.0.0.1:9988/api";

let linux = "https://api.mylady.top/api";

module.exports = {

  baseURL:
    process.env.NODE_ENV === "development"
      ? local : local,
      //? linux : local,

  requestTimeout: 8000,

  //配后端数据的接收方式 application/json;charset=UTF-8 或者
  //                 application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: false,

  //ids token
  tokenName: "spider-token",

  //标题
  title: 'Admin-Template',

  //是否显示设置右侧面板
  showSettings: true,

  //Whether need tagsView
  tagsView: true,

  //Whether fix the header
  fixedHeader: false,

  //Whether show the logo in sidebar
  sidebarLogo: false,

  //['production', 'development']
  errorLog: 'production'
}
