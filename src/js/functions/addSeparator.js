define([
    "js/init/init"
], function () {

    $AM.addSeparator = function(){
        $('<div class="automizy-menu-separator"></div>').appendTo($AM.$menuBox);
        return $AM;
    };

});