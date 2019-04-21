/* ------3rd party------- */

// svg4everybody polyfill
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
});
(function() {
    svg4everybody({
        fallback: function(src, use) {
            // src: current xlink:href String 
            // svg: current SVG Element 
            // use: current USE Element 

            return 'fallback.png'; // ok, always return fallback.png
        }
    });
})();

// scroll to polyfill https://github.com/iamdustan/smoothscroll
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        ! function() {
            "use strict";

            function o() {
                var o = window,
                    t = document;
                if (!("scrollBehavior" in t.documentElement.style && !0 !== o.__forceSmoothScrollPolyfill__)) {
                    var l, e = o.HTMLElement || o.Element,
                        r = 468,
                        i = { scroll: o.scroll || o.scrollTo, scrollBy: o.scrollBy, elementScroll: e.prototype.scroll || n, scrollIntoView: e.prototype.scrollIntoView },
                        s = o.performance && o.performance.now ? o.performance.now.bind(o.performance) : Date.now,
                        c = (l = o.navigator.userAgent, new RegExp(["MSIE ", "Trident/", "Edge/"].join("|")).test(l) ? 1 : 0);
                    o.scroll = o.scrollTo = function() { void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? h.call(o, t.body, void 0 !== arguments[0].left ? ~~arguments[0].left : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? ~~arguments[0].top : o.scrollY || o.pageYOffset) : i.scroll.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : o.scrollX || o.pageXOffset, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : o.scrollY || o.pageYOffset)) }, o.scrollBy = function() { void 0 !== arguments[0] && (f(arguments[0]) ? i.scrollBy.call(o, void 0 !== arguments[0].left ? arguments[0].left : "object" != typeof arguments[0] ? arguments[0] : 0, void 0 !== arguments[0].top ? arguments[0].top : void 0 !== arguments[1] ? arguments[1] : 0) : h.call(o, t.body, ~~arguments[0].left + (o.scrollX || o.pageXOffset), ~~arguments[0].top + (o.scrollY || o.pageYOffset))) }, e.prototype.scroll = e.prototype.scrollTo = function() {
                        if (void 0 !== arguments[0])
                            if (!0 !== f(arguments[0])) {
                                var o = arguments[0].left,
                                    t = arguments[0].top;
                                h.call(this, this, void 0 === o ? this.scrollLeft : ~~o, void 0 === t ? this.scrollTop : ~~t)
                            } else {
                                if ("number" == typeof arguments[0] && void 0 === arguments[1]) throw new SyntaxError("Value could not be converted");
                                i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left : "object" != typeof arguments[0] ? ~~arguments[0] : this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top : void 0 !== arguments[1] ? ~~arguments[1] : this.scrollTop)
                            }
                    }, e.prototype.scrollBy = function() { void 0 !== arguments[0] && (!0 !== f(arguments[0]) ? this.scroll({ left: ~~arguments[0].left + this.scrollLeft, top: ~~arguments[0].top + this.scrollTop, behavior: arguments[0].behavior }) : i.elementScroll.call(this, void 0 !== arguments[0].left ? ~~arguments[0].left + this.scrollLeft : ~~arguments[0] + this.scrollLeft, void 0 !== arguments[0].top ? ~~arguments[0].top + this.scrollTop : ~~arguments[1] + this.scrollTop)) }, e.prototype.scrollIntoView = function() {
                        if (!0 !== f(arguments[0])) {
                            var l = function(o) {
                                    var l, e, r, i;
                                    do { l = (o = o.parentNode) === t.body } while (!1 === l && !1 === (r = p(e = o, "Y") && a(e, "Y"), i = p(e, "X") && a(e, "X"), r || i));
                                    return l = null, o
                                }(this),
                                e = l.getBoundingClientRect(),
                                r = this.getBoundingClientRect();
                            l !== t.body ? (h.call(this, l, l.scrollLeft + r.left - e.left, l.scrollTop + r.top - e.top), "fixed" !== o.getComputedStyle(l).position && o.scrollBy({ left: e.left, top: e.top, behavior: "smooth" })) : o.scrollBy({ left: r.left, top: r.top, behavior: "smooth" })
                        } else i.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0])
                    }
                }

                function n(o, t) { this.scrollLeft = o, this.scrollTop = t }

                function f(o) { if (null === o || "object" != typeof o || void 0 === o.behavior || "auto" === o.behavior || "instant" === o.behavior) return !0; if ("object" == typeof o && "smooth" === o.behavior) return !1; throw new TypeError("behavior member of ScrollOptions " + o.behavior + " is not a valid value for enumeration ScrollBehavior.") }

                function p(o, t) { return "Y" === t ? o.clientHeight + c < o.scrollHeight : "X" === t ? o.clientWidth + c < o.scrollWidth : void 0 }

                function a(t, l) { var e = o.getComputedStyle(t, null)["overflow" + l]; return "auto" === e || "scroll" === e }

                function d(t) {
                    var l, e, i, c, n = (s() - t.startTime) / r;
                    c = n = n > 1 ? 1 : n, l = .5 * (1 - Math.cos(Math.PI * c)), e = t.startX + (t.x - t.startX) * l, i = t.startY + (t.y - t.startY) * l, t.method.call(t.scrollable, e, i), e === t.x && i === t.y || o.requestAnimationFrame(d.bind(o, t))
                }

                function h(l, e, r) {
                    var c, f, p, a, h = s();
                    l === t.body ? (c = o, f = o.scrollX || o.pageXOffset, p = o.scrollY || o.pageYOffset, a = i.scroll) : (c = l, f = l.scrollLeft, p = l.scrollTop, a = n), d({ scrollable: c, method: a, startTime: h, startX: f, startY: p, x: e, y: r })
                }
            }
            "object" == typeof exports && "undefined" != typeof module ? module.exports = { polyfill: o } : o()
        }();
    });
})();

