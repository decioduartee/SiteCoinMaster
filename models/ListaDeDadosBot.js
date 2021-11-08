const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const DadosBot = new Schema({
    titulo: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    },
    dataDaURL: {
        type: String,
        require: true
    },
    dataDeRegistro:{
        type: Date,
        default: Date.now(),
        required: true
    }
})

mongoose.model("dadosbot", DadosBot)