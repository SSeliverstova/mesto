export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeIcon = this._popup.querySelector('.popup__close-icon');
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    //const esc = "Escape";
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeIcon.addEventListener('click', () => { this.close(); });
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        evt.preventDefault();
        this.close();
      }
      
    });
  }
}