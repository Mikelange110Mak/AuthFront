import { login, registration } from "./auth/auth.js";
import { changeForm, backlightFn, headerMessageFn } from "./ui.js";

//  Login Form Elements:

const loginUsernameInput = document.querySelector('#authLoginInput'),
   loginPasswordInput = document.querySelector('#authPasswordInput'),
   loginGoBtn = document.querySelector(".authForm__GoBtn-item"),
   loginToRegisterBtn = document.querySelector(".authForm__toReg-btn");


//  Register Form Elements:

const registerUsernameInput = document.querySelector('#registerLoginInput'),
   registerPasswordInput = document.querySelector('#registerPasswordInput'),
   registerGoBtn = document.querySelector(".registerForm__GoBtn-item"),
   registerToLoginBtn = document.querySelector(".registerForm__toReg-btn");

//  Forms Carousel
const blockAuth = document.querySelector(".forms__auth"),
   blockRegister = document.querySelector(".forms__register");

let loginState = true

//---------------------------------------------------------------------------------------

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

//  Назначение функции смены формы, на кнопки
loginToRegisterBtn.addEventListener('click', () => {
   changeForm(blockRegister, blockAuth);
   loginState = false
});

registerToLoginBtn.addEventListener('click', () => {
   changeForm(blockAuth, blockRegister);
   loginState = true
});


//  Вызов функций логина/регистрации на соответсвующих кнопках
loginGoBtn.addEventListener('click', () => {
   login(fieldsData, headerMessageFn)
})


registerGoBtn.addEventListener('click', async () => {
   const obj = {
      data: fieldsData,
      switchFormfn: changeForm,
      msgFN: headerMessageFn,
      inputUser: registerUsernameInput,
      inputPassword: registerPasswordInput,
      blockAuthForm: blockAuth,
      blockRegisterForm: blockRegister
   }

   await registration(obj)
})


//---------------------------------------------------------------------------------------




