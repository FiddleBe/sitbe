sap.ui.define(
	["sap/ui/core/mvc/Controller"],
	function (Controller) {
		let Main = Controller.extend("be.fiddle.sitbe.controllers.Main",
			/** @lends be.fiddle.sitbe.controller.Main.prototype */
			{

			});

		Main.prototype.onInit = function () {
			this.getView().bindElement({
				path: 'participants>/Events(59)',
				parameters:{
					expand:'Participants'
				}});
		};


		return Main;
	}
);