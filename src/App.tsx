import "./styles.css";
import Chatbot from "react-chatbot-kit";
import ChatbotConfig from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

export default function App() {
  return (
    <div className="App">
      <div className="app-chatbot-container">
        <Chatbot
          config={ChatbotConfig}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  );
}
