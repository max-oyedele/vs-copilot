import * as vscode from "vscode";
import OpenAI from "openai";
import { COMMON } from "../constant";
import { formatText } from "../utils";

interface IEventGenerator {
  showInformationMessage(): Thenable<string | undefined>;
  getSelectedWindowArea(): string | undefined;
}

export abstract class EventGenerator implements IEventGenerator {
  context: vscode.ExtensionContext;
  protected error?: string;

  // Todo Need to refactor. Only one instance of a model can be created at a time. Therefore no need to retrieve all model information, only retrieve the required model within the application
  constructor(
    private readonly action: string,
    _context: vscode.ExtensionContext,
    errorMessage?: string
  ) {
    this.context = _context;
    this.error = errorMessage;
  }

  abstract createPrompt(text?: string): any;

  showInformationMessage(): Thenable<string | undefined> {
    return vscode.window.showInformationMessage(this.action);
  }

  getSelectedWindowArea(): string | undefined {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage("No active text editor.");
      return;
    }
    const selectedArea: string | undefined = editor.document.getText(
      editor.selection
    );
    return selectedArea;
  }

  cleanGraphString(inputString: string) {
    if (inputString.includes("|>")) {
      return inputString.replace(/\|>/g, "|");
    }
    return inputString;
  }

  formatResponse(comment: string): string {
    return formatText(comment);
  }

  async generateResponse(errorMessage?: string): Promise<string | undefined> {
    this.showInformationMessage();
    const selectedCode = this.getSelectedWindowArea();
    if (!errorMessage && !selectedCode) {
      vscode.window.showErrorMessage("select a piece of code.");
      return;
    }

    let prompt;
    errorMessage
      ? (prompt = await this.createPrompt(errorMessage))
      : (prompt = await this.createPrompt(selectedCode));

    if (!prompt) {
      vscode.window.showErrorMessage("model not reponding, try again later");
      return;
    }

    const response = await this.generateModelResponse(prompt);
    //TODO check the format of the history and ensure it conforms with the current model, else delete the history
    if (response) {
      this.context.workspaceState.update(COMMON.CHAT_HISTORY, [
        {
          role: "user",
          content: prompt,
        },
        {
          role: "assistant",
          content: response,
        },
      ]);
    }
    return response;
  }

  protected async generateModelResponse(
    text: string
  ): Promise<string | undefined> {
    try {
      let response;

      // const model = new Anthropic({
      //   apiKey: this.anthropicApiKey,
      // });

      // response = await model.messages.create(
      //   {
      //     model: this.anthropicModel,
      //     system: "",
      //     max_tokens: 1024,
      //     messages: [{ role: "user", content: text }],
      //   },
      //   { maxRetries: 10 }
      // );
      // response = response.content[0].text;

      if (!response) {
        throw new Error(
          "Could not generate response. Check your settings, ensure the API keys and Model Name is added properly."
        );
      }

      if (this.action.includes("chart")) {
        response = this.cleanGraphString(response as string);
      }

      return response;
    } catch (error) {
      console.error("Error generating response:", error);
      vscode.window.showErrorMessage(
        "An error occurred while generating the response. Please try again."
      );
    }
  }

  async execute(errorMessage?: string): Promise<void> {
    const response = (await this.generateResponse(errorMessage)) as string;
    if (!response) {
      vscode.window.showErrorMessage("model not reponding, try again later");
      return;
    }
    const formattedResponse = this.formatResponse(response);
    if (!formattedResponse) {
      vscode.window.showErrorMessage("model not reponding, try again later");
      return;
    }

    // await AnthropicWebView.webviewView?.webview.postMessage({
    //   type: "user-input",
    //   message: formattedResponse,
    // });
  }
}
