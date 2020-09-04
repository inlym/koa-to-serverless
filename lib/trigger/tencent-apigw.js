'use strict'


const RequestBase = require('../base/request')
const ResponseBase = require('../base/response')

const event = Symbol('Serverless-event')
const context = Symbol('Serverless-context')
const callback = Symbol('Serverless-callback')


class Request extends RequestBase {
	constructor(...args) {
		super()

		this[event] = args[0]
		this[context] = args[1]
		this[callback] = args[2]

	}

}



class Response extends ResponseBase {
	constructor(...args) {
		super()

		this[event] = args[0]
		this[context] = args[1]
		this[callback] = args[2]

	}

}


module.exports = {
	Request,
	Response,
}