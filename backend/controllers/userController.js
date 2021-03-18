const User = require('../models/User.js');
const jwt = require('jsonwebtoken'); //pour encoder l'id 
const bcrypt = require('bcrypt'); //permet le hachage du mot de passe
const crypto =require('crypto-js');//utiliser pour crypter l'email
var validator = require('email-validator')//permet de verifier le format de l'email


//pour l'Inscription
exports.signup = (req, res) => {
  if (!validator.validate(req.body.email)) {
    throw { error : "Votre email n'est pas valide"}
  }else{ 
  bcrypt.hash(req.body.password, 10)

    .then(hash => {
      const new_user = new User({
        email: crypto.HmacSHA256(req.body.email, 'RAMDOM_KEY_SECRET' ).toString(),
        password: hash
      });
      
      new_user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
  }
};

//pour la connexion
exports.login = (req, res, next) => {
  User.findOne({ email: crypto.HmacSHA256(req.body.email, 'RAMDOM_KEY_SECRET' ).toString() })
    .then( user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' })
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorect !' })
          }
          res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                  { userId: user._id },
                  'Code_SECRET_Pour_Token_Randomisé',
                  { expiresIn: '24h' }
                )
            });
          })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error}))

};