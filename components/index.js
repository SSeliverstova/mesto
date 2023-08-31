const popupList = document.querySelectorAll('.popup');
const popups = [...popupList];
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
const submitButton = formElementAddCards.querySelector('.popup__submit-button');

const popupElementPhoto = document.querySelector('.popup_type_photo');
const popupContainerPhoto = popupElementPhoto.querySelector('.popup__container');
const closeIconPhoto = popupContainerPhoto.querySelector('.popup__close-icon');
const photoName = popupContainerPhoto.querySelector('.popup__photo-name');
const photoImage = popupContainerPhoto.querySelector('.popup__image');

const codeEsc = 27;

const cards = document.querySelector('.elements');

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', closeByEsc(popup));
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', closeByEsc(popup));
}

function editProfile() {
  openPopup(popupElementEditProfile);
  nameInput.value = infoName.textContent;
  jobInput.value = infoAbout.textContent;
  }

function addCard() {
  formElementAddCards.reset();
  openPopup(popupElementAddCards);
  submitButton.classList.add('popup__submit-button_disabled');
  submitButton.disabled = 'disabled';
}

addButton.addEventListener ('click', addCard);
infoIcon.addEventListener ('click', editProfile);
closeIconEditProfile.addEventListener ('click', () => { closePopup(popupElementEditProfile) });
closeIconAddCards.addEventListener ('click', () => { closePopup(popupElementAddCards) });
closeIconPhoto.addEventListener ('click', () => { closePopup(popupElementPhoto) });

function renameProfile (evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoAbout.textContent = jobInput.value;
  closePopup(popupElementEditProfile);
}

formElementEditProfile.addEventListener('submit', renameProfile);

// like 


const createCard = (link, name) => {
  const cardTemplate = document.querySelector('.elements__template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  elementImage.src = link;
  elementImage.alt = 'тут должна быть картинка ' + name;
  cardElement.querySelector('.element__text').textContent = name;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__del').addEventListener('click', function () {
    cardElement.remove();
  });

  elementImage.addEventListener('click', function() {
   openImage(link, name);
  });

  return cardElement;
}

formElementAddCards.addEventListener('submit', function(evt) {
  evt.preventDefault();
  cards.prepend(createCard(linkCard.value, nameCard.value));
  closePopup(popupElementAddCards);

});

initialCards.forEach((item) => {
  cards.prepend(createCard(item.link, item.name));
})

// открытие картинки

function openImage (image, text) {
  openPopup(popupElementPhoto);
  photoImage.src = image;
  photoImage.alt = 'тут должна быть картинка ' + text;
  photoName.textContent = text;
}

// закрытие попапов по оверлэй

popups.forEach(function(popupElement) {
  popupElement.addEventListener('mousedown', function(evt) {
    if (evt.target == popupElement) {
      evt.preventDefault();
      closePopup(popupElement);
    }
  });
})

// закрытие попапов по escape

function closeByEsc(popup) {
  return function(evt) {
    if (evt.keyCode == codeEsc) {
      closePopup(popup);
    }
  }
};