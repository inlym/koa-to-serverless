'use strict'


module.exports = function getTriggerType(param1, param2, param3) {
	if (isAliyunApigw(param1, param2, param3)) return 'aliyun-apigw'
	if (isAliyunHttp(param1, param2, param3)) return 'aliyun-http'
	if (isTencentApigw(param1, param2, param3)) return 'tencent-apigw'
	// 后续添加其他触发器 ...
	throw new Error('无法识别的网关触发器, 可能暂未支持或者您的配置有误!')
}


/**
 * 根据三个参数判断触发器是否是阿里云网关(aliyun-apigw)
 */
function isAliyunApigw(param1, param2, param3) {
	// 第1个参数 event 是 Buffer 类型
	if (!Buffer.isBuffer(param1)) return false

	// 第2个参数 context 是个对象
	if (typeof param2 !== 'object') return false

	// context 中存在参数 requestId (腾讯云对应参数名 request_id )
	if (!param2.requestId) return false

	// 第3个参数 callback 是个函数
	if (typeof param3 !== 'function') return false

	return true
}


/**
 * 根据三个参数判断触发器是否是阿里云HTTP函数(aliyun-http)
 */
function isAliyunHttp(param1, param2, param3) {
	// to do ...
	return false
}


/**
 * 根据三个参数判断触发器是否是腾讯云网关(tencent-apigw)
 */
function isTencentApigw(param1, param2, param3) {
	// to do ...
	return false
}