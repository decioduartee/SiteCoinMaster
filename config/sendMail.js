require("dotenv").config();
const mailer = require("nodemailer");

const html = `
    <html> 
        <head>
        <title>
            'cliquecoin'
        </title>
        <style>
            #titulo__assunto {
                width: 100%;
                text-align: center;
            }

            h3 {
                font-size: 2.2rem;
                font-family: system-ui;
                font-weight: bold;
                color: #2d333b;
                margin: 1rem;
            }

            h3 span {
                color: #f5062a;
                font-size: 1.5rem;
            }

            p {
                font-size: .95rem;
                font-weight: 500;
                font-family: inherit;
                color: #000000;
                line-height: 1rem;
            }

            #btnVoltarCliquecoin {
                width: 8rem !important;
                height: 2.5rem !important;
                background: #f5062a !important;
                color: white !important;
                text-decoration: none !important;
                border-radius: 8px !important;
                position: relative !important;
                text-align: center !important;
                display: inline-block !important;
                justify-content: center !important;
                align-items: center !important;
                cursor: pointer !important;
                font-size: 0.7rem !important;
                font-weight: bold !important;
                text-transform: uppercase !important;
                line-height: 40px;
            }
        </style>
        </head>
        <body>
            <div id="titulo__assunto">
                <h3>Bem-vindo(a) ao Clique<span>Coin</span></h3>
                <p>Agora você vai receber todas as Novidades e Giros<br> sempre em primeira mão!</p>
            </div>
        </body>
    </html>
`

/* const html = `
    <html> 
        <head>
        <title>
            'cliquecoin'
        </title>
        <style>
            section {
                position: relative;
                width: 100%;
                height: 100%
            }

            #imagemCliquecoin {
                width: 100%;
                text-align: center;
            }

            #imagemCliquecoin img {
                width: 7rem;
                height: 7rem;
                object-fit: cover;
            }

            #titulo__assunto {
                width: 100%;
                text-align: center;
            }

            h3 {
                font-size: 2.2rem;
                font-family: system-ui;
                font-weight: bold;
                color: #2d333b;
                margin: 1rem;
            }

            h3 span {
                color: #f5062a;
                font-size: 1.5rem;
            }

            p {
                font-size: .95rem;
                font-weight: 500;
                font-family: inherit;
                color: #000000;
                line-height: 1rem;
            }

            #btnVoltarCliquecoin {
                width: 8rem !important;
                height: 2.5rem !important;
                background: #f5062a !important;
                color: white !important;
                text-decoration: none !important;
                border-radius: 8px !important;
                position: relative !important;
                text-align: center !important;
                display: inline-block !important;
                justify-content: center !important;
                align-items: center !important;
                cursor: pointer !important;
                font-size: 0.7rem !important;
                font-weight: bold !important;
                text-transform: uppercase !important;
                line-height: 40px;
            }
        </style>
        </head>
        <body>
            <section>
                <div id="imagemCliquecoin">
                    <img src='https://i.pinimg.com/originals/84/ec/6f/84ec6fd2b40f63cf0b7f7ab45e847ae9.png'></img>
                </div>
                <div id="titulo__assunto">
                    <h3>Bem-vindo(a) ao Clique<span>Coin</span></h3>
                    <p>Agora você vai receber todas as Novidades e Giros<br> sempre em primeira mão!</p>
                    <a id="btnVoltarCliquecoin"href="www.cliquecoin.com.br">Volte para o site</a>
                </div>
            </section>
        </body>
    </html>
` */

const transporter = mailer.createTransport({
    service: 'gmail', /* process.env.EMAIL_NOMEGMAIL,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    requireTLS: true, */
    auth: {
        user: process.env.EMAIL_GMAIL,
        pass: process.env.EMAIL_SENHA
    },
    /* tls: {
        rejectUnauthorized: false
    }, */
});

async function InfoEnviarEmail(email) {
    await transporter.sendMail({
        form: process.env.EMAIL_GMAIL,
        to: email,
        subject: "Obrigado por fazer parte de CliqueCoin!",
        html: html
    }).then((message) => {
        //console.log(message)
    }).catch((erro) => {
        //console.log(erro)
    })
}

module.exports = InfoEnviarEmail;