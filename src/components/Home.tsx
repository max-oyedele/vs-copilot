import React, { Suspense, useState, useEffect, useRef } from "react";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import {
  useCopilotReadable,
  useCopilotAction,
  useCopilotContext,
  useCopilotChat,
} from "@copilotkit/react-core";

const enum AppState {
  Ask,
  Generate,
  Update,
}

const suggestionInstruction = `
  - if appState is 0 
    suggest nothing.
  - if appState is 1
    suggest 'Generate component'.
    no deal with angular, vue.
  - if appState is 2
    suggest 'Please describe update context'.
`;

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.Ask);
  const [code, setCode] = useState("");

  const {
    visibleMessages,
    appendMessage,
    setMessages,
    deleteMessage,
    reloadMessages,
    stopGeneration,
    isLoading,
  } = useCopilotChat();

  ////////////////////////////////////////////////////////////////////////////
  const copyCodeBtns = document.querySelectorAll(
    ".copilotKitCodeBlockToolbarButton"
  );
  useEffect(() => {
    if (!isLoading && copyCodeBtns.length > 0) {
      copyCodeBtns.forEach((element) => {
        element.addEventListener("click", async () => {
          setTimeout(async () => {
            const text = await navigator.clipboard.readText();
            setCode(text);
          }, 500);
        });
      });
      const rerender = document.getElementById("rerender");
      if (rerender) {
        rerender.outerHTML = "rerender";
      }
    }
  }, [isLoading, copyCodeBtns]);

  useEffect(() => {
    console.log("here is the current model value:", code);
  }, [code]);

  /////////////////////////////////////////////////////////////////////////////
  useCopilotReadable({
    description: "App state configured in the project",
    value: appState,
  });
  useCopilotChatSuggestions(
    {
      instructions: suggestionInstruction,
    },
    [appState]
  );
  useCopilotAction({
    name: "updateAppState",
    description: "User wants to update app state",
    parameters: [
      {
        name: "nextState",
        type: "number",
        description: "state to update",
      },
    ],
    handler: async ({ nextState }) => {
      console.log("update app state", nextState);
      setAppState(nextState);
    },
  });

  /////////////////////////////////////////////////////////////////////////////
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target?.result as any);
      };
      reader.readAsText(file);
    }
  };

  const [isExportEnabled, setIsExportEnabled] = useState<boolean>(false);
  useEffect(() => {
    if (code) setIsExportEnabled(true);
    else setIsExportEnabled(false);
  }, [code]);

  const handleExport = async () => {
    const response = await fetch(`http://localhost:4000/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: "generated",
        name: "noname",
        ext: `tsx`,
        description: "",
        code: code,
      }),
    });

    console.log("handle export response:", response.status);
    if (response.status === 200) setIsExportEnabled(false);
  };

  const [viewCode, setViewCode] = useState<boolean>(true);
  // const LazyComponent = React.lazy(() => import("../../generated/noname"));
  const handleView = () => {
    setViewCode(!viewCode);
  };

  return (
    <div>
      <div className="p-2">
        <input
          type="file"
          accept=".js,.jsx,.ts,.tsx,.json,.html,.css"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex p-2 gap-2">
        <button
          className={`px-2 border-2 border-solid ${
            isExportEnabled
              ? "border-gray-600"
              : "border-gray-400 text-gray-400"
          }`}
          disabled={!isExportEnabled}
          onClick={handleExport}
        >
          Export
        </button>
        <button
          className="border-2 border-solid border-gray-600 px-2"
          onClick={handleView}
        >
          View {viewCode ? "Render" : "Code"}
        </button>
      </div>
      <div id="rerender"></div>
    </div>
  );
}
