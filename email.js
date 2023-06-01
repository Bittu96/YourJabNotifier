const mailjet = require("node-mailjet").connect(
  "50cc7ec3d0b3e76a8913425a74f1f8c9",
  "baf6579ee9c047d8a9ef91d7b8f046d8"
);

const sendMail = mailjet.post("send", { version: "v3.1" }).request({
  Messages: [
    {
      From: {
        Email: "blazingbittu1996@gmail.com",
        Name: "Mrudul",
      },
      To: [
        {
          Email: "mrudulkatla@gmail.com",
          Name: "Mrudul",
        },
      ],
      Subject: "Greetings from Mailjet.",
      TextPart: "My first Mailjet email",
      HTMLPart:
        "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      CustomID: "AppGettingStartedTest",
    },
  ],
});

sendMail
  .then((result) => {
    console.log(result.body);
  })
  .catch((err) => {
    console.log(err.statusCode);
  });
