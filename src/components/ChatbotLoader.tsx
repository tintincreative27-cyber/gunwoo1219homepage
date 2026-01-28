import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const ChatbotLoader = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // 기존 챗봇 스크립트와 설정 제거
    const existingScript = document.getElementById("chtl-script");
    if (existingScript) {
      existingScript.remove();
    }

    // 기존 챗봇 위젯 제거
    const existingWidget = document.querySelector('[id^="chtl-"]');
    if (existingWidget) {
      existingWidget.remove();
    }

    // 언어에 따라 챗봇 ID 선택
    const chatbotId = language === "ko" ? "3551818594" : "9687952738";

    // window.chtlConfig 설정
    (window as any).chtlConfig = { chatbotId };

    // 새 챗봇 스크립트 추가
    const script = document.createElement("script");
    script.id = "chtl-script";
    script.async = true;
    script.setAttribute("data-id", chatbotId);
    script.type = "text/javascript";
    script.src = "https://chatling.ai/js/embed.js";

    document.body.appendChild(script);

    // 클린업 함수
    return () => {
      const scriptToRemove = document.getElementById("chtl-script");
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      // chtlConfig 제거
      delete (window as any).chtlConfig;
    };
  }, [language]);

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default ChatbotLoader;
