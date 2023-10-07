// Méthode pour afficher/masquer message d'erreur
function displayError(element, message) {
  if (message === null) {
    element.dataset.errorVisible = "false";
  } else {
    // Sinon, ajoutez le message d'erreur à l'attribut data-error et mettez data-error-visible à "true"
    element.dataset.error = message;
    element.dataset.errorVisible = "true";
  }
}

// Méthode de formattage de date
function formatDate(dateString) {
  let dateObject = new Date(dateString);
  let day = dateObject.getDate();
  let month = dateObject.getMonth() + 1;
  let year = dateObject.getFullYear();
  // Formater la date au format "jj/mm/aaaa"
  return (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month + '/' + year;
}

// Méthode de validation des champs
function manageForm() {
  let firstNameTag = document.getElementById("first");
  let firstName = firstNameTag.value;
  displayError(firstNameTag.parentNode, null);
  if(firstName.length < 2) {
    displayError(firstNameTag.parentNode, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
  } 

  let lastNameTag = document.getElementById("last");
  let lastName = lastNameTag.value;
  displayError(lastNameTag.parentNode, null);
  if(lastName.length < 2) {
    displayError(lastNameTag.parentNode, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
  }

  let emailTag = document.getElementById("email");
  let email = emailTag.value;
  // Cette regex valide les adresses e-mail en vérifiant que :
  // 1. Le nom d'utilisateur peut contenir des lettres minuscules, des chiffres, et les caractères ._-
  // 2. Il y a un @.
  // 3. Le domaine peut contenir des lettres minuscules, des chiffres, et les caractères ._-
  // 4. Il y a un point (.) après le domaine.
  // 5. L'extension de domaine contient au moins 2 caractères minuscules.
  // La regex est insensible à la casse (majuscules/minuscules).
  let emailRegExp = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z]{2,}$", "i");
  displayError(emailTag.parentNode, null);
  if(!emailRegExp.test(email)) {
    displayError(emailTag.parentNode, "Veuillez entrer une adresse e-mail valide pour le champ de l’e-mail.");
  }

  let birthdateTag = document.getElementById("birthdate");
  let birthdate = new Date(birthdateTag.value);
  let currentDate = new Date();
  // Cette regex valide les dates au format "jj/mm/aaaa"
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

  let quantityTag = document.getElementById("quantity");
  let quantity = parseInt(quantityTag.value, 10);
  displayError(quantityTag.parentNode, null);
  if (!Number.isInteger(quantity) || quantity < 0) {
    displayError(quantityTag.parentNode, "Veuillez entrer un nombre entier valide.");
  }

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

  let termsCheckbox = document.getElementById("checkbox1");
  let termsField = document.getElementById("checkbox1").closest('.formData');
  let isTermsChecked = termsCheckbox.checked;
  displayError(termsField, null);
  if (!isTermsChecked) {
    displayError(termsField, "Vous devez vérifier que vous acceptez les termes et conditions.");
  }
}

// Fonction pour vérifier si le formulaire est valide
function isFormValid() {
  const errors = document.querySelectorAll('[data-error-visible="true"]');
  return errors.length === 0;
}

// Fonction pour afficher le message de confirmation
function displayConfirmationMessage() {
  if (isFormValid()) {
    form.style.display = "none";
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.textContent = 'Merci ! Votre réservation a été reçue.';
  }
}

function validate(event) {
  // Initialisations
  initAddEventListenerModal();
  // On empêche le comportement par défaut
  event.preventDefault();
  // On récupère les champs du formulaire et effectue les validations
  manageForm();
  // On affiche le message de confirmation
  displayConfirmationMessage();
}