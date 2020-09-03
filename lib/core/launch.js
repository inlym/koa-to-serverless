'use strict'

const AliyunApigw = require('../trigger/aliyun-apigw')
const getTriggerType = require('../trigger/trigger-type')
const KtsRequest = require('./request')
const KtsResponse = require('./response')
const { isInstanceOfKoa } = require('../helper/koa')


module.exports = function launch(app, options) {
	// options 参数暂时没用到，预留。后期用于进行初始化配置。
	if (!isInstanceOfKoa(app)) throw new Error('无法识别的框架! 请使用由Koa框架实例化的app进行启动。')


	return function handler(...args) {
		/**
		 * 各触发器的参数:
		 * 1. [aliyun-apigw]    => (event, context, callback)
		 * 2. [aliyun-http]     => (request, response, context)
		 * 3. [tencent-apigw]   => (event, context, callback)
		 * ...
		 * 在触发器内部，明确了触发器类型再使用对应的参数名称
		 */


		// 获取触发器模块
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