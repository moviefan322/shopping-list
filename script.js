const inputEl = document.querySelector("#item-input");
const formEl = document.querySelector("#item-form");
const itemsEl = document.querySelector("#item-list");
const clearEl = document.querySelector("#clear");

// globally scopes custom error message for form control
const errMessage = document.createElement("p");
errMessage.textContent = "Please write an item to add";
errMessage.style.color = "red";
errMessage.style.fontWeight = "bold";
errMessage.style.marginBottom = ".8em";

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
  inputEl.value = "";
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

// add event listener to item ul
itemsEl.addEventListener("click", (e) => {
  e.stopPropagation;
  if (e.target.tagName === "I") {
    e.target.parentElement.parentElement.remove();
  }
});

clearEl.addEventListener("click", () => {
  const items = Array.from(itemsEl.children);
  items.forEach((item) => item.remove());
});
