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
                window.setTimeout(function(){
                    form.classList.remove('js-submitting'); // remove waiting class
                    form.classList.add('js-submitted'); // add finished state class
                    icon.setAttribute('xlink:href','../img/icons.svg#icon-check'); // change icon on button back
                    button.querySelector('span').innerHTML="Sent"; // change button text
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
        icon.setAttribute('xlink:href','../img/icons.svg#icon-form-spinner');
        button.querySelector('span').innerHTML="Sending";
        button.disabled = true;
        form.classList.add('js-submitting');
        form.querySelector('input').disabled = true;
        form.querySelector('textarea').disabled = true;
    }

    document.addEventListener("DOMContentLoaded", loaded, false);
})();






// contact form styling
(function(){
    var email = document.getElementById('contact-form').querySelector('input');
    var message = document.getElementById('contact-form').querySelector('textarea');
    var labelFocused = function(){
        this.previousElementSibling.classList.add('js-focused');
    }
    var labelBlurred = function(){
        this.previousElementSibling.classList.remove('js-focused');
    }

    function addFocusStyles(){
        email.addEventListener('focus',labelFocused);
        email.addEventListener('blur',labelBlurred);
        message.addEventListener('focus',labelFocused);
        message.addEventListener('blur',labelBlurred);
    }

    addFocusStyles();
})();

