export const USER_MESSAGE = " ☕️ Hold on while CDMBase Copilot ";
export enum MAX_ACTIONS {
  comment = "max.commentCode",
  review = "max.reviewCode",
  refactor = "max.codeRefactor",
  optimize = "max.codeOptimize",
  fix = "max.codeFix",
  explain = "max.explain",
  pattern = "max.savePattern",
  knowledge = "max.readFromKnowledgeBase",
  commitMessage = "max.generateCommitMessage",
  interviewMe = "max.interviewMe",
  generateUnitTest = "max.generateUnitTest",
  generateCodeChart = "max.generateCodeChart",
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
