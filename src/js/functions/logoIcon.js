define([
    "js/init/init"
], function () {

    $AM.logoIcon = function(src){
        if(typeof src !== 'undefined') {
            $AM.ready(function () {
                $AM.$logoIcon.attr('src', src);
            });
            return $AM;
        }
        return $AM.$logoIcon.attr('src');
    };

});