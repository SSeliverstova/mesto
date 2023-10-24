export class Card {
  constructor({templateSelector, data, userId, handleCardClick, handleDelete, addLike, removeLike}) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._handleCardClick = handleCardClick;
    this._handleDelete = handleDelete;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._likes = data.likes;
    this._userId = userId;
    this._ownerId = data.owner._id;
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
    this._countLikes = this._element.querySelector('.element__like-count');
    this._countLikes.textContent = this._likes.length;
    this._elementImage = this._element.querySelector('.element__image');
    this._elementText = this._element.querySelector('.element__text');
    this._elementLike = this._element.querySelector('.element__like');
    this._elementDel = this._element.querySelector('.element__del');
    this._elementImage.src = this._link;
    this._elementImage.alt = 'тут должна быть картинка ' + this._name;
    this._elementText.textContent = this._name;
    
    this._setEventListeners();
    this._removeDelIcon();
    this._isOwnerLike();

    return this._element;
  }

  handleLikeCard(data) {
    console.log(data)
    console.log(this._likes.length)
    console.log(this._countLikes.textContent)
    this._likes = data.likes;
    this._countLikes.textContent = this._likes.length;
    console.log(this._countLikes.textContent)
    this._elementLike.classList.toggle('element__like_active');
  }

  deleteElement() {
    this._element.remove();
    this._element = null;
  }
    

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      //console.log(this._elementLike)
      if(this._elementLike.classList.contains('element__like_active')) {
        this._removeLike(this._id);
      } else {
        this._addLike(this._id);
      }
    });
    this._elementDel.addEventListener('click', () => {this._handleDelete(this._id);});
    this._elementImage.addEventListener('click', () => {this._handleCardClick(this._link, this._name);});
  }

  _removeDelIcon() {
    if (this._userId !== this._ownerId) {
      this._elementDel.remove();
    }
  }

  _isOwnerLike() {
    if (this._likes.some((user) => {
      return this._userId === user._id 
    }))
      {
      this._elementLike.classList.add('element__like_active');
    }
  }
}

