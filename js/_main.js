"use strict";

window.onload = function() {
   function dropdown() {
      var x = document.getElementsByClassName("dropdown");
      var y = document.getElementsByClassName("dropdown-menu");
      
      dropdown.addEventListener('hover', function() {
         y.addClass("active");
      })
   }
}

