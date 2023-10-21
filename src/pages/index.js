import './index.css';
import { Card } from '../components/Card.js';
import { initialCards } from '../utils/constants.js';
import { validationConfig } from '../utils/constants.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

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
const nameCard = formElementAddCards.querySelector('.popup__field_type_card-name');
const linkCard = formElementAddCards.querySelector('.popup__field_type_card-link');

// добавление 6 карточек по умолчанию

const popupElementPhoto = new PopupWithImage('.popup_type_photo');

const createNewCard = (title, link) => {
  const card = new Card({
    templateSelector : '.elements__template', 
    name : title, 
    link : link,
    handleCardClick : (name, link) => {
      popupElementPhoto.open(name, link)
  }});
  const cardElement = card.createCard();
  return cardElement;
}

const cardSection = new Section({
  renderer : (card) => {
    cardSection.addItem(createNewCard(card.name, card.link))
  }},
  '.elements'
)

cardSection.renderItems(initialCards);
popupElementPhoto.setEventListeners();

// включение валидации

const profileValidator = new FormValidator(validationConfig, formElementEditProfile);
const cardValidator = new FormValidator(validationConfig, formElementAddCards);

profileValidator.enableValidation();
cardValidator.enableValidation();

// создание попапа для редактирования профиля

const user = new UserInfo({
  nameSelector : '.info__name', 
  aboutSelector : '.info__about'
})

const popupEditProfile = new PopupWithForm({
  popupSelector : '.popup_type_edit-profile',
  submitCallback : (data) => {
   user.setUserInfo(data)
   popupEditProfile.close()
  }
});

infoIcon.addEventListener('click', () => {
  const info = user.getUserInfo();
  nameInput.value = info.name;
  jobInput.value = info.about;
  popupEditProfile.open()
 });

 popupEditProfile.setEventListeners()

// создание попапа для добавления карточки

const popupAddCards = new PopupWithForm({
  popupSelector : '.popup_type_add-cards',
  submitCallback : (data) => {
    data.title = nameCard.value
    data.link = linkCard.value;
    cardSection.addItem(createNewCard(data.title, data.link))
    popupAddCards.close();
  }
});

addButton.addEventListener('click', () => {
  popupAddCards.open();
  cardValidator.disableButton();
});

popupAddCards.setEventListeners()