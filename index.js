const btnRegister = document.getElementById("rgBtn");
const btnDelete = document.getElementById("delBtn");
const btnSearch = document.getElementById("searchBtn");
const btnEdit = document.getElementById("editBtn");
const btnRepresent = document.getElementById("representBtn");

const btnSave = document.getElementById("saveBtn");
const btnCancel = document.getElementById("cancelBtn");

const userNameInput = document.getElementById("nameInput");
const userSurnameInput = document.getElementById("surNameInput");
const userEmailInput = document.getElementById("emailInput");
const userphoneNumberInput = document.getElementById("phoneNumberInput");
const userIdInput = document.getElementById("userIdInput");

var users = [];

btnSave.hidden = true;
btnCancel.hidden = true;

const changeEditModeState = () => {
  btnRegister.hidden = !btnRegister.hidden;
  btnCancel.hidden = !btnCancel.hidden;
  btnSave.hidden = !btnSave.hidden;
  btnEdit.hidden = !btnEdit.hidden;
  btnDelete.hidden = !btnDelete.hidden;
  btnSearch.hidden = !btnSearch.hidden;
  btnRepresent.hidden = !btnRepresent.hidden;
};

const generateMessage = (message, color, textcolor) => {
  const div = document.createElement("div");
  div.className = "alert alert-warning";
  div.innerHTML = message;
  div.style.color = textcolor;
  div.style.backgroundColor = color;
  document.body.insertAdjacentElement("afterbegin", div);
  setTimeout(() => {
    div.remove();
  }, 3000);
};

const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

btnRepresent.addEventListener("click", () => {
  console.log(users);
});

btnRegister.addEventListener("click", () => {
  const user = {
    id: generateId(),
    name: userNameInput.value,
    surname: userSurnameInput.value,
    email: userEmailInput.value,
    phoneNumber: userphoneNumberInput.value,
  };

  if (
    user.name == "" ||
    user.surname == "" ||
    user.email == "" ||
    user.phoneNumber == ""
  ) {
    return generateMessage("Warning!", "red", "white");
  }

  users.push(user);
  console.log(users);
  return generateMessage("Success!", "green", "white");
  
});

btnDelete.addEventListener("click", () => {
  if (users.find(user => user.id !== userIdInput.value)) {
    return generateMessage("This id doesnt exist!", "purple", "white");
  } else if (userIdInput.value == "") {
    return generateMessage("Please enter a valid id!", "red", "white");
  }
  else
  {
    users = users.filter(user => user.id !== userIdInput.value);
    console.log(users);
    return generateMessage("This record is deleted!", "green", "white");
  }
});

btnSearch.addEventListener("click", () => {
  let selectedUser = users.filter(user => user.id == userIdInput.value);
  let {id, name, surname, email, phoneNumber} = selectedUser[0] || {} ;
  
  if (id !== userIdInput.value) {
   return generateMessage("This id doesnt exist!", "purple", "white");
  } 
  
  else if (userIdInput.value == "") {
    return generateMessage("Please enter a valid id!", "red", "white");
  } 
  
  else {   
   return generateMessage(`İD: ${id} NAME: ${name} SURNAME: ${surname} email: ${email} PhoneNUMBER: ${phoneNumber}`), "yellow", "white";
  }
});

btnEdit.addEventListener("click", () => {
  let selectedUser = users.filter(user => user.id == userIdInput.value);
  let {id, name, surname, email, phoneNumber} = selectedUser[0] || {} ;
 
  if (id !== userIdInput.value) {
    generateMessage("This id doesnt exist!", "red");
} else if (userIdInput.value == "") {
    generateMessage("Please enter a valid id!", "blue", "white");
  } 
  else {
    
    userNameInput.value = name;
    userSurnameInput.value = surname;
    userEmailInput.value = email;
    userphoneNumberInput.value = phoneNumber;


  changeEditModeState();

  btnSave.addEventListener("click", () => {
      
    selectedUser[0].name =  userNameInput.value;
    selectedUser[0].surname = userSurnameInput.value;
    selectedUser[0].email = userEmailInput.value;
    selectedUser[0].phoneNumber= userphoneNumberInput.value;
    generateMessage("Changes saved!", "green", "white");

    
   
    return changeEditModeState();
   
  });

  btnCancel.addEventListener("click", () => {
   
    
   generateMessage("Cancelled!", "purple", "white");
   return changeEditModeState();
  
  });
  }
});
