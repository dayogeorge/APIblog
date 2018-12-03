const fs = require('fs');

fs.readFile('','utf-8', function(err, contents) {
	console.log(contents);
});

console.log('Read complete!');