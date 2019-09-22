//<![CDATA[
(function($){$.fn.theiaStickySidebar=function(options){var defaults={'containerSelector':'','additionalMarginTop':0,'additionalMarginBottom':0,'updateSidebarHeight':true,'minWidth':0,'disableOnResponsiveLayouts':true,'sidebarBehavior':'modern','defaultPosition':'relative','namespace':'TSS'};options=$.extend(defaults,options);options.additionalMarginTop=parseInt(options.additionalMarginTop)||0;options.additionalMarginBottom=parseInt(options.additionalMarginBottom)||0;tryInitOrHookIntoEvents(options,this);function tryInitOrHookIntoEvents(options,$that){var success=tryInit(options,$that);if(!success){console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');$(document).on('scroll.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that));$(window).on('resize.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that))}}function tryInit(options,$that){if(options.initialized===true){return true}if($('body').width()<options.minWidth){return false}init(options,$that);return true}function init(options,$that){options.initialized=true;var existingStylesheet=$('#theia-sticky-sidebar-stylesheet-'+options.namespace);if(existingStylesheet.length===0){$('head').append($('<style id="theia-sticky-sidebar-stylesheet-'+options.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))}$that.each(function(){var o={};o.sidebar=$(this);o.options=options||{};o.container=$(o.options.containerSelector);if(o.container.length==0){o.container=o.sidebar.parent()}o.sidebar.parents().css('-webkit-transform','none');o.sidebar.css({'position':o.options.defaultPosition,'overflow':'visible','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'});o.stickySidebar=o.sidebar.find('.theiaStickySidebar');if(o.stickySidebar.length==0){var javaScriptMIMETypes=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;o.sidebar.find('script').filter(function(index,script){return script.type.length===0||script.type.match(javaScriptMIMETypes)}).remove();o.stickySidebar=$('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());o.sidebar.append(o.stickySidebar)}o.marginBottom=parseInt(o.sidebar.css('margin-bottom'));o.paddingTop=parseInt(o.sidebar.css('padding-top'));o.paddingBottom=parseInt(o.sidebar.css('padding-bottom'));var collapsedTopHeight=o.stickySidebar.offset().top;var collapsedBottomHeight=o.stickySidebar.outerHeight();o.stickySidebar.css('padding-top',1);o.stickySidebar.css('padding-bottom',1);collapsedTopHeight-=o.stickySidebar.offset().top;collapsedBottomHeight=o.stickySidebar.outerHeight()-collapsedBottomHeight-collapsedTopHeight;if(collapsedTopHeight==0){o.stickySidebar.css('padding-top',0);o.stickySidebarPaddingTop=0}else{o.stickySidebarPaddingTop=1}if(collapsedBottomHeight==0){o.stickySidebar.css('padding-bottom',0);o.stickySidebarPaddingBottom=0}else{o.stickySidebarPaddingBottom=1}o.previousScrollTop=null;o.fixedScrollTop=0;resetSidebar();o.onScroll=function(o){if(!o.stickySidebar.is(":visible")){return}if($('body').width()<o.options.minWidth){resetSidebar();return}if(o.options.disableOnResponsiveLayouts){var sidebarWidth=o.sidebar.outerWidth(o.sidebar.css('float')=='none');if(sidebarWidth+50>o.container.width()){resetSidebar();return}}var scrollTop=$(document).scrollTop();var position='static';if(scrollTop>=o.sidebar.offset().top+(o.paddingTop-o.options.additionalMarginTop)){var offsetTop=o.paddingTop+options.additionalMarginTop;var offsetBottom=o.paddingBottom+o.marginBottom+options.additionalMarginBottom;var containerTop=o.sidebar.offset().top;var containerBottom=o.sidebar.offset().top+getClearedHeight(o.container);var windowOffsetTop=0+options.additionalMarginTop;var windowOffsetBottom;var sidebarSmallerThanWindow=(o.stickySidebar.outerHeight()+offsetTop+offsetBottom)<$(window).height();if(sidebarSmallerThanWindow){windowOffsetBottom=windowOffsetTop+o.stickySidebar.outerHeight()}else{windowOffsetBottom=$(window).height()-o.marginBottom-o.paddingBottom-options.additionalMarginBottom}var staticLimitTop=containerTop-scrollTop+o.paddingTop;var staticLimitBottom=containerBottom-scrollTop-o.paddingBottom-o.marginBottom;var top=o.stickySidebar.offset().top-scrollTop;var scrollTopDiff=o.previousScrollTop-scrollTop;if(o.stickySidebar.css('position')=='fixed'){if(o.options.sidebarBehavior=='modern'){top+=scrollTopDiff}}if(o.options.sidebarBehavior=='stick-to-top'){top=options.additionalMarginTop}if(o.options.sidebarBehavior=='stick-to-bottom'){top=windowOffsetBottom-o.stickySidebar.outerHeight()}if(scrollTopDiff>0){top=Math.min(top,windowOffsetTop)}else{top=Math.max(top,windowOffsetBottom-o.stickySidebar.outerHeight())}top=Math.max(top,staticLimitTop);top=Math.min(top,staticLimitBottom-o.stickySidebar.outerHeight());var sidebarSameHeightAsContainer=o.container.height()==o.stickySidebar.outerHeight();if(!sidebarSameHeightAsContainer&&top==windowOffsetTop){position='fixed'}else if(!sidebarSameHeightAsContainer&&top==windowOffsetBottom-o.stickySidebar.outerHeight()){position='fixed'}else if(scrollTop+top-o.sidebar.offset().top-o.paddingTop<=options.additionalMarginTop){position='static'}else{position='absolute'}}if(position=='fixed'){var scrollLeft=$(document).scrollLeft();o.stickySidebar.css({'position':'fixed','width':getWidthForObject(o.stickySidebar)+'px','transform':'translateY('+top+'px)','left':(o.sidebar.offset().left+parseInt(o.sidebar.css('padding-left'))-scrollLeft)+'px','top':'0px'})}else if(position=='absolute'){var css={};if(o.stickySidebar.css('position')!='absolute'){css.position='absolute';css.transform='translateY('+(scrollTop+top-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom)+'px)';css.top='0px'}css.width=getWidthForObject(o.stickySidebar)+'px';css.left='';o.stickySidebar.css(css)}else if(position=='static'){resetSidebar()}if(position!='static'){if(o.options.updateSidebarHeight==true){o.sidebar.css({'min-height':o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom})}}o.previousScrollTop=scrollTop};o.onScroll(o);$(document).on('scroll.'+o.options.namespace,function(o){return function(){o.onScroll(o)}}(o));$(window).on('resize.'+o.options.namespace,function(o){return function(){o.stickySidebar.css({'position':'static'});o.onScroll(o)}}(o));if(typeof ResizeSensor!=='undefined'){new ResizeSensor(o.stickySidebar[0],function(o){return function(){o.onScroll(o)}}(o))}function resetSidebar(){o.fixedScrollTop=0;o.sidebar.css({'min-height':'1px'});o.stickySidebar.css({'position':'static','width':'','transform':'none'})}function getClearedHeight(e){var height=e.height();e.children().each(function(){height=Math.max(height,$(this).height())});return height}})}function getWidthForObject(object){var width;try{width=object[0].getBoundingClientRect().width}catch(err){}if(typeof width==="undefined"){width=object.width()}return width}return this}})(jQuery);

!function(a){a.fn.menuify=function(){return this.each(function(){var $t=a(this),b=$t.find('.LinkList ul > li').children('a'),c=b.length;for(var i=0;i<c;i++){var d=b.eq(i),h=d.text();if(h.charAt(0)!=='_'){var e=b.eq(i+1),j=e.text();if(j.charAt(0)==='_'){var m=d.parent();m.append('<ul class="sub-menu m-sub"/>');}}if(h.charAt(0)==='_'){d.text(h.replace('_',''));d.parent().appendTo(m.children('.sub-menu'));}}for(var i=0;i<c;i++){var f=b.eq(i),k=f.text();if(k.charAt(0)!=='_'){var g=b.eq(i+1),l=g.text();if(l.charAt(0)==='_'){var n=f.parent();n.append('<ul class="sub-menu2 m-sub"/>');}}if(k.charAt(0)==='_'){f.text(k.replace('_',''));f.parent().appendTo(n.children('.sub-menu2'));}}$t.find('.LinkList ul li ul').parent('li').addClass('has-sub');});}}(jQuery);

!function(a){a.fn.tabify=function(b){b=jQuery.extend({onHover:false,animated:true,transition:'fadeInUp'},b);return this.each(function(){var e=a(this),c=e.children('[tab-ify]'),d=0,n='tab-animated',k='tab-active';if(b.onHover==true){var event='mouseenter'}else{var event='click'}e.prepend('<ul class="select-tab"></ul>');c.each(function(){if(b.animated==true){a(this).addClass(n)}e.find('.select-tab').append('<li><a href="javascript:;">'+a(this).attr('tab-ify')+'</a></li>')}).eq(d).addClass(k).addClass('tab-'+b.transition);e.find('.select-tab a').on(event,function(){var f=a(this).parent().index();a(this).closest('.select-tab').find('.active').removeClass('active');a(this).parent().addClass('active');c.removeClass(k).removeClass('tab-'+b.transition).eq(f).addClass(k).addClass('tab-'+b.transition);return false}).eq(d).parent().addClass('active')})}}(jQuery);

(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);

! function (_0xaf1cx3) {
    _0xaf1cx3.fn.lazyify = function () {
        return this.each(function () {
            var _0xaf1cx4 = _0xaf1cx3(this),
                _0xaf1cx5 = _0xaf1cx4.attr("data-image"),
                _0xaf1cx6 = Math.round(_0xaf1cx4.width()),
                _0xaf1cx7 = Math.round(_0xaf1cx4.height()),
                _0xaf1cx8 = "/w" + _0xaf1cx6 + "-h" + _0xaf1cx7 + "-p-k-no-nu",
                _0xaf1cx9 = "";
            if (_0xaf1cx5.match("s72-c")) {
                _0xaf1cx9 = _0xaf1cx5.replace("/s72-c", _0xaf1cx8)
            } else {
                if (_0xaf1cx5.match("w72-h")) {
                    _0xaf1cx9 = _0xaf1cx5.replace("/w72-h72-p-k-no-nu", _0xaf1cx8)
                } else {
                    _0xaf1cx9 = _0xaf1cx5
                }
            };
            _0xaf1cx3(window).on("load resize scroll", _0xaf1cxa);
            function _0xaf1cxa() {
                var _0xaf1cxb = _0xaf1cx3(window).height(),
                    _0xaf1cxc = _0xaf1cx3(window).scrollTop(),
                    _0xaf1cxd = _0xaf1cx4.offset().top;
                if (_0xaf1cxc + _0xaf1cxb > _0xaf1cxd) {
                    var _0xaf1cxe = new Image();
                    _0xaf1cxe.onload = function () {
                        _0xaf1cx4.attr("style", "background-image:url(" + this.src + ")").addClass("lazy-ify")
                    }, _0xaf1cxe.src = _0xaf1cx9
                }
            }
            _0xaf1cxa()
        })
    }
}(jQuery);
$("#magify-main-menu").menuify();
$("#magify-main-menu .widget").addClass("show-menu");
$(".search-toggle").on("click", function () {
    $("body").toggleClass("search-active")
});
$(".blog-posts-title a.more,.related-title a.more").each(function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx10 = showMoreText;
    if (_0xaf1cx10 != "") {
        _0xaf1cxf.text(_0xaf1cx10)
    }
});
$(".follow-by-email-text").each(function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx11 = followByEmailText;
    if (_0xaf1cx11 != "") {
        _0xaf1cxf.text(_0xaf1cx11)
    }
});
$(".post-body strike").each(function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx12 = _0xaf1cxf.text().trim();
    if (_0xaf1cx12 == "$ads={1}") {
        _0xaf1cxf.replaceWith("<div id=\"new-before-ad\"/>")
    };
    if (_0xaf1cx12 == "$ads={2}") {
        _0xaf1cxf.replaceWith("<div id=\"new-after-ad\"/>")
    }
});
$("#new-before-ad").each(function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf.length) {
        $("#before-ad").appendTo(_0xaf1cxf)
    }
});
$("#new-after-ad").each(function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf.length) {
        $("#after-ad").appendTo(_0xaf1cxf)
    }
});
$("#main-before-ad .widget").each(function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf.length) {
        _0xaf1cxf.appendTo($("#before-ad"))
    }
});
$("#main-after-ad .widget").each(function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf.length) {
        _0xaf1cxf.appendTo($("#after-ad"))
    }
});
$("#social-counter ul.social-icons li a").each(function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx13 = _0xaf1cxf.find(".count"),
        _0xaf1cx14 = _0xaf1cxf.data("content").trim(),
        _0xaf1cx15 = _0xaf1cx14.split("$"),
        _0xaf1cx16 = _0xaf1cx15[0],
        _0xaf1cx17 = _0xaf1cx15[1];
    _0xaf1cxf.attr("href", _0xaf1cx16);
    _0xaf1cx13.text(_0xaf1cx17)
});
$(".avatar-image-container img").attr("src", function (_0xaf1cx18, _0xaf1cx19) {
    _0xaf1cx19 = _0xaf1cx19.replace("//resources.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg");
    _0xaf1cx19 = _0xaf1cx19.replace("//img1.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg");
    return _0xaf1cx19
});
$(".post-body a").each(function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1a = _0xaf1cx18.text().trim(),
        _0xaf1cx1b = _0xaf1cx1a.split("/"),
        _0xaf1cx1c = _0xaf1cx1b[0],
        _0xaf1cx1d = _0xaf1cx1b[1],
        _0xaf1cx1e = _0xaf1cx1b.pop();
    if (_0xaf1cx1a.match("button")) {
        _0xaf1cx18.addClass("button").text(_0xaf1cx1c);
        if (_0xaf1cx1d != "button") {
            _0xaf1cx18.addClass(_0xaf1cx1d)
        };
        if (_0xaf1cx1e != "button") {
            _0xaf1cx18.addClass("colored-button").css({
                "background-color": _0xaf1cx1e
            })
        }
    }
});
$(".post-body strike").each(function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1a = _0xaf1cx18.text().trim(),
        _0xaf1cx1f = _0xaf1cx18.html();
    if (_0xaf1cx1a.match("contact-form")) {
        _0xaf1cx18.replaceWith("<div class=\"contact-form\"/>");
        $(".contact-form").append($("#ContactForm1"))
    };
    if (_0xaf1cx1a.match("alert-success")) {
        _0xaf1cx18.replaceWith("<div class=\"alert-message alert-success short-b\">" + _0xaf1cx1f + "</div>")
    };
    if (_0xaf1cx1a.match("alert-info")) {
        _0xaf1cx18.replaceWith("<div class=\"alert-message alert-info short-b\">" + _0xaf1cx1f + "</div>")
    };
    if (_0xaf1cx1a.match("alert-warning")) {
        _0xaf1cx18.replaceWith("<div class=\"alert-message alert-warning short-b\">" + _0xaf1cx1f + "</div>")
    };
    if (_0xaf1cx1a.match("alert-error")) {
        _0xaf1cx18.replaceWith("<div class=\"alert-message alert-error short-b\">" + _0xaf1cx1f + "</div>")
    };
    if (_0xaf1cx1a.match("left-sidebar")) {
        _0xaf1cx18.replaceWith("<style>.item #main-wrapper{float:right}.item #sidebar-wrapper{float:left}</style>")
    };
    if (_0xaf1cx1a.match("right-sidebar")) {
        _0xaf1cx18.replaceWith("<style>.item #main-wrapper{float:left}.item #sidebar-wrapper{float:right}</style>")
    };
    if (_0xaf1cx1a.match("full-width")) {
        _0xaf1cx18.replaceWith("<style>.item #main-wrapper{width:100%}.item #sidebar-wrapper{display:none}</style>")
    };
    if (_0xaf1cx1a.match("code-box")) {
        _0xaf1cx18.replaceWith("<pre class=\"code-box short-b\">" + _0xaf1cx1f + "</pre>")
    };
    var _0xaf1cx20 = $(".post-body .short-b").find("b");
    _0xaf1cx20.each(function () {
        var _0xaf1cx21 = $(this),
            _0xaf1cxf = _0xaf1cx21.text().trim();
        if (_0xaf1cxf.match("alert-success") || _0xaf1cxf.match("alert-info") || _0xaf1cxf.match("alert-warning") || _0xaf1cxf.match("alert-error") || _0xaf1cxf.match("code-box")) {
            _0xaf1cx21.replaceWith("")
        }
    })
});
$(".share-links .window-ify,.entry-share .window-ify").on("click", function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx22 = _0xaf1cx18.data("url"),
        _0xaf1cx23 = _0xaf1cx18.data("width"),
        _0xaf1cx24 = _0xaf1cx18.data("height"),
        _0xaf1cx25 = window.screen.width,
        _0xaf1cx26 = window.screen.height,
        _0xaf1cx27 = Math.round(_0xaf1cx25 / 2 - _0xaf1cx23 / 2),
        _0xaf1cx28 = Math.round(_0xaf1cx26 / 2 - _0xaf1cx24 / 2),
        _0xaf1cx29 = window.open(_0xaf1cx22, "_blank", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=" + _0xaf1cx23 + ",height=" + _0xaf1cx24 + ",left=" + _0xaf1cx27 + ",top=" + _0xaf1cx28);
    _0xaf1cx29.focus()
});
$(".share-links").each(function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx21 = _0xaf1cxf.find(".show-hid a");
    _0xaf1cx21.on("click", function () {
        _0xaf1cxf.toggleClass("show-hidden")
    })
});
$(".about-author .author-description span a").each(function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx2a = _0xaf1cx18.text().trim(),
        _0xaf1cx22 = _0xaf1cx18.attr("href");
    _0xaf1cx18.replaceWith("<li class=\"" + _0xaf1cx2a + "\"><a href=\"" + _0xaf1cx22 + "\" title=\"" + _0xaf1cx2a + "\" target=\"_blank\"/></li>");
    $(".author-description").append($(".author-description span li"));
    $(".author-description").addClass("show-icons")
});
function regxify(_0xaf1cx19) {
    var _0xaf1cx2c = /[^{\}]+(?=})/g;
    return String(_0xaf1cx19.match(_0xaf1cx2c)).trim()
}
$("#magify-main-menu li").each(function (_0xaf1cx2d) {
    var _0xaf1cx2e = $(this),
        _0xaf1cx18 = _0xaf1cx2e,
        _0xaf1cx2f = _0xaf1cx2e.find("a"),
        _0xaf1cx1c = _0xaf1cx2f.attr("href").trim(),
        _0xaf1cx30 = _0xaf1cx1c.toLowerCase(),
        _0xaf1cx31 = _0xaf1cx1c.split("$");
    _0xaf1cx31[1] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[1]) : _0xaf1cx2d = "";
    if (_0xaf1cx30.match("getmega")) {
        _0xaf1cx18.addClass("has-sub mega-menu")
    };
    ajaxMega(_0xaf1cx18, "msimple", 5, _0xaf1cx2d, _0xaf1cx30)
});
$("#featured .HTML .widget-content").each(function (_0xaf1cx2d, _0xaf1cx1e) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18.text().trim(),
        _0xaf1cx30 = _0xaf1cx1c.toLowerCase(),
        _0xaf1cx31 = _0xaf1cx1c.split("$");
    _0xaf1cx31[1] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[1]) : _0xaf1cx2d = "";
    _0xaf1cx31[2] != undefined ? _0xaf1cx1e = regxify(_0xaf1cx31[2]) : _0xaf1cx1e = "";
    ajaxFeatured(_0xaf1cx18, "featured", 4, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e)
});
$(".block-posts .HTML .widget-content").each(function (_0xaf1cx32, _0xaf1cx2d, _0xaf1cx1a, _0xaf1cx1e) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18.text().trim(),
        _0xaf1cx30 = _0xaf1cx1c.toLowerCase(),
        _0xaf1cx31 = _0xaf1cx1c.split("$");
    _0xaf1cx31[1] != undefined ? _0xaf1cx32 = regxify(_0xaf1cx31[1]) : _0xaf1cx32 = "";
    _0xaf1cx31[2] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[2]) : _0xaf1cx2d = "";
    _0xaf1cx31[3] != undefined ? _0xaf1cx1a = regxify(_0xaf1cx31[3]) : _0xaf1cx1a = "";
    _0xaf1cx31[4] != undefined ? _0xaf1cx1e = regxify(_0xaf1cx31[4]) : _0xaf1cx1e = "";
    ajaxBlock(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e)
});
$(".widget-ready .HTML .widget-content").each(function (_0xaf1cx32, _0xaf1cx2d, _0xaf1cx1a) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18.text().trim(),
        _0xaf1cx30 = _0xaf1cx1c.toLowerCase(),
        _0xaf1cx31 = _0xaf1cx1c.split("$");
    _0xaf1cx31[1] != undefined ? _0xaf1cx32 = regxify(_0xaf1cx31[1]) : _0xaf1cx32 = "";
    _0xaf1cx31[2] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[2]) : _0xaf1cx2d = "";
    _0xaf1cx31[3] != undefined ? _0xaf1cx1a = regxify(_0xaf1cx31[3]) : _0xaf1cx1a = "";
    ajaxWidget(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30)
});
$(".related-content").each(function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx2d = _0xaf1cx18.find(".related-tag").attr("data-label"),
        _0xaf1cx32 = relatedPostsNum;
    ajaxRelated(_0xaf1cx18, "related", _0xaf1cx32, _0xaf1cx2d, "getrelated")
});
function msgError() {
    return "<span class=\"no-posts\"><b>Error:</b> No Results Found</span>"
}
function msgServerError() {
    return "<div class=\"no-posts error-503\"><b>Error loading feeds!</b> Maybe because the connection failed or the blogger server did not respond to the request.</div>"
}
function beforeLoader() {
    return "<div class=\"loader\"/>"
}
function getFeedUrl(_0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d) {
    var _0xaf1cx37 = "";
    switch (_0xaf1cx2d) {
    case "recent":
        _0xaf1cx37 = "/feeds/posts/summary?alt=json&max-results=" + _0xaf1cx32;
        break;
    case "comments":
        if (_0xaf1cx1a == "list") {
            _0xaf1cx37 = "/feeds/comments/summary?alt=json&max-results=" + _0xaf1cx32
        } else {
            _0xaf1cx37 = "/feeds/posts/summary/-/" + _0xaf1cx2d + "?alt=json&max-results=" + _0xaf1cx32
        };
        break;
    default:
        _0xaf1cx37 = "/feeds/posts/summary/-/" + _0xaf1cx2d + "?alt=json&max-results=" + _0xaf1cx32;
        break
    };
    return _0xaf1cx37
}
function getPostLink(_0xaf1cx39, _0xaf1cx19) {
    for (var _0xaf1cx3a = 0; _0xaf1cx3a < _0xaf1cx39[_0xaf1cx19].link.length; _0xaf1cx3a++) {
        if (_0xaf1cx39[_0xaf1cx19].link[_0xaf1cx3a].rel == "alternate") {
            var _0xaf1cx3b = _0xaf1cx39[_0xaf1cx19].link[_0xaf1cx3a].href;
            break
        }
    };
    return _0xaf1cx3b
}
function getPostTitle(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19].title.$t;
    return _0xaf1cxe
}
function getPostImage(_0xaf1cx39, _0xaf1cx19) {
    if ("media$thumbnail" in _0xaf1cx39[_0xaf1cx19]) {
        var _0xaf1cx3e = _0xaf1cx39[_0xaf1cx19].media$thumbnail.url;
        if (_0xaf1cx3e.match("img.youtube.com")) {
            _0xaf1cx3e = _0xaf1cx3e.replace("/default.", "/0.")
        };
        var _0xaf1cx9 = _0xaf1cx3e
    } else {
        _0xaf1cx9 = "https://4.bp.blogspot.com/-eALXtf-Ljts/WrQYAbzcPUI/AAAAAAAABjY/vptx-N2H46oFbiCqbSe2JgVSlHhyl0MwQCK4BGAYYCw/s72-c/nth-ify.png"
    };
    return _0xaf1cx9
}
function getPostAuthor(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19].author[0].name.$t;
    if (messages.postAuthor == "true") {
        var _0xaf1cx40 = "<span class=\"entry-author\">" + _0xaf1cxe + "</span>"
    } else {
        var _0xaf1cx40 = ""
    };
    return _0xaf1cx40
}
function getPostDate(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cx42 = _0xaf1cx39[_0xaf1cx19].published.$t,
        _0xaf1cx43 = _0xaf1cx42.substring(0, 4),
        _0xaf1cx44 = _0xaf1cx42.substring(5, 7),
        _0xaf1cx45 = _0xaf1cx42.substring(8, 10),
        _0xaf1cx46 = monthFormat[parseInt(_0xaf1cx44, 10) - 1] + " " + _0xaf1cx45 + ", " + _0xaf1cx43;
    if (messages.postDate == "true") {
        var _0xaf1cx40 = "<span class=\"entry-time\"><time class=\"published\" datetime=\"" + _0xaf1cx42 + "\">" + _0xaf1cx46 + "</time></span>"
    } else {
        _0xaf1cx40 = ""
    };
    return _0xaf1cx40
}
function getPostMeta(_0xaf1cx48, _0xaf1cx49) {
    if (messages.postAuthor == "true" || messages.postDate == "true") {
        var _0xaf1cx4a = "<div class=\"entry-meta\">" + _0xaf1cx48 + _0xaf1cx49 + "</div>"
    } else {
        _0xaf1cx4a = ""
    };
    if (messages.postDate == "true") {
        var _0xaf1cx4b = "<div class=\"entry-meta\">" + _0xaf1cx49 + "</div>"
    } else {
        _0xaf1cx4b = ""
    };
    var _0xaf1cx40 = [_0xaf1cx4a, _0xaf1cx4b];
    return _0xaf1cx40
}
function getPostLabel(_0xaf1cx39, _0xaf1cx19) {
    if (_0xaf1cx39[_0xaf1cx19].category != undefined) {
        var _0xaf1cx4d = _0xaf1cx39[_0xaf1cx19].category[0].term,
            _0xaf1cx40 = "<span class=\"entry-category\">" + _0xaf1cx4d + "</span>"
    } else {
        _0xaf1cx40 = ""
    };
    return _0xaf1cx40
}
function getPostComments(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19].author[0].name.$t,
        _0xaf1cx4f = _0xaf1cx39[_0xaf1cx19].author[0].gd$image.src.replace("/s113", "/w55-h55-p-k-no-nu"),
        _0xaf1cx46 = _0xaf1cx39[_0xaf1cx19].title.$t;
    if (_0xaf1cx4f.match("//img1.blogblog.com/img/blank.gif")) {
        var _0xaf1cx9 = "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w55-h55-p-k-no-nu/avatar.jpg"
    } else {
        var _0xaf1cx9 = _0xaf1cx4f
    };
    var _0xaf1cx40 = "<article class=\"custom-item item-" + _0xaf1cx19 + "\"><a class=\"entry-image-link cmm-avatar\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx9 + "\"/></a><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cxe + "</a></h2><p class=\"cmm-snippet excerpt\">" + _0xaf1cx46 + "</p></article>";
    return _0xaf1cx40
}
function getCustomStyle(_0xaf1cx1a, _0xaf1cx2d, _0xaf1cx1e) {
    if (_0xaf1cx1e != "") {
        if (_0xaf1cx1a == "featured") {
            var _0xaf1cx40 = ".id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " .entry-category{background-color:" + _0xaf1cx1e + ";color:#fff}.id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " .loader:after{border-color:" + _0xaf1cx1e + ";border-right-color:rgba(155,155,155,0.2)}"
        } else {
            _0xaf1cx40 = ".id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " .title-wrap:after,.id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " .entry-category{background-color:" + _0xaf1cx1e + ";color:#fff}.id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " .title-wrap > a.more:hover,.id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " .entry-header:not(.entry-info) .entry-title a:hover{color:" + _0xaf1cx1e + "}.id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " .loader:after{border-color:" + _0xaf1cx1e + ";border-right-color:rgba(155,155,155,0.2)}"
        }
    } else {
        _0xaf1cx40 = ""
    };
    return _0xaf1cx40
}
function getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e) {
    switch (_0xaf1cx1a) {
    case "msimple":
        ;
    case "featured":
        ;
    case "block1":
        ;
    case "col-left":
        ;
    case "col-right":
        ;
    case "grid1":
        ;
    case "videos":
        ;
    case "list":
        ;
    case "related":
        if (_0xaf1cx2d == undefined) {
            _0xaf1cx2d = "geterror404"
        };
        var _0xaf1cx37 = getFeedUrl(_0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d);
        $.ajax({
            url: _0xaf1cx37,
            type: "GET",
            dataType: "json",
            cache: true,
            beforeSend: function (_0xaf1cx52) {
                var _0xaf1cx53 = getCustomStyle(_0xaf1cx1a, _0xaf1cx2d, _0xaf1cx1e);
                switch (_0xaf1cx1a) {
                case "featured":
                    $("#page-skin-2").prepend(_0xaf1cx53);
                    _0xaf1cx18.html(beforeLoader()).parent().addClass("id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " show-ify");
                    break;
                case "block1":
                    ;
                case "grid1":
                    ;
                case "videos":
                    $("#page-skin-2").prepend(_0xaf1cx53);
                    _0xaf1cx18.html(beforeLoader()).parent().addClass("id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " show-ify");
                    break;
                case "col-left":
                    $("#page-skin-2").prepend(_0xaf1cx53);
                    _0xaf1cx18.html(beforeLoader()).parent().addClass("column-left block-column id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " show-ify");
                    break;
                case "col-right":
                    $("#page-skin-2").prepend(_0xaf1cx53);
                    _0xaf1cx18.html(beforeLoader()).parent().addClass("column-right block-column id-" + _0xaf1cx1a + "-" + _0xaf1cx2d + " show-ify");
                    break;
                case "list":
                    _0xaf1cx18.html(beforeLoader());
                    break;
                case "related":
                    _0xaf1cx18.html(beforeLoader()).parent().addClass("show-ify");
                    break
                }
            },
            success: function (_0xaf1cx52) {
                var _0xaf1cx1f = "";
                switch (_0xaf1cx1a) {
                case "msimple":
                    _0xaf1cx1f = "<ul class=\"mega-widget\">";
                    break;
                case "featured":
                    _0xaf1cx1f = "<div class=\"featured-posts\">";
                    break;
                case "block1":
                    _0xaf1cx1f = "<div class=\"block-posts-1\">";
                    break;
                case "col-left":
                    ;
                case "col-right":
                    _0xaf1cx1f = "<div class=\"column-posts\">";
                    break;
                case "grid1":
                    _0xaf1cx1f = "<div class=\"grid-posts-1\">";
                    break;
                case "videos":
                    _0xaf1cx1f = "<div class=\"block-videos\">";
                    break;
                case "list":
                    _0xaf1cx1f = "<div class=\"custom-widget\">";
                    break;
                case "related":
                    _0xaf1cx1f = "<div class=\"related-posts\">";
                    break
                };
                var _0xaf1cx54 = _0xaf1cx52.feed.entry;
                if (_0xaf1cx54 != undefined) {
                    for (var _0xaf1cx19 = 0, _0xaf1cx39 = _0xaf1cx54; _0xaf1cx19 < _0xaf1cx39.length; _0xaf1cx19++) {
                        var _0xaf1cx3b = getPostLink(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx55 = getPostTitle(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b),
                            _0xaf1cx56 = getPostImage(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b),
                            _0xaf1cx48 = getPostAuthor(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx49 = getPostDate(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx57 = getPostMeta(_0xaf1cx48, _0xaf1cx49),
                            _0xaf1cx4d = getPostLabel(_0xaf1cx39, _0xaf1cx19);
                        var _0xaf1cx58 = "";
                        switch (_0xaf1cx1a) {
                        case "msimple":
                            _0xaf1cx58 += "<article class=\"mega-item\"><div class=\"mega-content\"><a class=\"entry-image-link\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[1] + "</div></article>";
                            break;
                        case "featured":
                            switch (_0xaf1cx19) {
                            case 0:
                                ;
                            case 1:
                                _0xaf1cx58 += "<article class=\"featured-item post item-" + _0xaf1cx19 + "\"><div class=\"featured-item-inner\"><a class=\"entry-image-link before-mask\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a>" + _0xaf1cx4d + "<div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[0] + "</div></div></article>";
                                break;
                            default:
                                _0xaf1cx58 += "<article class=\"featured-item post item-" + _0xaf1cx19 + "\"><div class=\"featured-item-inner\"><a class=\"entry-image-link before-mask\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a>" + _0xaf1cx4d + "<div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[1] + "</div></div></article>";
                                break
                            };
                            break;
                        case "block1":
                            switch (_0xaf1cx19) {
                            case 0:
                                _0xaf1cx58 += "<article class=\"block-item item-" + _0xaf1cx19 + "\"><div class=\"block-inner\">" + _0xaf1cx4d + "<a class=\"entry-image-link before-mask\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a><div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[0] + "</div></div></article>";
                                break;
                            default:
                                _0xaf1cx58 += "<article class=\"block-item item-" + _0xaf1cx19 + "\"><a class=\"entry-image-link\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[1] + "</div></article>";
                                break
                            };
                            break;
                        case "col-left":
                            ;
                        case "col-right":
                            switch (_0xaf1cx19) {
                            case 0:
                                _0xaf1cx58 += "<article class=\"column-item item-" + _0xaf1cx19 + "\"><div class=\"column-inner\">" + _0xaf1cx4d + "<a class=\"entry-image-link before-mask\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a><div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[0] + "</div></div></article>";
                                break;
                            default:
                                _0xaf1cx58 += "<article class=\"column-item item-" + _0xaf1cx19 + "\"><a class=\"entry-image-link\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[1] + "</div></article>";
                                break
                            };
                            break;
                        case "grid1":
                            _0xaf1cx58 += "<article class=\"grid-item item-" + _0xaf1cx19 + "\"><div class=\"entry-image\"><a class=\"entry-image-link\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[1] + "</div></article>";
                            break;
                        case "videos":
                            _0xaf1cx58 += "<article class=\"videos-item item-" + _0xaf1cx19 + "\"><div class=\"entry-image\"><a class=\"entry-image-link\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/><span class=\"video-icon\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[1] + "</div></article>";
                            break;
                        case "list":
                            switch (_0xaf1cx2d) {
                            case "comments":
                                var _0xaf1cx40 = getPostComments(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b);
                                _0xaf1cx58 += _0xaf1cx40;
                                break;
                            default:
                                _0xaf1cx58 += "<article class=\"custom-item item-" + _0xaf1cx19 + "\"><a class=\"entry-image-link\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[1] + "</div></article>";
                                break
                            };
                            break;
                        case "related":
                            _0xaf1cx58 += "<article class=\"related-item post item-" + _0xaf1cx19 + "\"><div class=\"entry-image\"><a class=\"entry-image-link\" href=\"" + _0xaf1cx3b + "\"><span class=\"entry-thumb\" data-image=\"" + _0xaf1cx56 + "\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"" + _0xaf1cx3b + "\">" + _0xaf1cx55 + "</a></h2>" + _0xaf1cx57[1] + "</div></article>";
                            break
                        };
                        _0xaf1cx1f += _0xaf1cx58
                    }
                } else {
                    switch (_0xaf1cx1a) {
                    case "msimple":
                        _0xaf1cx1f = "<ul class=\"mega-widget\">" + msgError() + "</ul>";
                        break;
                    default:
                        _0xaf1cx1f = msgError();
                        break
                    }
                };
                switch (_0xaf1cx1a) {
                case "msimple":
                    _0xaf1cx1f += "</ul>";
                    _0xaf1cx18.append(_0xaf1cx1f).addClass("msimple");
                    _0xaf1cx18.find("a:first").attr("href", function (_0xaf1cx18, _0xaf1cx59) {
                        switch (_0xaf1cx2d) {
                        case "recent":
                            _0xaf1cx59 = _0xaf1cx59.replace(_0xaf1cx59, "/search");
                            break;
                        default:
                            _0xaf1cx59 = _0xaf1cx59.replace(_0xaf1cx59, "/search/label/" + _0xaf1cx2d);
                            break
                        };
                        return _0xaf1cx59
                    });
                    break;
                case "block1":
                    ;
                case "grid1":
                    ;
                case "col-left":
                    ;
                case "col-right":
                    ;
                case "videos":
                    _0xaf1cx1f += "</div>";
                    _0xaf1cx18.html(_0xaf1cx1f);
                    break;
                default:
                    _0xaf1cx1f += "</div>";
                    _0xaf1cx18.html(_0xaf1cx1f);
                    break
                };
                _0xaf1cx18.find("span.entry-thumb").lazyify()
            },
            error: function () {
                switch (_0xaf1cx1a) {
                case "msimple":
                    _0xaf1cx18.append("<ul>" + msgServerError() + "</ul>");
                    break;
                default:
                    _0xaf1cx18.html(msgServerError());
                    break
                }
            }
        })
    }
}
function ajaxMega(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30.match("getmega")) {
        if (_0xaf1cx1a == "msimple") {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
        } else {
            _0xaf1cx18.addClass("has-sub mega-menu").append("<ul class=\"mega-widget\">" + msgError() + "</ul>")
        }
    }
}
function ajaxFeatured(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e) {
    if (_0xaf1cx30.match("getfeatured")) {
        if (_0xaf1cx1a == "featured") {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e)
        } else {
            _0xaf1cx18.html(beforeLoader()).parent().addClass("show-ify");
            setTimeout(function () {
                _0xaf1cx18.html(msgError())
            }, 500)
        }
    }
}
function ajaxBlock(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e) {
    if (_0xaf1cx30.match("getblock")) {
        if (_0xaf1cx1a == "block1" || _0xaf1cx1a == "col-left" || _0xaf1cx1a == "col-right" || _0xaf1cx1a == "grid1" || _0xaf1cx1a == "videos") {
            var _0xaf1cx5d = showMoreText,
                _0xaf1cx5e = "";
            if (_0xaf1cx5d != "") {
                _0xaf1cx5e = _0xaf1cx5d
            } else {
                _0xaf1cx5e = messages.showMore
            };
            _0xaf1cx18.parent().find(".widget-title").append("<a class=\"more\" href=\"/search/label/" + _0xaf1cx2d + "\">" + _0xaf1cx5e + "</a>");
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e)
        } else {
            _0xaf1cx18.html(msgError()).parent().addClass("show-ify")
        }
    }
}
function ajaxWidget(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30.match("getwidget")) {
        if (_0xaf1cx1a == "list") {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
        } else {
            _0xaf1cx18.html(msgError())
        }
    }
}
function ajaxRelated(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30.match("getrelated")) {
        return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
    }
}
$(".blog-post-comments").each(function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx61 = commentsSystem,
        _0xaf1cx62 = "<div class=\"fb-comments\" data-width=\"100%\" data-href=\"" + disqus_blogger_current_url + "\" order_by=\"time\" data-numposts=\"5\"></div>",
        _0xaf1cx63 = "comments-system-" + _0xaf1cx61;
    switch (_0xaf1cx61) {
    case "blogger":
        _0xaf1cx18.addClass(_0xaf1cx63).show();
        $(".entry-meta .entry-comments-link").addClass("show");
        break;
    case "disqus":
        _0xaf1cx18.addClass(_0xaf1cx63).show();
        break;
    case "facebook":
        _0xaf1cx18.addClass(_0xaf1cx63).find("#comments").html(_0xaf1cx62);
        _0xaf1cx18.show();
        break;
    case "hide":
        _0xaf1cx18.hide();
        break;
    default:
        _0xaf1cx18.addClass("comments-system-default").show();
        $(".entry-meta .entry-comments-link").addClass("show");
        break
    };
    var _0xaf1cx64 = _0xaf1cx18.find(".comments .toplevel-thread > ol > .comment .comment-actions .comment-reply"),
        _0xaf1cx17 = _0xaf1cx18.find(".comments .toplevel-thread > #top-continue");
    _0xaf1cx64.on("click", function () {
        _0xaf1cx17.show()
    });
    _0xaf1cx17.on("click", function () {
        _0xaf1cx17.hide()
    })
});
$(function () {
    $(".index-post .entry-image-link .entry-thumb, .PopularPosts .entry-image-link .entry-thumb, .FeaturedPost .entry-image-link .entry-thumb,.about-author .author-avatar").lazyify();
    $(".mobile-logo").each(function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx65 = $("#main-logo .header-widget a").clone();
        _0xaf1cx65.find("#h1-tag").remove();
        _0xaf1cx65.appendTo(_0xaf1cxf)
    });
    $("#mobile-menu").each(function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx66 = $("#magify-main-menu-nav").clone();
        _0xaf1cx66.attr("id", "main-mobile-nav");
        _0xaf1cx66.find(".getMega, .mega-widget, .mega-tab").remove();
        _0xaf1cx66.find(".complex-tabs").replaceWith(_0xaf1cx66.find(".complex-tabs > ul.select-tab").attr("class", "sub-menu m-sub"));
        _0xaf1cx66.find(".mega-menu > a").each(function () {
            var _0xaf1cx13 = $(this),
                _0xaf1cx67 = _0xaf1cx13.attr("href").trim().toLowerCase();
            if (_0xaf1cx67.match("getmega")) {
                _0xaf1cx13.attr("href", "/search")
            }
        });
        _0xaf1cx66.find(".mega-tabs ul li > a").each(function () {
            var _0xaf1cx13 = $(this),
                _0xaf1cx65 = _0xaf1cx13.text().trim();
            _0xaf1cx13.attr("href", "/search/label/" + _0xaf1cx65)
        });
        _0xaf1cx66.appendTo(_0xaf1cxf);
        $(".show-mobile-menu, .hide-mobile-menu, .overlay").on("click", function () {
            $("body").toggleClass("nav-active")
        });
        $(".mobile-menu .has-sub").append("<div class=\"submenu-toggle\"/>");
        $(".mobile-menu .mega-menu").find(".submenu-toggle").remove();
        $(".mobile-menu .mega-tabs").append("<div class=\"submenu-toggle\"/>");
        $(".mobile-menu ul li .submenu-toggle").on("click", function (_0xaf1cx18) {
            if ($(this).parent().hasClass("has-sub")) {
                _0xaf1cx18.preventDefault();
                if (!$(this).parent().hasClass("show")) {
                    $(this).parent().addClass("show").children(".m-sub").slideToggle(170)
                } else {
                    $(this).parent().removeClass("show").find("> .m-sub").slideToggle(170)
                }
            }
        })
    });
    $(".social-mobile").each(function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx65 = $("#about-section ul.social-footer").clone();
        _0xaf1cx65.removeClass("social-bg-hover");
        _0xaf1cx65.appendTo(_0xaf1cxf)
    });
    $("#header-wrapper .headerify").each(function () {
        var _0xaf1cx18 = $(this);
        if (fixedMenu == true) {
            if (_0xaf1cx18.length > 0) {
                var _0xaf1cx4 = $(document).scrollTop(),
                    _0xaf1cx68 = _0xaf1cx18.offset().top,
                    _0xaf1cx69 = _0xaf1cx18.height(),
                    _0xaf1cx46 = (_0xaf1cx68 + _0xaf1cx69);
                $(window).scroll(function () {
                    var _0xaf1cxe = $(document).scrollTop(),
                        _0xaf1cx44 = $("#footer-wrapper").offset().top,
                        _0xaf1cx45 = (_0xaf1cx44 - _0xaf1cx69);
                    if (_0xaf1cxe < _0xaf1cx45) {
                        if (_0xaf1cxe > _0xaf1cx46) {
                            _0xaf1cx18.addClass("is-fixed")
                        } else {
                            if (_0xaf1cxe <= 0) {
                                _0xaf1cx18.removeClass("is-fixed")
                            }
                        };
                        if (_0xaf1cxe > _0xaf1cx4) {
                            _0xaf1cx18.removeClass("show")
                        } else {
                            _0xaf1cx18.addClass("show")
                        };
                        _0xaf1cx4 = $(document).scrollTop()
                    }
                })
            }
        }
    });
    $("#main-wrapper,#sidebar-wrapper").each(function () {
        if (fixedSidebar == true) {
            $(this).theiaStickySidebar({
                additionalMarginTop: 30,
                additionalMarginBottom: 30
            })
        }
    });
    $(".back-top").each(function () {
        var _0xaf1cxf = $(this);
        $(window).on("scroll", function () {
            $(this).scrollTop() >= 100 ? _0xaf1cxf.fadeIn(250) : _0xaf1cxf.fadeOut(250);
            _0xaf1cxf.offset().top >= $("#footer-wrapper").offset().top - 32 ? _0xaf1cxf.addClass("on-footer") : _0xaf1cxf.removeClass("on-footer")
        }), _0xaf1cxf.click(function () {
            $("html, body").animate({
                scrollTop: 0
            }, 500)
        })
    });
    $("p.comment-content").each(function () {
        var _0xaf1cxf = $(this);
        _0xaf1cxf.replaceText(/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, "<img src=\"$1\"/>");
        _0xaf1cxf.replaceText(/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, "<iframe id=\"youtube\" width=\"100%\" height=\"358\" src=\"https://www.youtube.com/embed/$1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>")
    });
    $("#load-more-link").each(function () {
        var _0xaf1cx18 = $(this),
            _0xaf1cx6a = _0xaf1cx18.data("load");
        if (_0xaf1cx6a) {
            $("#load-more-link").show()
        };
        $("#load-more-link").on("click", function (_0xaf1cx3) {
            $("#load-more-link").hide();
            $.ajax({
                url: _0xaf1cx6a,
                success: function (_0xaf1cx52) {
                    var _0xaf1cx6b = $(_0xaf1cx52).find(".blog-posts");
                    _0xaf1cx6b.find(".index-post").addClass("post-animated post-fadeInUp");
                    $(".blog-posts").append(_0xaf1cx6b.html());
                    _0xaf1cx6a = $(_0xaf1cx52).find("#load-more-link").data("load");
                    if (_0xaf1cx6a) {
                        $("#load-more-link").show()
                    } else {
                        $("#load-more-link").hide();
                        $("#blog-pager .no-more").addClass("show")
                    };
                    $(".index-post .entry-image-link .entry-thumb").lazyify()
                },
                beforeSend: function () {
                    $("#blog-pager .loading").show()
                },
                complete: function () {
                    $("#blog-pager .loading").hide()
                }
            });
            _0xaf1cx3.preventDefault()
        })
    })
})

var images = document.getElementsByTagName('img');
  for (var i = 0; i < images.length; i++) {
    images[i].src = images[i].src.replace(/.*?:\/\//g ,
"https://cdn.staticaly.com/img/");
  };
//]]>
