module("todo", {
	setup: function () {
		ToDo.init();

		this.mainView = ToDo.mainView;
	},

	teardown: function () {
	
	}
});

test("Model operations", function () {
	var taskModel = new ToDo.Models.TaskModel();

	equal(taskModel.getValues().state, "Pending", "Default state should be 'Pending'");

	taskModel.setValues({
		description: "description changed"
	});

	equal(taskModel.getValues().description, "description changed", "Expects description to be 'new task added'");

});

test("Task View Operations", function () {
	var taskModel = new ToDo.Models.TaskModel(),
		self = this,
		taskView;

	taskModel.setValues({
		description: "New Task"
	});

	taskView = self.mainView.onAddTask(taskModel);
	ok(self.mainView.el.querySelector("li.task-item"), "Checking the task is added to DOM");

	equal(taskView.el.querySelector("[data-id='task-desc']").textContent, "New Task", "Comparing values of task description with 'New Task'");

	taskModel.setValues({
		description: "New task edited"
	});
	taskView.afterEditTask();
	equal(taskView.el.querySelector("[data-id='task-desc']").textContent, "New task edited", "Comparing values after editing task. Expects 'New task edited'");

	taskView.deleteTask();
	ok(!self.mainView.el.querySelector("li.task-item"), "Checking delete task");


});
