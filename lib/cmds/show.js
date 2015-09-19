var fs = require('fs'),
	crypter = require('../crypter'),
	secrets = require('../../secrets/secrets.json');

var ShowCmd = function(args, onError){
	var reference = args[0];
	if(args.length < 1){
		console.log(secrets);
	} else {

		if(!secrets[reference]){	
			onError({
				msg: reference+' not found.\nRun "dsm show" to list all available references.',
				exitCode: 1
			});		
		} else {
			console.log(crypter.decrypt(secrets[reference], onError));
		}

	}
};

module.exports = ShowCmd;