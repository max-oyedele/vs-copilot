import { createChatBotMessage } from "react-chatbot-kit";
import Options from "./widgets/Options";
import GlobalStatistics from "./widgets/GlobalStatistics";
import LocalStatistics from "./widgets/LocalStatistics";
import Contact from "./widgets/Contact";
import MedicineDelivery from "./widgets/MedicineDelivery";
import CoBotAvatar from "./CoBotAvatar";

const ChatbotConfig = {
  lang: "no",
  botName: "CDMBase Copilot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#04668a",
    },
    chatButton: {
      backgroundColor: "#0f5faf",
    },
  },
  initialMessages: [
    createChatBotMessage(
      `Hi, I'm here to help you work on codebase!`,
      {
        // withAvatar: true,
        delay: 400,
        widget: "options",
      }
    ),
  ],
  state: {},
  customComponents: { botAvatar: (props: any) => <CoBotAvatar {...props} /> },
  widgets: [
    {
      widgetName: "options",
      widgetFunc: (props: any) => <Options title="Options" {...props} />,
      mapStateToProps: ["messages"],
      props: {},
    },
    {
      widgetName: "globalStatistics",
      widgetFunc: () => <GlobalStatistics />,
      mapStateToProps: [],
      props: {},
    },
    {
      widgetName: "localStatistics",
      widgetFunc: () => <LocalStatistics />,
      mapStateToProps: [],
      props: {},
    },
    {
      widgetName: "emergencyContact",
      widgetFunc: () => <Contact />,
      mapStateToProps: [],
      props: {},
    },
    {
      widgetName: "medicineDelivery",
      widgetFunc: () => <MedicineDelivery />,
      mapStateToProps: [],
      props: {},
    },
  ],
};

export default ChatbotConfig;
