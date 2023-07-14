const formElement = document.querySelector('.popup');
let closeIcon = formElement.querySelector('.popup__close-icon');
let submitButton = formElement.querySelector('.popup__submit-button');
let infoIcon = document.querySelector('.info__edit-button');
let infoName = document.querySelector('.info__name');
let infoAbout = document.querySelector('.info__about');
let nameInput = formElement.querySelector('.popup__field-name');
let jobInput = formElement.querySelector('.popup__field-description');

function openPopup() {
    formElement.classList.add('popup_opened');
    nameInput.value = infoName.textContent;
    jobInput.value = infoAbout.textContent;
  }

function closePopup() {
    formElement.classList.remove('popup_opened');
  }
  
function enterPopup(e) {
  if (e.keyCode === 13) {
    formElement.classList.remove('popup_opened');
    infoName.textContent = nameInput.value;
    infoAbout.textContent = jobInput.value;
    }
  }

function savePopup() {
    formElement.classList.remove('popup_opened');
    infoName.textContent = nameInput.value;
    infoAbout.textContent = jobInput.value;
  }
  
infoIcon.addEventListener ('click', openPopup);
closeIcon.addEventListener ('click', closePopup);
submitButton.addEventListener ('click', savePopup);
nameInput.addEventListener ('keyup', enterPopup);
jobInput.addEventListener ('keyup', enterPopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  infoName.textContent = nameInput.value;
  infoAbout.textContent = jobInput.value;
}

formElement.addEventListener('submit', handleFormSubmit);