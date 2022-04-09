const axios = require("axios");
const Valid = process.env.WEBHOOK_URL;
const InValid = process.env.CHANNEL;
module.exports = sendSlackMessage = (message) => {
  axios
    .post(WEBHOOK_URL, {
      channel: CHANNEL,
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
