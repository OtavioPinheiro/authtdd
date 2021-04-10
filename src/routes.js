const routes = require("express").Router();
const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

module.exports = routes;


// const { User } = require('./app/models');

// User.create({ 
//   name: 'Otavio', 
//   email: 'otavio@otavio.com.br', 
//   password_hash: '123dasilva4' 
// });