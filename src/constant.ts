export const USER_MESSAGE = " ☕️ Hold on while CDMBase Copilot ";

export enum MAIN_ACTIONS {
  codeChart = "cdmbase-copilot.generateCodeChart",
  comment = "cdmbase-copilot.commentCode",
  commitMessage = "cdmbase-copilot.generateCommitMessage",
  explain = "cdmbase-copilot.explain",
  fix = "cdmbase-copilot.codeFix",
  interviewMe = "cdmbase-copilot.interviewMe",
  optimize = "cdmbase-copilot.codeOptimize",
  pattern = "cdmbase-copilot.savePattern",
  refactor = "cdmbase-copilot.codeRefactor",
  review = "cdmbase-copilot.reviewCode",
  unitTest = "cdmbase-copilot.generateUnitTest",
}

export enum COMMON {
  CHAT_HISTORY = "chatHistory",
  USER_INPUT = "user-input",
  BOT = "bot",
}

export const APP_CONFIG = {
  anthropicModel: "claude-3-sonnet-20240229",
  anthropicApiKey:
    "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",
};
