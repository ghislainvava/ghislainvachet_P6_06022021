const express = require('express');

const router = express.Router();
const Sauce = require('../models/sauce')
const sauceCtrl = require('../controllers/sauce');
const auth = require('../Middleware/auth')

router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/', auth, sauceCtrl.createSauce);

router.get('/:id', auth,  sauceCtrl.getOneSauce);

router.put('/:id', auth, sauceCtrl.modifySauce);

router.delete('/:id', auth, sauceCtrl.clearSauce);




module.exports = router;