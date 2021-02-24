const passwordValidator = require('password-validator');
 

const schema = new passwordValidator();
 

schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // doit avoir des majuscules
    .has().lowercase()                              // doit avoir des minuscules
    .has().digits(2)                                // doit avoir 2 chiffres
    .has().not().spaces()                           // Pas d'espaces
    .is().not().oneOf(['Passw00rd', 'Password123']); // Blacklist 


module.exports = schema;

