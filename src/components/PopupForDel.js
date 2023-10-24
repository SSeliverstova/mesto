import Popup from "./Popup.js"

export default class PopupForDel extends Popup {
  constructor({popupSelector}) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  deleteCallback(request) {
    this._request = request;
  }

  setEventListeners() {
    console.log(this._form)
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._request();
    });
  }

}