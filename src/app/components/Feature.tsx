import React, { useState } from "react";
import {
  useCopilotReadable,
  useCopilotAction,
  useCopilotChat,
} from "@copilotkit/react-core";
import { useCopilotChatSuggestions } from "@copilotkit/react-ui";

export interface IFeature {
  id: string;
  text: string;
}

export const Feature = () => {
  const [features, setFeatures] = useState<IFeature[]>([]);

  useCopilotChatSuggestions(
    {
      instructions: `The following features are in the list: ${JSON.stringify(
        features
      )}`,
    },
    [features]
  );

  useCopilotReadable({
    description: "The user's feature list.",
    value: features,
  });

  useCopilotAction({
    name: "deleteFeature",
    description: "users delete feature",
    parameters: [
      {
        name: "id",
        type: "string",
        description: "The id of the feature item to delete.",
      },
    ],
    handler: ({ id }) => {
      console.log("delete id", id);
      setFeatures(features.filter((feature) => feature.id !== id));
    },
    render: "Deleting a feature item...",
  });

  return <></>;
};
