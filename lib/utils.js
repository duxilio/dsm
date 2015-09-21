var execSync = require('sync-exec');

var utils = {

	_ENV_VARS: {
		password: process.env.DSM_PASSWORD,
		secretsPath: process.env.DSM_REMOTE_SECRETS_PATH
	},

	getEnvVar: function(key){
		return this._ENV_VARS[key];
	},

	checkEnvVars: function(){
		if(typeof this.getEnvVar('password') !== 'string'){
		    this.errorHandler({
		        msg: 'DSM_PASSWORD not set',
		        exitCode: 1
		    });
		}

		if(typeof this.getEnvVar('secretsPath') !== 'string'){
			this.errorHandler({
				msg: 'DSM_REMOTE_SECRETS_PATH not set',
				exitCode: 1
			});
			return;
		}
	},

	errorHandler: function(err){
		console.error(err.msg);
		process.exit(err.exitCode);
	},

	execCmd: function(cmd){
		var output = execSync(cmd);

		if(output.status > 0){
			console.log(output.stdout, output.stderr);
		}
		return output;
	},

	execCmds: function(cmds, getOutput){
		for(var i = 0, cmdsCount = cmds.length; i < cmdsCount; i++){
			var currCmd = cmds[i];

			var output = execSync(currCmd);
			if(output.status > 0){
				console.log(output.stdout, output.stderr);
				return output.status;
			}
		}
		return 0;
	}
	
};

module.exports = utils;