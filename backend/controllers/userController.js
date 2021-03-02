const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//pour l'Inscription
exports.signup = (req, res) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const new_user = new User({
        email: req.body.email,
        password: hash
      });
      new_user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
//pour la connexion
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email})
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