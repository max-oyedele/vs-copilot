import * as vscode from "vscode";
import { COMMON, MAIN_ACTIONS, USER_MESSAGE } from "./constant";
import {
  FileUploader,
  GenerateCommitMessage,
  GenerateUnitTest,
  KnowledgeBase,
} from "./events";
import { OpenAIWebView, CodeActionProvider } from "./providers";

export async function activate(context: vscode.ExtensionContext) {
  try {
    context.workspaceState.update(COMMON.CHAT_HISTORY, []);

    const { commitMessage, pattern, unitTest } = MAIN_ACTIONS;

    const generateCommitMessage = new GenerateCommitMessage(
      `${USER_MESSAGE} generates a commit message...`,
      context
    );
    const codePattern = new FileUploader(context);
    const generateUnitTest = new GenerateUnitTest(
      `${USER_MESSAGE} generates unit tests...`,
      context
    );

    const actionMap = {
      [commitMessage]: () => generateCommitMessage.execute("hello"),
      [pattern]: () => codePattern.uploadFileHandler(),
      [unitTest]: () => generateUnitTest.execute(),
    };

    setupSubscribe(context, actionMap);
  } catch (error) {
    context.workspaceState.update(COMMON.CHAT_HISTORY, []);
    vscode.window.showErrorMessage(
      "An Error occured while setting up generative AI model"
    );
    console.log(error);
  }
}

export function deactivate(context: vscode.ExtensionContext) {
  //TODO once the application is rewritten in React, delete the pattern file on deactivate
  context.subscriptions.forEach((subscription) => subscription.dispose());
}

const setupSubscribe = (
  context: vscode.ExtensionContext,
  actionMap: Record<string, any>
) => {
  try {
    const commandsRegistered: vscode.Disposable[] = Object.entries(
      actionMap
    ).map(([action, handler]) =>
      vscode.commands.registerCommand(action, handler)
    );

    const webviewProvider = new OpenAIWebView(context.extensionUri, context);
    const webviewRegistered: vscode.Disposable =
      vscode.window.registerWebviewViewProvider(
        OpenAIWebView.viewId,
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
