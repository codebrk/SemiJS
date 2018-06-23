SemiJS.prototype.plugin = function(name, callback) {
	SemiJS.prototype[name] = callback;
};
$.plugin = function(callback, name) {
	if (name === undefined) {
		SemiJS.prototype.plugin(callback.name, callback);
	} else {
		SemiJS.prototype.plugin(name, callback);
	}
}