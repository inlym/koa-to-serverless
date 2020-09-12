'use strict'

// 用作基类的私有属性，存放响应头
const headers = Symbol('Response#Headers')

module.exports = class ResponseBase {
	constructor() {
		// 初始化一些属性
		this.statusCode = 404
		this.statusMessage = 'Not Found'
		this.headersSent = false
		this[headers] = {}
		this.body = ''

		// 模拟一个假 socket, 由于比较简单，就不弄个类来实例化了
		this.socket = {
			writable: true,
		}
	}

	end() {
		// 子类有自己的 end，如果执行了基类的 end 函数，说明出问题了
		throw new Error('内部错误!无法识别的网关触发器')
	}

	get headers() {
		return this[headers]
	}

	set headers(val) {
		if (typeof val === 'object') {
			// 将字段名逐个改为小写后存入
			Object.keys(val).forEach(function (key) {
				this[headers][key.toLowerCase()] = val[key]
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

	get _headers() {
		return this.headers
	}

	getHeaders() {
		return this[headers]
	}

	getHeader(field) {
		return this[headers][field.toLowerCase()] || ''
	}

	setHeader(field, value) {
		this[headers][field.toLowerCase()] = value
	}

	hasHeader(field) {
		return field.toLowerCase() in this[headers]
	}

	removeHeader(field) {
		delete this[headers][field.toLowerCase()]
	}

	flushHeaders() {
		// to do ...
	}
}
