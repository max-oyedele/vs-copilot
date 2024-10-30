export const USER_MESSAGE = " ☕️ Hold on while VS Copilot ";

export enum MAIN_ACTIONS {
  codeChart = "vs-copilot.generateCodeChart",
  comment = "vs-copilot.commentCode",
  commitMessage = "vs-copilot.generateCommitMessage",
  explain = "vs-copilot.explain",
  fix = "vs-copilot.codeFix",
  interviewMe = "vs-copilot.interviewMe",
  optimize = "vs-copilot.codeOptimize",
  pattern = "vs-copilot.savePattern",
  refactor = "vs-copilot.codeRefactor",
  review = "vs-copilot.reviewCode",
  unitTest = "vs-copilot.generateUnitTest",
}

export enum COMMON {
  CHAT_HISTORY = "chatHistory",
  USER_INPUT = "user-input",
  BOT = "bot",
}

export const APP_CONFIG = {
  anthropicModel: "claude-3-sonnet-20240229",
  anthropicApiKey: "your-api-key",
};
