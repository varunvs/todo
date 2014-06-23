(function (ToDo) {
	"use strict";

	var template =
		"<li class='task-item' draggable='true' tabindex='0'>" +
			"<div class='task-item-wrapper clearfix'>" +
				"<div class='actions'>" +
					"<button class='edit-btn' tabindex='-1'><img src='./img/pencil.png' /></button>" +
					"<button class='delete-btn' tabindex='-1'><img src='./img/delete.png' /></button>" +
				"</div>" +
				"<div class='clearfix task-content'>" +
					"<div class='marker floatl'>" +
						"<input type='checkbox' tabindex='-1' class='tick' />" +
					"</div>" +
					"<span data-id='task-desc'></span>" +
				"</div>" +
			"</div>" +
		"</li>";


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

		taskDescEl.textContent = this.model.getValues().description;
		taskDescEl.title = this.model.getValues().description;

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
			} else if (searchParent(e.target, "tick")) {
				this.markTask.call(this, e);
			}
		}.bind(this), true);

		this.el.addEventListener("keyup", function (e) {
			if (e.keyCode === 32) {
				this.el.querySelector(".tick").checked = !this.el.querySelector(".tick").checked;
				this.markTask();
				e.preventDefault();
				e.stopPropagation();
			} else if (e.keyCode === 68) {
				this.deleteTask();
			} else if (e.keyCode === 69) {
				this.editTask();
			}
		}.bind(this));

		this.el.addEventListener("dragstart", this.onStartDrag.bind(this), true);
        this.el.addEventListener("dragend", this.onEndDrag.bind(this), true);
        this.el.addEventListener("drop", this.onDragDrop.bind(this), true);
        this.el.addEventListener("dragover", this.onDragOver.bind(this), true);
	};

	TaskItemView.prototype.onStartDrag = function (e) {
		ToDo.Data.dragItem = this;

		e.dataTransfer.effectAllowed = "move";
		e.dataTransfer.setData("text/plain", "item");
	};

	TaskItemView.prototype.onEndDrag = function (e) {
		ToDo.Data.dragItem = null;
	};

	TaskItemView.prototype.onDragDrop = function (e) {
		var item = ToDo.Data.dragItem,
			dropIndex,
			myIndex;

		e.preventDefault();
		e.stopPropagation();

		if (item instanceof ToDo.Views.TaskItemView) {
			myIndex = Array.prototype.indexOf.call(this.config.parentView.listEl.childNodes, this.el);
			dropIndex = Array.prototype.indexOf.call(this.config.parentView.listEl.childNodes, item.el);

			if (myIndex > dropIndex) {
				this.config.parentView.listEl.insertBefore(item.el, this.el.nextSibling);
			} else {
				this.config.parentView.listEl.insertBefore(item.el, this.el);
			}
		}
	};

	TaskItemView.prototype.onDragOver = function (e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = "move";
	};

	TaskItemView.prototype.editTask = function (e) {
		var self = this,
			editTaskView = new ToDo.Views.AddTaskView( { callback: self.afterEditTask.bind(self), model: self.model });

		ToDo.Data.isAddEnabled = false;

		editTaskView.init();
		editTaskView.show();
	};

	TaskItemView.prototype.afterEditTask = function (model) {
		this.el.querySelector("[data-id='task-desc']").textContent = this.model.getValues().description;
		ToDo.Data.isAddEnabled = false;
	}

	TaskItemView.prototype.deleteTask = function (e) {
		this.el.parentElement.removeChild(this.el);
	};

	TaskItemView.prototype.markTask = function (e) {
		var el = this.el.querySelector(".tick");

		if (el.checked) {
			this.el.classList.add("complete");
			this.model.setValues({ state: "Complete" });
		} else {
			this.el.classList.remove("complete");
			this.model.setValues({ state: "Pending" });
		}
	};

	TaskItemView.prototype.getEl = function () {
		return this.el;
	};

	ToDo.Views.TaskItemView = TaskItemView;
}(ToDo));