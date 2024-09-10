import * as vscode from "vscode";
import Anthropic from "@anthropic-ai/sdk";
import { APP_CONFIG, COMMON } from "../constant";
import { AnthropicWebViewProvider } from "../providers/anthropic-web-view-provider";
import { getConfigValue, vscodeErrorMessage } from "../utils";

interface IEventGenerator {
  getApplicationConfig(configKey: string): string | undefined;
  showInformationMessage(): Thenable<string | undefined>;
  getSelectedWindowArea(): string | undefined;
}

export abstract class EventGenerator implements IEventGenerator {
  context: vscode.ExtensionContext;
  protected error?: string;
  private readonly anthropicModel: string;
  private readonly anthropicApiKey: string;
  // Todo Need to refactor. Only one instance of a model can be created at a time. Therefore no need to retrieve all model information, only retrieve the required model within the application
  constructor(
    private readonly action: string,
    _context: vscode.ExtensionContext,
    errorMessage?: string
  ) {
    this.context = _context;
    this.error = errorMessage;
    const { anthropicModel, anthropicApiKey } = APP_CONFIG;
    this.anthropicModel = getConfigValue(anthropicModel);
    this.anthropicApiKey = getConfigValue(anthropicApiKey);
  }

  getApplicationConfig(configKey: string): string | undefined {
    return getConfigValue(configKey);
  }

  protected createModel(): { model: any; modelName: string } | undefined {
    try {
      let model;
      let modelName = "";

      const apiKey: string = this.anthropicApiKey;
      modelName = this.anthropicModel;
      model = this.createAnthropicModel(apiKey);

      return { model, modelName };
    } catch (error) {
      console.error("Error creating model:", error);
      vscode.window.showErrorMessage(
        "An error occurred while creating the model. Please try again."
      );
    }
  }

  showInformationMessage(): Thenable<string | undefined> {
    return vscode.window.showInformationMessage(this.action);
  }

  getSelectedWindowArea(): string | undefined {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showInformationMessage("No active text editor.");
      return;
    }
    const selection: vscode.Selection | undefined = editor.selection;
    const selectedArea: string | undefined = editor.document.getText(selection);
    return selectedArea;
  }

  private createAnthropicModel(apiKey: string): Anthropic {
    return new Anthropic({
      apiKey,
    });
  }

  protected async generateModelResponse(
    text: string
  ): Promise<string | Anthropic.Messages.Message | undefined> {
    try {
      const activeModel = this.createModel();
      if (!activeModel) {
        throw new Error("Model not found. Check your settings.");
      }

      const { model, modelName } = activeModel;

      let response;
      if (modelName) {
        response = await this.anthropicResponse(model, modelName, text);
      }

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

  cleanGraphString(inputString: string) {
    if (inputString.includes("|>")) {
      return inputString.replace(/\|>/g, "|");
    }
    return inputString;
  }

  async generateGeminiResponse(
    model: any,
    text: string
  ): Promise<string | undefined> {
    const result = await model.generateContent(text);
    return result ? await result.response.text() : undefined;
  }

  private async anthropicResponse(
    model: Anthropic,
    generativeAiModel: string,
    userPrompt: string
  ) {
    try {
      const response = await model.messages.create({
        model: generativeAiModel,
        system: "",
        max_tokens: 1024,
        messages: [{ role: "user", content: userPrompt }],
      });
      return response.content[0].text;
    } catch (error) {
      console.error("Error generating response:", error);
      vscode.window.showErrorMessage(
        "An error occurred while generating the response. Please try again."
      );
      return;
    }
  }

  abstract formatResponse(comment: string): string;

  abstract createPrompt(text?: string): any;

  async generateResponse(
    errorMessage?: string
  ): Promise<string | Anthropic.Messages.Message | undefined> {
    this.showInformationMessage();
    let prompt;
    const selectedCode = this.getSelectedWindowArea();
    if (!errorMessage && !selectedCode) {
      vscode.window.showErrorMessage("select a piece of code.");
      return;
    }

    errorMessage
      ? (prompt = await this.createPrompt(errorMessage))
      : (prompt = await this.createPrompt(selectedCode));

    if (!prompt) {
      vscode.window.showErrorMessage("model not reponding, try again later");
      return;
    }

    const response = await this.generateModelResponse(prompt);
    //TODO check the format of the history and ensure it conforms with the current model, else delete the history
    if (prompt && response) {
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

    await AnthropicWebViewProvider.webView?.webview.postMessage({
      type: "user-input",
      message: formattedResponse,
    });
  }
}
