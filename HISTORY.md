# 1.3.0 / 2020-09-12

-   修复了某些情况下无法返回响应头的问题

# 1.2.0 / 2020-09-07

-   新增腾讯云 API 网关触发器支持（即支持腾讯云的 Serverless 实现 —— 云函数）

# 1.1.2 / 2020-09-06

-   修复了特殊情况下可能获取不到 host 的问题

# 1.1.1 / 2020-09-05

-   修复了对 rawBody 进行 jsonify 时，如果 rawBody 为非标准格式直接导致输出为空的问题

# 1.1.0 / 2020-09-04

-   架构重构，适配之后的多 Serverless 环境

# 1.0.3 / 2020-08-23

-   新增 app.request.bufBody 属性(buffer 形式的 body)

# 1.0.1 / 2020-08-17

-   修改了 README.md

# 1.0.0 / 2020-08-16

-   初版发布
-   支持阿里云 API 网关触发器
