'use strict'

const Socket = require('./socket')

// 用作基类的私有属性，存放从请求事件解析的各参数
const ParamsWrapper = Symbol('RequestBase#ParamsWrapper')

module.exports = class RequestBase {
	constructor() {
		// 以下参数直接写死
		this.httpVersionMajor = 1
		this.httpVersionMinor = 1
		this.httpVersion = '1.1'
		this.complete = true

		// 用户存放请求事件解析后的属性
		this[ParamsWrapper] = Object.create(null)

	}

	parse() {
		// 子类有自己的 parse，如果执行了基类的 parse 函数，说明出问题了
		throw new Error('内部错误!无法识别的网关触发器')
	}

	init(Wrapper) {
		this.socket = new Socket(Wrapper.ip, Wrapper.protocol)
		Object.assign(this[ParamsWrapper], Wrapper)
	}

	get method() {
		return this[ParamsWrapper]['method']
	}

	get url() {
		return this[ParamsWrapper]['url']
	}

	get headers() {
		return this[ParamsWrapper]['headers']
	}

	get body() {
		return this[ParamsWrapper]['body']
	}

}
