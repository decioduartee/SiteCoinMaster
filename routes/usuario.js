const express = require('express'),
      router = express.Router(),
      userController = require("../controllers/userController")

router.get('/', userController.getHome)

router.get("/coin-master-giros-e-moedas-gratis", userController.getGiros)

router.get("/404", userController.get404)

router.post("/notifica", userController.postNotifica)

module.exports = router;