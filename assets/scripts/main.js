// Function to show/hide error message
function displayError(element, message) {
  if (message === null) {
    // If the message is null, hide the error by setting data-error-visible to "false"
    element.dataset.errorVisible = "false";
  } else {
    // Otherwise, add the error message to the data-error attribute and set data-error-visible to "true"
    element.dataset.error = message;
    element.dataset.errorVisible = "true";
  }
}

// Date formatting function
function formatDate(dateObject) {
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();
  // Format the date in "dd/mm/yyyy" format
  return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
}

// Fields validation method
function manageForm() {
  // Firstname validation field
  let firstNameTag = document.getElementById("first");
  let firstName = firstNameTag.value;
  displayError(firstNameTag.parentNode, null);
  if(firstName.length < 2) {
    displayError(firstNameTag.parentNode, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  } 

  // Lastname validation field
  let lastNameTag = document.getElementById("last");
  let lastName = lastNameTag.value;
  displayError(lastNameTag.parentNode, null);
  if(lastName.length < 2) {
    displayError(lastNameTag.parentNode, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  }

  // Email validation field
  let emailTag = document.getElementById("email");
  let email = emailTag.value;
  // This regex validates email addresses by checking that:
  // 1. The username can contain lowercase letters, numbers, and the characters ._-
  // 2. There is an @.
  // 3. The domain can contain lowercase letters, numbers, and the characters ._-
  // 4. There is a period (.) after the domain.
  // 5. The domain extension contains at least 2 lowercase characters.
  // The regex is case insensitive (uppercase/lowercase).
  let emailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]{2,}$", "i");
  displayError(emailTag.parentNode, null);
  if(!emailRegExp.test(email)) {
    displayError(emailTag.parentNode, "Veuillez entrer une adresse e-mail valide pour le champ de l’e-mail.");
  }

  // Birthdate validation field
  let birthdateTag = document.getElementById("birthdate");
  let birthdate = new Date(birthdateTag.value);
  let currentDate = new Date();
  // This regex validates dates in the "dd/mm/yyyy" format 
  let dateRegExp = new RegExp(/^\d{2}\/\d{2}\/\d{4}$/);
  displayError(birthdateTag.parentNode, null);
  if (!dateRegExp.test(formatDate(birthdate))) {
    displayError(birthdateTag.parentNode, "Vous devez entrer votre date de naissance.");
  } else {
    if (birthdate.getTime() >= currentDate.getTime()) {
      displayError(birthdateTag.parentNode, "La date de naissance ne peut pas être dans le futur.");
    } else {
      displayError(birthdateTag.parentNode, null);
    }
  }

  // Quantity validation field
  let quantityTag = document.getElementById("quantity");
  let quantity = parseInt(quantityTag.value, 10);
  displayError(quantityTag.parentNode, null);
  if (!Number.isInteger(quantity) || quantity < 0) {
    displayError(quantityTag.parentNode, "Veuillez entrer un nombre entier valide.");
  }

  // Locations validation field
  let locationRadios = document.querySelectorAll('input[type="radio"][name="location"]');
  let locationField = document.querySelector('input[type="radio"][name="location"]').closest('.formData');
  displayError(locationField, null);
  let isLocationChecked = false;   
  locationRadios.forEach(function(radio) {
    if (radio.checked) {
      isLocationChecked = true;
      return;
    }
  });
  if (!isLocationChecked) {
    displayError(locationField, "Vous devez choisir une option.");
  } 

  // Terms validation field
  let termsCheckbox = document.getElementById("checkbox1");
  let termsField = document.getElementById("checkbox1").closest('.formData');
  let isTermsChecked = termsCheckbox.checked;
  displayError(termsField, null);
  if (!isTermsChecked) {
    displayError(termsField, "Vous devez vérifier que vous acceptez les termes et conditions.");
  }
}

// Function to check if the form is valid
function isFormValid() {
  const errors = document.querySelectorAll('[data-error-visible="true"]');
  return errors.length === 0;
}

// Function to display the confirmation message
function displayConfirmationMessage() {
  if (isFormValid()) {
    // If the form is valid, hide the form
    form.style.display = "none";
    // Create a paragraph element to display the confirmation message
    const messageBlockText = document.createElement("p");
    const btnCloseModal = document.createElement("button");
    messageBlockText.setAttribute('id', 'confirmationMessage');
    messageBlockText.innerHTML = "Merci ! Votre réservation a été reçue.";
    // Add the confirmation message to the .modal-body part of the form
    document.querySelector(".modal-body").append(messageBlockText);
    // Create a button element to close the modal
    btnCloseModal.setAttribute('id', 'btnCloseModal');
    btnCloseModal.classList.add("button", "btn-submit");
    btnCloseModal.innerHTML = "Fermer";
    // Add the close button to the .modal-body part of the form
    document.querySelector(".modal-body").append(btnCloseModal);
    // Add an event handler for the close button that calls the closeModal() function
    btnCloseModal.addEventListener("click", closeModal);
  }
}

function validate(event) {
  // Initializations
  initAddEventListenerModal();
  // We prevent the default behavior
  event.preventDefault();
  // We retrieve the fields from the form and perform the validations
  manageForm();
  // We display the confirmation message
  displayConfirmationMessage();
}