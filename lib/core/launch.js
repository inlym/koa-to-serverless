'use strict'

const AliyunApigw = require('../trigger/aliyun-apigw')
const getTriggerType = require('../trigger/trigger-type')
const KtsRequest = require('./request')
const KtsResponse = require('./response')
const { isInstanceOfKoa } = require('../helper/koa')


module.exports = function launch(app, options) {
	// options 参数暂时没用到，预留。后期用于进行初始化配置。

	// 检查 app 是否是 Koa 的实例
	if (!isInstanceOfKoa(app)) throw new Error('无法识别的框架! 请使用由Koa框架实例化的app进行启动。')

	// 禁用 koa-bodyparser, 防止请求的 body 未定义时，进入到 bodyParser 的后续流程中
	app.context.disableBodyParser = true


	return function handler(...args) {
		/**
		 * 各触发器的参数:
		 * 1. [aliyun-apigw]    => (event, context, callback)
		 * 2. [aliyun-http]     => (request, response, context)
		 * 3. [tencent-apigw]   => (event, context, callback)
		 * ...
		 * 在触发器内部，明确了触发器类型再使用对应的参数名称
		 */


		// 获取触发器模块，目前仅阿里云API网关触发器
		let triggerModule
		let triggerName = getTriggerType(...args)
		if (triggerName === 'aliyun-apigw') {
			triggerModule = AliyunApigw
		} else {
			// to do ...
		}


		const { requestWrapper, responseWrapper } = new triggerModule(...args)
		const req = new KtsRequest(requestWrapper)
		const res = new KtsResponse(responseWrapper)

		// 插入 body
		app.request.body = req.body
		app.request.bufBody = req.bufBody

		// 回调 Koa
		app.callback()(req, res)
	}
}