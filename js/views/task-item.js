(function (ToDo) {
	"use strict";

	var template =
		"<div class='task-item'>" +
			"<div class='task-item-wrapper clearfix'>" +
				"<div class='actions'>" +
					"<button class='edit-btn'><img src='./img/pencil.png' /></button>" +
					"<button class='delete-btn'><img src='./img/delete.png' /></button>" +
				"</div>" +
				"<div class='clearfix task-content'>" +
					"<span data-id='task-desc'></span>" +
				"</div>" +
			"</div>" +
		"</div>";


	var TaskItemView = function (config) {
		this.config = config || {};
		this.template = template;

		this.model = config.model;
	};

	TaskItemView.prototype.init = function () {
		this.render();
		this.attachEvents();

		return this;
	};

	TaskItemView.prototype.render = function () {
		var taskDescEl;

		this.el = ToDo.Util.parseToHTML(this.template);

		taskDescEl = this.el.querySelector("[data-id='task-desc']");

		taskDescEl.textContent = this.model.model.description;
		taskDescEl.title = this.model.model.description;

		return this;
	};

	TaskItemView.prototype.attachEvents = function () {
		this.el.addEventListener("click", function (e) {
			var searchParent = function (el, className) {
				while (el.nodeName !== "BODY") {
					if (el.classList.contains(className)) {
						return true;
					}
					el = el.parentElement;
				}

				return false;
			};
			if (searchParent(e.target, "edit-btn")) {
				this.editTask.call(this, e);
			} else if (searchParent(e.target, "delete-btn")) {
				this.deleteTask.call(this, e);
			}
		}.bind(this), true);
	};

	TaskItemView.prototype.editTask = function () {
		alert("edit");
	};

	TaskItemView.prototype.deleteTask = function () {
		alert("delete");
	};

	TaskItemView.prototype.getEl = function () {
		return this.el;
	};

	ToDo.Views.TaskItemView = TaskItemView;
}(ToDo));