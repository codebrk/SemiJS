"use strict";
'use string';

var SemiJS = function SemiJS(sel) {
	if (sel instanceof Array) {
		for (var i = 0; i < sel.length; i++) {
			this.push(sel[i]);
		}
	} else if (typeof sel == "string") {
		if (sel.indexOf("<") > -1) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(sel, "text/html");
			var els = doc.getElementsByTagName('body')[0].children;
			for (var _i = 0; _i < els.length; _i++) {
				this.push(els[_i]);
			}
		} else {
			var _els = document.querySelectorAll(sel);
			for (var _i2 = 0; _i2 < _els.length; _i2++) {
				this.push(_els[_i2]);
			}
		}
	} else if (sel instanceof HTMLElement) {
		this.push(sel);
	}
};
SemiJS.prototype.push = Array.prototype.push;
SemiJS.prototype.pop = Array.prototype.pop;
SemiJS.prototype.shift = Array.prototype.shift;
SemiJS.prototype.unshift = Array.prototype.unshift;

/* this is will create a new SemiJS instance, 
so that I dont have to create a new instance by myself. */
var $ = function $(sel) {
	return new SemiJS(sel);
};
"use strict";

SemiJS.prototype.plugin = function (name, callback) {
	SemiJS.prototype[name] = callback;
};
$.plugin = function (name, callback) {
	SemiJS.prototype.plugin(name, callback);
};
"use strict";

SemiJS.prototype.get = function (i) {
	return $(this[i]);
};

SemiJS.prototype.each = function (callback) {
	for (var i = 0; i < this.length; i++) {
		callback(this[i], i);
	}
};

SemiJS.prototype.add = function (el) {
	var els = $(el);
	for (var i = 0; i < els.length; i++) {
		this.push(els[i]);
	}
};

SemiJS.prototype.addClass = function (cls) {
	this.each(function (el, i) {
		if (typeof cls === "function") {
			el.classList.add(cls(i));
		} else {
			el.classList.add(cls);
		}
	});
};

SemiJS.prototype.after = function (content) {
	if (typeof content == "string") {
		content = document.createTextNode(content);
	} else if (content instanceof SemiJS) {
		content = content[0];
	}
	this.each(function (el) {
		el.parentNode.insertBefore(content.cloneNode(true), el.nextSibling);
	});
};

SemiJS.prototype.append = function (content) {
	if (typeof content == "string") {
		if (content.indexOf("<") > -1) {
			var parser = new DOMParser();
			var doc = parser.parseFromString(content, "text/html");
			var els = doc.getElementsByTagName('body')[0].children;
			content = els[0];
		} else {
			content = document.createTextNode(content);
		}
	} else if (content instanceof SemiJS) {
		content = content[0];
	}

	this.each(function (el, i) {
		if (typeof content === "function") {
			$(el).append(content(i));
		} else {
			el.appendChild(content);
		}
	});
};
//# sourceMappingURL=semijs.js.map
