const router = require('express').Router()
const ordersController = require('../controllers/ordersController')

router.get('/:orderId', ordersController.findOrder)

router.post('/', ordersController.addOrder)

router.patch('/:orderId', ordersController.updateOrder)

router.delete('/:orderId', ordersController.deleteOrder)

router.get('/', ordersController.findAllOrders)

module.exports = router