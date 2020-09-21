var chai = require('chai')
const { expect } = chai
const db = require('../database/mongodb')

const ordersModel = require('../models/ordersModel')

describe('It should test if the CRUD:iing functionality of orderModel works as intended', () => {
    beforeEach(async function () {
        await db.connect()

        const customerId = '12345'
        const items = [
            {
                _id: '39y7gbbZk1u4ABnv',
                title: 'Gretas Fury',
                price: 999,
                shortDesc: 'Unisex',
                longDesc: 'Skate ipsum dolor sit amet...',
                imgFile: 'skateboard-greta.png'
            } 
        ]
        var value = 0
        for(const item in items) {
            value += items[item].price
        }

        const order = await ordersModel.addOrder(customerId, items, value)

        this.currentTest.order = order
    })
    
    it('should test if an order was added', async function () {

        expect(this.test.order.customerId).to.equal('12345')
        expect(this.test.order.value).to.equal(999)
    })

    it('should read an order', async function() {

        const orderId = this.test.order._id

        const order = await ordersModel.findOrder(orderId)

        expect(order.customerId).to.equal('12345')
        expect(order.value).to.equal(999)
    })

    it('should update an order', async function () {

        const orderId = this.test.order._id
        const item2add = {
            _id: '30y7gbbZk1u4ABnv',
            title: 'Gretas Fury 2',
            price: 1099,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        const order = await ordersModel.findOrder(orderId)
        order.items.push(item2add)

        var value = 0
        for(const item in order.items) {
            value += order.items[item].price
        }
        order.value = value

        await ordersModel.updateOrder(order._id, order)

        const newOrder = await ordersModel.findOrder(orderId)

        expect(newOrder.items.length).to.equal(2)
        expect(newOrder.value).to.equal(2098)
    })

    it('should delete an order', async function () {
        await ordersModel.deleteOrder(this.test.order._id)

        const order =  await ordersModel.findOrder(this.test.order._id)

        expect(order).to.equal(null)
    })
})