const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    role: String,
    adress: {
        street: String,
        zip: String,
        city: String
    },
    orderHistory: Array
})

const usersDB = mongoose.model("users", usersSchema)

async function createUserModel(body){

    const result = await usersDB.create(body)
    return result;
}

async function getAllUsersModel(){

    const result = await usersDB.find({})
    return result;
}
async function getSingleUserModel(id){

    const result = await usersDB.findOne({_id: id})
    return result;
}
async function deleteUserModel(id){

    const result = await usersDB.deleteOne({_id: id})
    return result;
}
async function editUserModel(id, body){
    const result = await usersDB.updateOne({_id: id}, body)
    return result;
}


module.exports = {
    createUserModel,
    getAllUsersModel,
    getSingleUserModel,
    deleteUserModel,
    editUserModel
}