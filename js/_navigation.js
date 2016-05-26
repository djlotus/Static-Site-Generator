

// - - - - - - - - - - - - - - - - - - - -
// Add Event Listeners to navigation to allow for keyboard navigation
// - - - - - - - - - - - - - - - - - - - -

var topLevel =                document.querySelectorAll("[data-dropdown]"), // Grab nav elements which contain sub-navs
    navElement =              []; // Create empty array for navigation elements

for (var i = 0; i < topLevel.length; i++) {
   navElement.push(topLevel[i]);
}

for(var i = 0; i <= topLevel.length - 1; i++) {
   // Use addEventListener for happy browsers
   if (document.addEventListener) {
      navElement[i].addEventListener("focus", function(e) {
      if (e.target && e.target.className == "sub_link") {
         this.setAttribute("data-dropdown", "true");
         console.log("You focused on a dropdown element");
      } else {
         console.log("You focused on a top level element");
      }
   }, true);
      // Remove focus event: prevents more than one menu from displaying at a time
      navElement[i].addEventListener("blur", function(e) {
         if (e.target && e.target.className == "sub_link") {
            this.setAttribute("data-dropdown", null);
         }
      }, true);
   // Use attachEvent for sad browsers :(
   } else if (document.attachEvent) {
      navElement[i].attachEvent("onfocus", function(e) {
         if (e.target && e.target.className == "sub_link") {
            this.setAttribute("data-dropdown", "true");
            console.log("You focused on a dropdown element");
         } else {
            console.log("You focused on a top level element");
         }
      }, true);
      navElement[i].attachEvent("onfocus", function(e) {
         var target = e.target || e.srcElement;
         if (target && target.className == "sub_link") {
            console.log("You focused on a sublink");
            this.setAttribute("data-dropdown", null);
         } else {
            console.log("There is something wrong with your script in IE8 . It's not working dummy");
         }
      }, true);
      // Remove focus event: prevents more than one menu from displaying at a time
      navElement[i].attachEvent("onblur", function(e) {
         var target = e.target || e.srcElement;
         if (target && target.className == "sub_link") {
            console.log("2");
            this.setAttribute("data-dropdown", null);
         }
      }, true);
   }
}


// - - - - - - - - - - - - - - - - - - - -
// Add Event Listener to hide/show navigation on mobile
// - - - - - - - - - - - - - - - - - - - -

var navButton =               document.getElementById("showNav"), // Set nav button
    mainNav =                 document.querySelector("[data-nav]"), // Set main nav element
    navContainer =            mainNav.parentElement, // Set parent container
    isClicked =               "false"; // Set clicked status to false by default

if (document.addEventListener) {
   navButton.addEventListener("click", function(e) {
      if (isClicked === "false") { // if nav not active, show nav
         console.log("mobile nav is open"); // log the state of the navigation element
         navButton.innerHTML = "<br /><span>Hide</span>"; // change text in button to reflect the action of the button
         mainNav.setAttribute("data-nav", "true"); // show the navigation element
         isClicked = "true"; // update value of isClicked
         navContainer.style.width = "100%"; // allow container to show
      } else if (isClicked === "true") { // if nav is active, hide nav
         console.log("mobile nav is closed"); // log the state of the navigation element
         navButton.innerHTML = "<br /><span>Show</span>"; // change text in button to reflect the action of the button
         mainNav.setAttribute("data-nav", "false"); // hide the navigation element
         isClicked = "false"; // update value of isClicked
         navContainer.style.width = "0"; // hide container so content under can be interactied with.
      } else {
         console.log("There is a problem with the mobile navigation");
      }
   })
};


// - - - - - - - - - - - - - - - - - - - -
// Set top offset for header element on mobile
// - - - - - - - - - - - - - - - - - - - -

var docBody =                 document.body, // Get body
    navbarElement =           document.getElementById("show-nav"), // Get mobile navbar element
    navbarOffset =            navbarElement.scrollHeight; // Get height of mobile navbar element

docBody.style.marginTop = navbarOffset + "px";

// - - - - - - - - - - - - - - - - - - - -
// Position Sticky Navbar
// - - - - - - - - - - - - - - - - - - - -

var header =                  document.querySelector("[role=banner]"), // Get header element
    headerOffset =            header.scrollHeight, // Get height of header element
    stickyNav =               document.querySelector("[data-sticky]"), // Get sticky nav element if exists
    regNav =                  document.querySelector("[role=navigation]"); // get first instance of navigation element

if (regNav.hasAttribute("data-nav-align-top")) {
   regNav.className = "sticky";
} else {
   if (document.addEventListener) { // If happy browser
      window.addEventListener("scroll", function() { // add scroll event
         if (stickyNav === regNav) { // if sticky nav element is the same as first instance of navigation
            if (window.pageYOffset >= headerOffset) { // if window is scrolled equal to or more than the height of the header element
               regNav.className = "sticky"; // add class "sticky" to nav element
            } else {
               regNav.className = ""; // leave class empty for nav element
            }
         }
      })
   } else if (document.attachEvent) { // If sad browser :( nav should simply not stick
      window.attachEvent("onscroll", function() { // add scroll event
         if (stickyNav === regNav) { // if sticky nav element is the same as first instance of navigation
            if (window.pageYOffset >= headerOffset) { // if window is scrolled equal to or more than the height of the header element
               regNav.className = "sticky"; // add class "sticky" to nav element
            } else {
               regNav.className = ""; // leave class empty for nav element
            }
         }
      })
   };
};