const cron = require('node-cron');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

const directoryPath = path.join(__dirname, 'Uploads');

const validFilename = (fileName) => {
	return path.extname(fileName) === '.csv';
};

const validContent = (content) => {
	return content.indexOf('Lab') === 0;
};

const sendSlackMessage = (message) => {
	axios
	.post(
		'https://hooks.slack.com/services/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',
		{
			channel: '#test',
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: message,
					},
				},
				],
		}
	)
	.then(() => {
		console.log('Slack message was sent.');
	})
	.catch(() => {
		console.log('Error while sending Slack message.');
	});
};

const scanDirectory = () => {
	fs.readdir(directoryPath, (error, files) => {
		if(error) {
			return console.log('Unable to scan directory: ' + error);
		}

		files.forEach((fileName) => {
			fs.readFile(`${directoryPath}/${fileName}`, 'utf-8', (error, data) => {
				if (error) {
					console.log(error);
				} else {
					const content = data.toString();
					if (validFilename(fileName) && validContent(content)) {
						// Move the file to S3 valid
						console.log(`Moving the ${ fileName } file to S3 valid.`);
					} else {
						// Move the file to S3 invalid
						console.log(`Moving the  ${ fileName } file to S3 invalid.`);
						sendSlackMessage(`${ fileName } format error. The file was sent to S3 invalid.`);
                                        }
				}
			});
		});

	});
};

cron.schedule('* * * * *', scanDirectory);
