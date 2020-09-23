
const router = require('express').Router()


const ordersRoute = require('./ordersRoutes')
router.use('/orders', ordersRoute)

const usersRoute = require('./usersRoutes')
router.use('/users', usersRoute)

const loginRegisterRoute = require('./loginRegisterRoutes')
router.use('/api/', loginRegisterRoute)

module.exports = router