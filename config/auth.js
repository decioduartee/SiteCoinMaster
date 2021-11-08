const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
require("../models/SuperUsuario")
const superUsuario = mongoose.model("superusuarios")

module.exports = function(passport) {
    passport.use(new localStrategy({usernameField: 'emailLogin', passwordField: 'senhaLogin'}, (email, senha, done) => {
        superUsuario.findOne({email: email}).then((superusuario) => {
            if(!superusuario) {
                return done(null, false, {message: "Está conta não existe"})
            }
            bcrypt.compare(senha, superusuario.senha, (erro, batem) => {
                if(batem) {
                    return done(null, superusuario)
                } else {
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))
    passport.serializeUser((superusuario, done) => {
        done(null, superusuario)
    })
    passport.deserializeUser((id, done) => {
        superUsuario.findById(id, (err, superusuario) => {
            done(err, superusuario)
        })
    })
}