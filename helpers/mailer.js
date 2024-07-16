const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const auth_link = "https://developers.google.com/oauthplayground";
const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH, APP_PASSWORD } =
  process.env;

const auth = new OAuth2(MAILING_ID, MAILING_SECRET, MAILING_REFRESH, auth_link);

exports.sendVerifiedEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      type: "OAuth2",
      user: EMAIL,
      pass: APP_PASSWORD,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });

  const info = {
    from: EMAIL,
    to: email,
    subject: "Social App Verification",
    html: `<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Email Verification</title> </head> <body style=" margin: 0; padding: 0; font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; " > <div style=" width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); " > <div style="text-align: center; margin-bottom: 20px"> <h1 style="color: #333333">Email Verification</h1> </div> <div style=" padding: 20px; background-color: #f9f9f9; border-radius: 6px; margin-bottom: 20px; " > <p>Dear ${name},</p> <p> Thank you for signing up. Please verify your email address by clicking the link below: </p> <p> <a href=${url} style=" background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; " >Verify Email</a > </p> <p> If you didn't create an account, you can safely ignore this email. </p> </div> <div style="text-align: center; color: #666666; font-size: 12px"> </div> </div> </body></html>`, // html body
  };
  transporter.sendMail(info, (err, res) => {
    if (err) return err;
    return res;
  });
};
