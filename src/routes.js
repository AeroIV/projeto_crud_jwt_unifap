const express = require('express');
const router = express.Router();
const UserController = require('./controller/UserController');

//criar um usuário
router.post('/createUser', UserController.createUser);

//buscar um usuário por ID
router.get('/searchUser/:id', UserController.searchUser);

//buscar todos os usuários
router.get('/searchUsers', UserController.searchUsers);

//atualizar um usuário por ID
router.put('/updateUser/:id', UserController.updateUser);

//excluir um usuário por ID
router.delete('/deleteUser/:id', UserController.deleteUser);

module.exports = router;
