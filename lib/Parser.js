var Parser = function(args){
	this._args = args;
	this._cleanArgs = args;
};

Parser.prototype.parseFlags = function(flagsSettings){
	var self = this,
		result = {};

	this._args.forEach(function(arg, idx){
		if(self._isFlag(arg)){
			
			var details = self._getFlagDetails(arg),
				flagKey = details.key,
				settings = self._getFlagSettingsByKey(flagsSettings, flagKey);

			if(!settings) return;
			
			var flagName = settings.name;
			switch(settings.action){
				case 'store_bool':
					result[flagName] = true;
					break;
				case 'store_value':
					result[flagName] = details.value;
					break;
				default:
					result[flagName] = details.value || true;
					break;
			}

			self._cleanArgs.splice(idx, 1); 
		}
	});

	return result;
};

Parser.prototype.getCleanArgs = function(){
	return this._cleanArgs;
};

Parser.prototype._getFlagSettingsByKey = function(flagsSettings, flagKey){
	for(var prop in flagsSettings){
		var settings = flagsSettings[prop];

		if(settings.keys.indexOf('-'+flagKey) !== -1 ||
			settings.keys.indexOf('--'+flagKey) !== -1){
			return {
				name: prop,
				keys: settings.keys,
				action: settings.action
			};
		}
	}
};

Parser.prototype._getFlagDetails = function(flagArg){
	var parts = flagArg.split('=');
	return {
		key: parts[0].replace('--', '').replace('-', ''),
		value: parts[1]
	};
};

Parser.prototype._isFlag = function(arg){
	return arg[0] === '-';
};

module.exports = Parser;