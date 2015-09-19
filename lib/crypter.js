var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = process.env.DSM_PASSWORD;

var crypter = {

    _checkPassword: function(){
        if(typeof password !== 'string'){
            return false;
        }
        return true;
    },

    encrypt: function(text, onError){
        if(!this._checkPassword()){
            onError({
                msg: 'DSM_PASSWORD not set',
                exitCode: 1
            });
        }

        var cipher = crypto.createCipher(algorithm, password),
            crypted = cipher.update(text, 'utf8', 'hex');
        crypted += cipher.final('hex');
        return crypted;
    },

    decrypt: function(text, onError){
        if(!this._checkPassword()){
            onError({
                msg: 'DSM_PASSWORD not set',
                exitCode: 1
            });
        }

        var decipher = crypto.createDecipher(algorithm, password),
            dec = decipher.update(text, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    }

};

module.exports = crypter;