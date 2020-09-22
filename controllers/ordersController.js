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
        
    },
    findOrder: async (req, res) => {
        var orderId = req.params.orderId
        try {
            const order = await ordersModel.findOrder(orderId)
            res.json(order)
        } catch (error) {
            res.json(error)
        }
    },
    findAllOrders: async (req, res) => {
        
        try {
            const orders = await ordersModel.findAllOrders()
            res.json(orders)
        } catch (error) {
            res.json(error)
        }
    },
    updateOrder: async (req, res) => {
        var orderId = req.params.orderId
        var items = req.body.items
        try {
            var oldOrder = await ordersModel.findOrder(orderId)
            if(oldOrder) {
                
                oldOrder.items.push(items)
                oldOrder.value = 0
                for(const item in oldOrder.items) {
                    oldOrder.value += oldOrder.items[item].price
                }

                await ordersModel.updateOrder(orderId, oldOrder)
                
                res.json({msg: 'The order was updated'})

            } else {
                res.json({msg: 'Error! Order not found!'})
            }
        } catch (error) {
            res.json(error)
        }
    },
    deleteOrder: async (req, res) => {
        var orderId = req.params.orderId

        try {
            
            const order = await ordersModel.deleteOrder(orderId)
            
            res.json(order)

        } catch (error) {
            res.json({msg: error})
        }
    }
}