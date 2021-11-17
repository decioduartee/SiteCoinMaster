require('../models/SuperUsuario');
require('../models/EmailUsuario');

const mongoose  = require("mongoose"),
SuperUsuarios = mongoose.model('superusuarios'),
EmailUsuarios = mongoose.model('emailusuarios')
bcrypt = require('bcryptjs'),
passport = require('passport'),
validaSchemaCadastro = require('../config/validaSchema')

module.exports = {
    async getLogin(req, res) {
        res.render("admin/login")
    },

    async postLogin(req, res, next) {
        passport.authenticate("local", {
            successRedirect: "/admin/painel",
            failureRedirect: "/admin",
            failureFlash: true
        })(req, res, next)
    },

    async getSair(req, res) {
        req.logout()
        req.flash("success_msg", "Deslogado com sucesso!")
        res.redirect("/admin")
    },

    async getRegistro(req, res) {
        res.render("admin/registro")
    },

    async postRegistro(req, res) {
        const user = req.body,
        valida = validaSchemaCadastro.validate({ nome: user.nomeRegistro, email: user.emailRegistro, senha: user.senhaRegistro1});

        if(!valida.error == false) {
            req.flash("error_msg", "Dados invalidos, Tente novamente!")
            res.redirect("/admin/registro")
        } else {
            SuperUsuarios.findOne({email: user.emailRegistro}).then((superusuario) => {
                if(superusuario) {
                    req.flash("error_msg", "Já existe uma conta com esse email cadastrada em nosso sistema!")
                    res.redirect("/admin/registro")
                } else {
                    const novoSuperUsuario = new SuperUsuarios({
                        nome: user.nomeRegistro,
                        email: user.emailRegistro,
                        senha: user.senhaRegistro1
                    })
                    bcrypt.genSalt(10, (erro, salt) => {
                        bcrypt.hash(novoSuperUsuario.senha, salt, (erro, hash) => {
                            if(erro) {
                                req.flash("error_msg", "Houve um erro durante o salvamento") 
                                res.redirect("/admin/registro")
                            }
                            novoSuperUsuario.senha = hash
                            novoSuperUsuario.save().then(() => {
                                req.flash("success_msg", "Conta registrada com sucesso!")
                                res.redirect("/admin")
                            }).catch((err) => {
                                req.flash("error_msg", "Houve um erro ao criar usuário, tente novamente!")
                                res.redirect("/admin/registro")
                            })
                        })
                    })
                }
            }).catch((err) => {
                req.flash("error_msg", "Houve um erro interno!")
                res.redirect("/admin/registro")
            })
        }
    },

    async getPainel(req, res) {
        res.render("admin/homePainel")
    },

    async getUsuarios(req, res) {
        EmailUsuarios.find().sort({data: -1}).lean().then((email) => {
            res.render("admin/usuarios", {email: email})
        })
    },

    async getSuperUsuarios(req, res) {
        SuperUsuarios.find().sort({cargo: -1}).lean().then((dados) => {
            res.render("admin/superUsuarios", {dados: dados})
        })
    }
}