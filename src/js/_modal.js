

if (document.querySelectorAll("[data-modal]").length != 0) {

// - - - - - - - - - - - - - - - - - - - -
// Modal Windows
// - - - - - - - - - - - - - - - - - - - -

const openModal= document.getElementById("openModal"),
      closeModal = document.getElementById("closeModal"),
      modalElement = document.getElementById("modalOne"),
      openDialog= document.getElementById("openDialog"),
      closeDialog = document.getElementById("closeDialog"),
      dialogElement = document.getElementById("dialogOne");

      openModal.addEventListener("click", () => {
         modalElement.showModal();
      });

      closeModal.addEventListener("click", () => {
         modalElement.close();
      });
         
         openDialog.addEventListener("click", () => {
         dialogElement.show();
      });

      closeDialog.addEventListener("click", () => {
         dialogElement.close();
      });

};