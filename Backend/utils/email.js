import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, html) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS   
        },
    });

    const info = await transporter.sendMail({
        from: `"Task Manager" <${process.env.EMAIL_USER}>`, 
        to: email, 
        subject: subject, 
        html: html, 
    });

    return info;
};