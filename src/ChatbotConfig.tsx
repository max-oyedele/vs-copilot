import { createChatBotMessage } from "react-chatbot-kit";
import Overview from "./widgets/Overview";
import GlobalStatistics from "./widgets/GlobalStatistics";
import LocalStatistics from "./widgets/LocalStatistics";
import Contact from "./widgets/Contact";
import MedicineDelivery from "./widgets/MedicineDelivery";
import CoBotAvatar from "./CoBotAvatar";

const ChatbotConfig = {
  lang: "no",
  botName: "CoBot",
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
      `Hi, I'm here to provide you with latest COVID 19 data to keep you safe!`,
      {}
    ),
    createChatBotMessage(
      "Here's a quick overview of what I can help you with. You can also type in.",
      {
        // withAvatar: false,
        delay: 400,
        widget: "overview",
      }
    ),
  ],
  state: {},
  customComponents: { botAvatar: (props: any) => <CoBotAvatar {...props} /> },
  widgets: [
    {
      widgetName: "overview",
      widgetFunc: (props: any) => <Overview {...props} />,
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
