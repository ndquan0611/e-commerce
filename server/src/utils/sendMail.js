const nodemailer = require('nodemailer');

module.exports = {
    sendMail: async function ({ email, html }) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_NAME,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });
            const info = await transporter.sendMail({
                from: '"E-Commerce " <no-reply@ecommerce.com>', // sender address
                to: email, // list of receivers
                subject: 'Forgot password', // Subject line
                html: html, // html body
            });

            return info;
        } catch (error) {
            throw new Error(error);
        }
    },
};
