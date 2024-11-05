export const APP_CONFIG = {
  openaiApiKey: "your-api-key",
  openaiModel: "gpt-4o",
};

export const USER_MESSAGE = " ☕️ Hold on while VS Copilot ";

export enum MAIN_ACTIONS {
  commitMessage = "vs-copilot.generateCommitMessage",
  pattern = "vs-copilot.savePattern",
  unitTest = "vs-copilot.generateUnitTest",
}

export enum COMMON {
  CHAT_HISTORY = "chatHistory",
  USER_INPUT = "user-input",
  BOT = "bot",
}
