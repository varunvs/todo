(function (ToDo) {
	"use strict";

	var template =
		"<div class='todo'>" +
			"<div class='todo-wrapper'>" +
				"<div class='header clearfix'>" +
					"<h1>ToDo</h1>" +
					"<button class='add-btn btn blue'>Add Task</button>" +
				"</div>" +
				"<ul class='todo-list'>" +
				"</ul>" +
			"</div>" +
		"</div>";


	var MainView = function (config) {
		this.config = config || {};
		this.template = template;

		ToDo.Data.isAddEnabled = true;
	};

	MainView.prototype.init = function () {
		this.render();
		this.attachEvents();

		return this;
	};

	MainView.prototype.render = function () {
		this.el = ToDo.Util.parseToHTML(this.template);
		this.listEl = this.el.querySelector("ul");
		return this;
	};

	MainView.prototype.attachEvents = function () {
		var self = this;

		this.el.querySelector(".add-btn").addEventListener("click", this.addTask.bind(this), true);

		window.addEventListener("keydown", function (e) {
			if (e.keyCode === 65 && e.ctrlKey && ToDo.Data.isAddEnabled) {
				e.preventDefault();
				self.addTask();
				e.stopPropagation();
			}
		});
	};

	MainView.prototype.addTask = function () {
		var self = this,
			addTaskView = new ToDo.Views.AddTaskView( { callback: self.onAddTask.bind(self) });

		ToDo.Data.isAddEnabled = false;
		addTaskView.init();
		addTaskView.show();
	};

	MainView.prototype.onAddTask = function (model) {
		var self = this,
			taskItem,
			listEl = this.el.querySelector(".todo-list");

		ToDo.Data.isAddEnabled = true;
		if (!model) {
			// If no model means, user cancelled the add view
			return;
		}

		taskItem = new ToDo.Views.TaskItemView({ model: model, parentView: self });
		taskItem.init();

		listEl.insertBefore(taskItem.getEl(), listEl.firstChild);

		return taskItem;
	};

	MainView.prototype.getEl = function () {
		return this.el;
	};

	ToDo.Views.MainView = MainView;
}(ToDo));