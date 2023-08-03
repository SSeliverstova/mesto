const popupElement = document.querySelector('.popup');
const popupElementEditProfile = document.querySelector('.popup_type_edit-profile');
const popupContainerEditProfile = popupElementEditProfile.querySelector('.popup__container');
const formElementEditProfile = popupElementEditProfile.querySelector('.popup__form');
const closeIconEditProfile = popupContainerEditProfile.querySelector('.popup__close-icon');
const infoIcon = document.querySelector('.info__edit-button');
let infoName = document.querySelector('.info__name');
let infoAbout = document.querySelector('.info__about');
let nameInput = formElementEditProfile.querySelector('.popup__field_type_name');
let jobInput = formElementEditProfile.querySelector('.popup__field_type_description');

const popupElementAddCards = document.querySelector('.popup_type_add-cards');
const popupContainerAddCards = popupElementAddCards.querySelector('.popup__container');
const formElementAddCards = popupElementAddCards.querySelector('.popup__form');
const closeIconAddCards = popupContainerAddCards.querySelector('.popup__close-icon');
const addButton = document.querySelector('.profile__add-button');
let nameCard = formElementAddCards.querySelector('.popup__field_type_card-name');
let linkCard = formElementAddCards.querySelector('.popup__field_type_card-link');

const popupElementPhoto = document.querySelector('.popup_type_photo');
const popupContainerPhoto = popupElementPhoto.querySelector('.popup__container');
const closeIconPhoto = popupContainerPhoto.querySelector('.popup__close-icon');
let photoName = popupContainerPhoto.querySelector('.popup__photo-name');
let photoImage = popupContainerPhoto.querySelector('.popup__image');


const cards = document.querySelector('.elements');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup() {
  document.querySelector('.popup_opened').classList.remove('popup_opened');
}

function editProfile() {
  openPopup(popupElementEditProfile);
  nameInput.value = infoName.textContent;
  jobInput.value = infoAbout.textContent;
  }

function addCard() {
  formElementAddCards.reset();
  openPopup(popupElementAddCards);
}

addButton.addEventListener ('click', addCard);
infoIcon.addEventListener ('click', editProfile);
closeIconEditProfile.addEventListener ('click', closePopup);
closeIconAddCards.addEventListener ('click', closePopup);
closeIconPhoto.addEventListener ('click', closePopup);

function renameProfile (evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoAbout.textContent = jobInput.value;
  closePopup();
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
  closePopup();

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


