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

		// 小彩蛋: 能够理解下面的 if (true) 干嘛用的人，JavaScript 水平至少中级以上
		if (true) [this[event], this[context], this[callback]] = args

	}

	parse() {
		const evt = this[event]
		const ctx = this[context]

		const parsedEvent = JSON.parse(evt.toString())
		const obj = Object.create(null)

		// method => 'POST'
		obj.method = parsedEvent.httpMethod

		// path => '/path/to'
		// event中的 path 不包含 querystring 部分，实际上是 pathname, 但是和 koa 一致，都使用 path
		obj.path = parsedEvent.path

		// headers 对象，后面还要做二次处理
		obj.headers = parsedEvent.headers

		// query
		obj.query = parsedEvent.queryParameters

		// params, 路径参数
		obj.params = parsedEvent.pathParameters

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
		if (parsedEvent.body) {
			if (parsedEvent.isBase64Encoded) {
				obj.bufBody = Buffer.from(parsedEvent.body, 'base64')
				obj.body = obj.bufBody.toString()  // string
			} else {
				obj.body = parsedEvent.body
				obj.bufBody = Buffer.from(obj.body)
			}
		}


		// 处理 API网关层加入 headers 的参数 => 赋值并从 headers 中删除
		const ipAlias = ['ip', 'CaClientIp', 'clientIp', 'client_ip', 'clientip', 'ClientIp', 'ips', 'sourceIp']
		const hostAlias = ['domain', 'hostname', 'CaDomain', 'Domain', 'DomainName', 'domain_name']    // 不要使用 host, 可能会引起冲突
		const protocolAlias = ['http_schema', 'protocol', 'CaHttpSchema', 'HttpScheme', 'httpSchema', 'schema']


		Object.keys(obj.headers).forEach(function (key) {
			if (ipAlias.includes(key)) {
				obj.ip = obj.headers[key]
				delete obj.headers[key]
			} else if (hostAlias.includes(key)) {
				obj.host = obj.headers[key]
				delete obj.headers[key]
			} else if (protocolAlias.includes(key)) {
				obj.protocol = obj.headers[key].toLowerCase()
				delete obj.headers[key]
			} else {
				// 空
			}
		})

		// 如果有 host，则重新插入 headers 中
		if (obj.host) {
			if (!obj.headers.Host && !obj.headers.host) {
				obj.headers.host = obj.host
			}
		}

		// 从 context 中获取 requestId
		obj.id = ctx.requestId

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
