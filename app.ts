import express, { Request, Response } from 'express';
import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del cliente de MailerSend
const mailerSend = new MailerSend({
  apiKey:"mlsn.4d13ddae79d83030088d581998ebce14a0c4c1c63ad3f90fd5032b3df9c1deeb", // Clave API proporcionada por MailerSend
});

// Función para enviar el correo electrónico
const enviarCorreo = async () => {
  try {
    // Detalles del remitente
    const sentFrom = new Sender("MS_Y8EZai@trial-3zxk54vy8rp4jy6v.mlsender.net", "Nico");

    // Detalles del destinatario
    const recipients = [
      new Recipient("nicolasaddamo1@gmail.com", "Nombre del Destinatario")
    ];

    // Parámetros del correo electrónico
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("Este es el Asunto")
      .setHtml("<strong>Este es el contenido HTML</strong>")
      .setText("Este es el contenido de texto");

    // Enviar el correo electrónico
    const response = await mailerSend.email.send(emailParams);

    console.log('Correo enviado:', response);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error; // Lanzar el error para manejarlo en el middleware de error de Express
  }
};

// Ruta para enviar el correo electrónico cuando se accede a "/send"
app.get('/send', async (req: Request, res: Response) => {
  try {
    await enviarCorreo(); // Llamar a la función para enviar el correo electrónico
    res.send('Correo enviado correctamente'); // Responder con un mensaje de éxito
  } catch (error) {
    res.status(500).send('Error al enviar el correo'); // Responder con un mensaje de error
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
