;(function (ToDo) {
	"use strict";

	var RestHttpMock = function (config) {
		this.config = config;
	};

	RestHttpMock.prototype.send = function (successFn, errorFn) {
		var isSuccess = false,
			successArgs = [];

		successArgs.push(config);

		switch this.config.type {
			case "POST":
				localStorage.setItem(config.url, config.data);
				break;
			case "GET":
				try {
					successArgs.push(JSON.parse(localStorage.getItem(config.url)));
				} catch (e) {
					errorFn.call(this, {
						msg: e,
					});
				}

				break;
			case "DELETE":
				localStorage.removeItem(config.url);
				break;
			case "PUT":
				localStorage.setItem(config.url, config.data);
				break;
			default:
				errorFn.call(this, {
					msg: "Unknown HTTP request",
					code: 101
				});
		}

		successFn.call(this, this.config);
	};

	ToDo.Util = ToDo.Util || {};
	ToDo.Util.Http = RestHttpMock;
}(ToDo));