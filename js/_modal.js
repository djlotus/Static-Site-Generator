

// - - - - - - - - - - - - - - - - - - - -
// Modal Windows (support for only one modal per page)
// - - - - - - - - - - - - - - - - - - - -

var modal =                document.querySelector("[data-modal]"),
    openModalButton =      document.querySelector("[data-modal-open]"),
    closeModalButton =     document.querySelector("[data-modal-close]");


// - - - - - - - - - - - - - - - - - - - -
// Functions
// - - - - - - - - - - - - - - - - - - - -

function openModal() {
   modal.setAttribute("data-modal", "show"); // Display modal
   closeModalButton.focus(); // fore focus to close button
   if (document.addEventListener) {
      closeModalButton.addEventListener("keydown", function(e) { // add event listener on keydown
         var target = e.target || e.srcElement;
         e.which = e.which || e.keycode;
         if (e.which === 9) { // if keydown is fired from tab key
            if (event.preventDefault) {  // if preventDefault method is supported
               e.preventDefault(); // prevent default action
            } else {
               e.returnValue = false; // if preventDefault is not supported use returnValue = false
            }
         } else if (e.which === 27) { // if keydown is fired from escape key
            closeModal(); // close modal
         }
      })
   } else if (document.attachEvent) {
      closeModalButton.attachEvent("onkeydown", function(e) { // add event listener on keydown
         var target = e.target || e.srcElement;
         e.which = e.which || e.keycode;
         if (e.which === 9) { // if keydown is fired from tab key
            if (event.preventDefault) {  // if preventDefault method is supported
               e.preventDefault(); // prevent default action
            } else {
               e.returnValue = false; // if preventDefault is not supported use returnValue = false
            }
         } else if (e.which === 27) { // if keydown is fired from escape key
            closeModal(); // close modal
         }
      })
   }
};

function closeModal() {
   modal.setAttribute("data-modal", null); // remove data-modal attribute and hide modal off screen
   openModalButton.focus(); // return focus to modal open button
};
   








   if (document.addEventListener) { // If happy browser
      openModalButton.addEventListener("click", openModal, false);
      closeModalButton.addEventListener("click", closeModal, false);
      
   } else if (document.attachEvent) { // If sad browser
      
   };