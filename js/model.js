;(function (ToDo) {
	"use strict";

	var TaskModel = function (id) {
		this.id = id;
	};

	TaskModel.prototype.save = function (successFn) {
		var self = this,
			request;

		request = new ToDo.Util.Http({
			type: "POST",
			url: "/api/task/" + this.id,
			data: self.model
		});

		request.send(function () {
			successFn.call(request);
		});

		return request;
	};

	TaskModel.prototype.get = function () {
		var request,
			self = this;

		request = new ToDo.Util.Http({
			type: "GET",
			url: "/api/task/" + this.id
		});

		request.send(function (config, data) {
			self.model = data;
		});

		return request;
	};

	ToDo.Models = ToDo.Models || {};
	ToDo.Models.TaskModel = TaskModel;
}(ToDo));
