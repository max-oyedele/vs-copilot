import React, { useState } from "react";
import {
  useCopilotReadable,
  useCopilotAction,
  useCopilotChat,
} from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { IModule } from "@/app/types";

export const Module = () => {
  const [modules, setModules] = useState<IModule[]>([]);

  useCopilotChatSuggestions(
    {
      instructions:
        "User wants to know what is module or how to Create, Update, Delete, Move or View Module in repository",
    },
    [modules]
  );

  useCopilotReadable({
    description: "modules existed in repository",
    value: modules,
  });

  useCopilotAction({
    name: "deleteModule",
    description: "This is called when the user confirm delete module",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "The name of the module to delete.",
      },
    ],
    handler: ({ name }) => {
      console.log("delete module name", name);
      setModules(modules.filter((module) => module.name !== name));
    },
    render: "Deleting module ...",
  });

  return <></>;
};
