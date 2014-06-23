var ToDo = (function () {
	"use strict";
	
	var ToDo = {
		init: function () {
			var mainView = new ToDo.Views.MainView();

			mainView.init();

			this.mainView = mainView;
			return this;
		},

		display: function () {
			var contentEl = document.querySelector(".content");

			contentEl.appendChild(this.mainView.getEl());

			return this;
		},

		Views:   {},
		Util:   {  },
		Models:{    },
		Data: {      }
	};

	return ToDo;
}());