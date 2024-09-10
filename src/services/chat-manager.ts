import * as vscode from "vscode";
import { formatText, getConfigValue, vscodeErrorMessage } from "../utils";
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

  private readonly anthropicApiKey: string;
  private readonly anthropicModel: string;

  constructor(context: vscode.ExtensionContext) {
    const { anthropicApiKey, anthropicModel } = APP_CONFIG;
    this._context = context;

    this.anthropicApiKey = getConfigValue(anthropicApiKey);
    this.anthropicModel = getConfigValue(anthropicModel);
  }

  registerChatCommand() {
    return vscode.commands.registerCommand("max.sendChatMessage", async () => {
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
    });
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
      if (!this.anthropicApiKey || !this.anthropicModel) {
        vscodeErrorMessage(
          "Configuration not found. Go to settings, search for Your coding buddy. Fill up the model and model name"
        );
      }
      const anthropicWebViewProvider = new AnthropicWebViewProvider(
        this._context.extensionUri,
        this.anthropicApiKey,
        this.anthropicModel,
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
        this.anthropicApiKey,
        this.anthropicModel,
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
