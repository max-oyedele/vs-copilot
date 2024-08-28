import { NextRequest, NextResponse } from "next/server";
import {
  CopilotRuntime,
  copilotRuntimeNextJSAppRouterEndpoint,
  LangChainAdapter,
} from "@copilotkit/runtime";
import { ChatAnthropic } from "@langchain/anthropic";

const model = new ChatAnthropic({
  modelName: process.env.ANTHROPIC_MODEL,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
});

export const POST = async (req: NextRequest, res: NextResponse) => {
  const serviceAdapter = new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      // messages = messages.filter((message) => message.content);
      // console.log("filtered messages=", messages);
      return model.stream(messages);
    },
  });

  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime: new CopilotRuntime(),
    serviceAdapter,
    endpoint: req.nextUrl.pathname,
  });

  return handleRequest(req);
};
