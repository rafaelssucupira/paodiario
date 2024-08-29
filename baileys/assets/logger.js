const pretty = require('pino-pretty')
const optsPretty = {
	colorize: true,
	levelFirst :true
}
const log = require("pino")( pretty(optsPretty) );
module.exports = log;
