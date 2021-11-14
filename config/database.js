const mongoose   =  require('mongoose'); 
function connectToDatebase() {
    mongoose.Promise = global.Promise
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }).then(() => {
        console.log(`📦 Conectado com sucesso ao banco de dados!`);
    }).catch((err) => {
        console.log(`❌ Erro ao se conectar ao banco de dados: ${err}`)
    })
}
module.exports = connectToDatebase;