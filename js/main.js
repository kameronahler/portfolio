!function(e,t){"function"==typeof define&&define.amd?define([],function(){return e.svg4everybody=t()}):"object"==typeof module&&module.exports?module.exports=t():e.svg4everybody=t()}(this,function(){function g(e,t,n){if(n){var i=document.createDocumentFragment(),o=!t.hasAttribute("viewBox")&&n.getAttribute("viewBox");o&&t.setAttribute("viewBox",o);for(var a=n.cloneNode(!0);a.childNodes.length;)i.appendChild(a.firstChild);e.appendChild(i)}}function b(i){i.onreadystatechange=function(){if(4===i.readyState){var n=i._cachedDocument;n||((n=i._cachedDocument=document.implementation.createHTMLDocument("")).body.innerHTML=i.responseText,i._cachedTarget={}),i._embeds.splice(0).map(function(e){var t=i._cachedTarget[e.id];t||(t=i._cachedTarget[e.id]=n.getElementById(e.id)),g(e.parent,e.svg,t)})}},i.onreadystatechange()}function e(e){var l,u=Object(e),t=window.top!==window.self;l="polyfill"in u?u.polyfill:/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/.test(navigator.userAgent)||(navigator.userAgent.match(/\bEdge\/12\.(\d+)\b/)||[])[1]<10547||(navigator.userAgent.match(/\bAppleWebKit\/(\d+)\b/)||[])[1]<537||/\bEdge\/.(\d+)\b/.test(navigator.userAgent)&&t;var m={},f=window.requestAnimationFrame||setTimeout,p=document.getElementsByTagName("use"),v=0;l&&function e(){for(var t=0;t<p.length;){var n=p[t],i=n.parentNode,o=h(i),a=n.getAttribute("xlink:href")||n.getAttribute("href");if(!a&&u.attributeName&&(a=n.getAttribute(u.attributeName)),o&&a){if(l)if(!u.validate||u.validate(a,o,n)){i.removeChild(n);var r=a.split("#"),c=r.shift(),s=r.join("#");if(c.length){var d=m[c];d||((d=m[c]=new XMLHttpRequest).open("GET",c),d.send(),d._embeds=[]),d._embeds.push({parent:i,svg:o,id:s}),b(d)}else g(i,o,document.getElementById(s))}else++t,++v}else++t}(!p.length||0<p.length-v)&&f(e,67)}()}function h(e){for(var t=e;"svg"!==t.nodeName.toLowerCase()&&(t=t.parentNode););return t}return e}),function(){var m=document.getElementById("contact-form-submit-button"),f=document.getElementById("contact-form"),p=m.querySelector("#contact-form-submit-button-icon");function e(e){e.preventDefault();var t,a,n,r,i,o,c=(a=(t=f).elements,n=Object.keys(a).filter(function(e){return"honeypot"!==a[e].name}).map(function(e){return void 0!==a[e].name?a[e].name:0<a[e].length?a[e].item(0).name:void 0}).filter(function(e,t,n){return n.indexOf(e)==t&&e}),r={},n.forEach(function(e){var t=a[e];if(r[e]=t.value,t.length){for(var n=[],i=0;i<t.length;i++){var o=t.item(i);(o.checked||o.selected)&&n.push(o.value)}r[e]=n.join(", ")}}),r.formDataNameOrder=JSON.stringify(n),r.formGoogleSheetName=t.dataset.sheet||"responses",r.formGoogleSendEmail=t.dataset.email||"",console.log(r),r);if(c.email&&(o=c.email,!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(o))){var s=f.querySelector(".email-invalid");if(s)return!(s.style.display="block")}else{i=f,p.setAttribute("xlink:href","../img/icons.svg#icon-form-spinner"),m.querySelector("span").innerHTML="Sending",m.disabled=!0,i.classList.add("js-submitting"),i.querySelector("input").disabled=!0,i.querySelector("textarea").disabled=!0;var d=f.action,l=new XMLHttpRequest;l.open("POST",d),l.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),l.onreadystatechange=function(){window.setTimeout(function(){f.classList.remove("js-submitting"),f.classList.add("js-submitted"),p.setAttribute("xlink:href","../img/icons.svg#icon-check"),m.querySelector("span").innerHTML="Sent"},4e3)};var u=Object.keys(c).map(function(e){return encodeURIComponent(e)+"="+encodeURIComponent(c[e])}).join("&");l.send(u)}}document.addEventListener("DOMContentLoaded",function(){f.addEventListener("submit",e,!1)},!1)}(),function(){var e=document.querySelectorAll(".portfolio__tablist-tab"),t=document.querySelectorAll(".portfolio__example"),n=function(){var n=this.getAttribute("data-article"),e=Array.prototype.filter.call(this.parentNode.children,function(e){return e!==this});Array.prototype.forEach.call(e,function(e,t){e.classList.remove("tab--active")});this.getAttribute("data-article");this.classList.add("tab--active"),Array.prototype.forEach.call(t,function(e,t){e.id==n?e.classList.add("portfolio__example--active"):e.classList.remove("portfolio__example--active")})};Array.prototype.forEach.call(e,function(e,t){e.addEventListener("click",n)})}();