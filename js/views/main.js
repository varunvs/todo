(function (ToDo) {
	"use strict";

	var template =
		"<div class='todo'>" +
			"<div class='todo-wrapper'>" +
				"<div class='header clearfix'>" +
					"<h1>ToDo</h1>" +
					"<button class='add-btn btn blue'>Add Task</button>" +
				"</div>" +
				"<div class='todo-list'>" +
				"</div>" +
			"</div>" +
		"</div>";


	var MainView = function (config) {
		this.config = config || {};
		this.template = template;
	};

	MainView.prototype.init = function () {
		this.render();
		this.attachEvents();

		return this;
	};

	MainView.prototype.render = function () {
		this.el = ToDo.Util.parseToHTML(this.template);

		return this;
	};

	MainView.prototype.attachEvents = function () {
		this.el.querySelector(".add-btn").addEventListener("click", this.addTask.bind(this), true);
	};

	MainView.prototype.addTask = function () {
		var self = this,
			addTaskView = new ToDo.Views.AddTaskView( { callback: self.onAddTask.bind(self) });

		addTaskView.init();
		addTaskView.show();
	};

	MainView.prototype.onAddTask = function (model) {
		var self = this,
			taskItem = new ToDo.Views.TaskItemView({ model: model, parentView: self });

		taskItem.init();

		this.el.querySelector(".todo-list").appendChild(taskItem.getEl());
	};

	MainView.prototype.getEl = function () {
		return this.el;
	};

	ToDo.Views.MainView = MainView;
}(ToDo));