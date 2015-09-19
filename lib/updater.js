var execSync = require('sync-exec'),
	yesno = require('yesno');

var updater = {

	checkUpdate: function(callback){
		var self = this;
		
		if(this._fetchUpdate()){
			this._promptForUpdate(function(yes){
				if(yes){
					self._mergeUpdate();
				}
				if(typeof callback === 'function') callback();
			});
		} else {
			console.log('No CLI update available');
			if(typeof callback === 'function') callback();
		}
	},

	_promptForUpdate: function(callback){
		yesno.ask('An update is available, would you like to install it now? [y/N]', false, callback);
	},
	
	_fetchUpdate: function(){
		var cmdOutput = execSync('git fetch origin master');
		if(cmdOutput.status > 0){
			console.log(cmdOutput.stdout, cmdOutput.stderr);
		}

		cmdOutput = execSync('git diff master...origin/master')
		return cmdOutput.stdout !== '';
	},

	_mergeUpdate: function(){
		var cmdOutput = execSync('git merge origin/master');
		console.log(cmdOutput.stdout);
	}

};

module.exports = updater;