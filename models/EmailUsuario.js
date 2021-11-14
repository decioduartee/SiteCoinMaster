const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const EmailUsuario = new Schema({
    email: {
        type: String,
        require: true
    },
    data: {
        type: String,
        require: true
    }
})

mongoose.model("emailusuarios", EmailUsuario)