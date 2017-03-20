define([
    "js/init/init"
], function () {

    $AM.logoNormal = function(src){
        if(typeof src !== 'undefined') {
            $AM.ready(function () {
                $AM.$logoNormal.attr('src', src);
            });
            return $AM;
        }
        return $AM.$logoNormal.attr('src');
    };

});