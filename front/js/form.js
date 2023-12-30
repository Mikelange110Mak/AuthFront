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


//  Функция смены формы с формы логина на регистрацию и наоборот
function changeForm(formActive, formDisabled) {
   formDisabled.classList.remove("active");
   formActive.classList.add("active");

   //  Визуал для того чтобы юзер точно понял, что форма поменялась
   let formInsideCarousel = formActive.querySelector('.form')
   formInsideCarousel.classList.add("backlight")
   setTimeout(() => {
      formInsideCarousel.classList.remove("backlight")
   }, 400);

}


//  Назначение функции смены формы, на кнопки
loginToRegisterBtn.addEventListener('click', () => {
   changeForm(blockRegister, blockAuth);
   loginState = false
   console.log(loginState);
});

registerToLoginBtn.addEventListener('click', () => {
   changeForm(blockAuth, blockRegister);
   loginState = true
   console.log(loginState);
});



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
   }

}

const registration = async () => {

   const data = fieldsData()

   try {
      const response = await axios.post(`${API_URL}registration`, data)
      console.log(response);
   } catch (error) {
      let errorStr = error.response.data.message
      let errorArr = error.response.data[0]
      console.log(errorStr || errorArr);
   }

}


loginGoBtn.addEventListener('click', () => {
   login()
})
registerGoBtn.addEventListener('click', () => {
   registration()
})


