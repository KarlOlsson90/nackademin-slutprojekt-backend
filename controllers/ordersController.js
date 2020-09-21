const { add } = require('../../nackademin-todo-app/Model/toDo')
const ordersModel = require('../models/ordersModel')

module.exports = {
    addOrder: async (req, res) => {
        var order = {
            customerId: req.body.customerId,
            status: 'inProcess',
            items: req.body.items,
            value: 0
        }

        for(const item in order.items) {
            order.value += order.items[item].price
        }
        try {
            const addedOrder = await ordersModel.addOrder(order)
            res.json(addedOrder)
        } catch (error) {
            res.json(error)
        }
        
    }
}