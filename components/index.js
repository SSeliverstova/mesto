import { Card } from './Card.js';
import { initialCards } from './constants.js';
import { validationConfig } from './constants.js';
import { FormValidator } from './FormValidator.js';

const popupList = document.querySelectorAll('.popup');
const popups = [...popupList];
const formList = document.querySelectorAll('.popup__form');
const forms = [...formList];
const cardsContainer = document.querySelector('.elements');

const popupElementEditProfile = document.querySelector('.popup_type_edit-profile');
const popupContainerEditProfile = popupElementEditProfile.querySelector('.popup__container');
const formElementEditProfile = popupElementEditProfile.querySelector('.popup__form');
const closeIconEditProfile = popupContainerEditProfile.querySelector('.popup__close-icon');
const infoIcon = document.querySelector('.info__edit-button');
const infoName = document.querySelector('.info__name');
const infoAbout = document.querySelector('.info__about');
const nameInput = formElementEditProfile.querySelector('.popup__field_type_name');
const jobInput = formElementEditProfile.querySelector('.popup__field_type_description');

const popupElementAddCards = document.querySelector('.popup_type_add-cards');
const popupContainerAddCards = popupElementAddCards.querySelector('.popup__container');
const formElementAddCards = popupElementAddCards.querySelector('.popup__form');
const closeIconAddCards = popupContainerAddCards.querySelector('.popup__close-icon');
const addButton = document.querySelector('.profile__add-button');
const nameCard = formElementAddCards.querySelector('.popup__field_type_card-name');
const linkCard = formElementAddCards.querySelector('.popup__field_type_card-link');

const popupElementPhoto = document.querySelector('.popup_type_photo');
const popupContainerPhoto = popupElementPhoto.querySelector('.popup__container');
const closeIconPhoto = popupContainerPhoto.querySelector('.popup__close-icon');
const photoName = popupContainerPhoto.querySelector('.popup__photo-name');
const photoImage = popupContainerPhoto.querySelector('.popup__image');

const esc = "Escape";

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEsc);
}

function openEditProfilePopup() {
  openPopup(popupElementEditProfile);
  nameInput.value = infoName.textContent;
  jobInput.value = infoAbout.textContent;
}

function openAddCardPopup() {
  formElementAddCards.reset();
  openPopup(popupElementAddCards);
  const form = new FormValidator(validationConfig, formElementAddCards);
  form.disableButton();
}

function renameProfile (evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoAbout.textContent = jobInput.value;
  closePopup(popupElementEditProfile);
}

function createNewCard(title, link) {
  const card = new Card('.elements__template', title, link);
  const cardElement = card.createCard();
  return cardElement;
}

// открытие картинки

export function openImage (image, text) {
  openPopup(popupElementPhoto);
  photoImage.src = image;
  photoImage.alt = 'тут должна быть картинка ' + text;
  photoName.textContent = text;
}

// закрытие попапов по escape

function closeByEsc(evt) {
  if (evt.key === esc) {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

addButton.addEventListener ('click', openAddCardPopup);
infoIcon.addEventListener ('click', openEditProfilePopup);
closeIconEditProfile.addEventListener ('click', () => { closePopup(popupElementEditProfile) });
closeIconAddCards.addEventListener ('click', () => { closePopup(popupElementAddCards) });
closeIconPhoto.addEventListener ('click', () => { closePopup(popupElementPhoto) });
formElementEditProfile.addEventListener('submit', renameProfile);

// добавление карточки по кнопке

formElementAddCards.addEventListener('submit', function(evt) {
  evt.preventDefault();
  cardsContainer.prepend(createNewCard(nameCard.value, linkCard.value));
  closePopup(popupElementAddCards);
});

// добавление 6 карточек по умолчанию

initialCards.forEach((item) => {
  cardsContainer.prepend(createNewCard(item.name, item.link));
}); 

// закрытие попапов по оверлэй

popups.forEach(function(popupElement) {
  popupElement.addEventListener('mousedown', function(evt) {
    if (evt.target === popupElement) {
      evt.preventDefault();
      closePopup(popupElement);
    }
  });
})

// включение валидации

forms.forEach((formElement) => {
  const form = new FormValidator(validationConfig, formElement);
  form.enableValidation();
})


