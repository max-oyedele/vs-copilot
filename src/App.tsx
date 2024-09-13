import "./styles.css";
import Chatbot from "react-chatbot-kit";
import ChatbotConfig from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

export default function App() {
  return (
    <div className="app">
      <div className="app-chatbot-container">
        <Chatbot
          config={ChatbotConfig}
          headerText=' '
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  );
}
