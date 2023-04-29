// DEPENDENCIES

const inputEl = document.querySelector("#item-input");
const formEl = document.querySelector("#item-form");
const itemsEl = document.querySelector("#item-list");
const clearEl = document.querySelector("#clear");
const filterEl = document.querySelector(".filter");
const modalEl = document.getElementById("modal");
const modalCloseBtn = document.getElementById("closeBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const cancelBtn = document.querySelector("#cancel");
const filterInput = document.querySelector("#filter");
const addItemBtn = document.querySelector("#addItemBtn");
const formControl = document.querySelector(".form-control");

// globally scopes custom error message for form control
const errMessage = document.createElement("p");
errMessage.textContent = "Please write an item to add";
errMessage.style.color = "red";
errMessage.style.fontWeight = "bold";
errMessage.style.marginBottom = ".8em";

console.log(itemsEl.children.length);

// FUNCTIONS

// checks local storage for any items to render to DOM
const checkLocalStorage = () => {
  let itemsToRender;

  if (localStorage.getItem("items") === null) {
    itemsToRender = [];
  } else {
    itemsToRender = JSON.parse(localStorage.getItem("items"));
    itemsToRender.forEach((item) => addItemToDom(item));
  }
};

// adds new item to the list
const addItem = (e) => {
  e.preventDefault();
  const items = Array.from(itemsEl.children);
  items.forEach((item) => console.log(item.childNodes[0]));
  const newItem = inputEl.value;
  errMessage.remove();
  console.log("newitem", newItem);

  if (newItem.length === 0) {
    inputEl.style.outlineStyle = "solid";
    inputEl.style.outlineWidth = "2px";
    inputEl.style.outlineColor = "red";
    inputEl.insertAdjacentElement("afterend", errMessage);
    return;
  } else if (items.some((item) => item.textContent.includes(newItem))) {
    errMessage.textContent = "This item already exists";
    inputEl.insertAdjacentElement("afterend", errMessage);
    return;
  } else {
    addItemToDom(newItem);
    addItemToLocalStorage(newItem);

    checkItems();
    inputEl.value = "";
  }
};

// renders items to the DOM
const addItemToDom = (item) => {
  const newIl = document.createElement("li");
  newIl.appendChild(document.createTextNode(item));
  const newBut = document.createElement("button");
  newBut.classList = "remove-item btn-link text-red";
  const newIcon = document.createElement("i");
  newIcon.classList = "fa-solid fa-xmark";

  newBut.appendChild(newIcon);
  newIl.appendChild(newBut);
  itemsEl.appendChild(newIl);
};

// adds an item to local storage
const addItemToLocalStorage = (item) => {
  let localStorageItems;

  if (localStorage.getItem("items") === null) {
    localStorageItems = [];
  } else {
    localStorageItems = JSON.parse(localStorage.getItem("items"));
  }

  localStorageItems.push(item);
  localStorage.setItem("items", JSON.stringify(localStorageItems));
};

// hides elements if list is empty
const checkItems = () => {
  if (itemsEl.children.length === 0) {
    filterEl.style.display = "none";
    clearEl.style.display = "none";
  } else {
    filterEl.style.display = "block";
    clearEl.style.display = "block";
  }
};

const editItem = (e) => {
  if (formControl.children[0].tagName === "P") {
    const formP = formControl.querySelectorAll("p");
    formP.forEach((p) => p.remove());
  }
  const items = Array.from(itemsEl.children);
  items.forEach((item) => item.classList.remove("edit-mode"));

  e.classList.add("edit-mode");
  console.log("e", e);
  const cancelBtn = document.createElement("button");
  cancelBtn.style.backgroundColor = "gray";
  cancelBtn.classList.add("btn");
  cancelBtn.style.color = "white";
  cancelBtn.textContent = "Cancel";
  cancelBtn.style.marginLeft = ".5em";
  addItemBtn.insertAdjacentElement("afterend", cancelBtn);
  inputEl.style.outlineStyle = "solid";
  inputEl.style.outlineWidth = "2px";
  inputEl.style.outlineColor = "yellow";
  inputEl.value = e.textContent;
  addItemBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Save Changes`;
  addItemBtn.style.backgroundColor = "green";
  const editMessage = document.createElement("p");
  editMessage.textContent = `Edit ${e.textContent}`;
  editMessage.style.color = "black";
  editMessage.style.fontWeight = "bold";
  editMessage.style.marginBottom = ".8em";
  inputEl.insertAdjacentElement("beforebegin", editMessage);
  formEl.removeEventListener("submit", addItem);
  localStorageItems = JSON.parse(localStorage.getItem("items"));
  const localStorageArray = Array.from(localStorageItems);
  const index = localStorageArray.indexOf(e.textContent);

  addItemBtn.addEventListener("click", () => {
    if (inputEl.value === e.textContent) {
      return;
    }
    restoreButton();
    removeItemFromLocalStorage(e.textContent);
    addItemToLocalStorageWithIndex(inputEl.value, index);
  });
};

const restoreButton = () => {
  () => {
    inputEl.style.outlineStyle = "";
    inputEl.style.outlineWidth = "";
    inputEl.style.outlineColor = "";
    inputEl.value = "";
    addItemBtn.innerHTL = `<i class="fa-solid fa-plus"></i> Add Item`;
  };
};

const addItemToLocalStorageWithIndex = (item, index) => {
  localStorageItems = JSON.parse(localStorage.getItem("items"));
  localStorageItems.splice(index, 0, item);
  localStorage.setItem("items", JSON.stringify(localStorageItems));
};

const removeItemFromLocalStorage = (textContent) => {
  localStorageItems = JSON.parse(localStorage.getItem("items"));
  const localStorageArray = Array.from(localStorageItems);
  localStorageArray.forEach((item) => {
    if (item.includes(textContent)) {
      const deleteIndex = localStorageArray.indexOf(item);
      localStorageArray.splice(deleteIndex, 1);
      return localStorageArray;
    }
  });
  localStorage.setItem("items", JSON.stringify(localStorageArray));
};

// Event Listeners

// invokes add item
formEl.addEventListener("submit", addItem);

// sets a highlight border around the input field
inputEl.addEventListener("focus", () => {
  inputEl.style.outlineStyle = "solid";
  inputEl.style.outlineWidth = "1px";
  inputEl.style.outlineColor = "blue";
});

// removes highlight border on blue
inputEl.addEventListener("blur", () => {
  inputEl.style.outlineStyle = "";
  inputEl.style.outlineWidth = "";
  inputEl.style.outlineColor = "";
});

// removes one item
itemsEl.addEventListener("click", (e) => {
  e.stopPropagation;
  const targetItem = e.target.parentElement.parentElement;
  const targetItemText = e.target.parentElement.parentElement.textContent;
  if (e.target.tagName === "I") {
    modalEl.style.display = "block";

    deleteBtn.addEventListener("click", () => {
      targetItem.remove();
      modalEl.style.display = "none";
      checkItems();

      removeItemFromLocalStorage(targetItemText);
    });
  } else if (e.target.tagName === "LI") {
    editItem(e.target);
  }
});

modalCloseBtn.addEventListener("click", () => {
  modalEl.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  modalEl.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modalEl) modalEl.style.display = "none";
});

// removes all items
clearEl.addEventListener("click", () => {
  modalEl.style.display = "block";

  deleteBtn.addEventListener("click", () => {
    const items = Array.from(itemsEl.children);
    items.forEach((item) => item.remove());
    checkItems();
    localStorage.removeItem("items");
    modalEl.style.display = "none";
  });
});

filterEl.addEventListener("input", () => {
  const filterParam = filterInput.value.toLowerCase();
  const items = Array.from(itemsEl.children);
  items.forEach((item) => {
    const itemText = item.textContent.toLowerCase();
    if (itemText.includes(filterParam)) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
});

// INITIALIZATION

checkLocalStorage();
checkItems();
