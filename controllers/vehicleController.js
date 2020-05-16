var fs = require('fs');

exports.index = function (req, res) {
	var filename = 'website_cars.json';
	var readStream = fs.createReadStream(filename);
	readStream.on('open', function () {
		readStream.pipe(res);
	});
}