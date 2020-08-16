'use strict'

const aliyunApigw = require('../trigger/aliyun-apigw')
const triggerType = require('../trigger/trigger-type')
const KtsRequest = require('./request')
const KtsResponse = require('./response')




module.exports = function launch(app, options) {

	return function handler(param1, param2, param3) {
		/**
		 * 各触发器的参数:
		 * 1. [aliyun-apigw]    => (event, context, callback)
		 * 2. [aliyun-http]     => (request, response, context)
		 * 3. [tencent-apigw]   => (event, context, callback)
		 * ...
		 * 为兼容所有触发器的参数名称，因此使用param1..2..3表示，以免引起歧义
		 */

		// 获取触发器模块
		let triggerModule
		if (triggerType.isAliyunApigw(param1, param2, param3)) {
			triggerModule = aliyunApigw
		} else if (triggerType.isAliyunHttp(param1, param2, param3)) {
			// to do ...
		} else if (triggerType.isTencentApigw(param1, param2, param3)) {
			// to do ...
		} else {
			throw new Error('无法识别的网关触发器, 可能暂未支持或者您的配置有误!')
		}

		const { requestWrapper, responseWrapper } = new triggerModule(param1, param2, param3)
		const req = new KtsRequest(requestWrapper)
		const res = new KtsResponse(responseWrapper)

		app.callback()(req, res)
	}
}



