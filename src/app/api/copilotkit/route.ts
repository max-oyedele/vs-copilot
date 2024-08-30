import { NextRequest, NextResponse } from "next/server";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  LangChainAdapter,
  OpenAIAdapter,
  OpenAIAssistantAdapter,
} from "@copilotkit/runtime";
import OpenAI from "openai";
import { ChatAnthropic } from "@langchain/anthropic";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = new ChatAnthropic({
  modelName: process.env.ANTHROPIC_MODEL,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  maxTokens: 1000,
  temperature: 0,
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  const openaiServiceAdapter = new OpenAIAdapter({ openai });

  const langchainServiceAdapter = new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      messages = messages.filter((message) => message.content);
      return model.stream(messages);
    },
  });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: new CopilotRuntime(),
    serviceAdapter: openaiServiceAdapter,
    // serviceAdapter: langchainServiceAdapter,
    endpoint: req.nextUrl.pathname,
  });

  return handleRequest(req);
};
