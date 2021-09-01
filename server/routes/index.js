var express = require('express');
var router = express.Router();
var http = require('request');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


const URL = 'https://clientes.balanz.com/api/v1/cotizacioninstrumento?ticker='; //AL30&plazo=0'
const REQUEST_OPTIONS = {
  accept: 'application/json',
  'content-type': 'application/json',
  headers: {
    'authorization': 'C40E5B0B-BC50-4273-A7F1-3A2EBE468A3B',
  },
}


const getCotizSimple = (ticker, plazo) => {
  return new Promise((resolve, reject) => {
    const urlCall = URL + ticker + "&plazo=" + plazo;
    http.get(urlCall, REQUEST_OPTIONS, (error, response) => {
      resolve(JSON.parse(response.body));
    })
  })
}

const getCotiz = async (ticker) => {
  const rta = {
    CI: null,
    C48: null
  }
  return getCotizSimple(ticker, 0).
  then(r => {
    rta.CI = r;
    return getCotizSimple(ticker, 2);
  }).then(r => {
    rta.C48 = r;
    return rta;
  })
}



router.get('/cotizacion', async (req, res, next) => {
  const { ticker } = req.query;

  const rta = await getCotiz(ticker);
  res.json(rta );
})


router.get('/endpoint', async (req, res, next) => {

})
module.exports = router;