// contact form
// https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server
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
                    icon.setAttribute('xlink:href', 'dist/img/icons.svg#icon-check'); // change icon on button back
                    button.querySelector('span').innerHTML = "Sent"; // change button text
                }, 2000)
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
        icon.setAttribute('xlink:href', 'dist/img/icons.svg#icon-form-spinner');
        button.querySelector('span').innerHTML = "Sending";
        button.disabled = true;
        form.classList.add('js-submitting');
        form.querySelector('input').disabled = true;
        form.querySelector('textarea').disabled = true;
    }

    document.addEventListener("DOMContentLoaded", loaded, false);
})();

// dribbble
(function() {
    var dribbbleFeed = document.getElementById('dribbble-feed');

    var dribbble = function() {
        // set access token from dribbble/postman
        var accessToken = 'bd8865cd4ff712d9f421cb8526fa8560062dfd67da1fac1645a4229b43500d24';

        // open new xhr request
        var request = new XMLHttpRequest();

        request.open('GET', 'https://api.dribbble.com/v2/user/shots?per_page=6&access_token=' + accessToken, true);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {

                // get the json
                var data = JSON.parse(request.responseText);

                if (data.length > 0) {
                    var fragment = document.createDocumentFragment();

                    Array.prototype.forEach.call(data, function(el, i) {
                        var newEl = document.createElement('a');
                        newEl.setAttribute('href', el.html_url);
                        newEl.setAttribute('target', '_blank');
                        newEl.setAttribute('title', el.title);
                        newEl.innerHTML = '<img aria-hidden="true" src="' + el.images.hidpi + '" />'

                        // newEl.innerHTML = el.images.hidpi;
                        fragment.appendChild(newEl);
                    });

                    // add images to dribbble feed article area
                    dribbbleFeed.appendChild(fragment);

                }
            }
        };
        request.send();
    };
    dribbble();
})();



















/* -------- custom global -------- */


// mobile menu
function mobileMenuClose() {
    var mobileMenuButtonUse = document.querySelector('#mobile-button use');
    document.body.classList.remove('js-mobile-menu-active');
    mobileMenuButtonUse.setAttribute('xlink:href', 'dist/img/icons.svg#icon-menu');
}

