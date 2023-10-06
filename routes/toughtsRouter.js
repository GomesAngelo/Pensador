const express = require('express')
const router = express.Router()

const ToughtController = require("../controllers/ToughtController")


router.get('/add', ToughtController.createTought)
router.get('/', ToughtController.showTought)

module.exports = router
