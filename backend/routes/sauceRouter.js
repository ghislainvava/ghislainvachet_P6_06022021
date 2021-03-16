const express = require('express');
const sauceCtrl = require('../controllers/sauceController');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/', auth, sauceCtrl.getAllSauces); //home
router.get('/:id', auth, sauceCtrl.getOneSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.clearOneSauce);
router.post('/:id/like', auth, sauceCtrl.sauceLike);

module.exports = router;