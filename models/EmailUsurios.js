const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const emailUsuario = new Schema({
    email: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("emailUsuarios", emailUsuario)