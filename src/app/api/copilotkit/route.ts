import { NextRequest, NextResponse } from "next/server";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  LangChainAdapter,
  OpenAIAdapter,
} from "@copilotkit/runtime";
import OpenAI from "openai";
import { ChatAnthropic } from "@langchain/anthropic";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatAnthropic({
  modelName: process.env.ANTHROPIC_MODEL,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  maxTokens: 1000,
  temperature: 0,
});

// const model = new ChatOpenAI({
//   openAIApiKey: process.env.OPENAI_API_KEY,
//   modelName: process.env.OPENAI_MODEL,
// });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  const serviceAdapter = new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      messages = messages.filter((message) => message.content);
      // console.log("filtered messages=", messages);
      // return model.stream(messages);
      return model.invoke(messages);
    },
  });
  // const serviceAdapter = new LangChainAdapter({
  //   chainFn: async ({ messages, tools }) => {
  //     return model.stream(messages);
  //   },
  // });
  // const serviceAdapter = new OpenAIAdapter({ openai });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: new CopilotRuntime(),
    serviceAdapter,
    endpoint: req.nextUrl.pathname,
  });

  return handleRequest(req);
};
