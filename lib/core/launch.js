'use strict'

const AliyunApigw = require('../trigger/aliyun-apigw')
const getTriggerType = require('../trigger/trigger-type')
const KtsRequest = require('./request')
const KtsResponse = require('./response')


module.exports = function launch(app, options) {
	// options 参数暂时没用到，预留。后期用于进行初始化配置。
	return function handler(param1, param2, param3) {
		/**
		 * 各触发器的参数:
		 * 1. [aliyun-apigw]    => (event, context, callback)
		 * 2. [aliyun-http]     => (request, response, context)
		 * 3. [tencent-apigw]   => (event, context, callback)
		 * ...
		 * 为兼容所有触发器的参数名称，因此使用 param1..2..3 表示，以免引起歧义
		 * 在触发器内部，明确了触发器类型再使用对应的参数名称
		 */

		// 获取触发器模块
		let triggerModule
		let triggerName = getTriggerType(param1, param2, param3)
		if (triggerName === 'aliyun-apigw') {
			triggerModule = AliyunApigw
		} else {
			// to do ...
		}


		const { requestWrapper, responseWrapper } = new triggerModule(param1, param2, param3)
		const req = new KtsRequest(requestWrapper)
		const res = new KtsResponse(responseWrapper)

		// 插入 body
		app.request.body = req.body

		// 回调 Koa
		app.callback()(req, res)
	}
}