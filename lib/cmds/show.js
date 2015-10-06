var fs = require('fs'),
	crypter = require('../crypter'),
	secrets = require('../../secrets/secrets.json');

var ShowCmd = function(args, onError){
	if(args.length < 1){
		console.log(secrets);
	} else {
		var reference = args[0],
			fieldName = args[1];

		if(!secrets[reference]){
			onError({
				msg: reference+' not found.\nRun "dsm show" to list all available references.',
				exitCode: 1
			});		
		} else if(typeof fieldName === 'string') {
			//only show specific field
			var fields = secrets[reference],
				fieldVal = fields[fieldName];

			if(typeof fieldVal !== 'string'){
				onError({
					msg: fieldName+' not found in '+reference+'.\nRun "dsm show '+reference+'" to list all available fields.',
					exitCode: 1
				});
			}

			console.log(crypter.decrypt(fieldVal, onError));
		} else {
			//show all from reference
			var encryptedFields = secrets[reference],
				decryptedFields = {};

			for(var key in encryptedFields){
				decryptedFields[key] = crypter.decrypt(encryptedFields[key], onError);
			}

			console.log(decryptedFields);		
		}

	}
};

module.exports = ShowCmd;