import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendPriceAlert = async (email, { productTitle, currentPrice, targetPrice, productUrl }) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Price Alert: ${productTitle} is now $${currentPrice}`,
    html: `
      <h2>Price Alert</h2>
      <p>Good news! The price for ${productTitle} has dropped to $${currentPrice}.</p>
      <p>Your target price was: $${targetPrice}</p>
      <p><a href="${productUrl}">View Product</a></p>
    `
  };

  await transporter.sendMail(mailOptions);
};

export const sendBusinessApplicationNotification = async (email, status) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: `Business Application ${status.toUpperCase()}`,
    html: `
      <h2>Business Application Update</h2>
      <p>Your application has been ${status}.</p>
      ${status === 'approved' 
        ? '<p>Our team will contact you shortly with next steps.</p>' 
        : '<p>Thank you for your interest.</p>'}
    `
  };

  await transporter.sendMail(mailOptions);
};