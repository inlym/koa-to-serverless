
# koa-to-serverless
只需要改一行代码就能够让你的 **Koa** 框架应用在 **Serverless** 架构环境上运行。






## 简介
Serverless 架构相对于自行部署的原生环境有巨大的优势（各云厂商对 Serverless 的介绍已经非常详细，这里就不赘述了），但是已有的代码想要直接迁移到 Serverless 架构上却不容易，主要面临以下几个困难：

（1）Serverless 架构环境与原生环境有所差异，原有的代码无法直接运行。

（2）各云厂商的 Serverless 实现都有所差异，无法兼容。



koa-to-serverless 就是为了解决这个问题诞生的。它能够让你只改一行代码就让你的原生 Koa 框架应用在 Serverless 架构环境上运行。





## 安装
直接使用 npm 命令安装即可：
```shell
npm i koa-to-serverless
```



## 使用
### 基础
下面这张图表示了使用原生环境和使用 Serverless 环境 Koa 框架代码的区别。虽然说改一行，实际上总共改2行，1行引入，1行使用。其他位置的代码你无需进行任何改动。

![](https://img.inlym.com/516058220fc54b7ca4195d099499ae2e.jpg)



### 注意事项
（1）由于已经将请求的 body 植入了 **app.request.body** ，你无需再使用 **koa-bodyparser** 获取 body，请直接
去掉对应代码。

（2）其他 Koa 的中间件，目前未发现不能使用的。若你在使用中发现某个中间件使用异常，请向我提 issue。




### 扩展
除了完全兼容 Koa 框架外，koa-to-serverless 还向 Koa 框架的 ctx 参数植入了一些属性，你可以直接使用。例如：ctx.id 。

| 参数名 | 类型 | 说明 |
| :---: | :---: | :---: |
| id | string | API网关带入的请求ID |





## 配置
由于云厂商平台限制，部分参数需要在云厂商的 API 网关处进行配置才能获取到。请按照您使用的云厂商平台进行设置。


### 阿里云
以下是 API 网关配置的注意事项：

（1）【请求路径】：配置为【 / 】，并勾选【匹配所有子路径】。路径这块执行逻辑API网关层透传，由 Koa 框架的 koa-router 中间件接管处理。

（2）【HTTP Method】：配置为【ANY】，相当于请求方法也是透传，由 Koa 框架的 koa-router 中间件接管处理。

（3）【入参请求模式】：配置为【入参透传】。

![API网关配置1.png](https://img.inlym.com/10e429f3f9cf45539372a5b7f42514d7.jpg)



以下几个参数需要 API 网关提供，请直接按照图示参数名称填写。

![API网关配置2.png](https://img.inlym.com/5398e50cd43e48f288015805cbf59065.jpg)



### 其他云平台

开发中，待支持 ...






## 进阶
### 原理剖析
koa-to-serverless 实际上使用以下流程给 Koa 框架提供了一个兼容层。

![流程.png](https://img.inlym.com/12095c34ab93416693eff6b03c495b1b.jpg)



以下这张图可以大致抽象地描述了 koa-to-serverless 作为兼容层提供的能力：
![](https://img.inlym.com/4d62f7882fc7499db05fcff3ea469113.jpg)



### 框架扩展

基于以上流程，以后的扩展会非常容易，扩展主要包含2个方面：

（1）支持 Koa 框架在其他云厂商的 Serverless 架构环境上运行。

（2）支持其他框架，例如 Express 等，在 Serverless 架构环境上运行。



以上2点扩展实际上都非常容易：
（1）第1个扩展只需要增加步骤2对应的触发器处理函数就可以了。

（2）第2个扩展只需要识别框架类型，然后改动步骤4，调用对应的框架的入口函数就可以了。



以上扩展以后会逐渐支持。




以下是支持情况：

|  |  | Koa | Express | Hapi | Sails |
| :---: | :---: | :---: | :---: | :---: | :---: |
| 阿里云 | API 网关触发器 | √ |  |  |  |
| 阿里云 | HTTP 触发器 |  |  |  |  |
| 腾讯云 | API 网关触发器 |  |  |  |  |
| 华为云 | API 网关触发器 |  |  |  |  |
| 百度智能云 | API 网关触发器 |  |  |  |  |
| AWS | API 网关触发器 |  |  |  |  |





## 反馈
任何使用上的问题，以及意见和建议，都可以向我提 issue，地址：
[https://github.com/inlym/koa-to-serverless/issues](https://github.com/inlym/koa-to-serverless/issues)
