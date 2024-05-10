"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const mailersend_1 = require("mailersend");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Configuración del cliente de MailerSend
const mailerSend = new mailersend_1.MailerSend({
    apiKey: "mlsn.4d13ddae79d83030088d581998ebce14a0c4c1c63ad3f90fd5032b3df9c1deeb", // Clave API proporcionada por MailerSend
});
// Función para enviar el correo electrónico
const enviarCorreo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Detalles del remitente
        const sentFrom = new mailersend_1.Sender("MS_Y8EZai@trial-3zxk54vy8rp4jy6v.mlsender.net", "Nico");
        // Detalles del destinatario
        const recipients = [
            new mailersend_1.Recipient("nicolasaddamo1@gmail.com", "Nombre del Destinatario")
        ];
        // Parámetros del correo electrónico
        const emailParams = new mailersend_1.EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("Este es el Asunto")
            .setHtml("<strong>Este es el contenido HTML</strong>")
            .setText("Este es el contenido de texto");
        // Enviar el correo electrónico
        const response = yield mailerSend.email.send(emailParams);
        console.log('Correo enviado:', response);
    }
    catch (error) {
        console.error('Error al enviar el correo:', error);
        throw error; // Lanzar el error para manejarlo en el middleware de error de Express
    }
});
// Ruta para enviar el correo electrónico cuando se accede a "/send"
app.get('/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield enviarCorreo(); // Llamar a la función para enviar el correo electrónico
        res.send('Correo enviado correctamente'); // Responder con un mensaje de éxito
    }
    catch (error) {
        res.status(500).send('Error al enviar el correo'); // Responder con un mensaje de error
    }
}));
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
