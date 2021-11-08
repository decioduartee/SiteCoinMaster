require('../models/SuperUsuario')
const mongoose  = require("mongoose"),
      SuperUsuarios   = mongoose.model('superusuarios'),
      bcrypt    = require('bcryptjs'),
      passport   = require('passport');

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
        var erros = []
        if(!req.body.nomeRegistro || typeof req.body.nomeRegistro === '') {
            erros.push({texto: "Nome invalido"})
        }
        if(!req.body.emailRegistro || typeof req.body.emailRegistro  === '') {
            erros.push({texto: "E-mail invalido"})
        }
        if(!req.body.senhaRegistro1 || typeof req.body.senhaRegistro1 === '') {
            erros.push({texto: "Senha invalido"})
        }
        if(req.body.senhaRegistro1.length <= 4) {
            erros.push({texto: "Senha muito curta"})
        }
        if(req.body.senhaRegistro1 !== req.body.senhaRegistro2) {
            erros.push({texto: "As senhas são diferentes, tente novamente"})
        }
        if(erros.length > 0) {
            res.render("admin/registro", {erros: erros})
        } else {
            SuperUsuarios.findOne({email: req.body.emailRegistro}).then((superusuario) => {
                if(superusuario) {
                    req.flash("error_msg", "Já existe uma conta com esse email cadastrada em nosso sistema!")
                    res.redirect("/admin/registro")
                } else {
                    const novoSuperUsuario = new SuperUsuarios({
                        nome: req.body.nomeRegistro,
                        email: req.body.emailRegistro,
                        senha: req.body.senhaRegistro1
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
        res.render('admin/painel')
    }
}