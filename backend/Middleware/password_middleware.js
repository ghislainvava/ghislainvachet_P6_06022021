const password_validator = require('../models/password_validator');


module.exports = (req, res, next) => {
    if (password_validator.validate(req.body.password)) {
        next();
    } else {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}