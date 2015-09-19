var crypto = require('crypto'),
    algorithm = 'aes-256-cbc',
    PASSWORD = process.env.DSM_PASSWORD;

var crypter = {
    encrypt: function(text, onError){
        var cipher = crypto.createCipher(algorithm, PASSWORD),
            crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: function(text, onError){
        var decipher = crypto.createDecipher(algorithm, PASSWORD),
            dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }
};

module.exports = crypter;