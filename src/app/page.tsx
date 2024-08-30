"use client";
import "@copilotkit/react-ui/styles.css";
import "./styles.css";

import React from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar, CopilotChat } from "@copilotkit/react-ui";
import { instructions } from "./instructions";
import { Module, Feature } from "./components";

const HomePage = () => {
  console.log("instructions=", instructions)
  return (
    <CopilotKit
      // publicApiKey={process.env.NEXT_PUBLIC_COPILOT_CLOUD_API_KEY}
      // Alternatively, you can use runtimeUrl to host your own CopilotKit Runtime
      runtimeUrl="/api/copilotkit"
      // transcribeAudioUrl="/api/transcribe"
      // textToSpeechUrl="/api/tts"
    >
      <div className="flex justify-center">
        <CopilotChat
          instructions={instructions}
          labels={{
            title: "Your Assistant",
            initial: "Hi! 👋 How can I assist you today?",
          }}
        ></CopilotChat>
        <Module />
        <Feature />
      </div>
    </CopilotKit>
  );
};

export default HomePage;
