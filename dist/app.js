"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Configuración básica para Nodemailer
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'nicolasaddamo1@gmail.com', // Cambia esto por tu dirección de correo electrónico
        pass: 'Olivia21', // Cambia esto por tu contraseña de correo electrónico
    },
});
// Ruta para enviar el correo electrónico
app.get('/send-email', (req, res) => {
    const mailOptions = {
        from: 'nicolasaddamo1@gmail.com',
        to: 'addamo.nicolas1991@gmail.com', // Cambia esto por la dirección de correo electrónico del destinatario
        subject: 'Prueba de envío de correo desde Express',
        text: 'Hola, este es un correo de prueba enviado desde un servidor Express.',
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            res.status(500).send('Error al enviar el correo');
        }
        else {
            console.log('Correo enviado:', info.response);
            res.send('Correo enviado correctamente');
        }
    });
});
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
