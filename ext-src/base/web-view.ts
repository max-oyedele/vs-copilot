import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import { formatText } from "../utils";

export abstract class WebView {
  public static readonly viewId = "chatView";
  static webviewView: vscode.WebviewView | undefined;
  _context: vscode.ExtensionContext;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    context: vscode.ExtensionContext
  ) {
    this._context = context;
  }

  abstract generateResponse(message?: string): Promise<string | undefined>;

  abstract sendResponse(
    response: string,
    currentChat?: string
  ): Promise<boolean | undefined>;

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    WebView.webviewView = webviewView;

    const webviewOptions: vscode.WebviewOptions = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.options = webviewOptions;

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    this.setupMessageHandler(webviewView);
  }

  private setupMessageHandler(_view: vscode.WebviewView): void {
    try {
      _view.webview.onDidReceiveMessage(async (message) => {
        console.log("user message=", message);
        if (message.type === "user-input") {
          const response = await this.generateResponse(
            formatText(message.message)
          );
          if (response) {
            this.sendResponse(formatText(response), "bot");
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  }

  private _getHtmlForWebview(view: vscode.Webview) {
    const manifest = require(path.join(
      this._extensionUri.path,
      "build",
      "asset-manifest.json"
    ));

    const mainScript = manifest["files"]["main.js"];
    const mainStyle = manifest["files"]["main.css"];

    const scriptUri = view.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "build", mainScript)
    );

    const styleUri = view.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "build", mainStyle)
    );

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
        <meta name="theme-color" content="#000000">
        <title>React App</title>
        <link rel="stylesheet" type="text/css" href="${styleUri}">
        <!--<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'nonce-${nonce}';style-src vscode-resource: 'unsafe-inline' http: https: data:;">-->
        <base href="${view.asWebviewUri(
          vscode.Uri.joinPath(this._extensionUri, "build")
        )}">
      </head>

      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root"></div>

        <script nonce="${nonce}" src="${scriptUri}"></script>
        <script>
          const vscode = acquireVsCodeApi();
        </script>
      </body>
      </html>`;
  }
}

function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
