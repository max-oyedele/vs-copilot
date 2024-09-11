import * as vscode from "vscode";
import { COMMON, MAIN_ACTIONS, USER_MESSAGE } from "./constant";
import {
  CommentCode,
  ExplainCode,
  FileUploader,
  FixError,
  GenerateCodeChart,
  GenerateCommitMessage,
  GenerateUnitTest,
  InterviewQuestion,
  KnowledgeBase,
  OptimizeCode,
  RefactorCode,
  ReviewCode,
} from "./events";
import { AnthropicWebView, ChatManager, CodeActionProvider } from "./providers";

export async function activate(context: vscode.ExtensionContext) {
  try {
    context.workspaceState.update(COMMON.CHAT_HISTORY, []);

    const {
      codeChart,
      comment,
      commitMessage,
      explain,
      fix,
      interviewMe,
      optimize,
      pattern,
      refactor,
      review,
      unitTest,
    } = MAIN_ACTIONS;

    const generateCodeChart = new GenerateCodeChart(
      `${USER_MESSAGE} creates the code chart...`,
      context
    );
    const commentCode = new CommentCode(
      `${USER_MESSAGE} generates the code comments...`,
      context
    );
    const generateCommitMessage = new GenerateCommitMessage(
      `${USER_MESSAGE} generates a commit message...`,
      context
    );
    const explainCode = new ExplainCode(
      `${USER_MESSAGE} explains the code...`,
      context
    );
    const fixError = (errorMessage: string) =>
      new FixError(
        `${USER_MESSAGE} finds a solution to the error...`,
        context,
        errorMessage
      );
    const interviewQuestion = new InterviewQuestion(
      `${USER_MESSAGE} generates interview questions...`,
      context
    );
    const optimizeCode = new OptimizeCode(
      `${USER_MESSAGE} optimizes the code...`,
      context
    );
    const codePattern = new FileUploader(context);
    const refactorCode = new RefactorCode(
      `${USER_MESSAGE} refactors the code...`,
      context
    );
    const reviewCode = new ReviewCode(
      `${USER_MESSAGE} reviews the code...`,
      context
    );
    const generateUnitTest = new GenerateUnitTest(
      `${USER_MESSAGE} generates unit tests...`,
      context
    );

    const actionMap = {
      [codeChart]: () => generateCodeChart.execute(),
      [comment]: () => commentCode.execute(),
      [commitMessage]: () => generateCommitMessage.execute("hello"),
      [explain]: () => explainCode.execute(),
      [fix]: (errorMessage: string) =>
        fixError(errorMessage).execute(errorMessage),
      [interviewMe]: () => interviewQuestion.execute(),
      [optimize]: () => optimizeCode.execute(),
      [pattern]: () => codePattern.uploadFileHandler(),
      [refactor]: () => refactorCode.execute(),
      [review]: () => reviewCode.execute(),
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

    const chatManager = new ChatManager(context);
    const chatCommandRegistered = chatManager.registerChatCommand();

    const webviewProvider = new AnthropicWebView(context.extensionUri, context);
    const webviewRegistered: vscode.Disposable =
      vscode.window.registerWebviewViewProvider(
        AnthropicWebView.viewId,
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
