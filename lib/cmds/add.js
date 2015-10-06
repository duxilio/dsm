var fs = require('fs'),
	yesno = require('yesno');

var crypter = require('../crypter'),
	secrets = require('../../secrets/secrets.json');

var AddCmd = function(args, onError, callback){
	this.onError = onError;
	if(args.length < 2){
		onError({
			msg: 'Usage: dsm add <reference> <secret>',
			exitCode: 1
		});
	}

	var otherFieldOptions = args.slice(2, args.length),
		fields = this._parseFieldOptions(otherFieldOptions);

	fields.main = args[1];

	this._addSecret(args[0], fields, callback);
};

AddCmd.prototype._parseFieldOptions = function(otherFieldOptions){
	var fields = {};

	otherFieldOptions.forEach(function(fieldOption){
		//check if option is valid field option
		if(!/[^\=]+\=[^\=]+/.test(fieldOption)){
			return;
		}

		var parts = fieldOption.split('='),
			key = parts[0],
			val = parts[1];

		if(key && val){
			//option has key and val
			fields[key] = val; 
		}
	});

	return fields;
};

AddCmd.prototype._addSecret = function(reference, fields, callback){

	var doWrite = function(){
		//encrypt all given secrets
		var encryptedFields = {};
		for(var key in fields){
			encryptedFields[key] = crypter.encrypt(fields[key], this.onError);
		}

		//store in secrets
		secrets[reference] = encryptedFields;
		fs.writeFileSync('./secrets/secrets.json', JSON.stringify(secrets, null, 4));
		callback(0);
	};

	if(typeof secrets[reference] !== 'undefined'){
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