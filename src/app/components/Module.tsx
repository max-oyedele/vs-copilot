import React, { useState } from "react";
import {
  useCopilotReadable,
  useCopilotAction,
  useCopilotChat,
} from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

export interface IModule {
  id: string;
  text: string;
  isCompleted: boolean;
  assignedTo?: string;
}

export const Module = () => {
  const [modules, setModules] = useState<IModule[]>([]);

  useCopilotChatSuggestions(
    {
      instructions: `The following modules are in the list: ${JSON.stringify(
        modules
      )}`,
    },
    [modules]
  );

  useCopilotReadable({
    description: "The user's module list.",
    value: modules,
  });

  useCopilotAction({
    name: "updateModuleList",
    description: "Update the users module list",
    parameters: [
      {
        name: "items",
        type: "object[]",
        description: "The new and updated module list items.",
        attributes: [
          {
            name: "id",
            type: "string",
            description:
              "The id of the module item. When creating a new module item, just make up a new id.",
          },
          {
            name: "text",
            type: "string",
            description: "The text of the module item.",
          },
          {
            name: "isCompleted",
            type: "boolean",
            description: "The completion status of the module item.",
          },
          {
            name: "assignedTo",
            type: "string",
            description:
              "The person assigned to the module item. If you don't know, assign it to 'YOU'.",
            required: true,
          },
        ],
      },
    ],
    handler: ({ items }) => {
      console.log(items);
      const newModules = [...modules];
      for (const item of items) {
        const existingItemIndex = newModules.findIndex(
          (module) => module.id === item.id
        );
        if (existingItemIndex !== -1) {
          newModules[existingItemIndex] = item;
        } else {
          newModules.push(item);
        }
      }
      setModules(newModules);
    },
    render: "Updating the module list...",
  });

  useCopilotAction({
    name: "deleteModule",
    description: "This is called when the user confirm delete module item",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the module item to delete.",
      },
    ],
    handler: ({ id }) => {
      console.log("delete id", id);
      setModules(modules.filter((module) => module.id !== id));
    },
    render: "Deleting a module item...",
  });

  return <></>;
};
