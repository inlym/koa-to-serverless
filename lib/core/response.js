'use strict'


//轻量化地模拟一个 ServerResponse 类，只提供在 Koa 中要用到的属性
class KtsResponse {
	constructor(responseWrapper) {
		if (typeof responseWrapper !== 'object') throw new Error('内部错误: 内部参数解析错误!')

		this._cb = responseWrapper.callback
		this._headers = {}
		this.statusCode = 404
		this.statusMessage = ''
		this.headersSent

		// 模拟一个假的 socket (只是插入一些属性)
		this.socket = Object.create(null)



	}
	end(data) {
		this._cb(null, {
			isBase64Encoded: false,
			statusCode: this.statusCode,
			headers: this._headers,
			body: data
		})
	}

	getHeaders() {

	}

	hasHeader() {

	}

	setHeader() {

	}

	removeHeader() {

	}

	flushHeaders() {

	}
}


module.exports = KtsResponse