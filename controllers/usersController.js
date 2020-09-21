const model = require('../models/usersModel');

async function getAllUsersController(req, res){
    try {
        var result = await model.getAllUsersModel()
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function getSingleUserController(req, res){
    var id = req.params.id
    try {
        var result = await model.getSingleUserModel(id)
        return res.status(200).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function editUserController(req, res){
    var id = req.params.id
    var body = req.body

    try {
        var result = await model.editUserModel(id, body)
        return res.status(201).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }
}
async function deleteUserController(req, res){
    var id = req.params.id

    try {
        var result = await model.deleteUserModel(id)
        return res.status(201).json(result);
    } catch(error) {
        return res.status(400).json(error);
    }

}

module.exports = {
    getAllUsersController,
    getSingleUserController,
    editUserController,
    deleteUserController

}