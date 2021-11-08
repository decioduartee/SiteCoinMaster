/* const mailer = require("nodemailer")
const { google } = require("googleapis")
require("dotenv").config()
const OAuth2 = google.auth.OAuth2
const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET)
OAuth2_client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
const acessoToken = OAuth2_client.getAccessToken() */

/* const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: acessoToken
    }
})
module.exports = {
    sendResetEmail: async (email, nome, token) => {
        await transporter.sendMail({
            form: `DuarteDev <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Email do site Blogapp!",
            text: "mesagem de teste :3",
            html: `Ola ${nome}, segue o link para redefinir sua senha: <a href="${token}">Redefinir Senha<a>`
        }).then((message) => {}).catch((err) => {})
    }
} */