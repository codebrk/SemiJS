SemiJS.prototype.plugin = function(name, callback) {
	SemiJS.prototype[name] = callback;
};
$.plugin = function(callback) {
	SemiJS.prototype.plugin(callback.name, callback);
}