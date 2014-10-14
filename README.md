print-url
---------

Given a URL, fetch the contents of URL, convert to PDF then print with LP.

install
-------

```bash
npm install print-url
```

example
-------

```js
var printUrl = require('print-url');

printUrl('http://mysite.com/partner/invoice/12345.html', function (err, jobid) {
	if (err) {
		return console.log('Error encountered', err);
	}

	console.log('Job queued for printing', jobid);
});
```

license
-------

MIT
