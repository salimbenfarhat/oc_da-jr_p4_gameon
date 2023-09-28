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
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// launch modal form
function closeModal() {
  modalbg.classList.remove("active");
}

function initAddEventListenerModal() {
  modalBtn.addEventListener("click", () => {
      launchModal()
  })
  modalbg.addEventListener("click", (event) => {
      if (event.target === modalbg) {
          closeModal()
      }
  })
}