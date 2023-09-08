if (document.querySelectorAll("[data-modal]").length > 0) {
   // - - - - - - - - - - - - - - - - - - - -
   // Modals
   // - - - - - - - - - - - - - - - - - - - -
   const modalElements = [...document.querySelectorAll("[data-modal-element]")],
      openModalButtons = [...document.querySelectorAll("[data-open-modal]")],
      closeModalButtons = [...document.querySelectorAll("[data-close-modal]")],
      modalContents = [...document.querySelectorAll("[data-modal]")];

   const modalObjects = [];

   function AddModalObjects() {
      modalObjects.push({
         modalContent: modalContent,
         openModalButton: openModalButton,
         closeModalButton: closeModalButton,
      });
   }

   for (let i = 0; i <= modalElements.length - 1; i++) {
      var modalContent = modalContents[i],
         openModalButton = openModalButtons[i],
         closeModalButton = closeModalButtons[i];
      AddModalObjects();
   }

   console.log(modalObjects);

   for (let i = 0; i < modalObjects.length; i++) {
      console.log(this.openModalButton);
      modalObjects[i].openModalButton.addEventListener("click", function (e) {
         modalObjects[i].modalContent.showModal();
      });
      modalObjects[i].closeModalButton.addEventListener("click", function (e) {
         modalObjects[i].modalContent.close();
      });
   }
}
if (document.querySelectorAll("[data-dialog]").length > 0) {
   // - - - - - - - - - - - - - - - - - - - -
   // Dialogs
   // - - - - - - - - - - - - - - - - - - - -
   const dialogElements = [
         ...document.querySelectorAll("[data-dialog-element]"),
      ],
      openDialogButtons = [...document.querySelectorAll("[data-open-dialog]")],
      closeDialogButtons = [
         ...document.querySelectorAll("[data-close-dialog]"),
      ],
      dialogContents = [...document.querySelectorAll("[data-dialog]")];

   const dialogObjects = [];

   function AddDialogObjects() {
      dialogObjects.push({
         dialogContent: dialogContent,
         openDialogButton: openDialogButton,
         closeDialogButton: closeDialogButton,
      });
   }

   for (let i = 0; i <= dialogElements.length - 1; i++) {
      var dialogContent = dialogContents[i],
         openDialogButton = openDialogButtons[i],
         closeDialogButton = closeDialogButtons[i];
      AddDialogObjects();
   }

   console.log(dialogObjects);

   for (let i = 0; i < dialogObjects.length; i++) {
      console.log(this.openDialogButton);
      dialogObjects[i].openDialogButton.addEventListener("click", function (e) {
         dialogObjects[i].dialogContent.show();
      });
      dialogObjects[i].closeDialogButton.addEventListener(
         "click",
         function (e) {
            dialogObjects[i].dialogContent.close();
         }
      );
   }
}
