// Находим форму в DOM
let formElement = document.querySelector('.popup');// Воспользуйтесь методом querySelector()
let closeIcon = formElement.querySelector('.popup__close-icon');
let submitButton = formElement.querySelector('.popup__submit-button');
let infoIcon = document.querySelector('.info__edit-button');
let infoName = document.querySelector('.info__name');
let infoAbout = document.querySelector('.info__about');
let nameInput = formElement.querySelector('.popup__field-name'); // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.popup__field-description');// Воспользуйтесь инструментом .querySelector()

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
// Находим поля формы в DOM



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.
  infoName.textContent = nameInput.value;
  infoAbout.textContent = jobInput.value;
    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);