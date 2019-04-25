function mobileMenuClose(){var t=document.querySelector("#mobile-button use");document.body.classList.remove("js-mobile-menu-active"),t.setAttribute("xlink:href","dist/img/icons.svg#icon-menu")}function mobileMenuOpen(){var t=document.querySelector("#mobile-button use");document.body.classList.add("js-mobile-menu-active"),t.setAttribute("xlink:href","dist/img/icons.svg#icon-close")}function mobileMenu(){document.querySelector("#mobile-button use");document.body.classList.contains("js-mobile-menu-active")?mobileMenuClose():mobileMenuOpen()}function oneOffLightbox(t){var e=document.querySelectorAll(".lightbox-wrapper img"),o=document.querySelector(".lightbox-wrapper");0<e.length&&Array.prototype.forEach.call(e,function(t,e){t.remove()});var i=document.createElement("img");i.setAttribute("src",t.currentTarget.getAttribute("src")),i.setAttribute("alt",t.currentTarget.getAttribute("alt")),o.appendChild(i),o.setAttribute("aria-hidden","false"),window.setTimeout(function(){document.body.classList.add("js-lightbox-active")},200)}function srcSet(){var r,l="dist/img/article/",s=document.querySelector(".lightbox-wrapper"),t=document.getElementById("portfolio-content").querySelectorAll("figure > div");Array.prototype.forEach.call(t,function(t,e){var n=t.querySelectorAll("img[data-src]");Array.prototype.forEach.call(n,function(t,e){var o=t.getAttribute("data-src"),i=l+o.substring(0,o.lastIndexOf("."))+"@400"+o.substring(o.lastIndexOf("."))+" 400w,"+l+o.substring(0,o.lastIndexOf("."))+"@800"+o.substring(o.lastIndexOf("."))+" 800w,"+l+o.substring(0,o.lastIndexOf("."))+"@1200"+o.substring(o.lastIndexOf("."))+" 1200w,"+l+o.substring(0,o.lastIndexOf("."))+"@1600"+o.substring(o.lastIndexOf("."))+" 1600w,"+l+o.substring(0,o.lastIndexOf("."))+"@2000"+o.substring(o.lastIndexOf("."))+" 2000w";r=1==n.length?"(max-width:23.4375em) 84vw, (max-width:50em) 92vw, (max-width:74.9375em) 84vw, (max-width:100em) 62vw, 1007px":2==n.length?"(max-width:23.4375em) 84vw, (min-width:48em) 288px":"(max-width:23.4375em) 84vw, (min-width:48em) 181px",t.setAttribute("srcset",i),t.setAttribute("sizes",r),t.setAttribute("src",l+t.getAttribute("data-src")),t.classList.add("lightbox"),t.addEventListener("click",function(){var t=document.querySelectorAll(".lightbox-wrapper img");0<t.length&&Array.prototype.forEach.call(t,function(t,e){t.remove()});var e=document.createElement("img");e.setAttribute("src",this.getAttribute("src")),e.setAttribute("alt",this.getAttribute("alt")),s.appendChild(e),s.setAttribute("aria-hidden","false"),window.setTimeout(function(){document.body.classList.add("js-lightbox-active")},200)})})})}function lightboxClose(){event.currentTarget.parentNode.setAttribute("aria-hidden","true"),document.body.classList.remove("js-lightbox-active")}!function(t,e){"function"==typeof define&&define.amd?define([],function(){return t.svg4everybody=e()}):"object"==typeof module&&module.exports?module.exports=e():t.svg4everybody=e()}(this,function(){function b(t,e,o){if(o){var i=document.createDocumentFragment(),n=!e.hasAttribute("viewBox")&&o.getAttribute("viewBox");n&&e.setAttribute("viewBox",n);for(var r=o.cloneNode(!0);r.childNodes.length;)i.appendChild(r.firstChild);t.appendChild(i)}}function h(i){i.onreadystatechange=function(){if(4===i.readyState){var o=i._cachedDocument;o||((o=i._cachedDocument=document.implementation.createHTMLDocument("")).body.innerHTML=i.responseText,i._cachedTarget={}),i._embeds.splice(0).map(function(t){var e=i._cachedTarget[t.id];e||(e=i._cachedTarget[t.id]=o.getElementById(t.id)),b(t.parent,t.svg,e)})}},i.onreadystatechange()}function g(t){for(var e=t;"svg"!==e.nodeName.toLowerCase()&&(e=e.parentNode););return e}return function(t){var d,u=Object(t),e=window.top!==window.self;d="polyfill"in u?u.polyfill:/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent)||(navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/)||[])[1]<10547||(navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/)||[])[1]<537||/\bEdge\/.(\d+)\b/.test(navigator.userAgent)&&e;var f={},m=window.requestAnimationFrame||setTimeout,p=document.getElementsByTagName("use"),v=0;d&&function t(){for(var e=0;e<p.length;){var o=p[e],i=o.parentNode,n=g(i),r=o.getAttribute("xlink:href")||o.getAttribute("href");if(!r&&u.attributeName&&(r=o.getAttribute(u.attributeName)),n&&r){if(d)if(!u.validate||u.validate(r,n,o)){i.removeChild(o);var l=r.split("#"),s=l.shift(),a=l.join("#");if(s.length){var c=f[s];c||((c=f[s]=new XMLHttpRequest).open("GET",s),c.send(),c._embeds=[]),c._embeds.push({parent:i,svg:n,id:a}),h(c)}else b(i,n,document.getElementById(a))}else++e,++v}else++e}(!p.length||0<p.length-v)&&m(t,67)}()}}),svg4everybody({fallback:function(t,e){return"fallback.png"}}),document.addEventListener("DOMContentLoaded",function(){!function(){"use strict";function t(){var a=window,c=document;if(!("scrollBehavior"in c.documentElement.style&&!0!==a.__forceSmoothScrollPolyfill__)){var t,e=a.HTMLElement||a.Element,d=468,u={scroll:a.scroll||a.scrollTo,scrollBy:a.scrollBy,elementScroll:e.prototype.scroll||m,scrollIntoView:e.prototype.scrollIntoView},f=a.performance&&a.performance.now?a.performance.now.bind(a.performance):Date.now,o=(t=a.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(t)?1:0);a.scroll=a.scrollTo=function(){void 0!==arguments[0]&&(!0!==i(arguments[0])?l.call(a,c.body,void 0!==arguments[0].left?~~arguments[0].left:a.scrollX||a.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:a.scrollY||a.pageYOffset):u.scroll.call(a,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:a.scrollX||a.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:a.scrollY||a.pageYOffset))},a.scrollBy=function(){void 0!==arguments[0]&&(i(arguments[0])?u.scrollBy.call(a,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):l.call(a,c.body,~~arguments[0].left+(a.scrollX||a.pageXOffset),~~arguments[0].top+(a.scrollY||a.pageYOffset)))},e.prototype.scroll=e.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==i(arguments[0])){var t=arguments[0].left,e=arguments[0].top;l.call(this,this,void 0===t?this.scrollLeft:~~t,void 0===e?this.scrollTop:~~e)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");u.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},e.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==i(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):u.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},e.prototype.scrollIntoView=function(){if(!0!==i(arguments[0])){var t=function(t){for(var e,o,i;!1==((t=t.parentNode)===c.body)&&!1===(o=n(e=t,"Y")&&r(e,"Y"),i=n(e,"X")&&r(e,"X"),o||i););return t}(this),e=t.getBoundingClientRect(),o=this.getBoundingClientRect();t!==c.body?(l.call(this,t,t.scrollLeft+o.left-e.left,t.scrollTop+o.top-e.top),"fixed"!==a.getComputedStyle(t).position&&a.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):a.scrollBy({left:o.left,top:o.top,behavior:"smooth"})}else u.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function m(t,e){this.scrollLeft=t,this.scrollTop=e}function i(t){if(null===t||"object"!=typeof t||void 0===t.behavior||"auto"===t.behavior||"instant"===t.behavior)return!0;if("object"==typeof t&&"smooth"===t.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+t.behavior+" is not a valid value for enumeration ScrollBehavior.")}function n(t,e){return"Y"===e?t.clientHeight+o<t.scrollHeight:"X"===e?t.clientWidth+o<t.scrollWidth:void 0}function r(t,e){var o=a.getComputedStyle(t,null)["overflow"+e];return"auto"===o||"scroll"===o}function l(t,e,o){var i,n,r,l,s=f();l=t===c.body?(n=(i=a).scrollX||a.pageXOffset,r=a.scrollY||a.pageYOffset,u.scroll):(n=(i=t).scrollLeft,r=t.scrollTop,m),function t(e){var o,i,n,r,l=(f()-e.startTime)/d;r=l=1<l?1:l,o=.5*(1-Math.cos(Math.PI*r)),i=e.startX+(e.x-e.startX)*o,n=e.startY+(e.y-e.startY)*o,e.method.call(e.scrollable,i,n),i===e.x&&n===e.y||a.requestAnimationFrame(t.bind(a,e))}({scrollable:i,method:l,startTime:s,startX:n,startY:r,x:e,y:o})}}"object"==typeof exports&&"undefined"!=typeof module?module.exports={polyfill:t}:t()}()}),function(){var l=document.getElementById("contact-form-submit-button"),s=document.getElementById("contact-form"),a=l.querySelector("#contact-form-submit-button-icon");function t(t){t.preventDefault();var e=function(t){var r=t.elements,e=Object.keys(r).filter(function(t){return"honeypot"!==r[t].name}).map(function(t){return void 0!==r[t].name?r[t].name:0<r[t].length?r[t].item(0).name:void 0}).filter(function(t,e,o){return o.indexOf(t)==e&&t}),l={};return e.forEach(function(t){var e=r[t];if(l[t]=e.value,e.length){for(var o=[],i=0;i<e.length;i++){var n=e.item(i);(n.checked||n.selected)&&o.push(n.value)}l[t]=o.join(", ")}}),l.formDataNameOrder=JSON.stringify(e),l.formGoogleSheetName=t.dataset.sheet||"responses",l.formGoogleSendEmail=t.dataset.email||"",l}(s);if(e.email&&!function(t){return/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(t)}(e.email)){var o=s.querySelector(".email-invalid");if(o)return!(o.style.display="block")}else{!function(t){a.setAttribute("xlink:href","dist/img/icons.svg#icon-form-spinner"),l.querySelector("span").innerHTML="Sending",l.disabled=!0,t.classList.add("js-submitting"),t.querySelector("input").disabled=!0,t.querySelector("textarea").disabled=!0}(s);var i=s.action,n=new XMLHttpRequest;n.open("POST",i),n.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),n.onreadystatechange=function(){window.setTimeout(function(){s.classList.remove("js-submitting"),s.classList.add("js-submitted"),a.setAttribute("xlink:href","dist/img/icons.svg#icon-check"),l.querySelector("span").innerHTML="Sent"},2e3)};var r=Object.keys(e).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(e[t])}).join("&");n.send(r)}}document.addEventListener("DOMContentLoaded",function(){s.addEventListener("submit",t,!1)},!1)}(),function(){var e,o=document.getElementById("dribbble-feed");(e=new XMLHttpRequest).open("GET","https://api.dribbble.com/v2/user/shots?per_page=6&access_token=bd8865cd4ff712d9f421cb8526fa8560062dfd67da1fac1645a4229b43500d24",!0),e.onload=function(){if(200<=e.status&&e.status<400){var t=JSON.parse(e.responseText);if(0<t.length){var i=document.createDocumentFragment();Array.prototype.forEach.call(t,function(t,e){var o=document.createElement("a");o.setAttribute("href",t.html_url),o.setAttribute("target","_blank"),o.setAttribute("title",t.title),o.setAttribute("onclick",'gtagOutbound("past work","dribbble")'),o.innerHTML='<img aria-hidden="true" src="'+t.images.hidpi+'" />',i.appendChild(o)}),o.appendChild(i)}}},e.send()}(),window.addEventListener("DOMContentLoaded",srcSet()),document.addEventListener("DOMContentLoaded",function(){var e=document.querySelectorAll(".site-nav__link"),o=document.querySelectorAll(".scroll-anchor"),i=function(){var i=this.getAttribute("href").replace("#","");event.preventDefault(),document.body.classList.contains("js-mobile-menu-active")&&mobileMenuClose(),Array.prototype.forEach.call(o,function(t,e){if(t.id!=i)return!1;var o=t.offsetTop;window.scrollTo({top:o-128,left:0,behavior:"smooth"})})};Array.prototype.forEach.call(e,function(t,e){t.addEventListener("click",i)});var n=function(){for(var t=0;t<o.length;t++){if(t<o.length-1&&window.pageYOffset>=o[t].offsetTop-272&&window.pageYOffset<o[t+1].offsetTop-272)return Array.prototype.forEach.call(e,function(t,e){t.classList.remove("site-nav__link--current")}),e[t].classList.add("site-nav__link--current"),o[t].classList.add("scroll-anchor--seen"),!0;if(t==o.length-1)return Array.prototype.forEach.call(e,function(t,e){t.classList.remove("site-nav__link--current")}),e[t].classList.add("site-nav__link--current"),o[t].classList.add("scroll-anchor--seen"),!1}};window.addEventListener("scroll",function(t){var e;window.clearTimeout(e),e=setTimeout(n,750)},!1)},!1),document.addEventListener("DOMContentLoaded",function(){var t=document.querySelectorAll(".portfolio__tablist-tab"),i=document.querySelectorAll(".portfolio__section"),n=document.getElementById("portfolio-section-recent"),r=n.getAttribute("data-section"),e=parseInt(n.children[0].getAttribute("data-article")),o=e+1,l=e-1,s=function(){var e=this,o=e.getAttribute("data-section"),t=Array.prototype.filter.call(e.parentNode.children,function(t){return t!==e});e.classList.add("tab--active"),e.setAttribute("aria-selected","true"),Array.prototype.forEach.call(t,function(t,e){t.classList.remove("tab--active"),t.setAttribute("aria-selected","")}),Array.prototype.forEach.call(i,function(t,e){if(t.id==o)(n=t).classList.add("portfolio__section--active"),r=t.getAttribute("data-section"),a(t);else{if("portfolio-section-recent"!=t.id)return t.innerHTML="",t.classList.remove("portfolio__section--active"),!1;t.classList.remove("portfolio__section--active"),t.children[0].classList.remove("portfolio__article--active"),t.setAttribute("aria-hidden","true")}})},a=function(t){if(l=0,e=1,o=2,c="dist/article/article-"+r+"-001.html",d="dist/article/article-"+r+"-002.html","portfolio-section-recent"==t.id)return t.classList.add("portfolio__section--active"),t.children[0].classList.add("portfolio__article--active"),t.setAttribute("aria-hidden","false"),f.disabled=!0,!(u.disabled=!0);f.disabled=!0,u.disabled=!1,m()};Array.prototype.forEach.call(t,function(t,e){t.addEventListener("click",s)});var c,d,u=document.getElementById("portfolio-article-next"),f=document.getElementById("portfolio-article-previous"),m=(document.getElementById("portfolio-content"),function(){var t=new XMLHttpRequest;t.open("GET",c,!0),t.onload=function(){return 200<=t.status&&t.status<400&&(n.innerHTML=t.response,srcSet(),n.children[0].classList.add("portfolio__article--active"),p()),!1},t.send()}),p=function(){var t=new XMLHttpRequest;t.open("GET",d,!0),t.onload=function(){return 200<=t.status&&t.status<400?u.disabled=!1:!(u.disabled=!0)},t.send()},v=function(){return e<=9&&1<=e?(c="dist/article/article-"+r+"-00"+e+".html",d="dist/article/article-"+r+"-00"+o+".html"):e<=99&&10<=e?(c="dist/article/article-"+r+"-0"+e+".html",d="dist/article/article-"+r+"-0"+o+".html"):e<=999&&100<=e&&(c="dist/article/article-"+r+"-"+e+".html",d="dist/article/article-"+r+"-"+o+".html"),!1};u.addEventListener("click",function(){l++,e++,o++,v(),function(){var t=new XMLHttpRequest;t.open("GET",c,!0),t.onload=function(){return 200<=t.status&&t.status<400&&(n.innerHTML=t.response,srcSet(),n.children[0].classList.add("portfolio__article--next"),window.setTimeout(function(){n.children[0].classList.add("portfolio__article--active"),n.children[0].classList.remove("portfolio__article--loading")},500),p()),!1},t.send()}(),f.disabled=!1}),f.addEventListener("click",function(){l--,e--,o--,v(),function(){var t=new XMLHttpRequest;t.open("GET",c,!0),t.onload=function(){return 200<=t.status&&t.status<400&&(n.innerHTML=t.response,srcSet(),n.children[0].classList.add("portfolio__article--previous"),window.setTimeout(function(){n.children[0].classList.add("portfolio__article--active"),n.children[0].classList.remove("portfolio__article--loading"),n.children[0].classList.remove("portfolio__article--loading")},500),p()),!1},t.send()}(),l<1?f.disabled=!0:1<=l&&(f.disabled=!1),u.disabled=!1})},!1);