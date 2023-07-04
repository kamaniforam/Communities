import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = (to: string, body: string) => {
  return twilioClient.messages
    .create({
      body,
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
    })
    .then((message) => console.log(message))
    .catch((err) => console.log(err));
};
