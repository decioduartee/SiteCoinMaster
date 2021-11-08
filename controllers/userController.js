require('../models/ListaDeDadosBot')
const mongoose  = require("mongoose"),
      DadosBot   = mongoose.model('dadosbot');

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

    },

    async get404(req, res) {
        res.send("Erro 404")
    }
}