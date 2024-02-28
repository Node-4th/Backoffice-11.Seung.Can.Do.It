import axios from "axios";
const slackSender = async (text) => {
  const data = {
    channel: "backoffice",
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
      Authorization: `Bearer xoxb-6671511498391-6708577263974-UimwzRXzuuaTQUb3qqX8Kstl`,
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
