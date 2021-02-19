const Sauce = require('../models/sauce');
const fs = require('fs'); // pour utiliser le CRUD

//recuperation de toute les sauces
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//Recherche une sauce avec l'id 
exports.getOneSauces = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};
//Créer une sauce à partir du body de la requetes
exports.createSauce = (req, res) => {
    const sauce = new Sauce({
        ...JSON.parse(req.body.sauce),
        imageUrl: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
    })
    sauce.save()
        .then(() => res.status(201).json({ message: 'Sauce ajoutéé !' }))
        .catch(error => res.status(400).json({ error }));
};
//Modifie une sauce 
exports.modifySauce = (req, res) => {
    const sauce = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifié !' }))
        .catch(error => res.status(400).json({ error }));
}
//Recherche une sauce en fonction de l'id en parametre et la supprime.
exports.clearOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
