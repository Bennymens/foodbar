const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, subject, number, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Configure your email service
    // For production, use environment variables for credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || "rockybd1995@gmail.com",
      subject: subject || "New Contact Form Submission",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Contact Form Submission</title>
          </head>
          <body>
            <table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
              <thead style="text-align: center;">
                <tr>
                  <td style="border:none; padding: 20px;" colspan="2">
                    <h2 style="color: #f42f2c;">New Contact Form Submission</h2>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border:none; padding: 10px;"><strong>Name:</strong></td>
                  <td style="border:none; padding: 10px;">${name}</td>
                </tr>
                <tr>
                  <td style="border:none; padding: 10px;"><strong>Email:</strong></td>
                  <td style="border:none; padding: 10px;">${email}</td>
                </tr>
                ${
                  number
                    ? `
                <tr>
                  <td style="border:none; padding: 10px;"><strong>Phone:</strong></td>
                  <td style="border:none; padding: 10px;">${number}</td>
                </tr>
                `
                    : ""
                }
                <tr>
                  <td style="border:none; padding: 10px;"><strong>Subject:</strong></td>
                  <td style="border:none; padding: 10px;">${subject || "No subject"}</td>
                </tr>
                <tr>
                  <td colspan="2" style="border:none; padding: 20px;">
                    <strong>Message:</strong><br><br>
                    ${message}
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `,
      replyTo: email,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};