function mobileMenuOpen() {
    var mobileMenuButtonUse = document.querySelector('#mobile-button use');
    document.body.classList.add('js-mobile-menu-active');
    mobileMenuButtonUse.setAttribute('xlink:href', 'dist/img/icons.svg#icon-close');
}

function mobileMenu() {
    var mobileMenuButtonUse = document.querySelector('#mobile-button use');

    if (document.body.classList.contains('js-mobile-menu-active')) {
        mobileMenuClose()
    } else {
        mobileMenuOpen()
    }
}

// srcsets and lightbox to article images (global)
function oneOffLightbox(target) {
    var imgs = document.querySelectorAll('.lightbox-wrapper img');
    var lightboxWrapper = document.querySelector('.lightbox-wrapper');

    if (imgs.length > 0) {
        Array.prototype.forEach.call(imgs, function(el, i) {
            el.remove();
        });
    }
    console.log(target)
    var newImage = document.createElement('img');
    newImage.setAttribute('src', target.currentTarget.getAttribute('src'));
    newImage.setAttribute('alt', target.currentTarget.getAttribute('alt'));
    lightboxWrapper.appendChild(newImage);
    lightboxWrapper.setAttribute('aria-hidden', 'false');
    window.setTimeout(function() { document.body.classList.add('js-lightbox-active') }, 200)
}



// srcsets and lightbox to article images (global)
function srcSet() {
    var srcSetSizes;
    var domain = "dist/img/article/";
    var lightboxWrapper = document.querySelector('.lightbox-wrapper');
    var figures = document.getElementById('portfolio-content').querySelectorAll('figure > div');


    Array.prototype.forEach.call(figures, function(el, i) {
        var imgs = el.querySelectorAll('img[data-src]');
        // console.log(imgs);

        Array.prototype.forEach.call(imgs, function(el, i) {
            var srcPath = el.getAttribute('data-src');
            var srcSetValue =
                domain + srcPath.substring(0, srcPath.lastIndexOf(".")) + "@400" + srcPath.substring(srcPath.lastIndexOf(".")) + ' 400w,' +
                domain + srcPath.substring(0, srcPath.lastIndexOf(".")) + "@800" + srcPath.substring(srcPath.lastIndexOf(".")) + ' 800w,' +
                domain + srcPath.substring(0, srcPath.lastIndexOf(".")) + "@1200" + srcPath.substring(srcPath.lastIndexOf(".")) + ' 1200w,' +
                domain + srcPath.substring(0, srcPath.lastIndexOf(".")) + "@1600" + srcPath.substring(srcPath.lastIndexOf(".")) + ' 1600w,' +
                domain + srcPath.substring(0, srcPath.lastIndexOf(".")) + "@2000" + srcPath.substring(srcPath.lastIndexOf(".")) + ' 2000w';

            if (imgs.length == 1) {
                srcSetSizes = "(max-width:47.9375em) 90vw, (max-width:61.9375) 49.93em, 62.94em";
            } else if (imgs.length == 2) {
                srcSetSizes = "(max-width:47.9375em) 90vw, (max-width:61.9375) 24.96em, 31.47em";
            } else {
                srcSetSizes = "(max-width:47.9375em) 90vw, (max-width:61.9375) 16.64em, 20.98em";
            }

            el.setAttribute('srcset', srcSetValue);
            el.setAttribute('sizes', srcSetSizes);
            el.setAttribute('src', domain + el.getAttribute('data-src'));
            el.classList.add('lightbox');
            el.addEventListener('click', function() {
                var imgs = document.querySelectorAll('.lightbox-wrapper img');

                if (imgs.length > 0) {
                    Array.prototype.forEach.call(imgs, function(el, i) {
                        el.remove();
                    });
                }

                var newImage = document.createElement('img');
                newImage.setAttribute('src', this.getAttribute('src'));
                newImage.setAttribute('alt', this.getAttribute('alt'));
                lightboxWrapper.appendChild(newImage);
                lightboxWrapper.setAttribute('aria-hidden', 'false');
                window.setTimeout(function() { document.body.classList.add('js-lightbox-active') }, 200)
            })
        })
    })
}(function() {
    window.addEventListener("DOMContentLoaded", srcSet())
})();


