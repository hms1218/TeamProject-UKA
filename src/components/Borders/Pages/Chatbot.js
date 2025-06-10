import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

const keywordMap = {
  입양: "입양 절차는 상담 → 서류 → 방문입니다.",
  후원: "후원은 각 보호소 상세페이지에서 가능합니다.",
  운영시간: "운영시간은 평일 09:00 ~ 18:00입니다.",
  위치: "운영센터는 인천 부평구에 위치하고 있습니다!",
  전화번호: "고객센터 전화번호는 1588-1234입니다.",
};

const Chatbot = ({onClose}) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);

  useEffect(() => {
  if (chatWindowRef.current) {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }
  }, [messages]);

  const handleKeywordClick = (userInput) => {
    const keyword = Object.keys(keywordMap).find((kw) =>
      userInput.includes(kw)
    );

    const botMessage = keyword
      ? keywordMap[keyword]
      : "죄송합니다. 해당 키워드는 준비되어 있지 않아요.";

    setMessages((prev) => [
      ...prev,
      { type: "user", text: userInput },
      { type: "bot", text: botMessage },
    ]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleKeywordClick(input.trim());
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h3 className="chatbot-title">상담 챗봇</h3>
        <button className="chatbot-close-button" onClick={onClose}>×</button>
      </div>

      <div className="chat-window" ref={chatWindowRef}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="keyword-buttons">
        {Object.keys(keywordMap).map((kw) => (
          <button key={kw} onClick={() => handleKeywordClick(kw)}>
            {kw}
          </button>
        ))}
      </div>

      <div className="chat-input-wrapper">
        <input
          type="text"
          placeholder="질문을 입력하세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>전송</button>
      </div>
    </div>
  );
};

export default Chatbot;
