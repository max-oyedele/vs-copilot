import React from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import Home from "./components/Home";
import { system } from "./instructions/behavior/system";

function App({ children }: any) {
  return (
    <CopilotKit runtimeUrl="http://localhost:4000/copilotkit">
      <CopilotSidebar
        defaultOpen={true}
        clickOutsideToClose={false}
        instructions={`${system}`}
        labels={{
          title: "Assistant",
          initial: "How can I help you today?",
        }}
      >
        <Home />
      </CopilotSidebar>
    </CopilotKit>
  );
}

export default App;
