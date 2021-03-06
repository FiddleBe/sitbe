sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/Fragment"
	],
	function (Controller, Fragment) {
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
		
		Main.prototype.onClickSession = function(event){
			//get the bindingcontext of the session
			let source = event.getParameter("appointment"); //using source variable for reuse later, since the event variable is binned after event cycle
			let context = source.getBindingContext("info");
			
			if(context){
				//instantiate the fragment:
				Fragment.load({name:"be.fiddle.sitbe.fragments.Session"}).then( function( popover ){
					//attach the bindingcontext to the fragment
					this.getView().addDependent(popover);
					popover.setBindingContext(context, "info"); //keep the same model name
					popover.attachAfterClose(function(event){ //make sure the popover is destroyed when it closes
						popover.destroy();
					});
					popover.openBy(source);
				}.bind(this));
			}
		};

		return Main;
	}
);
