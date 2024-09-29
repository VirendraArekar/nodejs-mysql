const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateJWT } = require('../middlewares/authMiddleware');

router.get('/', authenticateJWT, userController.getAllUsers);
router.get('/user/:id', authenticateJWT, userController.getUserById);
router.post('/user/create', authenticateJWT, userController.createUser);
router.post('/user/update/:id', authenticateJWT, userController.updateUser);
router.delete('/user/delete/:id', authenticateJWT, userController.deleteUser);

module.exports = router;
