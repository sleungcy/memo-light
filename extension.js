// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
let CloseIconUri;
function activate(context) {
  const viewProvider = vscode.window.registerWebviewViewProvider("test.memo", {
    resolveWebviewView: (webviewView) => {
      webviewView.webview.options = {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.joinPath(context.extensionUri, "assets"),
          vscode.Uri.joinPath(context.extensionUri, "media"),
        ],
      };
      const scrilptUri = webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "register.js")
      );
      const plusIconUri = webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "assets", "plus.svg")
      );
      CloseIconUri = webviewView.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "assets", "plus.svg")
      );

      webviewView.webview.html = `
        <!DOCTYPE html>
        <html lang="ja"></html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
       
        <button id="register-button" style="height: 25px; width: 25px; margin: 0px; padding: 0px " type="button">
        <img src="${plusIconUri}" style="height: 40px; width: 40px;  object-fit: cover ">
        </button>
        <div id="list"></div>
        <script src="${scrilptUri}"></script>
        </body>
        </html>
        `;
    },
  });
  context.subscriptions.push(viewProvider);
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "test" is now active!');
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "test.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from test!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
};
