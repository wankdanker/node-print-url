var Printer = require('lp-client')
	, pdf = require('html-pdf')
	, request = require('request')
	;

module.exports = print;

function print(options, cb) {
	if (typeof options === 'function') {
		cb = options;
		options = null;
	}

	if (typeof options === 'string') {
		options = {
			url : options
		};
	}

	if (!options) {
		return cb && cb(new Error('url string or options object is required'));
	}

	if (!options.url) {
		return cb && cb(new Eror('options.url is required'));
	}

	request(options.url, function (err, response, body) {
		if (err) {
			return cb(err);
		}

		pdf.create(body, options.page, function (err, buffer) {
			if (err) {
				return cb(err);
			}

			var lp = new Printer(options.printer);

			lp.queue(buffer, cb);
		});
	});
}
