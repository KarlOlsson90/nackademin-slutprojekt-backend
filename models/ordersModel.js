const mongoose = require('mongoose')

const order = new mongoose.Schema({
    customerId: String,
    status: String,
    items: Array,
    value: Number
})

order.set('timestamps', true)

const ordersModel = mongoose.model('orders', order)

module.exports = {
    addOrder:  (order) => {
        return new Promise(async(resolve, reject) => {
            try {
                const insert = await ordersModel.create(order)
                resolve(insert)
            } catch (error) {
                reject(error)
            }
        }) 
    },
    findOrder:  (orderId) => {
        
        return new Promise(async(resolve, reject) => {
            try {
                const order = await ordersModel.findOne({_id: orderId})
                resolve(order)
            } catch (error) {
                reject(error)
            }
        }) 
    },
    updateOrder: (orderId, order) => {

        return new Promise(async(resolve, reject) => {
            try {
                const update = await ordersModel.updateOne(
                    {_id: orderId}, 
                    {
                        $set: {
                            items: order.items,
                            value: order.value
                        }
                    }
                )
                resolve('Order was Updated')
            } catch (error) {
                reject(error)
            }
        })
    },
    deleteOrder: (orderId) => {
        return new Promise(async(resolve, reject) => {
            try {
                await ordersModel.deleteOne({_id: orderId})
                resolve('Deleted')
            } catch (error) {
                reject(error)
            }
        })
    }
}