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
}

function initAddEventListenerModal() {
  // Ajoute un écouteur d'événements au bouton qui lance le modal
  modalBtn.addEventListener("click", () => {
      launchModal()
  })

  // Ajoute un écouteur d'événements à l'arrière-plan du modal
  modalbg.addEventListener("click", (event) => {
      if (event.target === modalbg) {
          closeModal()
      }
  })
}