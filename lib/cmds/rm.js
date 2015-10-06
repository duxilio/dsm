var fs = require('fs'),
	yesno = require('yesno'),
	secrets = require('../../secrets/secrets.json');

var RmCmd = function(args, onError, callback){
	this.onError = onError;
	this.callback = callback;

	if(args.length < 1){
		onError({
			msg: 'Usage: dsm rm <reference>',
			exitCode: 1
		});
	}

	this._rmSecret(args[0]);
};

RmCmd.prototype._rmSecret = function(reference){
	var self = this;
	
	if(typeof secrets[reference] !== 'object'){
		self.onError({
			msg: reference+' not found.\nRun "dsm show" to list all available references.',
			exitCode: 1
		});
		return;
	}
	
	yesno.ask('Are you sure you would like to delete '+reference+'? [y/N]', false, function(yes){
		if(yes){
			delete secrets[reference];
			fs.writeFileSync('./secrets/secrets.json', JSON.stringify(secrets, null, 4));
			self.callback(0);
		} else {
			self.callback(1);
		}
	});
};

module.exports = RmCmd;