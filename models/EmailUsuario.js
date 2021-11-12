const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const EmailUsuario = new Schema({
    email: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("emailusuarios", EmailUsuario)