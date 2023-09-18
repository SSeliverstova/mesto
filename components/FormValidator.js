export class FormValidator {
  constructor(selectors, formElement) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  
  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  };
  
  _checkInputValidity(inputElement) {
    const isInputValid = inputElement.validity.valid;
    const errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
    if(isInputValid) {
      this._hideInputError(inputElement, errorElement);
    } else {
      errorElement.textContent = inputElement.validationMessage;
      this._showInputError(inputElement, errorElement);
    }
  }

  _toggleButtonState(isActive) {
    if (isActive) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = 'disabled';
    }
  };
  
  
  _setEventListeners() {
    const inputList = this._formElement.querySelectorAll(this._inputSelector);
    this._toggleButtonState(this._formElement.checkValidity());
  
    [...inputList].forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState(this._formElement.checkValidity());
        this._checkInputValidity(inputElement);
      })
      
    })
  
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  }
  
  enableValidation() {
      this._setEventListeners();
  }

}