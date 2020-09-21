
const router = require('express').Router()


const ordersRoute = require('./ordersRoutes')
router.use('/orders', ordersRoute)

const usersRoute = require('./usersRoute')
router.use('/users', usersRoute)

module.exports = router