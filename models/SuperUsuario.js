const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      dataLocal = new Date().toLocaleString();

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
        type: String,
        default: dataLocal
    }
})

mongoose.model("superusuarios", SuperUsuario)