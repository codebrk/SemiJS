"use strict";
'use string';

var SemiJS = function SemiJS(sel) {
	if (sel instanceof Array || sel instanceof HTMLCollection || sel instanceof NodeList) {
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
SemiJS.prototype.splice = Array.prototype.splice;
SemiJS.prototype.indexOf = Array.prototype.indexOf;

SemiJS.prototype.eventStack = [];

/* this is will create a new SemiJS instance, 
so that I dont have to create a new instance by myself. */
var $ = function $(sel) {
	return new SemiJS(sel);
};
"use strict";

SemiJS.prototype.plugin = function (name, callback) {
	SemiJS.prototype[name] = callback;
};
$.plugin = function (callback) {
	SemiJS.prototype.plugin(callback.name, callback);
};
"use strict";

SemiJS.prototype.get = function (i) {
	if (i < 0) {
		return $(this[this.length + i]);
	}

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

	return this;
};

SemiJS.prototype.addClass = function (cls) {
	this.each(function (el, i) {
		if (typeof cls === "function") {
			el.classList.add(cls(i));
		} else {
			el.classList.add(cls);
		}
	});

	return this;
};

SemiJS.prototype.after = function (content) {
	if (typeof content == "string") {
		if (content.indexOf("<") > -1) {
			content = $(content)[0];
		} else {
			content = document.createTextNode(content);
		}
	} else if (content instanceof SemiJS) {
		content = content[0];
	} else if (typeof content === "function") {
		this.after(content());
	}
	this.each(function (el) {
		el.parentNode.insertBefore(content.cloneNode(true), el.nextSibling);
	});

	return this;
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

	return this;
};

SemiJS.prototype.attr = function (key, value) {
	if (value === undefined) {
		return this[0].getAttribute(key);
	}

	this.each(function (el) {
		el.setAttribute(key, value);
	});

	return this;
};

SemiJS.prototype.before = function (content) {
	if (typeof content == "string") {
		if (content.indexOf("<") > -1) {
			content = $(content)[0];
		} else {
			content = document.createTextNode(content);
		}
	} else if (content instanceof SemiJS) {
		content = content[0];
	} else if (typeof content === "function") {
		this.before(content());
	}

	this.each(function (el, i) {
		el.parentNode.insertBefore(content.cloneNode(true), el);
	});

	return this;
};

SemiJS.prototype.bind = function (event, callback, preventBubble) {
	if (preventBubble === undefined) {
		preventBubble = false;
	}
	var events = event.split(" ");
	this.each(function (el, i) {
		for (var j = 0; j < events.length; j++) {
			el.addEventListener(events[j], callback, preventBubble);
			SemiJS.prototype.eventStack.push({
				element: el,
				event: events[j],
				callback: callback,
				preventBubble: preventBubble
			});
		}
	});
};

// TODO: need to create documentation for below methods.

SemiJS.prototype.children = function () {
	return $(this[0].children);
};

SemiJS.prototype.clone = function (withEvents, withChildren) {
	if (withChildren === undefined) {
		withChildren = true;
	}
	if (withEvents === undefined) {
		withEvents = false;
	}
	var cloned = this[0].cloneNode(withChildren);
	if (withEvents) {
		for (var i = 0; i < this.eventStack.length; i++) {
			if (this[0] === this.eventStack[i].element) {
				cloned.addEventListener(this.eventStack[i].event, this.eventStack[i].callback, this.eventStack[i].preventBubble);
			}
		}
	}

	return $(cloned);
};

SemiJS.prototype.css = function (styles) {
	if (typeof styles === "function") {
		this.each(function (el, i) {
			var s = styles(el, i);
			var keys = Object.keys(s);
			$(keys).each(function (key, i) {
				el.style[key] = s[key];
			});
		});
	} else {
		var keys = Object.keys(styles);
		this.each(function (el) {
			$(keys).each(function (key, i) {
				el.style[key] = styles[key];
			});
		});
	}

	return this;
};

SemiJS.prototype.filter = function (sel) {
	var nodes = [];
	this.each(function (el, i) {
		if (typeof sel === "function") {
			if (sel(el, i)) {
				nodes.push(el);
			}
		} else {
			var cloned = el.cloneNode();
			var parent = document.createElement("div");
			parent.appendChild(cloned);

			var finds = parent.querySelector(sel);
			if (finds !== null) {
				nodes.push(el);
			}
		}
	});

	return $(nodes);
};

SemiJS.prototype.first = function () {
	return $(this[0]);
};

SemiJS.prototype.height = function () {
	return this[0].offsetHeight;
};

SemiJS.prototype.hide = function () {};

SemiJS.prototype.html = function (content) {
	if (content === undefined) {
		return this[0].innerHTML;
	}

	this.each(function (el, i) {
		if (typeof content === "function") {
			el.innerHTML = content(el, i);
		} else {
			el.innerHTML = content;
		}
	});

	return this;
};

SemiJS.prototype.innerHeight = function () {
	return this[0].clientHeight;
};

SemiJS.prototype.innerWidth = function () {
	return this[0].clientWidth;
};

SemiJS.prototype.last = function () {
	return $(this[this.length - 1]);
};

SemiJS.prototype.offsetLeft = function () {
	return this[0].offsetLeft;
};

SemiJS.prototype.parent = function () {
	return $(this[0].parentNode);
};

SemiJS.prototype.prepend = function (content) {
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
			$(el).parent()[0].insertBefore(content(i), el);
		} else {
			el.parentNode.insertBefore(content, el);
		}
	});

	return this;
};

