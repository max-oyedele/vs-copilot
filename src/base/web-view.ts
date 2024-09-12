import * as vscode from "vscode";
import { formatText } from "../utils";
// import { chartComponent } from "../webview/chat_html";

let _view: vscode.WebviewView | undefined;
export abstract class WebView {
  public static readonly viewId = "chatView";
  static webviewView: vscode.WebviewView | undefined;
  public currentWebView: vscode.WebviewView | undefined = _view;
  _context: vscode.ExtensionContext;

  constructor(
    private readonly _extensionUri: vscode.Uri,
    protected readonly apiKey: string,
    protected readonly generativeAiModel: string,
    context: vscode.ExtensionContext
  ) {
    this._context = context;
  }

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    _view = webviewView;
    WebView.webviewView = webviewView;
    this.currentWebView = webviewView;

    const webviewOptions: vscode.WebviewOptions = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.options = webviewOptions;

    if (!this.apiKey) {
      vscode.window.showErrorMessage(
        "API key not configured. Check your settings."
      );
      return;
    }
    this.setWebviewHtml(this.currentWebView);
    this.setupMessageHandler(this.currentWebView);
  }

  private async setWebviewHtml(view: vscode.WebviewView): Promise<void> {
    // view.webview.html = chartComponent();
  }

  private setupMessageHandler(_view: vscode.WebviewView): void {
    try {
      _view.webview.onDidReceiveMessage(async (message) => {
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

  abstract generateResponse(message?: string): Promise<string | undefined>;

  abstract sendResponse(
    response: string,
    currentChat?: string
  ): Promise<boolean | undefined>;
}
