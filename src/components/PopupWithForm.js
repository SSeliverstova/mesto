import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor({popupSelector, submitCallback}) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__field');
    this._submitButton = this._form.querySelectorAll('.popup__submit-button');
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    console.log(this._inputValues);
    console.log(this._form)
    return this._inputValues;
  }

  setEventListeners() {
    console.log(this._form)
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  loading(isLoading) {
    console.log(this._submitButton.textContent)
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...'
      console.log(this._submitButton.textContent)
    } else {
      this._submitButton.textContent = this._submitButton.textContent
      console.log(this._submitButton.textContent)
    }
  }
}