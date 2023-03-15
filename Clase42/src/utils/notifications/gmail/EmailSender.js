import {createTransport} from 'nodemailer';
import logger from '../../loggers/Log4jsLogger.js';
import dotenv from 'dotenv';

dotenv.config({path: '../../.env' });

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD
    }
});

const gmailOptions = (emailSubject, htmlTemplate) => {
    return {
        from: process.env.GMAIL_ACCOUNT,
        to: ["someAccount@gmail.com"],
        subject: emailSubject,
        html: htmlTemplate
    }
}

const htmlNewUserTemplate = (id, date) => {
    return `
    <h2>¡Usuario Creado!</h2>
    <p>Gracias por registrarse</p>
    <ul>
        <li><strong>UUID:</strong> ${id}</li>
        <li><strong>FECHA:</strong> ${date}</li>
    </ul>
    `
};

export async function sendGmail(subject, htmlTemplate) {
    try {
        const mailOptions = gmailOptions(
            subject,
            htmlTemplate
        );
        
        await transporter.sendMail(mailOptions);
        logger.info(`Email sent`)
    } catch (error) {
        logger.error(error);
    }
}

