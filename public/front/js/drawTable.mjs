import { editBtnFn, deleteUser } from "./admin.js";
const drawTable = async (username, role) => {
   const table = document.querySelector('.table');
   const tbody = table.querySelector('tbody');

   const newRow = table.insertRow();
   const infoCell = newRow.insertCell(0);
   const roleCell = newRow.insertCell(1);
   const actionsCell = newRow.insertCell(2);


   infoCell.classList.add('users__username')
   roleCell.classList.add('role')
   actionsCell.classList.add('users__action-cnt')

   infoCell.innerHTML = `<span>${username}</span>`;
   roleCell.innerHTML = role;

   if (!role.includes('ADMIN')) {
      actionsCell.innerHTML = `
      
      <div class="btn-group btn-group-sm" role="group">
                              <button type="button" class="btn btn-danger users__delete-btn">Delete</button>
                              <button type="button" class="btn btn-warning users__edit-btn">Edit</button>
                           </div>
      `

   }
   if (role.includes('ADMIN')) {
      let adminTR = infoCell.closest('tr')
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