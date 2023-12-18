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



   //РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ//

   //Желтые кнопки Edit
   const editBtn = document.querySelectorAll('.users__edit-btn')
   editBtn.forEach(btn => {
      //Перебор и событие клика для них
      btn.addEventListener('click', (e) => {

         btn.classList.toggle('activeEdit')

         //Спан с текстовым содержимым username
         const usernameStr = btn.closest('tr').querySelector('span').textContent
         console.log(usernameStr);
         //Родительский блок в котором по задумке будет не спан, а поле инпута, и кнопка принять и отклонить изменения
         let usernameElement = btn.closest('tr').querySelector('.users__username')

         //Вызов дальнейшей функции смены имени
         changeName(usernameElement, usernameStr)
         cancelEditUser(usernameElement, usernameStr)

         //дописать, исправить ошибку на 53 строке
         if (btn.classList.contains('activeEdit')) console.log('nnoou');
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

function cancelEditUser(parent, data) {

   //ОТМЕНА РЕДАКТИРОВАНИЯ//

   //Переменная таблицы (для клика по пустой области и отмены)
   const usersTable = document.querySelector('.users')

   //Переменная кнопки отмены
   const cancelEditBtn = document.querySelector('.edit-cancel')

   //Событие клика для пустой области (не по форме) вызывает функцию отмены изменений
   document.addEventListener('click', (e) => {
      if (!usersTable.contains(e.target)) cancelEditFn(parent, data)
   })

   //Событие клика для кнопки отмены вызывает функцию отмены изменений 
   cancelEditBtn.addEventListener('click', () => {
      cancelEditFn(parent, data)
   })

}

//ФУНКЦИЯ ОТМЕНЫ РЕДАКТИРОВАНИЯ
function cancelEditFn(parent, data) {
   parent.innerHTML = `
         
      <td class="users__username"><span>${data}</span></td>

      `
}

const getUsers = async () => {

   const response = await axios.get(`${URL}users`, {
      headers:
         { Authorization: `Bearer ${token}` }
   })

   console.log(response.data);
   let usersArr = response.data.adminData.users

   await usersArr.forEach(user => {
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



