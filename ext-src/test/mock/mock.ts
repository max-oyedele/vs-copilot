import { IHistory } from "../../providers/openai-web-view";

export class MockGoogleGenerativeAi {
  constructor(apiKey: string) {}

  getGenerativeModel({ model: name }: { model: string }) {
    return {
      startChat: ({ history }: { history: IHistory[] }) => {
        return {
          sendMessage: async (message: string) => {
            return {
              response: {
                text: () =>
                  Promise.resolve(
                    "Here is how to write the K nearest neighbour function in typescript"
                  ),
              },
            };
          },
        };
      },
    };
  }
}
