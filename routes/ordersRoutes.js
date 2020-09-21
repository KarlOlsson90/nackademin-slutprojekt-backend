const router = require('express').Router()
const ordersController = require('../controllers/ordersController')

router.post('/', ordersController.addOrder)



module.exports = router