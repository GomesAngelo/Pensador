const express = require('express')
const router = express.Router();

const ToughtController = require("../controllers/ToughtController")
const checkAuth = require('../helpers/auth').checkAuth


// router.get('/add', ToughtController.createTought)
router.get('/', ToughtController.showTought)
router.get('/dashboard', checkAuth, ToughtController.dashboard)

module.exports = router
