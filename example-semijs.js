function reverse() {
	this.each(function(el, i) {
		var s = el.innerHTML.split("").reverse();
		el.innerHTML = s.join("");
	});

	return this;
}


$.plugin(reverse);