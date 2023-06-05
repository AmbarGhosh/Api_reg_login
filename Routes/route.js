const root = require('express').Router();
const apiController = require("../controller/conTroller")

root.get('/', apiController.index)
root.post('/register', apiController.register)
root.post('/login', apiController.login)

module.exports = root
