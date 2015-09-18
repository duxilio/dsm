var fs = require('fs'),
	secrets = require('../../secrets.json');

var RmCmd = function(args, onError){
	if(args.length < 1){
		onError({
			msg: 'Usage: dsm rm <reference>',
			exitCode: 1
		});
	}

	this._rmSecret(args[0]);
};

RmCmd.prototype._rmSecret = function(reference){
	delete secrets[reference];
	fs.writeFileSync('./secrets.json', JSON.stringify(secrets, null, 4));
};

module.exports = RmCmd;