import * as vscode from "vscode";
import { formatText, vscodeErrorMessage } from "../utils";
import { APP_CONFIG, COMMON } from "../constant";
import { AnthropicWebViewProvider } from "../providers/anthropic-web-view-provider";

/**
 * Manages chat functionality, including registering chat commands,
 * validating configurations, and generating responses.
 * This class is responsible for handling chat-related operations,
 * such as sending and receiving messages, and interacting with the Groq web view provider.
 */
export class ChatManager {
  private readonly _context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this._context = context;
  }

  registerChatCommand() {
    return vscode.commands.registerCommand(
      "cdmbase-copilot.sendChatMessage",
      async () => {
        try {
          vscode.window.showInformationMessage("☕️ Asking Max for Help");
          const selectedText = this.getActiveEditorText();
          const response = await this.generateResponse(selectedText);
          this.sendResponse(selectedText, response);
        } catch (error) {
          console.error(error);
          vscodeErrorMessage(
            "Failed to generate content. Please try again later."
          );
        }
      }
    );
  }

  private getActiveEditorText(): string {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
      vscodeErrorMessage("Select a text in your editor");
      console.debug("Abandon: no open text editor.");
      throw new Error("No active editor");
    }
    return activeEditor.document.getText(activeEditor.selection);
  }

  private async generateResponse(message: string): Promise<string | undefined> {
    try {
      const { anthropicApiKey, anthropicModel } = APP_CONFIG;
      if (!anthropicApiKey || !anthropicModel) {
        vscodeErrorMessage(
          "Configuration not found. Go to settings, search for Your coding buddy. Fill up the model and model name"
        );
      }
      const anthropicWebViewProvider = new AnthropicWebViewProvider(
        this._context.extensionUri,
        this._context
      );
      return await anthropicWebViewProvider.generateResponse(message);
    } catch (error) {
      this._context.workspaceState.update(COMMON.CHAT_HISTORY, []);
      console.log(error);
    }
  }

  private sendResponse(userInput: string, response: string | undefined) {
    try {
      const anthropicWebViewProvider = new AnthropicWebViewProvider(
        this._context.extensionUri,
        this._context
      );
      anthropicWebViewProvider.sendResponse(
        formatText(userInput),
        COMMON.USER_INPUT
      );
      anthropicWebViewProvider.sendResponse(formatText(response), COMMON.BOT);
    } catch (error) {
      this._context.workspaceState.update(COMMON.CHAT_HISTORY, []);
      console.error(error);
    }
  }
}
