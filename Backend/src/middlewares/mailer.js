import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const welcomeMail = async (user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Welcome to Hmb platform",
    html: `<div style="background-color:black;color:white;padding:20px;"><h1>Hello ${user.firstName} Welcome to Hmb platform </h1><p>
        You have successfully created an account on Hmb platform. <br>You can now login to your account and start using our services.
        </p>
        <p>Best Regards<br>Team HMB</p></div>
        `,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.log(error.message);
  }
};
