sap.ui.define([
	"sap/ui/core/UIComponent"
], function(UIComponent) {
	"use strict";

	var Component = UIComponent.extend("be.fiddle.sitbe.Component", {		
		metadata: {
			manifest: "json"
		},

        constructor:function(){
            UIComponent.prototype.constructor.apply(this, arguments);            
        }
    });

	Component.prototype.init = function() {
		UIComponent.prototype.init.apply(this, arguments);

		this.getModel("settings").setProperty("/startdate", new Date("2019-05-18T09:00:00"));

		// Remove the splash screen
		$(".loader-icon").removeClass("spinning-cog").addClass("shrinking-cog");
		$(".loader-background").fadeOut();
		$(".loader-text").fadeOut();
		window.setTimeout(function() { $("#loader").remove(); }, 400);
	};

    return Component;

});