define([
    "js/init/init"
], function () {

    $AM.addMenuItem = function(bottom){
        bottom = bottom || false;
        var menuItem =  (new $AM.modules.menuItem);
        if(bottom){
            menuItem.widget().appendTo($AM.$bottomMenuBox);
        }else {
            menuItem.widget().appendTo($AM.$menuBox);
        }
        $AM.menuItems.push(menuItem);
        return menuItem;
    };

});