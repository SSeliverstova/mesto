import { openImage } from './index.js';

export class Card {
  constructor(templateSelector, name, link) {
    this._templateSelector = templateSelector;
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  createCard() {
    this._element = this._getTemplate();
    
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = 'тут должна быть картинка ' + this._name;
    this._element.querySelector('.element__text').textContent = this._name;
    
    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('element__like_active');
     });

    this._element.querySelector('.element__del').addEventListener('click', () => {
      this._element.remove();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      openImage(this._link, this._name);
      });
  }
}