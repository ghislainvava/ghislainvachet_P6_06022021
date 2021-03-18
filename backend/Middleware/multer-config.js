const multer = require('multer'); // sert à gérer les fichiers entrants

const MIME_TYPES = {//extension possible à récupérer
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Création d'un objet de configuration pour multer 
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
   //Création d'un nom de fichier unique 
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');//pour récupérer le nom original sans espace
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({ storage: storage }).single('image');