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

export const GROQ_CONFIG = {
  temperature: 0.1,
  max_tokens: 1024,
  top_p: 1,
  stream: false,
  stop: null,
};

export const APP_CONFIG = {
  geminiKey: "google.gemini.apiKeys",
  geminiModel: "google.gemini.model",
  groqKey: "groq.llama3.apiKey",
  groqModel: "groq.llama3.model",
  generativeAi: "generativeAi.option",
  // generativeAi: "Anthropic",
  anthropicModel: "claude-3-5-sonnet-20240620",
  anthropicApiKey: "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",
};

export enum generativeAiModel {
  GEMINI = "Gemini",
  GROQ = "Groq",
  ANTHROPIC = "Anthropic",
}
