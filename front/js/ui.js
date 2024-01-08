
//  Функция смены формы с формы логина на регистрацию и наоборот
function changeForm(formActive, formDisabled) {
   formDisabled.classList.remove("active");
   formActive.classList.add("active");

   //  Визуал для юзера, подсветка формы
   backlightFn('backlight', 400)
}


//  Функция подсветки формы, используется при свитче форм с логина на вход или подсветить мол ошибка
function backlightFn(cssClass, time) {

   const carouselInner = document.querySelector('.carousel-inner');
   let activeDiv = carouselInner.querySelector('.active');
   let formDiv = activeDiv.querySelector('.form');

   formDiv.classList.add(`${cssClass}`)
   setTimeout(() => {
      formDiv.classList.remove(`${cssClass}`)
   }, time);

}

//  Сообщение в header, если пользователь ввел хуйню - следует добавить параметр error
const headerMessageFn = (msg, cssClass, time, error) => {

   const headerMessage = document.querySelector(".header")
   headerMessage.textContent = msg
   headerMessage.classList.remove('hide')

   if (!error) {
      headerMessage.style.borderColor = '#297a2f'
      headerMessage.style.backgroundColor = '#297a2f'

      setTimeout(() => {
         headerMessage.style.borderColor = '#7a0808'
         headerMessage.style.backgroundColor = '#7a0808'
      }, time);
   }

   setTimeout(() => {
      headerMessage.classList.add('hide')
   }, 1800);

   //  Визуал для юзера, подсветка формы
   backlightFn(`${cssClass}`, time)

}

export { changeForm, backlightFn, headerMessageFn }
