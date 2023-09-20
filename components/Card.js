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
    this._elementImage = this._element.querySelector('.element__image');
    this._elementText = this._element.querySelector('.element__text');
    
    this._elementImage.src = this._link;
    this._elementImage.alt = 'тут должна быть картинка ' + this._name;
    this._elementText.textContent = this._name;
    
    this._setEventListeners();

    return this._element;
  }

  _handleLikeCard() {
   this._elementLike.classList.toggle('element__like_active');
  }

  _deleteElement() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDel = this._element.querySelector('.element__del');

    this._elementLike.addEventListener('click', () => {this._handleLikeCard();});
    this._elementDel.addEventListener('click', () => {this._deleteElement()});
    this._elementImage.addEventListener('click', () => {openImage(this._link, this._name);});
  }
}