const path = require('path');

module.exports = {
	validFilename: (fileName) => {
		return path.extname(fileName) === '.csv';
	},
	validContent: (content) => {
		return content.indexOf('Lab') === 0;
	}
};