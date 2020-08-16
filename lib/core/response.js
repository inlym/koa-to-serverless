'use strict'


//轻量化地模拟一个 ServerResponse 类，只提供在 Koa 中要用到的属性
class KtsResponse {
	constructor(responseWrapper) {
		if (typeof responseWrapper !== 'object') throw new Error('内部错误: 内部参数解析错误!')

		this._cb = responseWrapper.callback
		this._headers = {}
		this.statusCode = 404
		this.statusMessage = ''
		this.headersSent = false

		// 模拟一个假的 socket (只是插入一些属性)
		this.socket = {
			writable: true
		}

	}

	end(data) {
		this._cb(null, {
			isBase64Encoded: false,
			statusCode: this.statusCode,
			headers: this._headers,
			body: data
		})
	}

	get headers() {
		return this._headers
	}

	set headers(val) {
		if (typeof val === 'object') {
			// 将字段名逐个改为小写后存入
			Object.keys(val).forEach(function (key) {
				this._headers[key.toLowerCase()] = val[key]
			})
		} else {
			throw new Error('参数错误: headers 应该是一个对象')
		}
	}

	// headers 别名 header
	get header() {
		return this.headers
	}

	set header(val) {
		this.headers = val
	}

	getHeader(field) {
		return this._headers[field.toLowerCase()] || ''
	}

	setHeader(field, value) {
		field = field.toLowerCase()
		this._headers[field] = value
	}

	hasHeader(field) {
		return field.toLowerCase() in this._headers
	}

	removeHeader(field) {
		delete this._headers[field.toLowerCase()]
	}


	flushHeaders() {
		// to do ...
	}
}


module.exports = KtsResponse