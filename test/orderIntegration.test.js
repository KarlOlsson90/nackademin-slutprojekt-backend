var chai = require('chai'),
chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect } = chai

const app = require('../app')
const db = require('../database/mongodb')
const mongoose = require('mongoose')
const usersDB = mongoose.model("users")
const ordersModel = require('../models/ordersModel')
const usersModel = require('../models/usersModel')

describe('This test is used to see if integration of route, controller and model is correct', () => {
    beforeEach(async function () {
        await db.connect()
        await ordersModel.clearAllOrders()
        await usersDB.deleteMany({})
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
        const customerOrder = {
            customerId: customerId,
            status: 'inProcess',
            items: items,
            value: value
        }
        const order = await ordersModel.addOrder(customerOrder)

        this.currentTest.order = order

        const user = {
            email: '123',
            name: '123',
            password: '123',
            adress: {
                street: '123',
                zip: '123',
                city: '123'
            },
            orderHistory: []
        }

        this.currentTest.user = await usersModel.createUserModel(user)
        
        this.currentTest.token = await usersModel.loginUserModel({email: '123', password: '123'})

    })

    it('should add an order', async function () {
        const items = [
            {
                _id: '39y7gbbZk1u4ABnv',
                title: 'Gretas Fury',
                price: 999,
                shortDesc: 'Unisex',
                longDesc: 'Skate ipsum dolor sit amet...',
                imgFile: 'skateboard-greta.png'
            },
            {
                _id: '327gbbZk1u4ABnv',
                title: 'Gretas chewing gum',
                price: 1,
                shortDesc: 'Unisex',
                longDesc: 'Skate ipsum dolor sit amet...',
                imgFile: 'skateboard-greta.png'
            } 
        ]
        chai.request(app)
        .post(`/api/orders`)
        .set('Content-Type', 'application/json')
        .send({
            customerId: 'Guest12345',
            items: items
        })
        .then((res) => {
            
            expect(res.body.customerId).to.equal('Guest12345')
            expect(res.body.value).to.equal(1000)
        })
    })

    it('should read an order', async function () {
        let orderId = this.test.order._id

        await chai.request(app)
        .get(`/api/orders/${orderId}`)
        .set('Content-Type', 'application/json')
        .then((res) => {

            expect(res.body.customerId).to.equal('12345')
        })
    })

    it('should update an order', async function () {
        const item2Add = {
            _id: '30y7gbbZk1u4ABnv',
            title: 'Gretas Fury 2',
            price: 1099,
            shortDesc: 'Unisex',
            longDesc: 'Skate ipsum dolor sit amet...',
            imgFile: 'skateboard-greta.png'
        }

        await chai.request(app)
        .patch(`/api/orders/${this.test.order._id}`)
        .set('Content-Type', 'application/json')
        .send({
            items: item2Add
        })
        .then((res) => {
            
            expect(res.body.msg).to.equal('The order was updated')
        })
    })
    // ändra den nedan till att ge alla ifalll man e  admin o alla sina egna om man e kund =D
    it('should read all orders', async function () {
        
        const customerId = this.test.user._id
        const items = [
            {
                _id: '32y7gbbZk1u4ABnv',
                title: 'Gretas Fury 2',
                price: 1000,
                shortDesc: 'Unisex',
                longDesc: 'Skate ipsum dolor sit amet...',
                imgFile: 'skateboard-greta.png'
            }
        ]
        var value = 0
        for(const item in items) {
            value += items[item].price
        }
        const customerOrder = {
            customerId: customerId,
            status: 'inProcess',
            items: items,
            value: value
        }
        await ordersModel.addOrder(customerOrder)

        await chai.request(app)
        .get(`/api/orders`)
        .set('Content-Type', 'application/json')
        .set('authorization', this.test.token.token)
        .then((res) => {
            expect(res.body.length).to.equal(1)
            expect(res.body[0].value).to.equal(1000)
        })

    })

    it('should delete an order', async function () {
        let orderId = this.test.order._id

        await chai.request(app)
        .delete(`/api/orders/${orderId}`)
        .set('Content-Type', 'application/json')
        .then(async (res) => {

            let order = await ordersModel.findOrder(orderId)
 
            expect(order).to.equal(null) 
        })
    })

})
