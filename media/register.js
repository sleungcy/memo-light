/// <reference lib="dom"/>
const vscode = acquireVsCodeApi();
const previousState = vscode.getState();

const resizeObserver = new ResizeObserver((entries) => {
  console.log(entries);
  vscode.setState({ text: textArea.value });
});

resizeObserver.disconnect();

const textArea = document.getElementById("memo");
textArea.value = previousState.text;
textArea.addEventListener("change", () => {
  vscode.setState({ text: textArea.value });
});
resizeObserver.observe(textArea);