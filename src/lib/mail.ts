import { Resend } from "resend";
// import emailjs from "@emailjs/browser";
import nodemailer from "nodemailer";

const domin = process.env.NEXT_PUBLIC_APP_URL;
// const resend = new Resend(process.env.RESEND_API_KEY);

// await resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: email,
//   subject: "Confirm your email",
//   html: `<p>Click <a href="${confrmLink}">here</a> to confirm email. </p>`,
// });

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const confrmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

//   // Check if the code is running in a browser environment
//   if (typeof window !== "undefined") {
//     emailjs.send(
//       "service_hjniju7",
//       "template_67s1q4j",
//       {
//         from_name: "AUTH",
//         to_name: "Yahia",
//         from_email: "laizmain@gmail.com",
//         to_email: email,
//         message: confrmLink,
//       },
//       "sjkKgFPEsNWXI9l7v"
//     );
//   } else {
//     console.error("Email sending is not supported in this environment.");
//   }
// };

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  // Create a transporter using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: "laizmain@gmail.com", // Sender address
    to: email, // Receiver address
    subject: "2FA Code", // Subject line
    text: `Please verify your email`, // Plain text body
    html: `<p>Your 2FA code: ${token}`,
  };
  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domin}/auth/new-verification?token=${token}`;

  // Create a transporter using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: email, // Receiver address
    subject: "Email Verification", // Subject line
    text: `Please verify your email by clicking on the following link: ${confirmLink}`, // Plain text body
    html: `<p>Please verify your email by clicking on the following link: <a href="${confirmLink}">${confirmLink}</a></p>`, // HTML body
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};

export const sendPassworResetEmail = async (email: string, token: string) => {
  const resetLink = `${domin}/auth/new-password?token=${token}`;

  // Create a transporter using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the email service
    auth: {
      user: process.env.EMAIL, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.EMAIL, // Sender address
    to: email, // Receiver address
    subject: "Reset your password", // Subject line
    text: `Please reset your password by clicking on the following link: ${resetLink}`, // Plain text body
    html: `<p>Please reset your password by clicking on the following link: <a href="${resetLink}">${resetLink}</a></p>`, // HTML body
  };

  // Send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: " + error);
  }
};
