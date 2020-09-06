'use strict'

/**
 * 判断一个对象是否是 Koa 的实例
 * 	（比较粗的判断方式，能防开发者手误，不防恶意绕开）
 * @param {object} obj 
 */
function isInstanceOfKoa(obj) {
	if (typeof obj !== 'object') return false
	if (Object.getPrototypeOf(obj).constructor.name !== 'Application') return false
	if (typeof obj.callback !== 'function') return false
	return true
}



module.exports = {
	isInstanceOfKoa,
}
