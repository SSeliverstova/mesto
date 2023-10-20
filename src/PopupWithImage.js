import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._photoImage = this._popup.querySelector('.popup__image');
    this._photoName = this._popup.querySelector('.popup__photo-name');
  }

  open(image, text) {
    super.open();
    this._photoImage.src = image;
    this._photoImage.alt = 'тут должна быть картинка ' + text;
    this._photoName.textContent = text;
  }

}