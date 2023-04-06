// - - - - - - - - - - - - - - - - - - - -
// Add Event Listeners to navigation to allow for keyboard navigation
// - - - - - - - - - - - - - - - - - - - -

var topLevel = document.querySelectorAll("[data-dropdown]"), // Grab nav elements which contain sub-navs
   navElement = []; // Create empty array for navigation elements

for (var i = 0; i < topLevel.length; i++) {
   navElement.push(topLevel[i]);
}

for (var i = 0; i <= topLevel.length - 1; i++) {
   // Use addEventListener for happy browsers
   if (document.addEventListener) {
      navElement[i].addEventListener(
         "focus",
         function (e) {
            if (e.target && e.target.className == "sub_link") {
               this.setAttribute("data-dropdown", "true");
               console.log("You focused on a dropdown element");
            } else {
               console.log("You focused on a top level element");
            }
         },
         true
      );
      // Remove focus event: prevents more than one menu from displaying at a time
      navElement[i].addEventListener(
         "blur",
         function (e) {
            if (e.target && e.target.className == "sub_link") {
               this.setAttribute("data-dropdown", null);
            }
         },
         true
      );
   }
}

// - - - - - - - - - - - - - - - - - - - -
// Add Event Listener to hide/show navigation on mobile
// - - - - - - - - - - - - - - - - - - - -

var navButton = document.getElementById("menuControl"), // Set nav button
   mainNav = document.querySelector("[data-nav]"), // Set main nav element
   navContainer = mainNav.parentElement; // Set parent container
menuControlText = navButton.querySelector("#menuControlText"); // Set text element

var isClicked = "false"; // Set clicked status to false by default

if (document.addEventListener) {
   navButton.addEventListener("click", function (e) {
      navButton.classList.toggle("is-active");
      if (isClicked === "false") {
         // if nav not active, show nav
         menuControlText.innerText = "Hide Navigation"; // change text in button to reflect the action of the button
         mainNav.setAttribute("data-nav", "true"); // show the navigation element
         isClicked = "true"; // update value of isClicked
         navContainer.style.width = "100%"; // allow container to show
      } else if (isClicked === "true") {
         // if nav is active, hide nav
         menuControlText.innerText = "Show Navigation"; // change text in button to reflect the action of the button
         mainNav.setAttribute("data-nav", "false"); // hide the navigation element
         isClicked = "false"; // update value of isClicked
         navContainer.style.width = "0"; // hide container so content under can be interactied with.
      } else {
         console.log("There is a problem with the mobile navigation");
      }
   });
}

var docBody = document.body; // Get body

if (document.getElementById("showNav").getAttribute("display") !== "none") {
   // - - - - - - - - - - - - - - - - - - - -
   // Set top offset for header element on mobile
   // - - - - - - - - - - - - - - - - - - - -
   var navbarElement = document.getElementById("showNav"), // Get mobile navbar element
      navbarOffset = navbarElement.offsetHeight; // Get height of mobile navbar element

   docBody.style.marginTop = navbarOffset + "px";
} else {
   // - - - - - - - - - - - - - - - - - - - -
   // Position Sticky Navbar
   // - - - - - - - - - - - - - - - - - - - -

   var header = document.querySelector("[role=banner]"), // Get header element
      headerOffset = header.offsetHeight, // Get height of header element
      regNav = document.querySelector("[role=navigation]"), // get first instance of navigation element
      stickyNav = document.querySelector("[data-sticky]"); // Get sticky nav element if exists
   stickyOffset = regNav.offsetHeight; // set height of navigation bar

   if (regNav.hasAttribute("data-nav-align-top")) {
      regNav.className = "sticky";
      docBody.style.marginTop = stickyOffset + "px";
   } else {
      if (document.addEventListener) {
         // If happy browser
         window.addEventListener("scroll", function () {
            // add scroll event
            if (stickyNav === regNav) {
               // if sticky nav element is the same as first instance of navigation
               if (window.pageYOffset >= headerOffset) {
                  // if window is scrolled equal to or more than the height of the header element
                  regNav.className = "sticky"; // add class "sticky" to nav element
               } else {
                  regNav.className = ""; // leave class empty for nav element
               }
            }
         });
      } else if (document.attachEvent) {
         // If sad browser :( nav should simply not stick
         window.attachEvent("onscroll", function () {
            // add scroll event
            if (stickyNav === regNav) {
               // if sticky nav element is the same as first instance of navigation
               if (window.pageYOffset >= headerOffset) {
                  // if window is scrolled equal to or more than the height of the header element
                  regNav.className = "sticky"; // add class "sticky" to nav element
                  // show logo in nav after it sticks to top
                  if (window.innerWidth > 1400) {
                     // only show logo in nav if above medium breakpoint
                     navLogo.style.display = "inline-block";
                  }
               } else {
                  regNav.className = ""; // leave class empty for nav element
                  navLogo.style.display = "none";
               }
            }
         });
      }
   }
}
