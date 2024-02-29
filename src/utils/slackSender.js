import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const slackSender = async (text) => {
  const data = {
    channel: process.env.SLACK_CHANNEL_ID,

    attachments: [
      {
        title: `오늘 TIL 미제출자 :`,
        text: text,
      },
    ],
  };

  const config = {
    method: "post",
    url: "https://slack.com/api/chat.postMessage",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
    },
    data,
  };

  const result = await axios(config)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });

  return result;
};

export default slackSender;
