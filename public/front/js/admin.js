const table = document.querySelector('table');

const URL = 'http://localhost:5000/auth/'
const token = localStorage.getItem('token')

function drawTable(username, role) {
   const newRow = table.insertRow();
   const cell1 = newRow.insertCell(0);
   const cell2 = newRow.insertCell(1);
   cell2.classList.add('role')

   cell1.innerHTML = username;
   cell2.innerHTML = role;

}


const getUsers = async () => {

   const response = await axios.get(`${URL}users`, {
      headers:
         { Authorization: `Bearer ${token}` }
   })

   console.log(response.data);
   let usersArr = response.data.adminData.users

   usersArr.forEach(user => {
      drawTable(user.username, user.roles[0]);
   });

}
getUsers()