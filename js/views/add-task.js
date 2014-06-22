(function (ToDo) {
	"use strict";

	var template =
		"<div class='add-task'>" +
			"<div class='add-task-wrapper control-group'>" +
				"<div class='col-1'>" +
					"<label for='description'>Task: </label>" +
				"</div>" +
				"<div class='col-2'>" +
					"<textarea id='description' autofocus></textarea>" +
				"</div>" +
			"</div>" +
			"<div class='footer clearfix'>" +
				"<button class='btn save blue floatr'>Save</button>" +
				"<button class='btn cancel red floatl'>Cancel</button>" +
			"</div>" +
		"</div>";


	var AddTaskView = function (config) {
		config = config || {};

		this.template = template;
		this.config = config;
		this.model = config.model || new ToDo.Models.TaskModel();
	};

	AddTaskView.prototype.init = function () {
		this.render();
		this.attachEvents();

		return this;
	};

	AddTaskView.prototype.render = function () {
		this.el = ToDo.Util.parseToHTML(this.template);

		return this;
	};

	AddTaskView.prototype.attachEvents = function () {
		this.el.querySelector(".save").addEventListener("click", this.save.bind(this), true);
	};

	AddTaskView.prototype.save = function () {
		var values = {};

		values.description = this.el.querySelector("#description").value;
		
		this.model.setValues(values);

		this.dialog.dispose();
		this.config.callback(this.model);
	};

	AddTaskView.prototype.show = function () {
		var dialog = new ToDo.Views.DialogView({ content: this.el, title: "Add Task" });

		dialog.init();
		dialog.show();

		this.dialog = dialog;
	};

	AddTaskView.prototype.getEl = function () {
		return this.el;
	};

	ToDo.Views.AddTaskView = AddTaskView;
}(ToDo));