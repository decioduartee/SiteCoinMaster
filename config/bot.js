require('../models/ListaDeDadosBot')
const puppeteer = require('puppeteer'),
      mongoose  = require("mongoose"),
      DadosBot  = mongoose.model('botdados');
      moment    = require('moment'),
      dataLocal = moment(new Date()).format("DD/MM/YYYY");


async function ligarBot() {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox'],
    headless: true,
    timeout: 0
  });

  const page = await browser.newPage(); 
  await page.goto('https://www.8bpreward.win/2019/04/update-free-coin-master-reward-static.html?m=1#google_vignette', {
    waitUntil: 'load', 
    timeout: 0
  });
  
  const list = await page.evaluate(() => {
    const nodeListLinks = document.querySelectorAll('.post-body .sq-button.lg'),
    arrayLinks = [...nodeListLinks],
    list = arrayLinks.map(({innerText, href}) => ({innerText, href})),
    arrayDados = [];

    for (let i = 0; i < list.length; i++) {
      let editData,
          titulo = list[i].innerText,
          link = list[i].href,
          dataDaURL = list[i].href;
            dataDaURL = dataDaURL.split('_');
            dataDaURL = dataDaURL[2];
      if(isNaN(dataDaURL) == false) {
        editData = dataDaURL[6] + dataDaURL[7] + '/' + dataDaURL[4] + dataDaURL[5] + '/' + dataDaURL[0] + dataDaURL[1] + dataDaURL[2] + dataDaURL[3];
      } else {
        editData = "Sem Data";
      }
      arrayDados.push({
        titulo: titulo
          .substr(3)
          .replace('SPINS','Giros')
          .replace('Million','Milhões'),
        link: link, 
        dataDaURL: editData,
      });
    }
    return arrayDados;
  });

  await DadosBot.find({}, {dataDeRegistro: 1, _id: 0}).then((datas) => {
    let dados = [];
    for(let elemento of datas){
      dados.push(elemento.dataDeRegistro);
    }
    dados.forEach(async (items, i) => {
      let ListaDeDados = dados[i],
          dataNumber = parseInt(ListaDeDados),
          validade = dataNumber + 3,
          dataDeHoje = new Date(),
          diaDeHoje = dataDeHoje.getDate();
          //console.log(validade)
      if(validade == diaDeHoje) {
        await DadosBot.deleteOne({dataDeRegistro: ListaDeDados}).then(() => {
          //console.log(`dados apagados`)
        }).catch((erro) => {
          console.log(erro)
        });
      }
    });
  }).catch((erro) => {
    console.log(erro)
  })

  list.forEach(async (items, i) => {
    await DadosBot.findOne({link: list[i].link}).lean().then((dados) => {
      if(dados) {
        return;
      } else {
        const novosDados = new DadosBot({
          titulo: list[i].titulo,
          link: list[i].link,
          dataDaURL: list[i].dataDaURL,
          dataDeRegistro: dataLocal
        })
        novosDados.save().then(() => {
          //console.log(`🤖 dados Salvos`)
        }).catch((err) => {
            console.log(err);
        })
      }
    })
  })
  debugger;
  await browser.close();
}

// ligando o bot as 9hrs da manha
setInterval(function () {
  var agora = new Date();
  var a = `${agora}`;
  var resultado = a.split(" ");
  if (resultado[4] == '08:00:00') {
    ligarBot();
    console.log(`🤖 Iniciado com sucesso as: [ ${resultado[4]} ]`);
  }
}, 1000);

module.exports = ligarBot;