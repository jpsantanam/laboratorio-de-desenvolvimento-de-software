import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'joaomatheusaramuni@gmail.com',
        pass: 'hndu zuso sytv vhqu',
    },
});

export const sendEmail = async (to: string, subject: string, html: string, text?: string) => {
    try {
        const mailOptions = {
            from: '"Sistema de Moeda Estudantil" <joaomatheusaramuni@gmail.com>',
            to: to,
            subject: subject,
            text: text || html.replace(/<[^>]*>?/gm, ''),
            html: html,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email enviado com sucesso para:', to);
    } catch (error) {
        console.error('Erro ao enviar email:', error);
    }
};
