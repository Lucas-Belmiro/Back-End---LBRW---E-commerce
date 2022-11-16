const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/todos', userController.allUsers)
router.get('/:_id', userController.findUser)
router.post('/save', userController.saveUser)
router.post('/login', userController.login)
router.post('/verifyToken', userController.verifyToken)
router.patch('/:_id', userController.updateUser)
router.delete('/:_id', userController.deleteUser)
router.post('/id', userController.IdPurchases)

module.exports = router;