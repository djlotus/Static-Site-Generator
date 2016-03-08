//_______________________________________________________________________
//__________---___---__---_______________________________________________
//__________---___---__---________________---____________________________
//__________---___---__---________________---____________________________
//______--__---___---__---______----______---___________________---______
//____-----_---___---__---____--------__-------__---____---___-------____
//___---___----___---__---___----__----_-------__---____---__---___---___
//__---_____---___---__---__----____----__---____---____---__---____---__
//__---_____---___---__---__----____----__---____---____---__-------_____
//__---_____---___---__---__---______---__---____---____---___--------___
//__---_____---___---__---__----____----__---____---____---________----__
//__----___----___---__---___---____---___---____---___----__---____---__
//___----------___---__---____--------____-----__----------__----__----__
//_____----_---___---__---_____------______----___-----_---___--------___
//_______________----___________________________________________---______
//______________-----_______________Navigation___________________________
//______________----_____________________________________________________
//_______________________________________________________________________
//_______________________________________________________________________

"use-strict";                 // Lock script in strict mode. May cause issues later.

var dropClass =               "dropdown", // Set class for dropClass
    elementArray =            document.getElementsByClassName(dropClass), // create HTML collection of all elements with class dropdown
    topLevel =                Array.prototype.slice.call(elementArray); // convert HTML collection to Array

// Add focus event to anchor tags to allow keyboard accessibility.
// - - - - - - - - - - - - - - - - - - - -

for (var i = 0; i <= topLevel.length - 1; i++) {
   // Use AddEventListener for happy browsers
   if (document.addEventListener) {
      topLevel[i].addEventListener("focus", function(e) {
         if (e.target && e.target.className == "sub_link") {
            console.log("You focused on a sublink");
            this.className = "dropdown active";
         } else {
            console.log("It's not working. Need more coffee apparently...");
         }
      }, true);
      // Remove focus event: prevents more than one menu from displaying at a time
      topLevel[i].addEventListener("blur", function(e) {
         if (e.target && e.target.className == "sub_link") {
            console.log("2");
            this.className = "dropdown";
         }
      }, true);
   // Use attachEvent for sad browsers :(
   } else if (document.attachEvent) {
      topLevel[i].attachEvent("focus", function(e) {
         var target = e.target || e.srcElement;
         if (target && target.className == "sub_link") {
            console.log("You focused on a sublink");
            this.className = "dropdown active";
         } else {
            console.log("There is something wrong with your script in IE8 . It's not working dummy");
         }
      }, true);
      // Remove focus event: prevents more than one menu from displaying at a time
      topLevel[i].attachEvent("blur", function(e) {
         var target = e.target || e.srcElement;
         if (target && target.className == "sub_link") {
            console.log("2");
            this.className = "dropdown";
         }
      }, true);
   }
};

// Add click event for ShowNav on mobile
// - - - - - - - - - - - - - - - - - - - -

var navButton =               document.getElementById("showNav"), // Set nav button
    mainNav =                 document.getElementById("main-nav"), // Set main navigation element
    isClicked =               "false"; // Set clicked status to false by default

if (document.addEventListener) {
   navButton.addEventListener("click", function(e) {
      if (isClicked === "false") { // if nav not active, show nav
         console.log("main nav opened");
         navButton.innerHTML = "Hide Menu";
         mainNav.className = "active";
         isClicked = "true";
      } else if (isClicked === "true") { // if nav is active, hide nav
         console.log("main nav closed");
         navButton.innerHTML = "Show Menu";
         mainNav.className = "";
         isClicked = "false";
      }
   });
}
