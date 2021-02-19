const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRouter');
const sauceRoutes = require('./routes/sauceRouter');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config()
const helmet = require("helmet");
const xss = require('xss-clean');

//Connexion à la base de donnée Mongo
mongoose.connect('mongodb+srv://Ghislain:10Gigimac@cluster0.vqotx.mongodb.net/fullstack?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(xss())
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);
app.use((req, res) => {
  res.json({ message: 'Votre requête a bien été reçu !'});
});




module.exports = app;
