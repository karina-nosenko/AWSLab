const axios = require("axios");
module.exports = sendSlackMessage = (message) => {
  axios
    .post(process.env.WEBHOOK_URL, {
      channel: process.env.CHANNEL,
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: message,
          },
        },
      ],
    })
    .then(() => {
      console.log("Slack message was sent.");
    })
    .catch((error) => {
      console.log(error.message);
    });
};
