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
				}
			});
			
		};

		Main.prototype.onAfterRendering = function(event){
			this.getView().getModel("info").attachRequestCompleted({}, this.updateSessionDates, this );
		};

		Main.prototype.updateSessionDates = function(event){
			//convert the json dates, because the calendar element is being a bitch
			let sessions = this.getView().getModel("info").getProperty("/sessions");
			sessions && sessions.forEach(function(session){
				session.startDate = new Date(session.startdate);
				session.endDate = new Date(session.enddate);
			});

			this.getView().getModel("info").setProperty("/sessions",sessions);
		};

		return Main;
	}
);