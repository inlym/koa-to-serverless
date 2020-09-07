'use strict'

const querystring = require('querystring')

const RequestBase = require('../base/request')
const ResponseBase = require('../base/response')

const event = Symbol('Serverless#event')
const context = Symbol('Serverless#context')
const callback = Symbol('Serverless#callback')


class Request extends RequestBase {
	constructor(...args) {
		super()

		if (true) [this[event], this[context], this[callback]] = args

	}

	parse() {
		const evt = this[event]
		const ctx = this[context]

		// 腾讯云的 event 直接是个对象，不需要再转一次
		const parsedEvent = evt
		const obj = Object.create(null)

		// method => 'POST'
		obj.method = parsedEvent.httpMethod

		// path => '/path/to'
		// event中的 path 不包含 querystring 部分，实际上是 pathname, 但是和 koa 一致，都使用 path
		obj.path = parsedEvent.path

		// headers 对象，腾讯云的 headers 不需要做二次处理
		obj.headers = parsedEvent.headers

		// query
		obj.query = parsedEvent.queryString

		// params, 路径参数
		// obj.params = parsedEvent.pathParameters

		// querystring
		obj.querystring = querystring.stringify(obj.query)

		// search
		if (!obj.querystring) {
			obj.search = ''
		} else {
			obj.search = '?' + obj.querystring
		}

		// url
		obj.url = obj.path + obj.search

		// body
		obj.body = parsedEvent.body

		// 从 context 中获取 requestId
		obj.id = ctx.request_id

		// ip
		obj.ip = parsedEvent.requestContext.sourceIp

		// protocol (实际上获取不到)
		obj.protocol = 'http'

		return obj
	}


}



class Response extends ResponseBase {
	constructor(...args) {
		super()

		if (true) [this[event], this[context], this[callback]] = args

	}

	end(body) {
		const cb = this[callback]
		const { statusCode, headers } = this
		cb(null, {
			isBase64Encoded: false,
			statusCode,
			headers,
			body
		})
	}

}


module.exports = {
	Request,
	Response,
}
