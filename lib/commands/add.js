var fs = require('fs'),
	yesno = require('yesno'),
	crypter = require('../crypter'),
	secrets = require('../../secrets.json');

var AddCmd = function(args, onError, callback){
	this.onError = onError;
	if(args.length < 2){
		onError({
			msg: 'Usage: dsm add <reference> <secret>',
			exitCode: 1
		});
	}

	this._addSecret(args[0], args[1], callback);
};

AddCmd.prototype._addSecret = function(reference, secret, callback){
	var encStr = crypter.encrypt(secret, this.onError);

	var doWrite = function(){
		secrets[reference] = encStr;
		fs.writeFileSync('./secrets.json', JSON.stringify(secrets, null, 4));
		callback(0);
	};

	if(typeof secrets[reference] !== undefined){
		yesno.ask(reference+' already exists, would you like to continue anyway? [y/N]', false, function(yes){
			if(yes){
				doWrite();
			} else {
				callback(1);
			}
		});
	} else {
		doWrite();
	}
};

module.exports = AddCmd;