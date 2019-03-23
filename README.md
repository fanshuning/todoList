# todoList
---
> todoList是使用vue, express + mongoDB开发的一个简单的**todo**应用。

# 项目简介

 1. 项目前端使用**vue-cli**`2.9.6`构建，后端使用**express**+**mongoDB**构建
 2. 实现的功能
 
     (1) 单条增加todo
     
     (2) 单条删除todo
     
     (3) 单击todo名称修改
     
     (4) 单条todo已完成相应样式状态改变
     
     (5) todo列表根据时间节点排序，日期近的靠前
     
     (6) 顶部点击  
        clear done： 只显示未完成的项目
        showAll： 显示所有
    
     (7) 底部点击  
        clear completed： 可删除所有已完成todo
        all completed： 将所有todo状态设置为已完成
     
     (8) 待办todos数量显示
     
     
 3. mock数据来源于[NEI 接口管理平台](https://nei.netease.com/)。
 4. 开发环境中的数据来自于本地node服务

      ```javascript
       const baseUrl =
            process.env.NODE_ENV === 'development'
            ? 'http://localhost:8088'
            : 'https://nei.netease.com/api/apimock/05c2fd35a43f214d2bd64e4f56765fe6'
       ....
       ```

# 项目启动

安装依赖项
```bash
$ npm install

```
## 开发环境

```bash
$ npm start
```
这时数据由本地服务提供，打开浏览器输入[http://localhost:8080/](http://localhost:8080/)访问

## mock环境

```bash
$ npm run mock
```
这时数据由**nei**平台的数据提供，打开浏览器输入[http://localhost:8080/](http://localhost:8080/)访问
