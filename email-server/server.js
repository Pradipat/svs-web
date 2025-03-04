const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const fs = require("fs");

const app = express();
const port = 54321;

app.use(bodyParser.json());
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post('/send-email', async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    const transporter = nodemailer.createTransport({
        host: "email-smtp.ap-southeast-1.amazonaws.com",
        port: 465,
        secure: true,
        auth: {
            user: "AKIAWCMOY7UGLCZUM5LJ",
            pass: "BH9Lcy+CJYpaeNLY5GriHnLZvK7Ht6UC1c7XeoNCJbX1",
        },
    });

    try {
        let info = await transporter.sendMail({
            from: email,
            to: "info@siamvayupak.com",
            subject: "Hello ✔",
            html: `<b>Hello ${name}</b> \n contract: ${phone} \n message: ${message}`,
        });

        console.log("Message sent: %s", info.messageId);
        res.status(200).send({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: 'Error sending email' });
    }
});

// Apply Job API
app.post("/apply-job", upload.single("resume"), async (req, res) => {
    try {
      const { name, email } = req.body;
      const resumeFile = req.file; // Uploaded file
  
      if (!resumeFile) {
        return res.status(400).json({ error: "No file uploaded" });
      }
  
      // Read the uploaded file as a buffer
      const resumeData = fs.readFileSync(resumeFile.path);
  
      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "P0861719933@gmail.com", //🔧 HR Email
          pass: "sxfd qmst qotm qlus",  //🔧 SMTP password
        },
      });

      // Email to HR with attachment
      const mailToHR = {
        from: "P0861719933@gmail.com", //🔧 HR Email
        to: "P0861719933@gmail.com", //🔧 HR Email
        subject: "New Job Application",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
            <!-- ✅ HEADER -->
            <div style="background: #990000; padding: 20px; text-align: center; color: white; border-radius: 5px 5px 0 0;">
                <img src="https://siamvayupak.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogosvs-shadow.b277df0b.png&w=640&q=75" alt="SIAM VAYUPAK SOFTWARE" style="max-width: 150px; margin-bottom: 10px;">
                <h1 style="margin: 0; font-size: 22px;">Company HR Department</h1>
                <p style="margin: 0; font-size: 14px;">New Job Application Received</p>
            </div>

            <!-- ✅ BODY -->
            <div style="padding: 20px;">
                <h2 style="color: #333;">New Job Application Details</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p>A resume has been attached to this email for your review.</p>
            </div>

            <!-- ✅ FOOTER -->
            <div style="background: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 5px 5px;">
                <p style="margin: 0; font-size: 12px; color: #666;">© 2025 SIAM VAYUPAK SOFTWARE. All rights reserved.</p>
                <p style="margin: 0; font-size: 12px; color: #666;">+66 2 591 5565 | info@siamvayupak.com</p>
            </div>
            </div>
        `,
        attachments: [
          {
            filename: resumeFile.originalname || "resume.pdf",
            content: resumeData,
          },
        ],
      };
  
      // Thank-you email to the applicant
      const mailToApplicant = {
        from: "P0861719933@gmail.com", //🔧 HR Email
        to: email, // Applicant Email
        subject: "SIAM VAYUPAK SOFTWARE | Thank you for your application",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 5px;">
      
            <!-- ✅ HEADER WITH COMPANY LOGO -->
            <div style="background: #990000; padding: 20px; text-align: center; color: white; border-radius: 5px 5px 0 0;">
                <img src="https://siamvayupak.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogosvs-shadow.b277df0b.png&w=640&q=75" alt="SIAM VAYUPAK SOFTWARE" style="max-width: 150px; margin-bottom: 10px;">
                <h2 style="margin: 0;">Thank You for Your Application</h2>
            </div>

            <!-- ✅ EMAIL CONTENT -->
            <div style="padding: 20px; color: #333;">
                <p>Dear ${name},</p>
                <p>Thank you for applying to <strong>SIAM VAYUPAK SOFTWARE</strong>. We have received your resume and will review your application soon.</p>
                <p>We appreciate your interest in our company and will contact you if your qualifications match our requirements.</p>
                <p>Best regards,<br><strong>HR Team</strong></p>
            </div>

            <!-- ✅ FOOTER -->
            <div style="background: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 5px 5px;">
                <p style="margin: 0; font-size: 12px; color: #666;">© 2025 SIAM VAYUPAK SOFTWARE. All rights reserved.</p>
                <p style="margin: 0; font-size: 12px; color: #666;">+66 2 591 5565 | info@siamvayupak.com</p>
            </div>

          </div>
        `,
      };
  
      // Send both emails
      await Promise.all([
        transporter.sendMail(mailToHR),
        transporter.sendMail(mailToApplicant),
      ]);
  
      // Cleanup: Remove the uploaded file
      fs.unlinkSync(resumeFile.path);
  
      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }
  });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
