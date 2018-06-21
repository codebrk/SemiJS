SemiJS.prototype.plugin = function(name, callback) {
	SemiJS.prototype[name] = callback;
};
$.plugin = function(name, callback) {
	SemiJS.prototype.plugin(name, callback);
}