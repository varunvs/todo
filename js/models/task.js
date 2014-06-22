(function (ToDo) {
	"use strict";

	var TaskModel = function (config) {

		// The task model's default signature
		this.defaultModel = {
			id: (new Date().getTime()),
			description: null,
			state: "Pending"
		};

		this.config = config || {};
		this.init();
	};

	TaskModel.prototype.init = function () {
		var finalModel = {},
			model = this.config.model || {};

		for (var key in this.defaultModel) {
			if (model.hasOwnProperty(key)) {
				finalModel[key] = model[key]
			} else {
				// Assigning default value
				finalModel[key] = this.defaultModel[key];
			}
		}

		this.model = finalModel;
		return this;
	};

	TaskModel.prototype.setValues = function (values) {
		for (var key in values) {
			if (this.model.hasOwnProperty(key)) {
				this.model[key] = values[key];
			}
		}

		return this;
	};

	ToDo.Models.TaskModel = TaskModel;
}(ToDo));