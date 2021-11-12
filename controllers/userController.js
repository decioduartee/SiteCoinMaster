require('../models/ListaDeDadosBot')
require('../models/EmailUsuario')
const mongoose  = require("mongoose"),
      DadosBot   = mongoose.model('botdados'),
      EmailUsuarios = mongoose.model('emailusuarios')

module.exports = {
    async getHome(req, res) {
        res.render("index")
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
        EmailUsuarios.findOne({email: req.body.notificaEmail}).then((email) => {
            if(email) {
                req.flash("error_msg", "Email já registrado! tente outro")
                res.redirect("/")
            } else {
                const novoEmail = new EmailUsuarios({
                    email: req.body.notificaEmail
                })
                novoEmail.save().then(() => {
                    req.flash("success_msg", "Email registrada com sucesso!")
                    res.redirect("/")
                }).catch((err) => {
                    req.flash("error_msg", "Houve um erro interno")
                    res.redirect("/")
                })
            }
        })
    }
}