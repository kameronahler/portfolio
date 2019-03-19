// svg4everybody
! function(root, factory) {
    "function" == typeof define && define.amd ? // AMD. Register as an anonymous module unless amdModuleId is set
        define([], function() {
            return root.svg4everybody = factory();
        }) : "object" == typeof module && module.exports ? // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory() : root.svg4everybody = factory();
}(this, function() {
    /*! svg4everybody v2.1.9 | github.com/jonathantneal/svg4everybody */
    function embed(parent, svg, target) {
        // if the target exists
        if (target) {
            // create a document fragment to hold the contents of the target
            var fragment = document.createDocumentFragment(),
                viewBox = !svg.hasAttribute("viewBox") && target.getAttribute("viewBox");
            // conditionally set the viewBox on the svg
            viewBox && svg.setAttribute("viewBox", viewBox);
            // copy the contents of the clone into the fragment
            for ( // clone the target
                var clone = target.cloneNode(!0); clone.childNodes.length;) {
                fragment.appendChild(clone.firstChild);
            }
            // append the fragment into the svg
            parent.appendChild(fragment);
        }
    }

    function loadreadystatechange(xhr) {
        // listen to changes in the request
        xhr.onreadystatechange = function() {
                // if the request is ready
                if (4 === xhr.readyState) {
                    // get the cached html document
                    var cachedDocument = xhr._cachedDocument;
                    // ensure the cached html document based on the xhr response
                    cachedDocument || (cachedDocument = xhr._cachedDocument = document.implementation.createHTMLDocument(""),
                            cachedDocument.body.innerHTML = xhr.responseText, xhr._cachedTarget = {}), // clear the xhr embeds list and embed each item
                        xhr._embeds.splice(0).map(function(item) {
                            // get the cached target
                            var target = xhr._cachedTarget[item.id];
                            // ensure the cached target
                            target || (target = xhr._cachedTarget[item.id] = cachedDocument.getElementById(item.id)),
                                // embed the target into the svg
                                embed(item.parent, item.svg, target);
                        });
                }
            }, // test the ready state change immediately
            xhr.onreadystatechange();
    }

    function svg4everybody(rawopts) {
        function oninterval() {
            // while the index exists in the live <use> collection
            for ( // get the cached <use> index
                var index = 0; index < uses.length;) {
                // get the current <use>
                var use = uses[index],
                    parent = use.parentNode,
                    svg = getSVGAncestor(parent),
                    src = use.getAttribute("xlink:href") || use.getAttribute("href");
                if (!src && opts.attributeName && (src = use.getAttribute(opts.attributeName)),
                    svg && src) {
                    if (polyfill) {
                        if (!opts.validate || opts.validate(src, svg, use)) {
                            // remove the <use> element
                            parent.removeChild(use);
                            // parse the src and get the url and id
                            var srcSplit = src.split("#"),
                                url = srcSplit.shift(),
                                id = srcSplit.join("#");
                            // if the link is external
                            if (url.length) {
                                // get the cached xhr request
                                var xhr = requests[url];
                                // ensure the xhr request exists
                                xhr || (xhr = requests[url] = new XMLHttpRequest(), xhr.open("GET", url), xhr.send(),
                                        xhr._embeds = []), // add the svg and id as an item to the xhr embeds list
                                    xhr._embeds.push({
                                        parent: parent,
                                        svg: svg,
                                        id: id
                                    }), // prepare the xhr ready state change event
                                    loadreadystatechange(xhr);
                            } else {
                                // embed the local id into the svg
                                embed(parent, svg, document.getElementById(id));
                            }
                        } else {
                            // increase the index when the previous value was not "valid"
                            ++index, ++numberOfSvgUseElementsToBypass;
                        }
                    }
                } else {
                    // increase the index when the previous value was not "valid"
                    ++index;
                }
            }
            // continue the interval
            (!uses.length || uses.length - numberOfSvgUseElementsToBypass > 0) && requestAnimationFrame(oninterval, 67);
        }
        var polyfill, opts = Object(rawopts),
            newerIEUA = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,
            webkitUA = /\bAppleWebKit\/(\d+)\b/,
            olderEdgeUA = /\bEdge\/12\.(\d+)\b/,
            edgeUA = /\bEdge\/.(\d+)\b/,
            inIframe = window.top !== window.self;
        polyfill = "polyfill" in opts ? opts.polyfill : newerIEUA.test(navigator.userAgent) || (navigator.userAgent.match(olderEdgeUA) || [])[1] < 10547 || (navigator.userAgent.match(webkitUA) || [])[1] < 537 || edgeUA.test(navigator.userAgent) && inIframe;
        // create xhr requests object
        var requests = {},
            requestAnimationFrame = window.requestAnimationFrame || setTimeout,
            uses = document.getElementsByTagName("use"),
            numberOfSvgUseElementsToBypass = 0;
        // conditionally start the interval if the polyfill is active
        polyfill && oninterval();
    }

    function getSVGAncestor(node) {
        for (var svg = node;
            "svg" !== svg.nodeName.toLowerCase() && (svg = svg.parentNode);) {}
        return svg;
    }
    return svg4everybody;

    svg4everybody({
        fallback: function(src, use) {
            // src: current xlink:href String 
            // svg: current SVG Element 
            // use: current USE Element 

            return 'fallback.png'; // ok, always return fallback.png
        }
    });
});








