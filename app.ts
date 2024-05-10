import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración básica para Nodemailer
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 587,               // true for 465, false for other ports
    host: "smtp.mailersend.net",
       auth: {
            user: 'MS_NEHdG6@trial-3zxk54vy8rp4jy6v.mlsender.net@gmail.com',
            pass: 'yfJ2UsvHwadI1OeA',
         },
    secure: true,
    });
// Ruta para enviar el correo electrónico
app.get('/send-email', (req: Request, res: Response) => {
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
    } else {
      console.log('Correo enviado:', info.response);
      res.send('Correo enviado correctamente');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
