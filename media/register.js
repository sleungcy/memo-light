/// <reference lib="dom"/>
const vscode = acquireVsCodeApi();
const previousState = vscode.getState();
let items = previousState?.items ?? [];
const registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", () => {
  addItems();
});

const resizeObserver = new ResizeObserver((entries) => {
  console.log(entries);
  items[entries[0].target.id.split("-")[1]].width =
    entries[0].contentRect.width;
  items[entries[0].target.id.split("-")[1]].height =
    entries[0].contentRect.height;
  vscode.setState({ items });
});
createElement();
function addItems() {
  const list = document.getElementById("list");
  items.push({
    width: 200,
    height: 100,
    text: "",
  });
  vscode.setState({ items });
  createElement();

  // const div = document.createElement("div");
  // const textArea = document.createElement("textarea");
  // textArea.id = `item-${items.length - 1}`;
  // textArea.style.width = items[items.length - 1].width + "px";
  // textArea.style.height = items[items.length - 1].height + "px";
  // textArea.style.display = "block";
  // textArea.addEventListener("input", () => {
  //   items[textArea.id.split("-")[1]].text = textArea.value;
  //   vscode.setState({ items });
  // });
  // resizeObserver.observe(textArea);
  // div.appendChild(textArea);
  // list.appendChild(div);
}

function createElement() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  resizeObserver.disconnect();
  items.forEach((item, index) => {
    const div = document.createElement("div");
    const textArea = document.createElement("textarea");
    const closeButton = document.createElement("button");
    const actionDiv = document.createElement("div");
    const closeImage = document.createElement("img");
    const closeSVG = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const closePath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    textArea.id = `item-${index}`;
    textArea.style.width = item.width + "px";
    textArea.style.height = item.height + "px";
    textArea.style.display = "block";
    textArea.style.fontSize = "14px";
    textArea.style.fontFamily = "sans-serif";
    textArea.value = item.text;
    textArea.addEventListener("change", () => {
      items[textArea.id.split("-")[1]].text = textArea.value;
      vscode.setState({ items });
    });

    div.style.margin = "5px";
    div.style.display = "table";

    //削除ボタン
    closeButton.addEventListener("click", () => {
      deleteItem(index);
    });
    closeButton.style.padding = "0px";
    closeButton.style.margin = "0px";
    closeButton.style.height = "25px";
    closeButton.style.width = "25px";
    // closeButton.style.position = "absolute";
    // closeButton.style.top = "-25px";
    // closeButton.style.right = "0px";

    actionDiv.style.textAlign = "right";

    closeImage.style.objectFit = "cover";
    closeImage.style.height = "40px";
    closeImage.style.width = "40px";

    //削除ボタンアイコン
    closeSVG.setAttribute("viewBox", "0 0 24 24");
    closeSVG.style.width = "auto";
    closeSVG.style.height = "auto";
    closePath.setAttribute(
      "d",
      "M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z"
    );

    closeSVG.appendChild(closePath);

    resizeObserver.observe(textArea);
    closeButton.appendChild(closeSVG);
    // div.appendChild(closeButton);
    actionDiv.appendChild(closeButton);
    div.appendChild(actionDiv);
    div.appendChild(textArea);
    list.appendChild(div);
  });
}

function deleteItem(id) {
  items = items.filter((_item, i) => i !== id);
  vscode.setState({ items });
  createElement();
}
