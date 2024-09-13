import * as vscode from "vscode";
import { formatText, vscodeErrorMessage } from "../utils";
import { APP_CONFIG, COMMON } from "../constant";
import { AnthropicWebView } from "./anthropic-web-view";

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
        const { anthropicApiKey, anthropicModel } = APP_CONFIG;
        if (!anthropicApiKey || !anthropicModel) {
          vscodeErrorMessage(
            "Configuration not found. Go to settings, search for Your coding buddy. Fill up the model and model name"
          );
          return;
        }

        vscode.window.showInformationMessage("☕️ Asking Max for Help");

        try {
          const selectedText = this.getActiveEditorText();

          const anthropicWebView = new AnthropicWebView(
            this._context.extensionUri,
            this._context
          );
          const response = await anthropicWebView.generateResponse(
            selectedText
          );

          anthropicWebView.sendResponse(
            formatText(selectedText),
            COMMON.USER_INPUT
          );
          anthropicWebView.sendResponse(formatText(response), COMMON.BOT);
        } catch (error) {
          vscodeErrorMessage(
            "Failed to generate content. Please try again later."
          );
          console.error(error);
          this._context.workspaceState.update(COMMON.CHAT_HISTORY, []);
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
}
