// import { createTransport } from 'nodemailer';
import * as nodemailer from 'nodemailer';

export class Mailer {
  public static async sendEmailMessage(
    emails: string | string[],
    question: string,
    message: string,
    html?: string,
  ) {
    const username = process.env.MAIL_USER;
    const password = process.env.MAIL_PASS;
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: username,
        pass: password,
      },
    });

    const mails = {
      from: String(process.env.MAIL_USER),
      to: emails === 'self' ? String(process.env.MAIL_USER) : emails,
      subject: question,
      text: message,
      html: html,
    };

    await transporter.sendMail(mails, (err, data) => {
      if (err) {
        console.log(err);
        throw err;
      }
      return data;
    });
  }
}
