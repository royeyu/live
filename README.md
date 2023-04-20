

```bash
# 克隆项目
git clone https://github.com/PanJiaChen/vue-admin-template.git

# 进入项目目录
cd vue-admin-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 打包发布

```bash
# 构建本地线上环境
npm run build:stage
## 分SIT和UAT打包：修改配置在：.env.staging

# 构建生产环境
npm run build:prod
## 修改配置在：.env.production


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


  一、项目简介
    本项目是一套后台管理系统

  二、项目svn地址和接口文档
      svn地址：https://118.31.115.121:8443/svn/JAVA/北京总部挂机短信平台/union-gjdx-cloud-parent/web
      接口文档：http://192.168.3.181:18080/doc.html#/home

  三、项目打包注意
      1、API注意：
        开发环境：http://192.168.3.181:18080
        生成环境：/prod-api
          ps：以上在根目录下的 .env.development 和 .env.production 文件进行配置

  四、项目浏览网址
      测试网址：
      账号密码：admin/123456

  五、页面目录简述
      1、登录：
        src/views/login

      2、首页：
        src/views/dashboard

      3、客户管理：
        src/views/customer

      4、业务管理：
        src/views/business

      5、号码管理：
         src/views/number

      6、批量短信：
          src/views/batchMessage
      
      7、营销中心：
        src/views/marketingCenter

      8、闪短模板：
        src/views/flashShort

      9、基础设置：
        src/views/basicsSet
      
      10、统计报表：
        src/views/statisticalReport

      11、分类管理：
        src/views/categoryManagement

      12、权限管理：
        src/views/authManagement

      13、个人转企业：
        src/views/individualToEnterprise