// contact form
(function() {

    // add broader variables that are reused
    var button = document.getElementById("contact-form-submit-button");
    var form = document.getElementById("contact-form");
    var icon = button.querySelector("#contact-form-submit-button-icon");


    function validEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }

    function validateHuman(honeypot) {
        if (honeypot) { //if hidden form filled up
            console.log("Robot Detected!");
            return true;
        } else {
            console.log("Welcome Human!");
        }
    }

    // get all data in form and return object
    function getFormData(form) {
        var elements = form.elements;

        var fields = Object.keys(elements).filter(function(k) {
            return (elements[k].name !== "honeypot");
        }).map(function(k) {
            if (elements[k].name !== undefined) {
                return elements[k].name;
                // special case for Edge's html collection
            } else if (elements[k].length > 0) {
                return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name) {
            var element = elements[name];

            // singular form elements just have one value
            formData[name] = element.value;

            // when our element has multiple items, get their values
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
                formData[name] = data.join(', ');
            }
        });

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

        console.log(formData);
        return formData;
    }

    function handleFormSubmit(event) { // handles form submit without any jquery
        event.preventDefault(); // we are submitting via xhr below
        // var form = event.target;
        var data = getFormData(form); // get the values submitted in the form

        /* OPTION: Remove this comment to enable SPAM prevention, see README.md
        if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
          return false;
        }
        */

        if (data.email && !validEmail(data.email)) { // if email is not valid show error
            var invalidEmail = form.querySelector(".email-invalid");
            if (invalidEmail) {
                invalidEmail.style.display = "block";
                return false;
            }
        } else {
            disableAllButtons(form);
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                // console.log(xhr.status, xhr.statusText);
                // console.log(xhr.responseText);
                window.setTimeout(function() {
                    form.classList.remove('js-submitting'); // remove waiting class
                    form.classList.add('js-submitted'); // add finished state class
                    icon.setAttribute('xlink:href', '/portfolio/img/icons.svg#icon-check'); // change icon on button back
                    button.querySelector('span').innerHTML = "Sent"; // change button text
                }, 4000)
                // var formElements = form.querySelector(".contact__form-elements")
                // if (formElements) {
                //     formElements.style.display = "none"; // hide form
                // }
                // var thankYouMessage = form.querySelector(".contact__form-submitted");
                // if (thankYouMessage) {
                //     thankYouMessage.style.display = "block";
                // }
                return;
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
        }
    }

    function loaded() {
        // console.log("Contact form submission handler loaded successfully.");
        // bind to the submit event of our form
        // var forms = document.querySelectorAll("form.contact__form");
        // for (var i = 0; i < forms.length; i++) {
        //     forms[i].addEventListener("submit", handleFormSubmit, false);
        // }
        // var buttons = document.querySelectorAll("#contact-form-submit-button");
        form.addEventListener("submit", handleFormSubmit, false);
    };

    function loaded() {
        // console.log("Contact form submission handler loaded successfully.");
        // bind to the submit event of our form
        // var forms = document.querySelectorAll("form.contact__form");
        // for (var i = 0; i < forms.length; i++) {
        //     forms[i].addEventListener("submit", handleFormSubmit, false);
        // }
        // var buttons = document.querySelectorAll("#contact-form-submit-button");
        form.addEventListener("submit", handleFormSubmit, false);
    };

    function disableAllButtons(form) {
        icon.setAttribute('xlink:href', '/portfolio/img/icons.svg#icon-form-spinner');
        button.querySelector('span').innerHTML = "Sending";
        button.disabled = true;
        form.classList.add('js-submitting');
        form.querySelector('input').disabled = true;
        form.querySelector('textarea').disabled = true;
    }

    document.addEventListener("DOMContentLoaded", loaded, false);
})();







