// in controllers/stuff.js

const Sauce = require('../models/sauce');


exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject
  });
  sauce.save()
      .then(() => res.status(201).json({message: 'Objet enregistrée!'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    
    Sauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce =>  res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}))
  };

  exports.clearSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
    .then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(error => res.status(500).json({ error }));
  };
  

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error}))
}; 