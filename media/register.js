/// <reference lib="dom"/>
const vscode = acquireVsCodeApi();
var previousState = vscode.getState();

if (previousState == null){
  previousState = {text: ""};

}

const resizeObserver = new ResizeObserver((entries) => {
  vscode.setState({ text: textArea.value });
});

resizeObserver.disconnect();

const textArea = document.getElementById("memo");
textArea.value = previousState.text;
textArea.addEventListener("change", () => {
  vscode.setState({ text: textArea.value });
});
resizeObserver.observe(textArea);