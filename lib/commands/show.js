var fs = require('fs'),
	secrets = require('../../secrets.json');

var ShowCmd = function(args, onError){
	var reference = args[0];
	if(args.length < 1){
		console.log(secrets);
	} else {
		if(!secrets[reference]){
			console.warn(reference+' not found');			
		} else {
			console.log(secrets[reference]);
		}
	}
};

module.exports = ShowCmd;