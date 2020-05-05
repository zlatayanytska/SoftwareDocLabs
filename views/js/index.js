// Utils
const getById = (id) => document.getElementById(id);

let allUsers = [];
let isInEditMode = false;

// Main elements
let addButton = getById("add-button");

const userListContainer = getById("users-list");

// Form input elements
const first_nameInput = getById("first_name");
const last_nameInput = getById("last_name");
const age = getById("age");
const emailInput = getById("email");


const renderItem = (values) => {
  return `
        <tr class="user-item">
          <th scope="row">${values.id}</th>
          <td class="bg-danger">${values.first_name}</td>
          <td class="bg-danger">${values.last_name}</td>
          <td class="bg-danger">${values.age}</td>
           <td class="bg-danger">${values.email}</td>
           <td>
                <button type="button" class="btn btn-success" onClick="onItemEditClick('${values.id}')">Edit</button>
                <button type="button" class="btn btn-danger" onClick="onItemDeleteClick('${values.id}')">Delete</button>
            </td>
        </tr>
  `;
};

const clearInputs = () => {
  first_nameInput.value = "";
  last_nameInput.value = "";
  age.value = "";
  emailInput.value = "";
};

const clearContainer = () => {
  userListContainer.innerHTML = "";
};

const renderAllItems = async () => {
  clearContainer();

  const users = await Api.fetchAllUsers();

  allUsers = users;

  users.forEach((agent) => {
    userListContainer.insertAdjacentHTML("afterbegin", renderItem(agent));
  });
};

const switchEditAddMode = (isEdit, id) => {
  addButton.innerHTML = isEdit ? "Edit" : "Add";
  isInEditMode = isEdit;

  const updatedButton = addButton.cloneNode(true);
  addButton.parentNode.replaceChild(updatedButton, addButton);
  addButton = updatedButton;

  addButton.addEventListener(
    "click",
    isEdit ? () => onSubmitEditClicked(id) : onAddItemClick
  );
};

const onItemEditClick = (id) => {
  const foundAgent = allUsers.find((agent) => +id === +agent.id);

  first_nameInput.value = foundAgent.first_name;
  last_nameInput.value = foundAgent.last_name;
  age.value = foundAgent.age;
  emailInput.value = foundAgent.email;

  switchEditAddMode(true, id);
};

const onItemDeleteClick = (id) => {
  Api.removeUser(id);

  renderAllItems();
};

const onAddItemClick = (e) => {
  e.preventDefault();

  const item = {
    first_name: first_nameInput.value,
    last_name: last_nameInput.value,
    age: age.value,
    email: emailInput.value,
  };

  Api.addUser(item);

  clearInputs();

  renderAllItems();
};

const onSubmitEditClicked = (id) => {
  const updatedItem = {
    first_name: first_nameInput.value,
    last_name: last_nameInput.value,
    position: age.value,
    email: emailInput.value,
  };

  Api.updateUser(id, updatedItem);

  clearInputs();

  renderAllItems();

  switchEditAddMode(false);
};

addButton.addEventListener("click", onAddItemClick);
renderAllItems();