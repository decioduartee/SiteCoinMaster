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
    }/* ,
    dataDeRegistro:{
        type: String,
        required: true
    } */
})

mongoose.model("botdados", DadosBot)