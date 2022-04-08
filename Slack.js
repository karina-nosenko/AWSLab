const axios = require('axios');

module.exports = sendSlackMessage = (message) => {
	axios
    .post(
        process.env.WEBHOOK_URL,
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