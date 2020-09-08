'use strict'

module.exports = class Socket {
	constructor(remoteAddress, protocol) {
		this.remoteAddress = remoteAddress || '0.0.0.0'

		if (protocol === 'https' || protocol === 'https:') {
			this.encrypted = true
		} else {
			this.encrypted = false
		}
	}
}
