import { editBtnFn, deleteUser } from "./admin.js";

const drawTable = async (username, role) => {
   const table = document.querySelector('.table');
   const tbody = table.querySelector('tbody');

   const newRow = table.insertRow();
   console.log(newRow);
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
   if (role.includes('ADMIN')) {
      let adminTR = cell1.closest('tr')
      adminTR.classList.add('table-danger')
   }




   await deleteUser()

   editBtnFn()

   if (role.includes('ADMIN')) {
      const titleRow = tbody.querySelector('.users__table-title');
      if (titleRow) {
         tbody.insertBefore(newRow, titleRow.nextSibling);
      } else {
         tbody.insertBefore(newRow, tbody.firstChild);
      }
   }

}



export default drawTable