sap.ui.define(
    ["sap/ui/core/mvc/Controller"],
    function(Controller){
        let Main = Controller.extend("be.fiddle.sitbe.controllers.Main",
        /** @lends be.fiddle.sitbe.controller.Main.prototype */
        {
        	
        });

        Main.prototype.getLength = function(array){
            if(Array.isArray(array)){
                return "" + array.length;
            }
            return "0";
        }

        return Main;
    }
);