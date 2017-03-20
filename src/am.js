define.amd = false;
require([
    "js/init/init",

    "js/functions/addMenuItem",
    "js/functions/addSeparator",
    "js/functions/logo",
    "js/functions/logoNormal",
    "js/functions/logoIcon",
    "js/functions/closeAllMenu",
    "js/functions/logoClick",

    "js/modules/menuItem",
    "js/modules/subMenuItem",

    "js/elements/layout"

], function () {
    console.log('%c AutomizyMenu loaded! ', 'background: #000000; color: #bada55; font-size:14px');
});