
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__error_visible'
}

function showInputError(inputElement, errorElement, selectors) {
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

function hideInputError(inputElement, errorElement, selectors) {
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

function checkInputValidity(formElement, inputElement, selectors) {
  const isInputValid = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if(isInputValid) {
    hideInputError(inputElement, errorElement, selectors);
  } else {
    errorElement.textContent = inputElement.validationMessage;
    showInputError(inputElement, errorElement, selectors);
  }
  console.log(errorElement)
}

function toggleButtonState(buttonElement, isActive, selectors) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(selectors.inactiveButtonClass);
  } else {
    buttonElement.classList.add(selectors.inactiveButtonClass);
    buttonElement.disabled = 'disabled';
  }
};


function setEventListeners(formElement, selectors) {
  const inputList = formElement.querySelectorAll(selectors.inputSelector);
  const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(buttonElement, formElement.checkValidity(), selectors);

  [...inputList].forEach(function(inputElement) {
    inputElement.addEventListener('input', function () {
      toggleButtonState(buttonElement, formElement.checkValidity(), selectors);
      checkInputValidity(formElement, inputElement, selectors);
    })
    
  })

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
}

function enableValidation(selectors) {
const formList = document.querySelectorAll(selectors.formSelector);
  [...formList].forEach(function(formElement) {
    setEventListeners(formElement, selectors);
  })
}

enableValidation(selectors);