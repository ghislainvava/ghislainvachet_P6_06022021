const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
//const Sauce = require('./models/sauce');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Ghislain:10Gigimac@cluster0.vqotx.mongodb.net/fullstack?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
  
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

app.use('/api/sauce', sauceRoutes);

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçu !'});
});



  

module.exports = app;
