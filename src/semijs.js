'use string';


const SemiJS = function(sel) {
	if (sel instanceof Array || sel instanceof HTMLCollection || sel instanceof NodeList) {
		for (let i = 0; i < sel.length; i++) {
			this.push(sel[i]);
		}
	}  else if (typeof sel == "string") { 
		if (sel.indexOf("<") > -1 && sel.indexOf("/>") > -1) {
			let parser = new DOMParser();
			let doc = parser.parseFromString(sel, "text/html");
			let els = doc.getElementsByTagName('body')[0].children;
			for (let i = 0; i < els.length; i++) {
				this.push(els[i]);
			}
		} else if (sel.indexOf("<") > -1) {
			sel = sel.replace(/</, "").replace(/>/, "")
			this.push(document.createElement(sel));
		} else {
			let els = document.querySelectorAll(sel);
			for (let i = 0; i < els.length; i++) {
				this.push(els[i]);
			}
		}
	} else if (sel instanceof HTMLElement) {
		this.push(sel)
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
const $ = function(sel) {
	return new SemiJS(sel);
}
