;(function (ToDo) {
	"use strict";

	ToDo.Util.parseToHTML = function (str) {
		var parser = new DOMParser(),
			dom;

		dom = parser.parseFromString(str, "text/html");
		return dom.body.firstChild;
	};

}(ToDo));