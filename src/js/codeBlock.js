if (document.querySelectorAll(".code-block").length > 0) {
}
var codeBlocks = [...document.querySelectorAll(".code-example")],
   copyCodeButtons = [...document.querySelectorAll("[data-copy]")],
   successMessage = document.getElementById("dialogOne"),
   dialogOpen = false;

function closeDialog() {
   successMessage.close();
   dialogOpen = false;
}

for (var i = 0; i <= copyCodeButtons.length - 1; i++) {
   if (
      codeBlocks[i].getAttribute("id") ==
      copyCodeButtons[i].getAttribute("data-copy")
   ) {
      let clipboardContent = codeBlocks[i].innerText;

      // Add click event listener to the copy button
      copyCodeButtons[i].addEventListener("click", () => {
         //TODO :: Refactor this redundant awful code with something more elegant. Would like to use an array of unwanted strings. Also, update to work with multiple code blocks. (Tied to updatign modals)
         clipboardContent = clipboardContent.replace("<code>", "");
         clipboardContent = clipboardContent.replace("</code>", "");
         navigator.clipboard.writeText(clipboardContent);
         dialogOpen = true;
         setTimeout(closeDialog, 5000);
      });
   }
}
