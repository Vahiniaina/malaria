import { useEffect } from "react";
import { useColorModeValue } from "@chakra-ui/react";

export const BotAgent = () => {
  
  const bg =useColorModeValue("rgba(0, 0, 0, 0.06)", "rgba(255, 255, 255, 0.08)");
  useEffect(() => {
    // Inject the chatbot configuration
    const scriptConfig = document.createElement("script");
    scriptConfig.innerHTML = `
      window.difyChatbotConfig = {
        token: 'ndAcROkbXbqSYvlK'
      };
    `;
    
    document.body.appendChild(scriptConfig);

    // Inject the chatbot script
    const scriptChatbot = document.createElement("script");
    scriptChatbot.src = "https://udify.app/embed.min.js";
    scriptChatbot.id = "ndAcROkbXbqSYvlK";
    scriptChatbot.defer = true;
    document.body.appendChild(scriptChatbot);
    // Inject chatbot styles
    const style = document.createElement("style");
    style.innerHTML = `
      #dify-chatbot-bubble-button {
        background-color: ${bg} !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
      }
    `;
    document.body.appendChild(style);

    // Cleanup on unmount
    return () => {
      scriptConfig.remove();
      scriptChatbot.remove();
      style.remove();
    };
  }, [bg]);

  return null; // No visible UI, just script injection
};

export default BotAgent;