SemiJS.prototype.remove = function (sel) {
	var _self = this;
	this.each(function (el, i) {
		if (typeof sel === "function") {
			if (sel(el, i)) {
				this.splice(this.indexOf(el), 1);
			}
		} else {
			var cloned = el.cloneNode();
			var parent = document.createElement("div");
			parent.appendChild(cloned);

			var finds = parent.querySelector(sel);
			if (finds !== null) {
				_self.splice(_self.indexOf(el), 1);
			}
		}
	});

	return this;
};

SemiJS.prototype.removeAttr = function (key) {
	this.each(function (el, i) {
		if (typeof key === "function") {
			el.removeAttribute(key(el, i));
		} else {
			el.removeAttribute(key);
		}
	});

	return this;
};

SemiJS.prototype.removeClass = function (cls) {
	this.each(function (el, i) {
		if (typeof cls === "function") {
			el.classList.remove(cls(i));
		} else {
			el.classList.remove(cls);
		}
	});

	return this;
};

SemiJS.prototype.siblings = function () {
	var nodes = [];
	var _self = this;
	$(this[0]).parent().children().each(function (el, i) {
		if (el !== _self[0]) {
			nodes.push(el);
		}
	});

	return $(nodes);
};

SemiJS.prototype.text = function (content) {
	if (content === undefined) {
		return this[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
	}

	this.each(function (el, i) {
		if (typeof content === "function") {
			el.innerHTML = content(el, i).replace("<", "&lt;").replace(">", "&gt;");
		} else {
			el.innerHTML = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");
		}
	});

	return this;
};

SemiJS.prototype.unbind = function (event) {
	for (var j = 0; j < this.length; j++) {
		for (var i = 0; i < this.eventStack.length; i++) {
			if (this[j] === this.eventStack[i].element && event === this.eventStack[i].event) {
				this[j].removeEventListener(event, this.eventStack[i].callback, this.eventStack[i].preventBubble);
			}
		}
	}

	return this;
};

SemiJS.prototype.val = function (content) {
	if (content === undefined) {
		return this[0].value;
	}

	this.each(function (el, i) {
		if (typeof content === "function") {
			var v = content(el, i);
			el.value = v;
		} else {
			el.value = content;
		}
	});

	return this;
};

SemiJS.prototype.width = function () {
	return this[0].offsetWidth;
};

SemiJS.prototype.wrap = function () {
	var wrap = $(document.createElement("div"));
	this.each(function (el, i) {
		wrap.append(el);
	});

	return wrap;
};
"use strict";

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();
//# sourceMappingURL=semijs.js.map
