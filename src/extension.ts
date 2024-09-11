import * as vscode from "vscode";
import { COMMON, MAIN_ACTIONS, USER_MESSAGE } from "./constant";
import { CommentCode } from "./events/comment-code";
import { GenerateCommitMessage } from "./events/generate-commit-message";
import { ExplainCode } from "./events/explain-code";
import { FixError } from "./events/fixError";
import { GenerateCodeChart } from "./events/generate-code-chart";
import { GenerateUnitTest } from "./events/generate-unit-test";
import { InterviewQuestion } from "./events/interview-question";
import { OptimizeCode } from "./events/optimize";
import { FileUploader } from "./events/file-uploader";
import { RefactorCode } from "./events/refactor";
import { ReviewCode } from "./events/review";
import { setupSubscribe } from "./services/setup-subscribe";

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
