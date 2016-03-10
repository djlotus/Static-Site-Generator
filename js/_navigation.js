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

var topLevel =                document.querySelectorAll("[data-nav]"), //Grab nav elements which contain sub-navs
    navElement =              Array.prototype.slice.call(topLevel); //Convert HTML collection to actual Array

for(var i = 0; i <= topLevel.length - 1; i++) {
   // Use addEventListener for happy browsers
   if (document.addEventListener) {
      navElement[i].addEventListener("focus", function(e) {
      if (e.target && e.target.className == "sub_link") {
         this.setAttribute("data-nav", "true");
         console.log("You focused on a dropdown element");
      } else {
         console.log("You focused on a top level element");
      }
   }, true);
      // Remove focus event: prevents more than one menu from displaying at a time
      navElement[i].addEventListener("blur", function(e) {
         if (e.target && e.target.className == "sub_link") {
            this.setAttribute("data-nav", null);
         }
      }, true);
   // Use attachEvent for sad browsers :(
   } else if (document.attachEvent) {
      navElement[i].attachEvent("focus", function(e) {
         if (e.target && e.target.className == "sub_link") {
            this.setAttribute("data-nav", "true");
            console.log("You focused on a dropdown element");
         } else {
            console.log("You focused on a top level element");
         }
      }, true);
      navElement[i].attachEvent("focus", function(e) {
         var target = e.target || e.srcElement;
         if (target && target.className == "sub_link") {
            console.log("You focused on a sublink");
            this.setAttribute("data-nav", null);
         } else {
            console.log("There is something wrong with your script in IE8 . It's not working dummy");
         }
      }, true);
      // Remove focus event: prevents more than one menu from displaying at a time
      navElement[i].attachEvent("blur", function(e) {
         var target = e.target || e.srcElement;
         if (target && target.className == "sub_link") {
            console.log("2");
            this.setAttribute("data-nav", null);
         }
      }, true);
   }
}
   