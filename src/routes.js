const routes = require("express").Router();
const authMiddleware = require('./app/middleware/auth');
const SessionController = require('./app/controllers/SessionController');

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
  return res.status(200).send();
})

module.exports = routes;


// const { User } = require('./app/models');

// User.create({ 
//   name: 'Otavio', 
//   email: 'otavio@otavio.com.br', 
//   password_hash: '123dasilva4' 
// });