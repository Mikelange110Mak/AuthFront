const usernameSpan = document.querySelector('.account__username')
const userRoleSpan = document.querySelector('.account__user-roles')
const logoutBtn = document.querySelector('.account__exit')

const URL = 'http://localhost:5000/auth/'
const token = localStorage.getItem('token')


function postUsername(username, roleArr) {
   usernameSpan.textContent = username

   let rolesStr = ''
   roleArr.forEach(e => {
      let editRole = e + ' '
      rolesStr += editRole
   });
   userRoleSpan.textContent = rolesStr
}


const getData = async () => {

   const response = await axios.get(`${URL}content`,
      {
         headers:
            { Authorization: `Bearer ${token}` }
      }
   );
   let contentData = response.data.contentData

   if (contentData.user.roles.includes("ADMIN")) window.location.href = './admin.html'
   else postUsername(contentData.user.username, contentData.user.roles)

   console.log(contentData.user.roles[0]);

   console.log(localStorage);
}
getData()
const logOut = () => {
   window.location.href = 'http://localhost:8080/'
   localStorage.clear();
   console.log(localStorage);
}
logoutBtn.addEventListener('click', logOut)

