const popupElement = document.querySelector('.popup');
const popupContainer = popupElement.querySelector('.popup__container');
const formElement = popupElement.querySelector('.popup__form');
let closeIcon = popupContainer.querySelector('.popup__close-icon');
let infoIcon = document.querySelector('.info__edit-button');
let infoName = document.querySelector('.info__name');
let infoAbout = document.querySelector('.info__about');
let nameInput = formElement.querySelector('.popup__field_type_name');
let jobInput = formElement.querySelector('.popup__field_type_description');

function openPopup() {
    popupElement.classList.add('popup_opened');
    nameInput.value = infoName.textContent;
    jobInput.value = infoAbout.textContent;
  }

function closePopup() {
    popupElement.classList.remove('popup_opened');
  }
  
infoIcon.addEventListener ('click', openPopup);
closeIcon.addEventListener ('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoAbout.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', handleFormSubmit);
