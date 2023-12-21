const table = document.querySelector('.table');

import drawTable from './drawTable.mjs'



const URL = 'http://localhost:5000/auth/'
const token = localStorage.getItem('token')

async function deleteTable(table) {
   while (table.rows.length > 0) {
      table.deleteRow(0);
   }
}

function disableButtons() {
   const editBtn = document.querySelectorAll('.users__edit-btn')
   const deleteButtons = document.querySelectorAll('.users__delete-btn');

   editBtn.forEach((e) => {
      e.disabled = true;
   });
   deleteButtons.forEach((e) => {
      e.disabled = true;
   });
}

function enableButtons() {
   const editBtn = document.querySelectorAll('.users__edit-btn')
   const deleteButtons = document.querySelectorAll('.users__delete-btn');

   editBtn.forEach((e) => {
      e.disabled = false;
   });
   deleteButtons.forEach((e) => {
      e.disabled = false;
   });
}

async function editBtnFn() {
   //РЕДАКТИРОВАНИЕ ПОЛЬЗОВАТЕЛЯ//
   const editBtn = document.querySelectorAll('.users__edit-btn')


   editBtn.forEach(btn => {

      const usernameStr = '' + btn.closest('tr').querySelector('span').textContent
      //Перебор и событие клика для них
      btn.addEventListener('click', (e) => {

         disableButtons()

         btn.classList.toggle('activeEdit')

         //Спан с текстовым содержимым username

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


async function changeName(parent, data) {

   parent.closest('tr').classList.add('table-active')

   //Из родительского блока, вместо спана с именем делаю инпут
   parent.innerHTML = `

   <div class="input-group">
   <input type="text" class="form-control edit-input" minlength="2" maxlength="20" value="${data}">
   <button class="btn btn-outline-secondary edit-enter" type="button"><i
         class="fa fa-check"></i></button>
   <button class="btn btn-outline-secondary edit-cancel" type="button"><i
         class="fa-solid fa-xmark"></i></button>
</div>
                     
`

   //Переменная кнопки, принять изменения
   let editAcceptBtn = document.querySelector('.edit-enter')
   //При применении изменений, в бд меняется значение username, и в parent вместо инпутов возвращается спан, также перерисовыется таблица, функциями deleteTable и getUsers
   editAcceptBtn.addEventListener('click', async () => {

      let inputValue = parent.querySelector('input').value
      const response = await axios.put(`${URL}edit`, { username: data, newName: inputValue })
      console.log(response.data);

      parent.innerHTML = `
      
      <td class="users__username"><span>${inputValue}</span></td>

      `

      parent.closest('tr').classList.remove('table-active')
      enableButtons()
      //Перерисовка таблицы
      deleteTable(table)
      getUsers()
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
   parent.closest('tr').classList.remove('table-active')
   parent.innerHTML = `
         
      <td class="users__username"><span>${data}</span></td>

      `
   enableButtons()
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



export { editBtnFn, deleteUser }