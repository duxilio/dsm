var fs = require('fs'),
	utils = require('./utils');

var git = {

	checkSecretsRepo: function(){
		if(!fs.existsSync('secrets') || !fs.existsSync('secrets/secrets.json')){
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
		], true);
	},

	_checkCmdOutput: function(output){
		if(output.status > 0){
			this.onError({
				msg: output.stderr,
				status: output.status
			});
		}
	}

};

module.exports = git;