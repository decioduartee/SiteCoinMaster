const express = require('express'),
      router = express.Router(),
      userController = require("../controllers/userController")

router.get('/', userController.getHome)

router.get("/coin-master-giros-e-moedas-gratis", userController.getGiros)

router.post("/notifica", userController.postNotifica)

module.exports = router;