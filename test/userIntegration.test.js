const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const {connect, disconnect} = require('../database/mongodb')
const {expect, request} = chai
const app = require('../app')
const usersDB = mongoose.model("users")

describe('User resource', async function () { 

    before(async function(){

        await connect();
    });
    
    beforeEach(async function(){
        await usersDB.deleteMany({})
        this.testUser1 = await usersDB.create({email: "testperson1"})
        this.testUser2 = await usersDB.create({email: "testperson2"})
    });

    it('Get all users through request', async function (){
        await chai.request(app)
            .get('/users')
            .then((res) => {
                expect(res).to.have.status(200)
                })
    });

    it('Get single user through request', async function (){

        const userId = this.testUser1._id

        await chai.request(app)
            .get(`/users/${userId}`)
            .then((res) => {
                expect(res).to.have.status(200)
                })
    });

    it('Edit user through request', async function (){

        const userId = this.testUser1._id
        const body = {email: 'newEmail'}

        await chai.request(app)
            .patch(`/users/${userId}`)
            .set('Content-Type', 'application/json')
            .send(body)
            .then((res) => {
                expect(res).to.have.status(201)
                })

        const editedUser = await usersDB.findOne({_id: userId})
        expect(editedUser.email).to.equal("newEmail")
    });

    it('Delete user through request', async function (){

        const userId = this.testUser1._id

        await chai.request(app)
            .delete(`/users/${userId}`)
            .then((res) => {
                expect(res).to.have.status(201)
                })

        const usersPostDeletion = await usersDB.find({})
        expect(usersPostDeletion.length).to.equal(1)

    });

    after(async function(){

        await disconnect();

    });

}); 