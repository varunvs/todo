todo
====

A simple todo app. It lives and dies with in browser. Do not expect it to 'permanently' store values.

### Features
* Task add/edit/delete functionality
* Alignment of tasks by the use of drag and drop
* Keyboard shortcuts and navigation
* Basic unit testing

### Keyboard shortcuts and navigation
The basic keys assigned are Ctrl+a (Task add), e (if a task is having focus, press e to edit), d (delete a task). Use tab / shift+tab to navigate within the tasks. Use escape to close dialogs and ctrl+enter to invoke default behaviour of a dialog. In case of task add dialog, ctrl+enter invokes save action.

### Unit Testing
Unit testing of basic functionalities such as add/edit/delete is available. Navigate to test directory under the repository or head to http://varunvs.github.io/todo/test for real time action

### Architecture
The todo app is made using vanilla JS and is built with MVC architecture in mind. Each view component is an instance of its View object. The Views used in this app are
* MainView - This represents the main screen. Also it is a controller to all the subsequent task add operations
* TaskItem - Each individual task is a view. It operates on the top of TaskModel
* AddTask - This is the interface for add/edit a task. Based on the need, it creates/edits a TaskModel

The TaskModel is a class where its instance is used while creating/editing a TaskItem. It has basic features such as setting/getting model values. The signature of the TaskModel is defined in its constructor function and validation is done based on this signature. Irrelevant values passed to this model are ignored.

The drag and drop functionlity is attached to each task item ie on its view element. And keyboard shortcuts for edit/delete a task are attached to this element.

QUnit is used for unit testing. The testing is done on basic operations such as task add/edit/delete.

### Application Initialization Flow
The main module is ToDo object. To initialize ToDo app, execute ToDo.init(). Note that the DOM element is virtual and resides in memory but not in the actual DOM until you invoke ToDo.display(). This feature is leveraged for doing unit testing as it does not require ToDo app in the DOM.

### Demo
For a quick demo of the todo app, check out http://varunvs.github.io/todo. For running unit tests, head to http://varunvs.github.io/todo/test
