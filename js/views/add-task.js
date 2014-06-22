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

		this.el.querySelector("#description").value = this.model.getValues().description;
		return this;
	};

	AddTaskView.prototype.attachEvents = function () {
		var self = this;

		this.el.querySelector(".save").addEventListener("click", this.save.bind(this), true);
		this.el.querySelector(".cancel").addEventListener("click", this.cancel.bind(this), true);

		this.keyHandler = this.keyHandler.bind(this);
		window.addEventListener("keydown", this.keyHandler);
	};

	AddTaskView.prototype.keyHandler = function (e) {
		if (e.keyCode === 27) {
			e.preventDefault();
			e.stopPropagation();
			this.cancel();
		}

		if (e.ctrlKey === true && e.keyCode === 13) {
			e.preventDefault();
			this.save();
		}

	};

	AddTaskView.prototype.save = function () {
		var values = {};

		values.description = this.el.querySelector("#description").value;
		
		this.model.setValues(values);

		window.removeEventListener("keydown", this.keyHandler);
		this.dialog.dispose();
		this.config.callback(this.model);
	};

	AddTaskView.prototype.cancel = function () {
		window.removeEventListener("keydown", this.keyHandler);
		this.dialog.dispose();
	};

	AddTaskView.prototype.show = function () {
		var dialog = new ToDo.Views.DialogView({ content: this.el, title: "Add Task" });

		dialog.init();
		dialog.show();

		this.dialog = dialog;
		this.el.querySelector("#description").focus();
	};

	AddTaskView.prototype.getEl = function () {
		return this.el;
	};

	ToDo.Views.AddTaskView = AddTaskView;
}(ToDo));