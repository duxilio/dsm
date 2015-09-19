var crypto = require('crypto'),
    utils = require('./utils'),
    algorithm = 'aes-256-cbc',
    password = utils.getEnvVar('password');

var crypter = {
    encrypt: function(text, onError){
        var cipher = crypto.createCipher(algorithm, password),
            crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: function(text, onError){
        var decipher = crypto.createDecipher(algorithm, password),
            dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
};

module.exports = crypter;