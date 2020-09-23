const router = require('express').Router()
const ordersController = require('../controllers/ordersController')
const auth = require('../middlewares/authorization')

// router.post('/', ordersController.addOrder)

// router.get('/:orderId', ordersController.findOrder)

// router.patch('/:orderId', ordersController.updateOrder)

// router.delete('/:orderId', ordersController.deleteOrder)

// router.get('/', ordersController.findAllOrders)

router
    .route('/:orderId')
        .get(ordersController.findOrder)
        .patch(ordersController.updateOrder)
        .delete(ordersController.deleteOrder)

router
    .route('/')
        .get(auth.user, ordersController.findAllOrders)
        .post(ordersController.addOrder)

module.exports = router