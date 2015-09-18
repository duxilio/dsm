var fs = require('fs'),
	crypter = require('../crypter'),
	secrets = require('../../secrets.json');

var ShowCmd = function(args, onError){
	var reference = args[0];
	if(args.length < 1){
		console.log(secrets);
	} else {
		if(!secrets[reference]){
			console.warn(reference+' not found.\nRun "dsm show" to list all available references.');			
		} else {
			console.log(crypter.decrypt(secrets[reference]));
		}
	}
};

module.exports = ShowCmd;