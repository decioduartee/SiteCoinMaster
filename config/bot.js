require('../models/ListaDeDadosBot');
const puppeteer = require('puppeteer'),
      mongoose  = require("mongoose"),
      DadosBot  = mongoose.model('botdados'),
      moment = require('moment'),
      dataLocal = moment(new Date()).format("DD/MM/YYYY"),
      cronJob = require('cron').CronJob;
// Vai rodar todos os dias as 9h e as 14h 
new cronJob('0 9,14 * * *', async () => {
  await ligarBot();
}, null, true);

async function ligarBot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
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

  list.forEach((items, i) => {
    DadosBot.findOne({link: list[i].link}).lean().then((dados) => {
      const dataDosLinks = parseInt(list[i].dataDaURL),
            diaDeHoje = new Date().getDate();

      if(dataDosLinks < diaDeHoje) {
        return; //Se a data for menor do que a de hoje nao fazer nada
      } else if(dados) {
        return; //Se o link ja existe no banco de dados nao fazer nada
      } else {
        const novosDados = new DadosBot({
          titulo: list[i].titulo,
          link: list[i].link,
          dataDaURL: list[i].dataDaURL,
          dataDeRegistro: dataLocal,
        });
        novosDados.save().then(() => {
          DadosBot.find({}, {dataDaURL: 1, _id: 0}).then((datas) => {
            //Segunda verificada, para checar se existe datas vencidas no banco de dados 
            const dataNumber = parseInt(datas[i].dataDaURL),
                  validade = (dataNumber + 3) * 2,
                  vencimento = diaDeHoje * 2;

            if(validade <= vencimento) {
              DadosBot.deleteOne({dataDaURL: datas[i].dataDaURL}).then(() => {
                //Apagando datas vencidas
                //console.log(`datas apagadas: [${datas[i].dataDaURL}]`); 
              }).catch((erro) => {
                console.log(erro)
              });
            };
          });
        }).catch((err) => {
            console.log(err);
        });
      };
    });
  });

  debugger;
  await browser.close();
}

module.exports = ligarBot;