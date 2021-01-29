if (document.querySelectorAll("[data-modal]").length != 0) {

// - - - - - - - - - - - - - - - - - - - -
// Modal Windows
// - - - - - - - - - - - - - - - - - - - -

var modal =                document.querySelector("[data-modal]"),
    openModalButton =      document.querySelector("[data-modal-open]"),
    closeModalButton =     document.querySelector("[data-modal-close]"),
    lastClicked,
    dialogOpen =           false,
    currentModal,
    currentCloseButton;


// - - - - - - - - - - - - - - - - - - - -
// Functions
// - - - - - - - - - - - - - - - - - - - -

function openModal() {
   for ( i = 0; i < modal.length; i++ ) { // for each modal on the page
      if (modal[i].id === this.getAttribute("data-opens")) { // if the value of the ID attribute for the modal is the same as the value of the "data-opens" attribute of the button
         lastClicked = this; // set variable "lastClicked to equal this keyword
         modal[i].setAttribute("data-modal", "show"); // Display modal
         currentCloseButton = closeModalButton[i]; // set variable "currentCloseButton" to the value of the current "closeModalButton"
         closeModalButton[i].focus(); // force focus to close button
         dialogOpen = true; // update dialogOpen variable to reflect opened dialog
         currentModal = modal[i].firstElementChild; // set value to variable "currentModal" to the first child element of the current modal
      }
   }
};

function closeModal() {
   for ( i = 0; i < closeModalButton.length; i++ ) { // for each close modal button
      if (modal[i].id === closeModalButton[i].getAttribute("data-closes")) { // if the value of the ID attribute for the modal is the same as the value of the "data-closes" attribute of the button
         modal[i].setAttribute("data-modal", null); // remove data-modal attribute and hide modal off screen
         lastClicked.focus(); // return focus to modal open button
         dialogOpen = false; // update dialogOpen variable to reflect closed dialog
         currentModal = ""; // remove value of variable "currentModal"
         currentCloseButton = ""; // remove value of variable "currentModal"
      }
   };
};

   // - - - - - - - - - - - - - - - - - - - -
   // Add Event Listeners
   // - - - - - - - - - - - - - - - - - - - -

   if (document.addEventListener) { // If happy browser
      for ( i = 0; i < modal.length; i++ ) {
         // Add mouse support
         openModalButton[i].addEventListener("click", openModal, false);
         closeModalButton[i].addEventListener("click", closeModal, false);
      };
      // add keyboard support
      document.addEventListener("keydown", function(e) { // add event listener on keydown
         var target = e.target || e.srcElement;
         e.which = e.which || e.keycode;
         if (e.which === 27) { // if keydown is fired from escape key
            if (dialogOpen === true) {
               closeModal(); // close modal
            }
         };
      });
      // Close model is clicking outside of modal
      document.addEventListener("click", function(e) {
         if (dialogOpen === true && !currentModal.contains(e.target) && e.target != lastClicked) {
            closeModal();
         };
      }, false);
      // once focus is located outside of modal, loop focus back into modal
      document.addEventListener("focus", function(e) {
         if (dialogOpen === true && !currentModal.contains(e.target)) {
            e.stopPropagation();
            currentCloseButton.focus();
         };
      }, true);

   } else if (document.attachEvent) { // If sad browser
      for ( i = 0; i < modal.length; i++ ) {
         // Add mouse support
         openModalButton[i].attachEvent("onclick", openModal, false);
         closeModalButton[i].attachEvent("onclick", closeModal, false);
         // add keyboard support
         document.attachEvent("keydown", function(e) { // add event listener on keydown
            var target = e.target || e.srcElement;
            e.which = e.which || e.keycode;
            if (e.which === 27) { // if keydown is fired from escape key
               if (dialogOpen === true) {
                  closeModal(); // close modal
               }
            };
         });
      };
      document.attachEvent("onclick", function(e) {
         if (dialogOpen === true && !currentModal.contains(e.target) && e.target != lastClicked) {
            closeModal();
         };
      }, false);
      // once focus is located outside of modal, loop focus back into modal
      document.attachEvent("onfocus", function(e) { 
         if (dialogOpen === true && !currentModal.contains(e.target)) {
            e.stopPropagation();
            currentCloseButton.focus();
         };
      }, true);
   };

};