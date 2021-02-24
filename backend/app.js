const express = require('express'); // appel d'express
const mongoose = require('mongoose'); // pour se connecter à MongoDB
const userRoutes = require('./routes/userRouter'); //appel route user
const sauceRoutes = require('./routes/sauceRouter'); // appel route sauce
const bodyParser = require('body-parser'); // pour utiliser Json
const path = require('path'); // pour gérer le chemein d'acces 
const helmet = require("helmet"); // protége en définnissant des en-têtes sécurisées
const xss = require('xss-clean'); //pour enpêcher le contrôle du navigateur 
const mongoSanitize = require('express-mongo-sanitize'); // pour empecher l'utilisation $ dans MongoDB
require('dotenv').config();

//Connexion à la base de donnée Mongo
mongoose.connect('mongodb+srv://Ghislain:10Gigimac@cluster0.vqotx.mongodb.net/fullstack?retryWrites=true&w=majority',
  { useNewUrlParser: true, //necessaire pour la version utilisée de mongoose
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express(); // cree l'Application

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //  * pour acces de toute origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // type de header acceptés
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // méthodes à utiliser
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(xss())
app.use('/images', express.static(path.join(__dirname, '/images'))); //pour utiliser le dossier images en static
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use(mongoSanitize());
app.use((req, res) => {
  res.json({ message: 'Votre requête a bien été reçu !'});
});


module.exports = app;
