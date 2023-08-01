const popupElementEditProfile = document.querySelector('.popup__edit-profile');
const popupContainerEditProfile = popupElementEditProfile.querySelector('.popup__container');
const formElementEditProfile = popupElementEditProfile.querySelector('.popup__form');
let closeIconEditProfile = popupContainerEditProfile.querySelector('.popup__close-icon');
let infoIcon = document.querySelector('.info__edit-button');
let infoName = document.querySelector('.info__name');
let infoAbout = document.querySelector('.info__about');
let nameInput = formElementEditProfile.querySelector('.popup__field_type_name');
let jobInput = formElementEditProfile.querySelector('.popup__field_type_description');

const popupElementAddCards = document.querySelector('.popup__add-cards');
const popupContainerAddCards = popupElementAddCards.querySelector('.popup__container');
const formElementAddCards = popupElementAddCards.querySelector('.popup__form');
let closeIconAddCards = popupContainerAddCards.querySelector('.popup__close-icon');
const addButton = document.querySelector('.profile__add-button');
let nameCard = formElementAddCards.querySelector('.popup__field_type_card-name');
let linkCard = formElementAddCards.querySelector('.popup__field_type_card-link');

const popupElementPhoto = document.querySelector('.popup__photo');
const popupContainerPhoto = popupElementPhoto.querySelector('.popup__container');
let closeIconPhoto = popupContainerPhoto.querySelector('.popup__close-icon');
let photoName = popupContainerPhoto.querySelector('.popup__photo-name');
let photoImage = popupContainerPhoto.querySelector('.popup__image');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cards = document.querySelector('.elements');



function openPopup() {
  popupElementEditProfile.classList.add('popup_opened');
    nameInput.value = infoName.textContent;
    jobInput.value = infoAbout.textContent;
  }

function closePopup() {
  popupElementEditProfile.classList.remove('popup_opened');
  popupElementAddCards.classList.remove('popup_opened');
  popupElementPhoto.classList.remove('popup_opened');
  }

function addCard() {
  linkCard.value = ''; 
  nameCard.value = '';
  popupElementAddCards.classList.add('popup_opened');
}

addButton.addEventListener ('click', addCard);
infoIcon.addEventListener ('click', openPopup);
closeIconEditProfile.addEventListener ('click', closePopup);
closeIconAddCards.addEventListener ('click', closePopup);
closeIconPhoto.addEventListener ('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoAbout.textContent = jobInput.value;
  closePopup();
}

formElementEditProfile.addEventListener('submit', handleFormSubmit);

// like 


const createCard = (l, n) => {
  const cardTemplate = document.querySelector('.elements__template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const elementImage = cardElement.querySelector('.element__image');
  elementImage.src = l;
  cardElement.querySelector('.element__text').textContent = n;

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.preventDefault();
    evt.target.classList.toggle('element__like_active');
  });

  cardElement.querySelector('.element__del').addEventListener('click', function () {
    cardElement.remove();
  });

  elementImage.addEventListener('click', function(evt) {
    evt.preventDefault();
    const activeCard = evt.target.parentElement;
    const activeElement = activeCard.parentElement;
    const activeDescription = activeElement.querySelector('.element__rectangle');
    let activeImage = activeCard.querySelector('.element__image');
    let activeText = activeDescription.querySelector('.element__text');
    openImage(activeImage.src, activeText.textContent);
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
  popupElementPhoto.classList.add('popup_opened');
  photoImage.src = image;
  photoName.textContent = text;
}


