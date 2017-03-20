define([
    "js/init/init"
], function () {

    $AM.closeAllMenu = function(){
        for (var i = 0; i < $AM.menuItems.length; i++) {
            $AM.menuItems[i].close();
        }
    };

});