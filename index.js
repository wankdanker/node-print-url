var Printer = require('node-lp')
	, pdf = require('html-pdf')
	, axios = require('axios')
	;

module.exports = print;

/**
 *
 *
 * @param {Object|String} [options]
 * @param {String} options.url
 * @param {String} options.printer
 * @param {Function} cb
 * @returns
 */
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

	axios(options.url).then(function (response) {
		pdf.create(response.data, options.page).toBuffer(function (err, buffer) {
			if (err) {
				return cb(err);
			}

			var lp = new Printer(options.printer);

			lp.queue(buffer, cb);
		});
	}).catch(cb);
}
