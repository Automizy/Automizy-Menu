(function(){
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
        name:'automizy-menu',
        variables:{
            menuItems:[],
            menuList:[],
            subMenuList:[]
        },
        plugins:[
            {
                name:'font-awesome',
                skipCondition:hasFont('fa', 'FontAwesome'),
                css:"vendor/fontawesome/css/font-awesome.min.css"
            },
            {
                name:'automizy-icon-set',
                skipCondition:hasFont('automizy-icon', 'Automizy-Icon-Set'),
                css:"vendor/automizy-icon-set/automizy-icon-set.css"
            }
        ]
    });
    return $AM;
})();

(function(){

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

})();

(function(){

    $AM.addSeparator = function(){
        $('<div class="automizy-menu-separator"></div>').appendTo($AM.$menuBox);
        return $AM;
    };

})();

(function(){

    $AM.logo = function(srcNormal, srcIcon){
        if(typeof srcNormal !== 'undefined') {
            $AM.logoNormal(srcNormal);
        }
        if(typeof srcIcon !== 'undefined') {
            $AM.logoIcon(srcIcon);
        }
        return $AM;
    };

})();

(function(){

    $AM.logoNormal = function(src){
        if(typeof src !== 'undefined') {
            $AM.ready(function () {
                $AM.$logoNormal.attr('src', src);
            });
            return $AM;
        }
        return $AM.$logoNormal.attr('src');
    };

})();

(function(){

    $AM.logoIcon = function(src){
        if(typeof src !== 'undefined') {
            $AM.ready(function () {
                $AM.$logoIcon.attr('src', src);
            });
            return $AM;
        }
        return $AM.$logoIcon.attr('src');
    };

})();

(function(){

    $AM.closeAllMenu = function(){
        for (var i = 0; i < $AM.menuItems.length; i++) {
            $AM.menuItems[i].close();
        }
    };

})();

(function(){

    $AM.functions.logoClick = function(){};
    $AM.logoClick = function(logoClick){
        if(typeof logoClick !== 'undefined') {
            $AM.functions.logoClick = logoClick;
            return $AM;
        }
        $AM.functions.logoClick.apply($AM, [$AM]);
        return $AM;
    };

})();

