const submitBtn = document.querySelector(".auth__submit")
const registerBtn = document.querySelector(".auth__reg-button")
const authTitle = document.querySelector(".auth__title")
const label = document.querySelector('.auth__label-state')
const msgError = document.querySelector('.auth__error-state')
const URL = 'http://localhost:5000/auth/'
let loginState = true

const fieldsData = () => {
   const usernameInputData = document.querySelector(".auth__username").value
   let passwordInputData = document.querySelector(".auth__password").value

   const data = {
      username: usernameInputData,
      password: passwordInputData
   };
   return data;
}

function changeState() {
   if (registerBtn.classList.contains('registerClass')) {
      loginState = false
      submitBtn.textContent = 'Registration'
      authTitle.textContent = 'Registartion'
      label.textContent = 'Already have an account'
      registerBtn.textContent = 'Log in'
   } else {
      loginState = true
      submitBtn.textContent = 'Go!'
      authTitle.textContent = 'Log in'
      label.textContent = "Don't have an account?"
      registerBtn.textContent = 'Register'
   }
}

function messageError(e) {
   msgError.classList.add('errorState')
   msgError.textContent = e

}

registerBtn.addEventListener('click', () => {
   registerBtn.classList.toggle('registerClass')
   changeState()
})


const registration = async () => {

   const data = fieldsData()

   try {
      const response = await axios.post(`${URL}registration`, data)
      console.log(response);
   } catch (error) {
      let errorStr = error.response.data.message
      let errorArr = error.response.data[0]
      messageError(errorStr || errorArr)
   }

}

const login = async () => {

   const data = fieldsData()

   try {
      const response = await axios.post(`${URL}login`, data)
      const token = response.data.token
      console.log(token);

   } catch (error) {
      let errorStr = error.response.data.message
      let errorArr = error.response.data[0]
      messageError(errorStr || errorArr)
   }

}

submitBtn.addEventListener('click', () => {

   if (loginState === false) registration()
   else login()
})








