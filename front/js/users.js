const API_URL = 'http://localhost:5000/auth/'
const token = localStorage.getItem('token')

const usernameBtn = document.querySelector('.navbar__account-btn'),
   userRole = document.querySelector('.navbar__account-role'),
   userLogoutBtn = document.querySelector('.navbar__account-exit')


//  Функция указания юзернейма в личном кабинете, ну и ее роли соответственно
function postUsername(username, roleArr) {
   usernameBtn.textContent = username

   let rolesStr = 'Роль : '
   roleArr.forEach(e => {
      let editRole = e + ' '
      rolesStr += editRole
   });
   userRole.textContent = rolesStr
}

//  Тут все просто, если логинится челик с ролью ADMIN, то его перебрасывает на страницу админ панели
const getData = async () => {

   const response = await axios.get(`${API_URL}content`,
      {
         headers:
            { Authorization: `Bearer ${token}` }
      }
   );
   let contentData = response.data.contentData
   console.log(contentData);
   if (contentData.user.roles.includes("ADMIN")) window.location.href = './admin.html'
   else postUsername(contentData.user.username, contentData.user.roles)

   console.log(contentData.user.roles[0]);

   console.log(localStorage);
}
getData()

//  Выход с аккича, подтереть токен из локалстореджа
const logOut = () => {
   window.location.href = 'http://localhost:8080/'
   localStorage.clear();
   console.log(localStorage);
}
userLogoutBtn.addEventListener('click', logOut)

