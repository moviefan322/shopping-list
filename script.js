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

// globally scopes custom error message for form control
const errMessage = document.createElement("p");
errMessage.textContent = "Please write an item to add";
errMessage.style.color = "red";
errMessage.style.fontWeight = "bold";
errMessage.style.marginBottom = ".8em";

console.log(itemsEl.children.length);

// FUNCTIONS

// adds new item to the list
const addItem = (e) => {
  e.preventDefault();
  const newItem = inputEl.value;
  errMessage.remove();

  console.log(newItem.length);

  if (newItem.length === 0) {
    inputEl.style.outlineStyle = "solid";
    inputEl.style.outlineWidth = "2px";
    inputEl.style.outlineColor = "red";
    inputEl.insertAdjacentElement("afterend", errMessage);
    return;
  }

  const newIl = document.createElement("li");
  newIl.appendChild(document.createTextNode(newItem));
  const newBut = document.createElement("button");
  newBut.classList = "remove-item btn-link text-red";
  const newIcon = document.createElement("i");
  newIcon.classList = "fa-solid fa-xmark";

  newBut.appendChild(newIcon);
  newIl.appendChild(newBut);
  itemsEl.appendChild(newIl);
  checkItems();
  inputEl.value = "";
};

const checkItems = () => {
  if (itemsEl.children.length === 0) {
    filterEl.style.display = "none";
    clearEl.style.display = "none";
  } else {
    filterEl.style.display = "block";
    clearEl.style.display = "block";
  }
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
// itemsEl.addEventListener("click", (e) => {
//   e.stopPropagation;
//   if (e.target.tagName === "I") {
//     e.target.parentElement.parentElement.remove();
//     checkItems();
//     return;
//   }
// });

itemsEl.addEventListener("click", (e) => {
  e.stopPropagation;
  const targetItem = e.target.parentElement.parentElement;
  if (e.target.tagName === "I") {
    modalEl.style.display = "block";

    deleteBtn.addEventListener("click", () => {
      targetItem.remove();
      modalEl.style.display = "none";
      checkItems();
    });
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
  const items = Array.from(itemsEl.children);
  items.forEach((item) => item.remove());
  checkItems();
});

// INITIALIZATION

checkItems();
