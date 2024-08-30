"use client";
import "@copilotkit/react-ui/styles.css";
import "./styles.css";

import React, { useState } from "react";
import {
  CopilotKit,
  useCopilotReadable,
  useCopilotAction,
  useCopilotChat,
} from "@copilotkit/react-core";
import {
  CopilotSidebar,
  CopilotChat,
  useCopilotChatSuggestions,
} from "@copilotkit/react-ui";
import { Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { instructions } from "./instructions";

const HomePage = () => {
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
        <Child />
      </div>
    </CopilotKit>
  );
};

export interface Todo {
  id: string;
  text: string;
  isCompleted: boolean;
  assignedTo?: string;
}

const Child = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "123", text: "newone", isCompleted: true, assignedTo: "you" },
  ]);

  useCopilotChatSuggestions({
    instructions: `The following todos are in the list: ${JSON.stringify(todos)}`,
  }, [todos]);

  useCopilotReadable({
    description: "The user's todo list.",
    value: todos,
  });

  useCopilotAction({
    name: "updateTodoList",
    description: "Update the users todo list",
    parameters: [
      {
        name: "items",
        type: "object[]",
        description: "The new and updated todo list items.",
        attributes: [
          {
            name: "id",
            type: "string",
            description:
              "The id of the todo item. When creating a new todo item, just make up a new id.",
          },
          {
            name: "text",
            type: "string",
            description: "The text of the todo item.",
          },
          {
            name: "isCompleted",
            type: "boolean",
            description: "The completion status of the todo item.",
          },
          {
            name: "assignedTo",
            type: "string",
            description:
              "The person assigned to the todo item. If you don't know, assign it to 'YOU'.",
            required: true,
          },
        ],
      },
    ],
    handler: ({ items }) => {
      console.log(items);
      const newTodos = [...todos];
      for (const item of items) {
        const existingItemIndex = newTodos.findIndex(
          (todo) => todo.id === item.id
        );
        if (existingItemIndex !== -1) {
          newTodos[existingItemIndex] = item;
        } else {
          newTodos.push(item);
        }
      }
      setTodos(newTodos);
    },
    render: "Updating the todo list...",
  });

  useCopilotAction({
    name: "deleteTodo",
    description: "This is called when the user confirm delete todo item",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the todo item to delete.",
      },
    ],
    handler: ({ id }) => {
      console.log("delete todo log", id);
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    render: "Deleting a todo item...",
  });

  return <></>;
};

export default HomePage;
