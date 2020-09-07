'use strict'

/**
 * 各触发器的参数:
 * 1. [aliyun-apigw]    => (event, context, callback)
 * 2. [tencent-apigw]   => (event, context, callback)
 * 3. [aliyun-http]     => (request, response, context)
 * ...
 * 在触发器内部，明确了触发器类型再使用对应的参数名称
 */



module.exports = function getTriggerType(...args) {
	if (isAliyunApigw(...args)) return 'aliyun-apigw'
	if (isTencentApigw(...args)) return 'tencent-apigw'
	if (isAliyunHttp(...args)) return 'aliyun-http'

	// 后续添加其他触发器 ...
	throw new Error('无法识别的网关触发器, 可能暂未支持或者您的配置有误!')
}


/**
 * 根据三个参数判断触发器是否是阿里云网关(aliyun-apigw)
 */
function isAliyunApigw(event, context, callback) {
	// 第1个参数 event 是 Buffer 类型
	if (!Buffer.isBuffer(event)) return false

	// 第2个参数 context 是个对象
	if (typeof context !== 'object') return false

	// context 中存在参数 requestId (腾讯云对应参数名 request_id )
	if (!context.requestId) return false

	// 第3个参数 callback 是个函数
	if (typeof callback !== 'function') return false

	return true
}


/**
 * 根据三个参数判断触发器是否是腾讯云网关(tencent-apigw)
 */
function isTencentApigw(event, context, callback) {
	// 第 1 个参数 event 是 object
	if (typeof event !== 'object') return false

	// event 下有个 requestContext 对象
	if (typeof event.requestContext !== 'object') return false

	// context 下有个 request_id 
	if (!context.request_id) return false

	return true
}


/**
 * 根据三个参数判断触发器是否是阿里云HTTP函数(aliyun-http)
 */
function isAliyunHttp(param1, param2, param3) {
	// to do ...
	return false
}
