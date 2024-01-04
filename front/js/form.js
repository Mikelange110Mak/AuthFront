//  Login Form Elements:
const loginForm = document.querySelector(".authForm"),
   loginUsernameInput = document.querySelector('#authLoginInput'),
   loginPasswordInput = document.querySelector('#authPasswordInput'),
   loginGoBtn = document.querySelector(".authForm__GoBtn-item"),
   loginToRegisterBtn = document.querySelector(".authForm__toReg-btn");


//  Register Form Elements:
const registerForm = document.querySelector(".registerForm"),
   registerUsernameInput = document.querySelector('#registerLoginInput'),
   registerPasswordInput = document.querySelector('#registerPasswordInput'),
   registerGoBtn = document.querySelector(".registerForm__GoBtn-item"),
   registerToLoginBtn = document.querySelector(".registerForm__toReg-btn");

//  Forms Carousel
const blockAuth = document.querySelector(".forms__auth"),
   blockRegister = document.querySelector(".forms__register");

let loginState = true
const API_URL = 'http://localhost:5000/auth/'
//---------------------------------------------------------------------------------------


//  ОСНОВНОЙ ФУНКЦИОНАЛ:


//  Назначение функции смены формы, на кнопки
loginToRegisterBtn.addEventListener('click', () => {
   changeForm(blockRegister, blockAuth);
   loginState = false
});

registerToLoginBtn.addEventListener('click', () => {
   changeForm(blockAuth, blockRegister);
   loginState = true
});



//  Функция входа в аккаунт
const login = async () => {

   const data = fieldsData()

   try {
      const response = await axios.post(`${API_URL}login`, data)
      const token = response.data.token

      localStorage.setItem('token', token)
      window.location.href = './front/users.html'



   } catch (error) {
      let errorStr = error.response.data.message
      let errorArr = error.response.data[0]
      console.log(errorStr || errorArr);
      messageErrorFn(errorStr || errorArr)
   }

}


//  Функция регистрации
const registration = async () => {

   const data = fieldsData()

   try {
      const response = await axios.post(`${API_URL}registration`, data)
      console.log(response);
   } catch (error) {
      let errorStr = error.response.data.message
      let errorArr = error.response.data[0]
      messageErrorFn(errorStr || errorArr)
   }

}


//  Вызов функций входа/регистрации на соответсвующие кнопки
loginGoBtn.addEventListener('click', () => {
   login()
})
registerGoBtn.addEventListener('click', () => {
   registration()
})

//---------------------------------------------------------------------------------------



// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ:

//  Данные с инпутов
const fieldsData = () => {
   let data

   if (loginState) {

      data = {
         username: loginUsernameInput.value,
         password: loginPasswordInput.value
      };

   } else {

      data = {
         username: registerUsernameInput.value,
         password: registerPasswordInput.value
      };

   }

   return data
}


//  Сообщение об ошибке, если пользователь ввел хуйню
const messageErrorFn = (errorMsg) => {

   const headerMessage = document.querySelector(".header")
   headerMessage.textContent = errorMsg
   headerMessage.classList.remove('hide')


   setTimeout(() => {
      headerMessage.classList.add('hide')
   }, 1800);

   //  Визуал для юзера, подсветка формы
   backlightFn('backlightError', 520)

}


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


//---------------------------------------------------------------------------------------