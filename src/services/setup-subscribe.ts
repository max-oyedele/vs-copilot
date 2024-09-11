import * as vscode from "vscode";
import { AnthropicWebViewProvider } from "../providers/anthropic-web-view-provider";
import { ChatManager } from "./chat-manager";
import { CodeActionProvider } from "../providers/code-action-provider";

export const setupSubscribe = (
  context: vscode.ExtensionContext,
  actionMap: Record<string, any>
) => {
  try {
    const commandsRegistered: vscode.Disposable[] = Object.entries(
      actionMap
    ).map(([action, handler]) =>
      vscode.commands.registerCommand(action, handler)
    );

    const chatManager = new ChatManager(context);
    const chatCommandRegistered = chatManager.registerChatCommand();

    const webviewProvider = new AnthropicWebViewProvider(
      context.extensionUri,
      context
    );
    const webviewRegistered: vscode.Disposable =
      vscode.window.registerWebviewViewProvider(
        AnthropicWebViewProvider.viewId,
        webviewProvider
      );

    const codeActionProvider = new CodeActionProvider();
    const codeActionRegistered: vscode.Disposable =
      vscode.languages.registerCodeActionsProvider(
        { scheme: "file", language: "*" },
        codeActionProvider
      );

    context.subscriptions.push(
      ...commandsRegistered,
      chatCommandRegistered,
      webviewRegistered,
      codeActionRegistered
    );
  } catch (error) {
    vscode.window.showErrorMessage(
      "An Error occured while registering event subscriptions"
    );
    console.log(error);
  }
};
