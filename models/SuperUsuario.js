const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const SuperUsuario = new Schema({
    nome: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cargo: {
        type: String,
        default: "moderador"
    },
    senha: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("superusuarios", SuperUsuario)