// Carregando módulos
const express    =  require('express'),
      handlebars =  require('express-handlebars'),
      bodyParser =  require('body-parser'),
      app        =  express(),
      moment     =  require("moment"),
      session    =  require("express-session"),
      passport   = require('passport'),
      flash      =  require("connect-flash"),
      admin      =  require("./routes/admin"),
      moderador  =  require("./routes/moderador"),
      usuario    =  require("./routes/usuario"),
      connectToDatebase = require("./config/database"),
      ligarBot        = require("./config/bot"),
      middleware = require("./middleware/principal");
require("dotenv").config();
require("./config/auth")(passport)
connectToDatebase(); 
ligarBot()
// Configuraçẽs
    // Sessao
    app.use(session({
        secret: process.env.SESSION_SECRET || "chavesecreta",
        resave: true,
        saveUninitialized: true,
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    // Middleware
    app.use(middleware.principal)
    // Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());
    // Handlebars
        app.engine('handlebars', handlebars({
            defaultLayout: 'main',
            helpers: {
                // Formatando Data
                formatDate: (data) => {
                    return moment(data).format("DD/MM/YYYY") //hh:mm:ss A
                }
            }
        }));
        app.set('view engine', 'handlebars');
    // Public
        app.use(express.static("public"));
// Rotas Principais
    app.use("/", usuario)
    app.use("/admin", admin)
    app.use("/moderador", moderador)
    // Erro 404
    app.use((req, res) => {
        res.render("partials/_404")
    })
// Conexao
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🦾 Backend iniciado com sucesso`);
});