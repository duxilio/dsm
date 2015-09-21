var yesno = require('yesno'),
	fs = require('fs'),
	utils = require('./utils');

var git = {

	checkCliUpdate: function(onError, callback){
		this.onError = onError;
		var self = this;
		
		if(this._fetchCliUpdate()){
			this._promptForCliUpdate(function(yes){
				if(yes){
					var output = self._mergeCliUpdate();
					self._checkCmdOutput(output);
				}
				callback();
			});
		} else {
			console.log('No CLI update available');
			callback();
		}
	},

	checkSecretsRepo: function(){
		if(!fs.lstatSync('secrets').isDirectory()){
			var secretsPath = utils.getEnvVar('secretsPath');
			console.log('Secrets repository not available locally. Trying to clone '+secretsPath+'...');

			var output = utils.execCmd('git clone '+secretsPath+' secrets');
			if(output.status > 0){
				process.exit(output.status);
			}
		}
	},

	execSecretsCmd: function(cmd){
		return utils.execCmds([
			'cd secrets && git remote set-url origin '+utils.getEnvVar('secretsPath'),
			'cd secrets && '+cmd
		]);
	},

	_checkCmdOutput: function(output){
		if(output.status > 0){
			this.onError({
				msg: output.stderr,
				status: output.status
			});
		}
	},

	_promptForCliUpdate: function(callback){
		yesno.ask('An update is available, would you like to install it now? [y/N]', false, callback);
	},
	
	_fetchCliUpdate: function(){
		var output = utils.execCmd('git fetch origin master');
		this._checkCmdOutput(output);

		output = utils.execCmd('git diff master...origin/master');
		this._checkCmdOutput(output);

		return output.stdout !== '';
	},

	_mergeCliUpdate: function(){
		return utils.execCmd('git merge origin/master').status;
	}

};

module.exports = git;