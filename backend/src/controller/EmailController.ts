import { Request, Response } from "express";
import * as nodemailer from "nodemailer";

export class EmailController {
  async sendHealthIssueReport(req: Request, res: Response) {
    const { email, subject, message } = req.body;

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Set up email data
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    };

    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Email sent: " + info.response });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: error.toString() });
    }
  }
}
