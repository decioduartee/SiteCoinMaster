require('../models/ListaDeDadosBot')
require('../models/EmailUsuario')

const mongoose  = require("mongoose"),
DadosBot   = mongoose.model('botdados'),
EmailUsuarios = mongoose.model('emailusuarios'),
moment = require('moment'),
dataLocal = moment(new Date()).format("DD/MM/YYYY"),
enviarEmail = require('../config/sendMail'),
validaSchemaFooter = require('../config/validaSchema');

module.exports = {
    async getHome(req, res) {
        res.render("inicio")
    },

    async getGiros(req, res) {
        DadosBot.find().sort({dataDeRegistro: -1}).lean().then((dados) => {
            function list() {
                let arrayDados = [],
                novaLista = dados.reduce(function(acumulador, listDados) {
                    if(!acumulador[listDados.dataDeRegistro]) {
                      acumulador[listDados.dataDeRegistro] = []
                    }
                    acumulador[listDados.dataDeRegistro].push(listDados)
                    return acumulador
                }, {});
                for (let data in novaLista) {
                    arrayDados.push({
                        data: data,
                        lista: novaLista[data]
                    })  
                }
                return arrayDados;
            }
            res.render("usuario/homeGiros", {dados: list()})
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    },

    async postNotifica(req, res) {
        const userEmail = req.body.notificaEmail,
        valida = validaSchemaFooter.validate({ email: userEmail });

        if(!valida.error == false) {
            req.flash("error_msg", "Email invalido, Tente novamente!")
            res.redirect("/")
        } else {
            EmailUsuarios.findOne({email: userEmail}).then((email) => {
                if(email) {
                    req.flash("error_msg", "Email já registrado! tente outro")
                    res.redirect("/")
                } else {
                    const novoEmail = new EmailUsuarios({
                        email: userEmail,
                        data: dataLocal
                    })
                    novoEmail.save().then(() => {
                        enviarEmail(userEmail)
                        req.flash("success_msg", "Sucesso! Check seu email, ou area de spam.")
                        res.redirect("/")
                    }).catch((err) => {
                        req.flash("error_msg", "Houve um erro interno")
                        res.redirect("/")
                    })
                }
            })
        }
    }
}