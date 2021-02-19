const express = require('express');
const sauceCtrl = require('../controllers/sauceController');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, sauceCtrl.getAllSauces);
router.get('/:id', auth, sauceCtrl.getOneSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.clearOneSauce);

module.exports = router;