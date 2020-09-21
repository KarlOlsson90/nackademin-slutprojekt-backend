var chai = require('chai'),
chaiHttp = require('chai-http')
chai.use(chaiHttp)
const { expect } = chai
const app = require('../app')
const db = require('../database/mongodb')

const ordersModel = require('../models/ordersModel')

describe('This test is used to see if integration of route, controller and model is correct', () => {
    beforeEach(async function () {
        await db.connect()
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
        .post(`/orders`)
        .set('Content-Type', 'application/json')
        .send({
            customerId: 'Guest12345',
            items: items
        })
        .end((err, res) => {
            
            console.log(res.body)
            expect(res.body.customerId).to.equal('Guest12345')
            expect(res.body.value).to.equal(1000)
        })
    })
})
