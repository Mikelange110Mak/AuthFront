const API_URL = 'http://localhost:5000/auth/'



const login = async (dataFn, msgFN) => {

   const data = dataFn()

   try {
      const response = await axios.post(`${API_URL}login`, data)
      const token = response.data.token

      localStorage.setItem('token', token)
      window.location.href = './front/users.html'



   } catch (error) {
      let errorStr = error.response.data.message
      let errorArr = error.response.data[0]
      console.log(errorStr || errorArr);
      msgFN(errorStr || errorArr, 'backlightError', 400, error)
   }

}


//  Функция регистрации
const registration = async (obj) => {

   const { data, switchFormfn, msgFN, inputUser, inputPassword, blockAuthForm, blockRegisterForm } = obj;


   try {
      const response = await axios.post(`${API_URL}registration`, data());
      console.log(response.data);

      // Сообщение об успешной регистрации
      msgFN(response.data, 'backlight', 2000);

      // Очистка инпутов
      inputUser.value = '';
      inputPassword.value = '';

      // Смена формы
      switchFormfn(blockAuthForm, blockRegisterForm);

   } catch (error) {
      console.log(error);
      let errorStr = error.response.data.message;
      let errorArr = error.response.data[0];
      msgFN(errorStr || errorArr, 'backlightError', 400, error);
   }

}
export { login, registration }











