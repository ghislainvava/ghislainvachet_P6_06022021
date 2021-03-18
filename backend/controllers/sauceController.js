const Sauce = require('../models/sauce');
const fs = require('fs'); // pour utiliser le CRUD



//recuperation de toute les sauces
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
};

//Recherche une sauce avec l'id 
exports.getOneSauces = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//Créer une sauce 
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
//Recherche une sauce avec l'id et la supprime.
exports.clearOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.sauceLike = (req, res) => {
   const liker = req.body.userId;
   const id = req.params.id;
    //Condition suivant si on like ou dislike
    if (req.body.like === 1) {
        Sauce.updateOne({ _id: id }, 
            { $inc: { likes: + 1 }, $push: { usersLiked: liker } }) //on incremente le like et ajoute l'utilisateur à la liste
            .then(() => res.status(200).json("Vous aimez cette sauce !"))
            .catch(error => res.status(400).json({ error }));
    }

    if (req.body.like === 0) {
        Sauce.findOne({ _id: id })
        .then(sauce => {
            if (sauce.usersLiked.includes(liker)) {
            Sauce.updateOne({ _id: id },
                 { $inc: { likes: - 1 }, $pull: { usersLiked: liker } }) // on désincrémente le likes ou dislikes
                .then(() => res.status(200).json("Vous n'aimez plus cette sauce !"))
                .catch(error => res.status(400).json({ error }));
            }
            if (sauce.usersDisliked.includes(liker)) {
            Sauce.updateOne({ _id: id },
                { $inc: { dislikes: - 1 }, $pull: { usersDisliked: liker } })
                .then(() => res.status(200).json("Vous ne détestez plus cette sauce !"))
                .catch(error => res.status(400).json({ error }));
            }
        })
    }
    
    if (req.body.like === -1) {
        Sauce.updateOne({ _id: id }, 
            { $inc: { dislikes: + 1 }, $push: { usersDisliked: liker } })//on incremente le dislike et ajoute l'utilisateur à la liste
            .then(() => res.status(200).json("Vous n'aimez pas cette sauce !"))
            .catch(error => res.status(400).json({ error }));
    }
};