(function(){
    $AM.modules.menuItem = function () {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-menu-menuitem"></div>'),
            $menuItemBox: $('<table class="automizy-menu-menuitem-box" cellpadding="0" cellspacing="0" border="0"></table>'),
            $menuItemRow: $('<tr></tr>'),
            $menuItemIconCell: $('<td class="automizy-menu-menuitem-icon-cell"></td>'),
            $menuItemContentCell: $('<td class="automizy-menu-menuitem-content-cell"></td>'),
            $menuItemArrowCell: $('<td class="automizy-menu-menuitem-arrow-cell"></td>'),
            $icon: $('<span class="automizy-menu-menuitem-icon fa fa-flash"></span>'),
            $content: $('<span class="automizy-menu-menuitem-content"></span>'),
            $arrow: $('<span class="automizy-menu-menuitem-arrow fa fa-angle-right"></span>'),

            $subMenuItemBox: $('<div class="automizy-menu-submenuitem-list"></div>'),

            opened: false,
            single:false,
            visibility:true,
            autoActivate:true,
            content: '',
            icon: 'fa fa-flash',
            name: '',
            click:function(){},

            subMenus: []
        };

        t.d.$menuItemBox.appendTo(t.d.$widget);
        t.d.$menuItemRow.appendTo(t.d.$menuItemBox);
        t.d.$menuItemIconCell.appendTo(t.d.$menuItemRow);
        t.d.$menuItemContentCell.appendTo(t.d.$menuItemRow);
        t.d.$menuItemArrowCell.appendTo(t.d.$menuItemRow);
        t.d.$icon.appendTo(t.d.$menuItemIconCell);
        t.d.$content.appendTo(t.d.$menuItemContentCell);
        t.d.$arrow.appendTo(t.d.$menuItemArrowCell);
        t.d.$subMenuItemBox.appendTo(t.d.$widget);

        t.d.$menuItemBox.click(function () {
            t.click();
            if(t.autoActivate()) {
                if (t.d.subMenus.length > 0) {
                    t.toggle();
                } else {
                    t.active();
                }
            }
        });

        t.setDisplay();
    };


    var p = $AM.modules.menuItem.prototype;

    p.widget = function () {
        return this.d.$widget;
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            t.d.name = name;
            $AM.menuList[t.d.name] = t;
            return t;
        }
        return t.d.name;
    };
    p.open = function () {
        var t = this;
        t.active();
        t.d.opened = true;
        t.d.$subMenuItemBox.stop().slideDown();
        t.d.$arrow.removeClass('fa-angle-right').addClass('fa-angle-down');
        return t;
    };
    p.close = function () {
        var t = this;
        t.d.opened = false;
        t.d.$subMenuItemBox.stop().slideUp();
        t.widget().removeClass('automizy-active');
        t.d.$arrow.removeClass('fa-angle-down').addClass('fa-angle-right');
        return t;
    };
    p.active = function () {
        var t = this;
        $AM.closeAllMenu();
        t.widget().addClass('automizy-active');
        return t;
    };
    p.toggle = function () {
        var t = this;
        if (t.d.opened === false) {
            t.open();
        } else {
            t.close();
        }
        return t;
    };

    p.click = function (clickFunction) {
        var t = this;
        if (typeof clickFunction !== 'undefined') {
            t.d.click = clickFunction;
            return t;
        }
        t.d.click.apply(t, [t]);
        return t;
    };

    p.autoActivate = function (autoActivate) {
        var t = this;
        if (typeof autoActivate !== 'undefined') {
            t.d.autoActivate = autoActivate;
            return t;
        }
        return t.d.autoActivate;
    };

    p.content = p.html = p.text = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            t.d.content = content;
            t.d.$content.empty();
            if (typeof t.d.content === 'object') {
                if (typeof t.d.content.drawTo === 'function') {
                    t.d.content.drawTo(t.d.$content);
                } else if (typeof t.d.content.appendTo === 'function') {
                    t.d.content.appendTo(t.d.$content);
                } else {
                    t.d.$content.html(t.d.content);
                }
            } else {
                t.d.$content.html(t.d.content);
            }
            return t;
        }
        return t.d.content;
    };

    p.icon = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.icon = icon;
            if (t.d.icon === false) {
                t.widget().removeClass('automizy-has-icon');
            } else if (t.d.icon === true) {
                t.widget().addClass('automizy-has-icon');
            } else {
                t.widget().addClass('automizy-has-icon');
                var iconType = iconType || 'fa';
                if (iconType === 'fa') {
                    t.d.$icon.removeClass(function (index, css) {
                        return (css.match(/(^|\s)fa-\S+/g) || []).join(' ');
                    }).addClass('fa').addClass(icon);
                }
            }
            return t;
        }
        return t.d.icon || false;
    };

    p.single = function(single){
        var t = this;
        if (typeof single !== 'undefined') {
            t.d.single = single || false;
            t.widget().toggleClass('automizy-menu-menuitem-single', t.d.single);
            t.setDisplay();
            return t;
        }
        return t.d.single;
    };
    p.hide = function(){
        var t = this;
        t.widget().hide();
        return t;
    };
    p.show = function(){
        var t = this;
        t.widget().show();
        return t;
    };
    p.visibility = function(visibility){
        var t = this;
        if (typeof visibility !== 'undefined') {
            t.d.visibility = visibility || false;
            if (t.d.visibility) {
                t.show();
            } else {
                t.hide();
            }
            return t;
        }
        return t.d.visibility;
    };
    p.setDisplay = function(){
        var t = this;
        if(!t.d.visibility){
            return t;
        }
        if(t.d.subMenus.length > 0 || t.single()) {
            t.show();
        }else{
            t.hide();
        }
        return t;
    };

    p.addSubMenu = function () {
        var t = this;
        var subMenuItem = (new $AM.modules.subMenuItem);
        subMenuItem.parent(t);
        t.setDisplay();
        return subMenuItem;
    };

    p.removeSubMenu = function (name) {
        var t = this;
        for (var i = 0; i < t.d.subMenus.length; i++) {
            if (t.d.subMenus[i].name === name) {
                t.d.subMenus[i].removeFromParent();
            }
        }
        t.setDisplay();
        return t;
    }

})();

