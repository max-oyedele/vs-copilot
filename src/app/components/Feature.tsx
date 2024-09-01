import React, { useState } from "react";
import {
  useCopilotReadable,
  useCopilotAction,
  useCopilotChat,
} from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";
import { IFeature } from "@/app/types";

export const Feature = () => {
  const [features, setFeatures] = useState<IFeature[]>([]);

  useCopilotChatSuggestions(
    {
      instructions:
        "User wants to know what is feature or how to Create, Update, Delete, Move or View Feature in repository",
    },
    [features]
  );

  useCopilotReadable({
    description: "features existed in repository",
    value: features,
  });

  useCopilotAction({
    name: "deleteFeature",
    description: "This is called when the user confirm delete feature",
    parameters: [
      {
        name: "name",
        type: "string",
        description: "The name of the feature to delete.",
      },
    ],
    handler: ({ name }) => {
      console.log("delete feature name", name);
      setFeatures(features.filter((feature) => feature.name !== name));
    },
    render: "Deleting feature ...",
  });

  return <></>;
};