// portfolio article switcher
(function() {
    document.addEventListener("DOMContentLoaded", function() {
        var tabs = document.querySelectorAll('.portfolio__tablist-tab');
        var articles = document.querySelectorAll('.portfolio__example');
        var tabClick = function() {
            // create sibling array for this tab by looking for all of children of parent that aren't this tab
            var tabArticle = this.getAttribute('data-article');
            var siblings = Array.prototype.filter.call(this.parentNode.children, function(child) {
                return child !== this;
            });

            // loop sibling array and remove active classes and aria
            function removeSiblingClasses() {
                Array.prototype.forEach.call(siblings, function(el, i) {
                    el.classList.remove('tab--active');
                    el.setAttribute('aria-selected','');
                });
            }
            removeSiblingClasses();

            // add active class and aria selected to this tab
            this.classList.add('tab--active');
            this.setAttribute('aria-selected','true');

            // check to see if the article number matches the data attribute of the tab being clicked, remove classes, and 
            function checkArticle() {
                Array.prototype.forEach.call(articles, function(el, i) {
                    if (el.id == tabArticle) {
                        el.classList.add('portfolio__example--active');
                    } else {
                        el.classList.remove('portfolio__example--active')
                    };
                });
            }
            checkArticle();
        };

        function addTabListeners() {
            Array.prototype.forEach.call(tabs, function(el, i) {
                el.addEventListener('click', tabClick);
            });
        };

        addTabListeners();
    }, false);
})();






// scroll to polyfill https://github.com/iamdustan/smoothscroll
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        ! function() { "use strict";

            function o() { var o = window,
                    t = document; if (!("scrollBehavior" in t.documentElement.style && !0 !== o.__forceSmoothScrollPolyfill__)) { var l, e = o.HTMLElement || o.Element,
                        r = 468,
                        i = { scroll: o.scroll || o.scrollTo, scrollBy: o.scrollBy, elementScroll: e.prototype.scroll || n, scrollIntoView: e.prototype.scrollIntoView },
                        s = o.performance && o.performance.now ? o.performance.now.bind(o.performance) : Date.now,
                        c = (l = o.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(l) ? 1 : 0);
                    o.scroll = o.scrollTo = function() { void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? h.call(o, t.body, void 0 !== arguments[0].left ? ~~arguments[0].left : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : o.scrollY || o.pageYOffset) : i.scroll.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : o.scrollY || o.pageYOffset)) }, o.scrollBy = function() { void 0 !== arguments[0] && (f(arguments[0]) ? i.scrollBy.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(o, t.body, ~~arguments[0].left + (o.scrollX || o.pageXOffset), ~~arguments[0].top + (o.scrollY || o.pageYOffset))) }, e.prototype.scroll = e.prototype.scrollTo = function() { if (void 0 !== arguments[0])
                            if (!0 !== f(arguments[0])) { var o = arguments[0].left,
                                    t = arguments[0].top;
                                h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t) } else { if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                                i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop) } }, e.prototype.scrollBy = function() { void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop)) }, e.prototype.scrollIntoView = function() { if (!0 !== f(arguments[0])) { var l = function(o) { var l, e, r, i;
                                    do { l = (o = o.parentNode) === t.body } while (!1 === l && !1 === (r = p(e = o, "Y") && a(e, "Y"), i = p(e, "X") && a(e, "X"), r || i)); return l = null, o }(this),
                                e = l.getBoundingClientRect(),
                                r = this.getBoundingClientRect();
                            l !== t.body ? (h.call(this, l, l.scrollLeft + r.left - e.left, l.scrollTop + r.top - e.top), "fixed" !== o.getComputedStyle(l).position && o.scrollBy({ left: e.left, top: e.top, behavior: "smooth" })) : o.scrollBy({ left: r.left, top: r.top, behavior: "smooth" }) } else i.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]) } }

                function n(o, t) { this.scrollLeft = o, this.scrollTop = t }

                function f(o) { if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0; if ("object" == typeof o && "smooth" === o.behavior) return !1; throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.") }

                function p(o, t) { return "Y" === t ? o.clientHeight + c < o.scrollHeight : "X" === t ? o.clientWidth + c < o.scrollWidth : void 0 }

                function a(t, l) { var e = o.getComputedStyle(t, null)["overflow" + l]; return "auto" === e || "scroll" === e }

                function d(t) { var l, e, i, c, n = (s() - t.startTime) / r;
                    c = n = n > 1 ? 1 : n, l = .5 * (1 - Math.cos(Math.PI * c)), e = t.startX + (t.x - t.startX) * l, i = t.startY + (t.y - t.startY) * l, t.method.call(t.scrollable, e, i), e === t.x && i === t.y || o.requestAnimationFrame(d.bind(o, t)) }

                function h(l, e, r) { var c, f, p, a, h = s();
                    l === t.body ? (c = o, f = o.scrollX || o.pageXOffset, p = o.scrollY || o.pageYOffset, a = i.scroll) : (c = l, f = l.scrollLeft, p = l.scrollTop, a = n), d({ scrollable: c, method: a, startTime: h, startX: f, startY: p, x: e, y: r }) } } "object" == typeof exports && "undefined" != typeof module ? module.exports = { polyfill: o } : o() }();
    });
})();





