import './index.css';
import { Card } from '../components/Card.js';
import { validationConfig } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { Api } from '../Api.js';
import PopupForDel from '../components/PopupForDel.js';

const popupElementEditProfile = document.querySelector('.popup_type_edit-profile');
const popupContainerEditProfile = popupElementEditProfile.querySelector('.popup__container');
const formElementEditProfile = popupContainerEditProfile.querySelector('.popup__form');
const nameInput = formElementEditProfile.querySelector('.popup__field_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__field_type_description');
const infoIcon = document.querySelector('.info__edit-button');

const popupElementAddCards = document.querySelector('.popup_type_add-cards');
const popupContainerAddCards = popupElementAddCards.querySelector('.popup__container');
const formElementAddCards = popupContainerAddCards.querySelector('.popup__form');
const addButton = document.querySelector('.profile__add-button');

const popupElementChangeAvatar = document.querySelector('.popup_type_change-avatar');
const popupContainerChangeAvatar = popupElementChangeAvatar.querySelector('.popup__container');
const formElementChangeAvatar = popupContainerChangeAvatar.querySelector('.popup__form');
const avatarInput = formElementChangeAvatar.querySelector('.popup__field_type_card-link');
const editAvatarButton = document.querySelector('.profile__avatar-icon');
const myAvatar = document.querySelector('.profile__avatar');
const myName = document.querySelector('.info__name');
const myAbout = document.querySelector('.info__about');

// api

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-77',
  headers: {
    authorization: 'aea253f1-651e-4ec4-8b76-acdf151ba0f8',
    'Content-Type': 'application/json'
  }
});

// добавление 6 карточек по умолчанию

let userId

Promise.all([api.getUser(), api.getInitialCards()])
  .then(([userData, cards]) => {
    user.setUserInfo(cards)
    userId = userData._id
    myAvatar.src = userData.avatar
    myName.textContent = userData.name
    myAbout.textContent = userData.about
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  }); 
    
  const user = new UserInfo({
    nameSelector : '.info__name', 
    aboutSelector : '.info__about',
    avatarSelector : '.profile__avatar'
  })
  
const popupElementPhoto = new PopupWithImage('.popup_type_photo');

const createNewCard = (data) => {
  
  const card = new Card({
    templateSelector : '.elements__template', 
    data : data,
    userId : userId,
    handleCardClick : (name, link) => {
      popupElementPhoto.open(name, link)
    },
    handleDelete : (id) => {
      console.log(id);
      popupDelCard.open();
      popupDelCard.deleteCallback(() => {
        api.deleteCard(id)
        .then(() => { 
          card.deleteElement()
          popupDelCard.close()
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      })
    },

    addLike : (cardId) => {
      console.log(cardId)
      api.putLike(cardId)
      .then((data) => {
        card.handleLikeCard(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    },

    removeLike : (cardId) => {
      console.log(cardId)
      api.deleteLike(cardId)
      .then((data) => {
        card.handleLikeCard(data)
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    }
  });

  const cardElement = card.createCard();
  return cardElement;
}

const cardSection = new Section({
  renderer : (card) => {
    cardSection.addItem(createNewCard(card))
  }},
  '.elements'
)

  // создание попапа для удаления карточки
  const popupDelCard = new PopupForDel({
    popupSelector : '.popup_type_delete-card'
  });
 
popupDelCard.setEventListeners()
popupElementPhoto.setEventListeners();

// включение валидации

const profileValidator = new FormValidator(validationConfig, formElementEditProfile);
const cardValidator = new FormValidator(validationConfig, formElementAddCards);

profileValidator.enableValidation();
cardValidator.enableValidation();

// создание попапа для редактирования профиля

const popupEditProfile = new PopupWithForm({
  popupSelector : '.popup_type_edit-profile',
  submitCallback : (data) => {
    popupEditProfile.loading(true)
    api.editProfile(data)
    .then((newProfile) => {
      user.setUserInfo(newProfile)
      popupEditProfile.close()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfile.loading(false)
    })
  }
});

infoIcon.addEventListener('click', () => {
  const info = user.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  popupEditProfile.open()
 });

 popupEditProfile.setEventListeners()

 const popupEditAvatar = new PopupWithForm({
  popupSelector : '.popup_type_change-avatar',
  submitCallback : (data) => {
    popupEditAvatar.loading(true)
    api.editAvatar(data)
    .then((newAvatar) => {
      user.setUserInfo(newAvatar)
      popupEditAvatar.close()
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditAvatar.loading(false)
    })
  }
});

editAvatarButton.addEventListener('click', () => {
  const info = user.getUserInfo();
  avatarInput.value = info.avatar;
  popupEditAvatar.open()
 });

popupEditAvatar.setEventListeners()

// создание попапа для добавления карточки

const popupAddCards = new PopupWithForm({
  popupSelector : '.popup_type_add-cards',
  submitCallback : (data) => {
    popupAddCards.loading(true)
    api.addNewCard(data)
      .then((newCard) => {
        cardSection.addItem(createNewCard(newCard))
        popupAddCards.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddCards.loading(false)
      })
  }
});

addButton.addEventListener('click', () => {
  popupAddCards.open();
  cardValidator.disableButton();
});

popupAddCards.setEventListeners()



