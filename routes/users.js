const { Router } = require('express');
const { fieldValidation } = require('../common/validators/field-validation');

const { query } = require('express-validator');
const router = Router();

const UsersController = require('../users/users.controller');
const UsersGuard = require('../users/users.guard');

router.get('/user', UsersGuard.getLoggedUser, UsersController.getLoggedUser);

router.get('/users', UsersGuard.getAll, UsersController.getAll);
router.get('/users/:id', UsersGuard.getById,UsersController.getUserById);

router.post('/users/', UsersController.create);
router.post('/users/login', UsersController.login);

router.patch('/users/subscribe', UsersGuard.subscribe, UsersController.subscribe);
router.patch('/users/unsubscribe', UsersGuard.unsubscribe, UsersController.unsubscribe);

router.put('/users/:id', UsersGuard.update, UsersController.update);
router.delete('/users/:id', UsersGuard.delete, UsersController.delete);

module.exports = router;