// site nav scroll
(function() {
    document.addEventListener("DOMContentLoaded", function() {

        // get nav links
        var navLinks = document.querySelectorAll('.site-nav__link');

        // get sections with certain classes
        var scrollAnchors = document.querySelectorAll('.scroll-anchor');

        // create click function for nav links
        var navLinksClick = function() {

            // get the href of the link being clicked
            var href = this.getAttribute('href').replace('#', '');
            event.preventDefault();

            // loop through id'd sections that have certain classes
            Array.prototype.forEach.call(scrollAnchors, function(el, i) {
                if (el.id == href) {
                    var anchorDistance = el.offsetTop;
                    window.scrollTo({
                        top: anchorDistance - 96,
                        left: 0,
                        behavior: 'smooth'
                    });
                } else {
                    return false;
                }
            });
        };

        // loop through all nav links and add click event
        Array.prototype.forEach.call(navLinks, function(el, i) {
            el.addEventListener('click', navLinksClick);
        });


        // SCROLLING

        // function to check what sections have been scrolled past, and highlight current item in site nav when
        var doneScrolling = function() {

            // loop through by number of id'd sections
            for (var i = 0; i < scrollAnchors.length; i++) {

                // if user scroll loop count is not last loop, and both window position is above current sections's distance to top, but less than the next section's distance to top 
                if ((i < scrollAnchors.length - 1) && ((window.scrollY >= scrollAnchors[i].offsetTop - 216) && (window.scrollY < scrollAnchors[i + 1].offsetTop - 216))) {
                    // remove all js-active states in nav and content sections
                    Array.prototype.forEach.call(navLinks, function(el, i) {
                        el.classList.remove('site-nav__link--current');
                    });

                    // read new js-active state to current section
                    navLinks[i].classList.add('site-nav__link--current');

                    // add class to sections if scrolled to
                    scrollAnchors[i].classList.add('scroll-anchor--seen');

                    return true;
                } else if (i == scrollAnchors.length - 1) {

                    // solely for last section, because it has no next section to compare to
                    Array.prototype.forEach.call(navLinks, function(el, i) {
                        el.classList.remove('site-nav__link--current');
                    });

                    navLinks[i].classList.add('site-nav__link--current');
                    scrollAnchors[i].classList.add('scroll-anchor--seen');
                    return false;
                }
            }
        }

        // listen for scrolling and fire events when done
        window.addEventListener('scroll', function(event) {
            // create temporary var
            var isScrolling;

            // keep clearing timeout on temporary var
            window.clearTimeout(isScrolling);

            // fire function when user stops for 500ms
            isScrolling = setTimeout(doneScrolling, 500);
        }, false);
    }, false);
})();