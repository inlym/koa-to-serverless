'use strict'


//轻量化地模拟一个 IncomingMessage 类，只提供在 Koa 中要用到的属性
module.exports = class KtsRequest {
	constructor(requestWrapper) {
		if (typeof requestWrapper !== 'object') throw new Error('内部错误: 触发器请求体解析失败!')

		// 将触发器中获取的请求相关参数植入
		this.method = requestWrapper.method
		this.url = requestWrapper.url
		this.headers = requestWrapper.headers
		this.body = requestWrapper.body


		// 模拟一个假的 socket (只是插入一些属性)
		this.socket = {}

		if (requestWrapper.protocol === 'https' || requestWrapper.protocol === 'https:') {
			this.socket.encrypted = true
		} else {
			this.socket.encrypted = false
		}

		if (requestWrapper.ip) {
			this.socket.remoteAddress = requestWrapper.ip
		} else {
			this.socket.remoteAddress = '0.0.0.0'
		}


		// 以下写死参数
		this.httpVersionMajor = 1
		this.httpVersionMinor = 1
		this.httpVersion = '1.1'
		this.complete = true

	}
}