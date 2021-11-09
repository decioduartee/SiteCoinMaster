require('../models/ListaDeDadosBot')
require('../models/EmailUsurios')
const mongoose  = require("mongoose"),
      DadosBot   = mongoose.model('botdados'),
      EmailUsurios = mongoose.model('emailUsuarios')

module.exports = {
    async getHome(req, res) {
        res.render("index")
    },

    async getGiros(req, res) {
        DadosBot.find().sort({dataDaURL: -1}).lean().then((dados) => {
            function list() {
                let arrayDados = [],
                novaLista = dados.reduce(function(acumulador, listDados) {
                    if(!acumulador[listDados.dataDaURL]) {
                      acumulador[listDados.dataDaURL] = []
                    }
                    acumulador[listDados.dataDaURL].push(listDados)
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
        EmailUsurios.findOne({email: req.body.notificaEmail}).then((email) => {
            if(email) {
                req.flash("error_msg", "Email já registrado! tente outro")
                res.redirect("/")
            } else {
                const novoEmail = new EmailUsurios({
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