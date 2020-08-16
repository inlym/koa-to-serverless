'use strict'

const querystring = require('querystring')
const only = require('../helper/only')


module.exports = class AliyunApigw {
	constructor(event, context, callback) {
		this.requestWrapper = only(parse(event, context), [method, url, headers, body, protocol, ip])

		this.responseWrapper = {
			callback,
		}

	}
}


function parse(event, context) {
	const parsedEvent = JSON.parse(event.toString())
	const obj = Object.create(null)

	// method => 'POST'
	obj.method = parsedEvent.httpMethod

	// path => '/path/to'    event中的 path 不包含 querystring 部分，实际上是 pathname,但是和 koa 一致，都使用 path
	obj.path = parsedEvent.path

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
	// const idAlias = ['id', 'request_id', 'RequestId', 'Request_Id', 'requestId']
	const protocolAlias = ['http_schema', 'protocol', 'CaHttpSchema', 'HttpScheme', 'httpSchema', 'schema']
	const uaAlias = ['ua', 'CaClientUa', 'client_ua', 'clientUa', 'Ua', 'UA']

	Object.keys(obj.headers).forEach(function (key) {
		if (ipAlias.includes(key)) {
			obj.ip = obj.headers[key]
			delete obj.headers[key]
		} else if (hostAlias.includes(key)) {
			obj.host = obj.headers[key]
			delete obj.headers[key]
			// } else if (idAlias.includes(key)) {
			// 	obj.id = obj.headers[key]
			// 	delete obj.headers[key]
		} else if (protocolAlias.includes(key)) {
			obj.protocol = obj.headers[key].toLowerCase()
			delete obj.headers[key]
		} else if (uaAlias.includes(key)) {
			obj.ua = obj.headers[key]
			delete obj.headers[key]
		}
	})

	// 如果有 host，则重新插入 headers 中
	if (obj.host) {
		if (!obj.headers.Host && !obj.headers.host) {
			obj.headers.Host = obj.host
		}
	}

	// 从 context 中获取 requestId
	obj.id = context.requestId

	return obj
}