(function(){
    $AM.modules.subMenuItem = function () {
        var t = this;
        t.d = {
            $widget: $('<div class="automizy-menu-submenuitem"></div>'),
            $icon: $('<span class="automizy-menu-submenuitem-icon fa fa-circle"></span>'),
            $content: $('<span class="automizy-menu-submenuitem-content"></span>'),

            parent: false,

            click: function () {},

            visibility:true,
            content: '',
            icon: 'fa fa-circle',
            name: ''
        };

        t.d.$icon.appendTo(t.d.$widget);
        t.d.$content.appendTo(t.d.$widget);

        t.d.$widget.click(function () {
            t.click();
        })
    };


    var p = $AM.modules.subMenuItem.prototype;

    p.widget = function () {
        return this.d.$widget;
    };
    p.name = function (name) {
        var t = this;
        if (typeof name !== 'undefined') {
            delete $AM.subMenuList[t.d.name];
            t.d.name = name;
            $AM.subMenuList[t.d.name] = t;
            return t;
        }
        return t.d.name;
    };
    p.click = function (clickFunction) {
        var t = this;
        if (typeof clickFunction !== 'undefined') {
            t.d.click = clickFunction;
            return t;
        }
        t.d.click.apply(t, [t]);
        t.active();
        return t;
    };

    p.active = function(){
        var t = this;
        $AM.$menuBox.find('.automizy-menu-submenuitem').removeClass('automizy-active');
        t.widget().addClass('automizy-active');
        t.parent().open();
        return t;
    };

    p.content = p.html = p.text = function (content) {
        var t = this;
        if (typeof content !== 'undefined') {
            t.d.content = content;
            t.d.$content.empty();
            if (typeof t.d.content === 'object') {
                if (typeof t.d.content.drawTo === 'function') {
                    t.d.content.drawTo(t.d.$content);
                } else if (typeof t.d.content.appendTo === 'function') {
                    t.d.content.appendTo(t.d.$content);
                } else {
                    t.d.$content.html(t.d.content);
                }
            } else {
                t.d.$content.html(t.d.content);
            }
            return t;
        }
        return t.d.content;
    };


    p.icon = function (icon, iconType) {
        var t = this;
        if (typeof icon !== 'undefined') {
            t.d.icon = icon;
            if (t.d.icon === false) {
                t.widget().removeClass('automizy-has-icon');
            } else if (t.d.icon === true) {
                t.widget().addClass('automizy-has-icon');
            } else {
                t.widget().addClass('automizy-has-icon');
                var iconType = iconType || 'fa';
                if (iconType === 'fa') {
                    t.d.$icon.removeClass(function (index, css) {
                        return (css.match(/(^|\s)fa-\S+/g) || []).join(' ');
                    }).addClass('fa').addClass(icon);
                }
            }
            return t;
        }
        return t.d.icon || false;
    };

    p.hide = function(){
        var t = this;
        t.widget().hide();
        return t;
    };
    p.show = function(){
        var t = this;
        t.widget().show();
        return t;
    };
    p.visibility = function(visibility){
        var t = this;
        if (typeof visibility !== 'undefined') {
            t.d.visibility = visibility || false;
            if (t.d.visibility) {
                t.show();
            } else {
                t.hide();
            }
            return t;
        }
        return t.d.visibility;
    };

    p.parent = function (parent) {
        var t = this;
        if (typeof parent !== 'undefined') {
            t.removeFromParent();
            t.d.parent = parent;
            t.d.parent.d.subMenus.push(t);
            t.widget().appendTo(parent.d.$subMenuItemBox);
        }
        return t.d.parent;
    };

    p.removeFromParent = function () {
        var t = this;
        if (t.d.parent !== false) {
            for (var i = 0; i < t.d.parent.d.subMenus.length; i++) {
                if (t.d.parent.d.subMenus[i].name() === t.name()) {
                    t.d.parent.d.subMenus.splice(i, 1);
                    t.widget().appendTo($AM.$tmp);
                }
            }
            t.d.parent.setDisplay();
        }
        return t;
    };

    $AM.getSubMenu = function(name){
        for (var i = 0; i < $AM.menuItems.length; i++) {
            for(var j = 0; j < $AM.menuItems[i].d.subMenus.length; j++){
                if($AM.menuItems[i].d.subMenus[j].name() === name){
                    return $AM.menuItems[i].d.subMenus[j];
                }
            }
        }
        return false;
    }

})();

(function(){
    $AM.pluginsLoaded(function () {

        $AM.$tmp = $('<div id="automizy-menu-tmp"></div>');

        $AM.$widget = $('<div id="automizy-menu"></div>');
        $AM.$widgetTable = $('<table cellpadding="0" cellspacing="0" border="0" id="automizy-menu-table"></table>').appendTo($AM.$widget);
        $AM.$widgetTr1 = $('<tr id="automizy-menu-tr1"></tr>').appendTo($AM.$widgetTable);
        $AM.$widgetTd1 = $('<td id="automizy-menu-td1"></td>').appendTo($AM.$widgetTr1);
        $AM.$widgetTr2 = $('<tr id="automizy-menu-tr2"></tr>').appendTo($AM.$widgetTable);
        $AM.$widgetTd2 = $('<td id="automizy-menu-td2"></td>').appendTo($AM.$widgetTr2);

        $AM.$widgetTop = $('<div id="automizy-widget-top"></div>').appendTo($AM.$widgetTd1);

        $AM.$logoBox = $('<div id="automizy-menu-logo-box"></div>').appendTo($AM.$widgetTop).click(function(){
            $AM.logoClick();
        });
        $AM.$logoNormal = $('<img id="automizy-menu-logo-normal" src="" />').appendTo($AM.$logoBox);
        $AM.$mobileOpenCloseIcon = $('<span id="automizy-menu-mobile-openclose-icon"></span>').appendTo($AM.$widgetTop);
        $AM.$logoIcon = $('<img id="automizy-menu-logo-icon" src="" />').appendTo($AM.$logoBox);
        $AM.$openCloseIcon = $('<span id="automizy-menu-openclose-icon"></span>').appendTo($AM.$widgetTop);


        $AM.$menuBox = $('<div id="automizy-menu-menuitem-box"></div>').appendTo($AM.$widgetTd2);
        $AM.$bottomMenuBox = $('<div id="automizy-menu-menuitem-box-bottom"></div>').appendTo($AM.$menuBox);


        $AM.layoutReady();
        $AM.ready();
    });
})();

(function(){
    //console.log('%c AutomizyMenu loaded! ', 'background: #000000; color: #bada55; font-size:14px');
})();

(function(){})();