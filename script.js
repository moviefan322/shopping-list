const inputEl = document.querySelector("#item-input");
const formEl = document.querySelector("#item-form");
const itemsEl = document.querySelector("#item-list");

const errMessage = document.createElement("p");
errMessage.textContent = "Please write an item to add";
errMessage.style.color = "red";
errMessage.style.fontWeight = "bold";
errMessage.style.marginBottom = ".8em";

const addItem = (e) => {
  e.preventDefault();
  errMessage.remove();

  console.log(inputEl.value.length);

  if (inputEl.value.length === 0) {
    inputEl.style.outlineStyle = "solid";
    inputEl.style.outlineWidth = "2px";
    inputEl.style.outlineColor = "red";
    inputEl.insertAdjacentElement("afterend", errMessage);
    return;
  } else {
    const newItem = inputEl.value;
    const newIl = document.createElement("li");
    newIl.textContent = newItem;
    const newBut = document.createElement("button");
    newBut.classList = "remove-item btn-link text-red";
    const newIcon = document.createElement("i");
    newIcon.classList = "fa-solid fa-xmark";

    newBut.appendChild(newIcon);
    newIl.appendChild(newBut);
    itemsEl.appendChild(newIl);
    inputEl.value = "";
  }
};

formEl.addEventListener("submit", addItem);

inputEl.addEventListener("focus", () => {
  inputEl.style.outlineStyle = "solid";
  inputEl.style.outlineWidth = "1px";
  inputEl.style.outlineColor = "blue";
});
inputEl.addEventListener("blur", () => {
  inputEl.style.outlineStyle = "";
  inputEl.style.outlineWidth = "";
  inputEl.style.outlineColor = "";
});
