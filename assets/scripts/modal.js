function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal event
modalBtn.addEventListener("click", launchModal);
// launch modal form
function launchModal() {
  modalbg.classList.add("active");
  window.scroll(0, 0);
}

// close modal event
closeBtn.addEventListener("click", closeModal);
// Close modal form
function closeModal() {
  modalbg.classList.remove("active");

  // Remove the confirmation message and the "Close" button if they already exist
  const confirmationMessage = document.getElementById("confirmationMessage");
  if (confirmationMessage) {
    document.querySelector(".modal-body").removeChild(confirmationMessage);
  }

  const btnCloseModal = document.getElementById("btnCloseModal");
  if (btnCloseModal) {
    document.querySelector(".modal-body").removeChild(btnCloseModal);
  }

  // Reset the form by emptying it
  const form = document.forms.reserve;
  form.reset();

  // Remove the data-error-visible attribute from .formData elements
  const formDataElements = document.querySelectorAll(".formData");
  formDataElements.forEach((element) => {
    element.removeAttribute("data-error-visible");
  });
  
  // Redisplay the form
  form.style.display = "block";
}


function initAddEventListenerModal() {
  // Add an event listener to the button that launches the modal
  modalBtn.addEventListener("click", () => {
      launchModal()
  })

  // Add an event listener to the background of the modal
  modalbg.addEventListener("click", (event) => {
      if (event.target === modalbg) {
          closeModal()
      }
  })
}