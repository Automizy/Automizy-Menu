define([], function () {
    function hasFont(className, fontFamily){
        var span = document.createElement('span');
        span.className = className;
        span.style.display = 'none';
        document.body.insertBefore(span, document.body.firstChild);
        if (window.getComputedStyle(span, null).getPropertyValue('font-family') === fontFamily) {
            document.body.removeChild(span);
            return true;
        }
        document.body.removeChild(span);
        return false;
    }
    window.AutomizyMenu = window.$AM = new AutomizyProject({
        variables:{
            menuItems:[],
            subMenuList:[]
        },
        plugins:[
            {
                name:'fontAwesome',
                skipCondition:hasFont('fa', 'FontAwesome'),
                css:"vendor/fontawesome/css/font-awesome.min.css"
            },
            {
                name:'automizyIconSet',
                skipCondition:hasFont('automizy-icon', 'Automizy-Icon-Set'),
                css:"vendor/automizy-icon-set/automizy-icon-set.css"
            }
        ]
    });
    return $AM;
});