const multer = require('multer');

const MIME_TYPES = { //extension possible à récupérer
    'image/jpg':'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    }, 
    filename: (req, file, callback => {
        const name =  file.originalname.split(' ').join('_'); //pour récupérer le nom original sans espace
        const 
    })
})