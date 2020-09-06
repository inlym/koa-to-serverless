'use strict'

const getTriggerType = require('../trigger/trigger-type')
const { isInstanceOfKoa } = require('../helper/koa')


module.exports = function launch(app, options) {
	// options 参数暂时没用到，预留。后期用于进行初始化配置。

	// 检查 app 是否是 Koa 的实例
	if (!isInstanceOfKoa(app)) throw new Error('无法识别的框架! 请使用由Koa框架实例化的app进行启动。')

	// 禁用 koa-bodyparser, 防止请求的 body 为空时，进入到 bodyParser 的后续流程中
	app.context.disableBodyParser = true


	return function handler(...args) {
		// 模拟原生的 req 和 res
		const { req, res } = generateMessage(...args)

		// 插入 body
		app.request.rawBody = req.body
		app.request.body = jsonify(req.body)

		// 回调 Koa
		app.callback()(req, res)
	}
}


function generateMessage(...args) {
	const triggerName = getTriggerType(...args)
	const { Request, Response } = require('../trigger/' + triggerName)
	const req = new Request(...args)
	const res = new Response(...args)

	req.init(req.parse())

	return { req, res }
}


function jsonify(body) {
	let json = ''
	try {
		json = JSON.parse(body)
	} catch (err) {
		json = body
	}
	return json
}
