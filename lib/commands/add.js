var fs = require('fs'),
	crypter = require('../crypter'),
	secrets = require('../../secrets.json');

var AddCmd = function(args, onError){
	this.onError = onError;
	if(args.length < 2){
		onError({
			msg: 'Usage: dsm add <reference> <secret>',
			exitCode: 1
		});
	}

	this._addSecret(args[0], args[1]);
};

AddCmd.prototype._addSecret = function(reference, secret){
	var encStr = crypter.encrypt(secret, this.onError);
	secrets[reference] = encStr;

	fs.writeFileSync('./secrets.json', JSON.stringify(secrets, null, 4));
};

module.exports = AddCmd;