
const router = require('express').Router()


const ordersRoute = require('./ordersRoutes')
router.use('/api/orders', ordersRoute)

const usersRoute = require('./usersRoutes')
router.use('/api/users', usersRoute)

const loginRegisterRoute = require('./loginRegisterRoutes')
router.use('/api/', loginRegisterRoute)

module.exports = router