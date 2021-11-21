const express = require('express');
const compression = require('compression');
const app = express();
app.use(compression());

app.use(express.static(__dirname + '/dist'));

// Serve the files on port 8080.
app.listen(8080, function () {
	console.log('Example app listening on port 8080!\n');
});
