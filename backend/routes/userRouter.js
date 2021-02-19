const express = require('express');
const userCtrl = require('../controllers/userController');
const router = express.Router();
const password_middleware = require('../middleware/password_middleware')

router.post('/signup', password_middleware, userCtrl.signup);
router.post('/login', userCtrl.login);
module.exports = router;
