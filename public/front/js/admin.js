const table = document.querySelector('table');



const URL = 'http://localhost:5000/auth/'
const token = localStorage.getItem('token')

async function drawTable(username, role) {
   const newRow = table.insertRow();
   const cell1 = newRow.insertCell(0);
   const cell2 = newRow.insertCell(1);
   const cell3 = newRow.insertCell(2);
   const cell4 = newRow.insertCell(3);


   cell1.classList.add('users__username')
   cell2.classList.add('role')
   cell3.classList.add('users__action-cnt')

   cell1.innerHTML = `<span>${username}</span>`;
   cell2.innerHTML = role;

   if (!role.includes('ADMIN')) {
      cell3.innerHTML = `
      
      <button class="users__delete-btn">Delete</button>

      `
      cell4.innerHTML = `
      
      <button class="users__edit-btn">Edit</button>

      `

   }


   await deleteUser()




   const editBtn = document.querySelectorAll('.users__edit-btn')
   editBtn.forEach(btn => {
      btn.addEventListener('click', (e) => {

         let changeState = false
         const usernameStr = btn.closest('tr').querySelector('span').textContent
         let usernameElement = btn.closest('tr').querySelector('.users__username')

         console.log(usernameStr);
         //if (usernameStr.length <= 20) changeName(usernameElement, usernameStr)
         //else console.log('no');
         changeName(usernameElement, usernameStr)
      })


   })


}

function changeName(parent, data) {




   parent.innerHTML = `

<input class="edit-input" minlength="2" maxlength="20" type="text"
                           value="${data}">
                        <button class="edit-enter" type="submit"><i class="fa fa-check"></i></button>
                        <button class="edit-cancel" type="submit"><i class="fa-solid fa-xmark"></i></button>
                     

`



   let editAcceptBtn = document.querySelector('.edit-enter')


   editAcceptBtn.addEventListener('click', async () => {

      let inputValue = parent.querySelector('input').value
      const response = await axios.put(`${URL}edit`, { username: data, newName: inputValue })
      console.log(response.data);

      parent.innerHTML = `
      
      <td class="users__username"><span>${inputValue}</span></td>

      `

   })

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


function animationTable(btn) {
   let parentTR = btn.closest('tr');
   parentTR.classList.add('check')
   setTimeout(() => {
      parentTR.remove()
   }, 400);
}

const removeFromDb = async (user) => {

   const response = await axios.delete(`${URL}delete-user`, { data: user })
   console.log(response);
}



async function deleteUser() {

   const deleteBtn = document.querySelectorAll('.users__delete-btn')
   deleteBtn.forEach(btn => {
      btn.addEventListener('click', function () {
         let username = this.closest('tr').querySelector('.users__username').textContent;

         animationTable(btn)
         removeFromDb({ username })
      })
   })

}