//lightbox close (global)
function lightboxClose() {
    event.currentTarget.parentNode.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('js-lightbox-active');
}


















/* -------- custom -------- */
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


            console.log(this);

            // check if this was a mobile menu click
            if (document.body.classList.contains('js-mobile-menu-active')) {
                mobileMenuClose();
            }

            // loop through id'd sections that have certain classes
            Array.prototype.forEach.call(scrollAnchors, function(el, i) {
                if (el.id == href) {
                    var anchorDistance = el.offsetTop;

                    console.log(anchorDistance);
                    window.scrollTo({
                        top: anchorDistance - 128,
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
                if ((i < scrollAnchors.length - 1) && ((window.pageYOffset >= scrollAnchors[i].offsetTop - 272) && (window.pageYOffset < scrollAnchors[i + 1].offsetTop - 272))) {
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
            isScrolling = setTimeout(doneScrolling, 750);
        }, false);
    }, false);
})();


// portfolio section
(function() {
    document.addEventListener("DOMContentLoaded", function() {

        var tabs = document.querySelectorAll('.portfolio__tablist-tab');
        var sections = document.querySelectorAll('.portfolio__section');

        var currentSection = document.getElementById('portfolio-section-recent');
        var currentSectionData = currentSection.getAttribute('data-section');

        var currentArticleNumber = parseInt(currentSection.children[0].getAttribute('data-article'));
        var nextArticleNumber = currentArticleNumber + 1;
        var previousArticleNumber = currentArticleNumber - 1;

        // create function for when tab is clicked
        var tabClick = function() {

            // define target of event
            var target = this;

            // define tab's data-section which will later match with a section id
            var tabSection = target.getAttribute('data-section');

            // create sibling array for this tab by looking for all of children of parent that aren't this tab
            var siblings = Array.prototype.filter.call(target.parentNode.children, function(child) {
                return child !== target;
            });

            // loop sibling array and remove active classes and aria
            var removeSiblingClasses = function() {
                Array.prototype.forEach.call(siblings, function(el, i) {
                    el.classList.remove('tab--active');
                    el.setAttribute('aria-selected', '');
                });
            }

            // check to see if the section number matches the data attribute of the tab being clicked, remove classes
            var checkSection = function() {
                Array.prototype.forEach.call(sections, function(el, i) {
                    if (el.id == tabSection) {
                        // define the new current section
                        currentSection = el;

                        // add classes to new current section
                        el.classList.add('portfolio__section--active');

                        // define new section number for ajax pathes
                        currentSectionData = el.getAttribute('data-section');
                        // console.log('current section is ' + currentSectionData + ' and current article is ' + currentArticleNumber);

                        // fire new section function
                        getNewSection(el);

                    } else if (el.id == 'portfolio-section-recent') {
                        // remove active classes from other sections
                        el.classList.remove('portfolio__section--active');
                        el.children[0].classList.remove('portfolio__article--active');
                        el.setAttribute('aria-hidden', 'true');

                    } else {
                        // clear all other section's content except new current section
                        el.innerHTML = '';

                        // remove active classes from other sections
                        el.classList.remove('portfolio__section--active')
                        return false;
                    };
                });
            }

            // fire events, add classes to this tab, remove classes from siblings, check for a section match in content area
            target.classList.add('tab--active');
            target.setAttribute('aria-selected', 'true');
            removeSiblingClasses();
            checkSection();
        };


        // trigger for new section click from tablist
        var getNewSection = function(el) {

            // reset internal vars for article numbers because we know it should go back to beginning of section articles
            previousArticleNumber = 0;
            currentArticleNumber = 1;
            nextArticleNumber = 2;



            // define new article path path, we know what section number it is and article number has to be 1
            newArticlePath = 'dist/article/article-' + currentSectionData + '-001.html';

            // define next article after new article's path, we know this has to be 2 because the current article number is 1
            nextArticlePath = 'dist/article/article-' + currentSectionData + '-002.html';

            if (el.id == 'portfolio-section-recent') {
                el.classList.add('portfolio__section--active');
                el.children[0].classList.add('portfolio__article--active');
                el.setAttribute('aria-hidden', 'false');
                // we also know that these buttons can be enabled or disabled
                previousArticleButton.disabled = true;
                nextArticleButton.disabled = true;

                // troubleshoot
                // console.log('Section: ' + currentSectionData + ' Previous: ' + previousArticleNumber + ' Current: ' + currentArticleNumber + ' Next: ' + nextArticleNumber)

                return false;
            } else {
                //troubleshoot

                // troubleshoot
                // console.log('Section: ' + currentSectionData + ' Previous: ' + previousArticleNumber + ' Current: ' + currentArticleNumber + ' Next: ' + nextArticleNumber)

                previousArticleButton.disabled = true;
                nextArticleButton.disabled = false;
                // request ajax for new section article
                requestNewSectionArticle();
                // we also know that these buttons can be enabled or disabled
            }
        };

        // listen for tab clicks
        function addTabListeners() {
            Array.prototype.forEach.call(tabs, function(el, i) {
                el.addEventListener('click', tabClick);
            });
        };

        addTabListeners();



        // article picker

        var nextArticleButton = document.getElementById('portfolio-article-next');
        var previousArticleButton = document.getElementById('portfolio-article-previous');
        var sectionContent = document.getElementById('portfolio-content');
        var newArticlePath;
        var nextArticlePath;



        // check current active section's height
        var getSectionHeight = function() {
            console.log(currentSection.height)
        };


        // ajax first article in for new section
        var requestNewSectionArticle = function() {
            var request = new XMLHttpRequest();

            request.open('GET', newArticlePath, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {
                    currentSection.innerHTML = request.response;
                    srcSet();

                    // trigger transitions for article
                    currentSection.children[0].classList.add('portfolio__article--active');

                    // check to see if buttons button needs to be disabled
                    checkNextArticleButton();


                    return false;
                } else {
                    // console.log('fail');
                    return false;
                }

                request.onerror = function() {
                    console.log('connection error');
                };
            };
            request.send();
        };

        // ajax in article for next button press
        var requestNextArticle = function() {
            var request = new XMLHttpRequest();

            request.open('GET', newArticlePath, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {

                    // we fill empty section
                    currentSection.innerHTML = request.response;
                    srcSet();
                    currentSection.children[0].classList.add('portfolio__article--next');

                    // wait half a second and add active class to article
                    window.setTimeout(function() {
                        currentSection.children[0].classList.add('portfolio__article--active');
                        currentSection.children[0].classList.remove('portfolio__article--loading');
                    }, 500);

                    // check to see if buttons button needs to be disabled by seeing if another article exists after this
                    checkNextArticleButton();
                    return false;

                } else {

                    // console.log('fail');
                    return false;
                }

                request.onerror = function() {
                    console.log('connection error');
                };
            };
            request.send();
        };

        // ajax in article for previous button press
        var requestPreviousArticle = function() {
            var request = new XMLHttpRequest();

            request.open('GET', newArticlePath, true);
            request.onload = function() {
                if (request.status >= 200 && request.status < 400) {

                    // we fill empty section
                    currentSection.innerHTML = request.response;
                    srcSet();
                    currentSection.children[0].classList.add('portfolio__article--previous');

                    // wait half a second and add active class to article
                    window.setTimeout(function() {
                        currentSection.children[0].classList.add('portfolio__article--active');
                        currentSection.children[0].classList.remove('portfolio__article--loading');
                        currentSection.children[0].classList.remove('portfolio__article--loading');
                    }, 500);

                    // check to see if buttons button needs to be disabled by seeing if another article exists after this
                    checkNextArticleButton();
                    return false;

                } else {

                    // console.log('fail');
                    return false;
                }

                request.onerror = function() {
                    console.log('connection error');
                };
            };
            request.send();
        };


        // check that next article up exists by ajax calling, and determine button's status if failed
        var checkNextArticleButton = function() {
            var nextRequest = new XMLHttpRequest();

            nextRequest.open('GET', nextArticlePath, true);
            nextRequest.onload = function() {
                if (nextRequest.status >= 200 && nextRequest.status < 400) {
                    // console.log('there is a file after this');
                    nextArticleButton.disabled = false;
                    return false;
                } else {
                    // console.log('no file after this');
                    nextArticleButton.disabled = true;
                    return false;
                }
            }
            nextRequest.send();
        };

        // check that previous article var and disables previous button if it's less than 1 meaning the current article is at least number 1
        var checkPreviousArticleButton = function() {
            if (previousArticleNumber < 1) {
                previousArticleButton.disabled = true;
            } else if (previousArticleNumber >= 1) {
                previousArticleButton.disabled = false;
            }
        };


        // attain path for new article with zero padding rules
        var pathCreator = function() {
            if (currentArticleNumber <= 9 && currentArticleNumber >= 1) {

                // 1-9
                newArticlePath = 'dist/article/article-' + currentSectionData + '-00' + (currentArticleNumber) + '.html';
                nextArticlePath = 'dist/article/article-' + currentSectionData + '-00' + (nextArticleNumber) + '.html';

                return false;

            } else if (currentArticleNumber <= 99 && currentArticleNumber >= 10) {

                // 10-99
                newArticlePath = 'dist/article/article-' + currentSectionData + '-0' + (currentArticleNumber) + '.html';
                nextArticlePath = 'dist/article/article-' + currentSectionData + '-0' + (nextArticleNumber) + '.html';
                return false;

            } else if (currentArticleNumber <= 999 && currentArticleNumber >= 100) {

                // 100-999
                newArticlePath = 'dist/article/article-' + currentSectionData + '-' + (currentArticleNumber) + '.html';
                nextArticlePath = 'dist/article/article-' + currentSectionData + '-' + (nextArticleNumber) + '.html';
                return false;

            } else {
                return false;
            };
        }

        // combine all functions when previous and next article button is clicked
        var getNextArticle = function() {

            previousArticleNumber++;
            currentArticleNumber++;
            nextArticleNumber++;

            // get path for article that will be ajaxed in, need zero padding ifs
            pathCreator();


            // after we have paths, we ask for article ajax
            requestNextArticle();

            // we know we can enable the previous article button because someone just clicked next
            previousArticleButton.disabled = false;

            // troubleshoot
            // console.log('Section: ' + currentSectionData + ' Previous: ' + previousArticleNumber + ' Current: ' + currentArticleNumber + ' Next: ' + nextArticleNumber)

        }



        // combine all functions when previous and previous article button is clicked
        var getPreviousArticle = function() {

            previousArticleNumber--;
            currentArticleNumber--;
            nextArticleNumber--;

            // get path for article that will be ajaxed in, need zero padding ifs
            pathCreator();


            // after we have paths, we ask for article ajax
            requestPreviousArticle();

            // check to see if we should disable previous button
            checkPreviousArticleButton();

            // we know we can enable next article button because someone just clicked previous
            nextArticleButton.disabled = false;

            // troubleshoot
            // console.log('Section: ' + currentSectionData + ' Previous: ' + previousArticleNumber + ' Current: ' + currentArticleNumber + ' Next: ' + nextArticleNumber)
        };

        // add listeners
        nextArticleButton.addEventListener('click', getNextArticle);
        previousArticleButton.addEventListener('click', getPreviousArticle);


        // troubleshoot
        // console.log('Section: ' + currentSectionData + ' Previous: ' + previousArticleNumber + ' Current: ' + currentArticleNumber + ' Next: ' + nextArticleNumber)


    }, false);
})();