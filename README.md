## 简介

vue-element-admin) 是一个后台前端解决方案，它基于Vue 和 element-ui实现。
它使用了最新的前端技术栈，内置了 i18n 国际化解决方案，动态路由，权限验证，提炼了典型的业务模型，提供了丰富的功能组件，它可以帮助你快速搭建企业级中后台产品原型。
相信不管你的需求是什么，本项目都能帮助到你。

- 在线预览 : https://panjiachen.github.io/vue-element-admin

- 使用文档 : https://panjiachen.github.io/vue-element-admin-site/zh/
- Gitter 讨论组 : https://gitter.im/vue-element-admin/discuss
- Donate : https://panjiachen.gitee.io/vue-element-admin-site/zh/donate
- Wiki : https://github.com/PanJiaChen/vue-element-admin/wiki
- Gitee(在线预览（国内用户可访问该地址）]): https://panjiachen.gitee.io/vue-element-admin/
- 国内访问文档(文档（方便没翻墙的用户查看）) : https://panjiachen.gitee.io/vue-element-admin-site/zh/ 

- 基础模板建议使用: vue-admin-template -> https://github.com/PanJiaChen/vue-admin-template
- 桌面端: electron-vue-admin -> https://github.com/PanJiaChen/electron-vue-admin    
- awesome-project -> https://github.com/PanJiaChen/vue-element-admin/issues/2312   

## 前序准备

你需要在本地安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)。
本项目技术栈基于    
> 1, [ES2015+](http://es6.ruanyifeng.com/)、    
> 2, [vue](https://cn.vuejs.org/index.html)、      
> 3, [vuex](https://vuex.vuejs.org/zh-cn/)、   
> 4, [vue-router](https://router.vuejs.org/zh-cn/) 、       
> 5, [vue-cli](https://github.com/vuejs/vue-cli) 、   
> 6, [axios](https://github.com/axios/axios) 和    
> 7, [element-ui](https://github.com/ElemeFE/element)，

所有的请求数据都使用[Mock.js](https://github.com/nuysoft/Mock)进行模拟，提前了解和学习这些知识会对使用本项目有很大的帮助。    

同时配套了系列教程文章，如何从零构建后一个完整的后台项目，建议大家先看完这些文章再来实践本项目   

- [手摸手，带你用 vue 撸后台 系列一(基础篇)](https://juejin.im/post/59097cd7a22b9d0065fb61d2)
- [手摸手，带你用 vue 撸后台 系列二(登录权限篇)](https://juejin.im/post/591aa14f570c35006961acac)
- [手摸手，带你用 vue 撸后台 系列三 (实战篇)](https://juejin.im/post/593121aa0ce4630057f70d35)
- [手摸手，带你用 vue 撸后台 系列四(vueAdmin 一个极简的后台基础模板)](https://juejin.im/post/595b4d776fb9a06bbe7dba56)
- [手摸手，带你用vue撸后台 系列五(v4.0新版本)](https://juejin.im/post/5c92ff94f265da6128275a85)
- [手摸手，带你封装一个 vue component](https://segmentfault.com/a/1190000009090836)
- [手摸手，带你优雅的使用 icon](https://juejin.im/post/59bb864b5188257e7a427c09)
- [手摸手，带你用合理的姿势使用 webpack4（上）](https://juejin.im/post/5b56909a518825195f499806)
- [手摸手，带你用合理的姿势使用 webpack4（下）](https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc)

**如有问题请先看上述使用文档和文章，若不能满足，欢迎 issue 和 pr**


## 开发
```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-element-admin.git

# 进入项目目录
cd vue-element-admin

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
更多信息请参考 [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)


## Online Demo
[在线 Demo](https://panjiachen.github.io/vue-element-admin)
