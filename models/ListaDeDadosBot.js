const mongoose = require("mongoose"),
      Schema = mongoose.Schema,
      moment = require('moment'),
      dataLocal = moment(new Date()).format("DD/MM/YYYY");

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
        require: true,
        default: dataLocal
    },
    dataDeRegistro:{
        type: String,
        required: true
    }
})

mongoose.model("botdados", DadosBot)