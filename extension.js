const vscode = require("vscode");

let closeIconUri;

function activate(context) {
  const viewProvider = {
    resolveWebviewView: (webviewView) => {
      setupWebview(webviewView, context);
    },
  };

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("test.memo", viewProvider)
  );

  console.log('This is an additional message to indicate the extension has been activated.');
}

function setupWebview(webviewView, context) {
  webviewView.webview.options = {
    enableScripts: true,
    localResourceRoots: [
      vscode.Uri.joinPath(context.extensionUri, "media"),
    ],
  };

  const scriptUri = webviewView.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "media", "register.js")
  );
  webviewView.webview.html = getWebviewContent(scriptUri);
}

function getWebviewContent(scriptUri) {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        html, body {
          height: 100%;
          margin: 0;
          padding: 0;
        }
        textarea {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          background-color: #efefef;
          font-family: 'Courier New';
          color: #333333; 
          font-size: 10px;
        }
      </style>
    </head>
    <body>
      <textarea id="memo"></textarea>
      <div id="list"></div>
      <script src="${scriptUri}"></script>
    </body>
    </html>
  `;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
