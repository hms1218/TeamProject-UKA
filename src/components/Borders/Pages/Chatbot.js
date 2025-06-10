import { useEffect, useRef, useState } from "react";
import "./Chatbot.css";

const keywordMap = {
  입양: "입양 절차는 상담 → 서류 → 방문입니다.",
  후원: "후원은 홈페이지 ‘후원하기’ 메뉴에서 가능합니다.",
  고객센터: "운영시간은 평일 09:00 ~ 18:00입니다.",
  위치: "본 센터는 인천 부평구에 위치하고 있습니다!",
};

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatWindowRef = useRef(null);

  useEffect(() => {
  if (chatWindowRef.current) {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }
  }, [messages]);

  const handleKeywordClick = (keyword) => {
    const botMessage = keywordMap[keyword] || "죄송합니다. 해당 키워드는 준비되어 있지 않아요.";
    setMessages((prev) => [
      ...prev,
      { type: "user", text: keyword },
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
      <h3 className="chatbot-title">상담 챗봇</h3>

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
