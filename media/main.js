/// <reference lib="dom"/>

let items = [];

const registerInput = document.getElementById("register-input");
const registerButton = document.getElementById("register-button");

registerButton.addEventListener("click", () => {
  const value = registerInput.value;

  if (value) {
    items.push(value);
    registerInput.value = "";
    updateItems();
  }
});

function updateItems() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", () => {
      items = items.filter((_item, i) => i !== index);
      updateItems();
    });
    li.appendChild(document.createTextNode(item));
    li.appendChild(deleteButton);

    list.appendChild(li);
  });
}

updateItems();
