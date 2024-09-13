import * as vscode from "vscode";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { APP_CONFIG, COMMON } from "../constant";
import { WebView } from "../base/web-view";

type Role = "user" | "assistant";
export interface IHistory {
  role: Role;
  content: string;
}

export class AnthropicWebView extends WebView {
  chatHistory: IHistory[] = [];
  constructor(extensionUri: vscode.Uri, context: vscode.ExtensionContext) {
    const { anthropicApiKey, anthropicModel } = APP_CONFIG;
    super(extensionUri, anthropicApiKey, anthropicModel, context);
  }

  async generateResponse(message: string): Promise<string | undefined> {
    try {
      // const anthropic = new Anthropic({
      //   apiKey: this.apiKey,
      // });
      let chatHistory = this._context.workspaceState.get<IHistory[]>(
        COMMON.CHAT_HISTORY,
        []
      );
      if (chatHistory?.length >= 3) {
        chatHistory = chatHistory.slice(-2);
      }
      // const chatCompletion = await anthropic.messages.create(
      //   {
      //     model: this.generativeAiModel,
      //     messages: [
      //       {
      //         role: "user",
      //         content: `You are an AI coding assistant, created to help developers write better code more efficiently. Your purpose is to provide intelligent code suggestions, completions, and assistance based on the context and requirements provided by the developer. You have the following capabilities:1. Analyze the existing code and understand its structure, context, and purpose. 2. Generate code snippets, completions, and suggestions based on the developer's input and the surrounding code.3. Provide explanations and justifications for the generated code to help the developer understand the reasoning behind the suggestions.4. Assist with debugging and troubleshooting by identifying potential issues and offering solutions.5. Optimize code performance by suggesting improvements and best practices.6. Adapt to various programming languages, frameworks, and libraries based on the context of the code.When a developer requests your assistance, follow these guidelines:1. Carefully analyze the provided code snippet or context to understand the developer's intent and requirements.2. Generate code suggestions or completions that are relevant, efficient, and adhere to best practices and coding conventions.3. Provide clear and concise explanations for the generated code, highlighting the key aspects and reasoning behind the suggestions.4. If asked for debugging assistance, identify potential issues or bugs in the code and suggest appropriate fixes or improvements.5. Offer recommendations for code optimization, such as improving performance, readability, or maintainability, when applicable.6. Adapt your suggestions and explanations based on the specific programming language, framework, or library being used in the code.7. Be proactive in offering alternative solutions or approaches when multiple valid options are available.8. Engage in a conversation with the developer to clarify requirements, provide additional context, or iterate on the generated code suggestions. ${message}`,
      //       },
      //       ...chatHistory,
      //     ],
      //     max_tokens: 1024,
      //     stream: false,
      //   },
      //   { maxRetries: 10 }
      // );
      // const response = chatCompletion.content[0].text;

      let response;
      const client = new OpenAI({
        apiKey:
          "sk-pubngo-demo-GnUjJE73pFNo3QcTcQnPT3BlbkFJwqCblO7fMZezQaZKSYJY", // This is the default and can be omitted
      });
      response = await client.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `You are an AI coding assistant, created to help developers write better code more efficiently. Your purpose is to provide intelligent code suggestions, completions, and assistance based on the context and requirements provided by the developer. You have the following capabilities:1. Analyze the existing code and understand its structure, context, and purpose. 2. Generate code snippets, completions, and suggestions based on the developer's input and the surrounding code.3. Provide explanations and justifications for the generated code to help the developer understand the reasoning behind the suggestions.4. Assist with debugging and troubleshooting by identifying potential issues and offering solutions.5. Optimize code performance by suggesting improvements and best practices.6. Adapt to various programming languages, frameworks, and libraries based on the context of the code.When a developer requests your assistance, follow these guidelines:1. Carefully analyze the provided code snippet or context to understand the developer's intent and requirements.2. Generate code suggestions or completions that are relevant, efficient, and adhere to best practices and coding conventions.3. Provide clear and concise explanations for the generated code, highlighting the key aspects and reasoning behind the suggestions.4. If asked for debugging assistance, identify potential issues or bugs in the code and suggest appropriate fixes or improvements.5. Offer recommendations for code optimization, such as improving performance, readability, or maintainability, when applicable.6. Adapt your suggestions and explanations based on the specific programming language, framework, or library being used in the code.7. Be proactive in offering alternative solutions or approaches when multiple valid options are available.8. Engage in a conversation with the developer to clarify requirements, provide additional context, or iterate on the generated code suggestions. ${message}`,
          },
          ...chatHistory,
        ],
        model: "gpt-3.5-turbo",
      });
      response = response.choices[0].message?.content;

      if (!response) {
        throw new Error(
          "Could not generate response. Check your settings, ensure the API keys and Model Name is added properly."
        );
      }

      return response;
    } catch (error) {
      console.error(error);
      this._context.workspaceState.update(COMMON.CHAT_HISTORY, []);
      vscode.window.showErrorMessage(
        "Model not responding, please resend your question"
      );
      return;
    }
  }

  public async sendResponse(
    response: string,
    currentChat: string
  ): Promise<boolean | undefined> {
    try {
      const type = currentChat === "bot" ? "bot-response" : "user-input";
      if (currentChat === "bot") {
        this.chatHistory.unshift({
          role: "assistant",
          content: response,
        });
      } else {
        this.chatHistory.push({
          role: "user",
          content: response,
        });
      }
      if (this.chatHistory.length === 2) {
        const history: IHistory[] | undefined =
          this._context.workspaceState.get(COMMON.CHAT_HISTORY, []);
        this._context.workspaceState.update(COMMON.CHAT_HISTORY, [
          ...history,
          ...this.chatHistory,
        ]);
      }

      return await WebView.webviewView!.webview.postMessage({
        type,
        message: response,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
