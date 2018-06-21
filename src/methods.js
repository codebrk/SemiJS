SemiJS.prototype.get = function(i) {
	return $(this[i]);
}

SemiJS.prototype.each = function(callback) {
	for (let i = 0; i < this.length; i++) {
		callback(this[i], i);
	}
}


SemiJS.prototype.add = function(el) {
	let els = $(el);
	for (let i = 0; i < els.length; i++) {
		this.push(els[i]);
	}
};


SemiJS.prototype.addClass = function(cls) {
	this.each(function(el, i) {
		if (typeof cls === "function") {
			el.classList.add(cls(i));
		} else {
			el.classList.add(cls);
		}
	});
}


SemiJS.prototype.after = function(content) {
	if (typeof content == "string") {
		content = document.createTextNode(content);
	} else if (content instanceof SemiJS) {
		content = content[0];
	}
	this.each(function(el) {
		el.parentNode.insertBefore(content.cloneNode(true), el.nextSibling);
	});
}


SemiJS.prototype.append = function(content) {
	if (typeof content == "string") {
		if (content.indexOf("<") > -1) {
			let parser = new DOMParser();
			let doc = parser.parseFromString(content, "text/html");
			let els = doc.getElementsByTagName('body')[0].children;
			content = els[0];
		} else {
			content = document.createTextNode(content);
		}
	} else if (content instanceof SemiJS) {
		content = content[0];
	} 

	this.each(function(el, i) {
		if (typeof content === "function") {
			$(el).append(content(i));
		} else {
			el.appendChild(content);
		}
	});
}