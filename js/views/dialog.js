(function (ToDo) {
	"use strict";

	var template =
		"<div class='dialog'>" +
			"<div class='dialog-wrapper'>" +
				"<div class='header clearfix'>" +
					"<h1>{{title}}</h1>" +
				"</div>" +
				"<div class='content'>" +
				"</div>" +
			"</div>" +
		"</div>";


	var DialogView = function (config) {
		this.config = config || {};
		this.template = template;
	};

	DialogView.prototype.init = function () {
		this.render();

		return this;
	};

	DialogView.prototype.render = function () {
		this.el = ToDo.Util.parseToHTML(this.template);
		this.el.querySelector("h1").textContent = this.config.title || "";

		return this;
	};

	DialogView.prototype.show = function () {
		document.querySelector(".dimmer").style.display = "block";

		this.el.querySelector(".content").appendChild(this.config.content);

		document.body.appendChild(this.el);
		this.el.style.left = (window.innerWidth / 2) - (this.el.offsetWidth / 2) + "px";
	};

	DialogView.prototype.dispose = function () {
		document.querySelector(".dimmer").style.display = "none";

		this.el.parentElement.removeChild(this.el);
	};

	DialogView.prototype.getEl = function () {
		return this.el;
	};

	ToDo.Views.DialogView = DialogView;
}(ToDo));